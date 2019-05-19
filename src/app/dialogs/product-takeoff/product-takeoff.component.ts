import { Component, OnInit } from '@angular/core';
import { StockServicesService } from 'src/app/services/stock-services.service';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { ProductByIdPipe } from 'src/app/pipes/product-by-id.pipe';
import { MatDialogRef } from '@angular/material';

declare var swal: any;

@Component({
  selector: 'app-product-takeoff',
  templateUrl: './product-takeoff.component.html',
  styleUrls: ['./product-takeoff.component.css']
})
export class ProductTakeoffComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private stockServices: StockServicesService, private backendServices: BackendServiceService, private dialogRef: MatDialogRef<ProductTakeoffComponent>) { }

  productTakeOffForm: FormGroup;
  products: any;
  units: any;
  unitsPerPack = 0;
  prod: any;
  btnDisabled = false;
  btnText = 'ບັນທືກ ລາຍການ';
  ngOnInit() {
    const refno = this.padding(Math.floor(Math.random() * 10000000000) + 1, 12);
    this.productTakeOffForm = new FormGroup({
      refno: new FormControl(refno),
      productName: new FormControl(),
      productId: new FormControl(),
      usedQuantity: new FormControl(),
      unitId: new FormControl(),
      unitName: new FormControl(),
      currentQuantity: new FormControl(),
      dozenQuantityUnitId: new FormControl(),
      totalUsedQuantity: new FormControl(),
      remarks: new FormControl(),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      createdAt: new FormControl(new Date())
    });
    this.loadProducts();
    this.loadUnits();
  }
  async loadProducts() {
    this.backendServices.getProducts().then(rsp => {
      rsp.subscribe(products => {
        this.products = products;
      });
    });
  }
  productSelected(product) {
    this.prod = new ProductByIdPipe().transform(this.products, product);
    this.productTakeOffForm.get('productId').setValue(this.prod[0].id);
    this.productTakeOffForm.get('currentQuantity').setValue(this.prod[0].currentQuantity);
    this.productTakeOffForm.get('unitId').setValue(this.prod[0].unitId);
    this.backendServices.getUnitById(this.prod[0].unitId).then(u => {
      u.subscribe(unit => {
        this.productTakeOffForm.get('unitName').setValue(unit['unit_name']);
      });
    });
  }
  loadUnits() {
    this.backendServices.getUnit().then(u => {
      u.subscribe(units => {
        this.units = units;
      });
    });
  }
  unitPerPackSelected(e) {
    if (e) {
      const units = e.split('|');
      this.unitsPerPack = units[0];
      this.productTakeOffForm.get('dozenQuantityUnitId').setValue(units[2]);
      this.quantityCalculation();
    }
  }
  quantityCalculation() {
    if (parseInt(this.productTakeOffForm.get('usedQuantity').value, 10) > 0 && this.unitsPerPack > 0) {
      // tslint:disable-next-line: max-line-length
      const totalQuantity = parseInt(this.productTakeOffForm.get('usedQuantity').value, 10) * this.unitsPerPack;
      if (totalQuantity <= parseInt(this.productTakeOffForm.get('currentQuantity').value, 10)) {
        this.btnDisabled = false;
        this.productTakeOffForm.get('totalUsedQuantity').setValue(totalQuantity);
      } else {
        this.btnDisabled = true;
        swal({
          title: 'ເກິນຈຳນວນເຄື່ອງໃນສາງ',
          // tslint:disable-next-line: max-line-length
          text: 'ເຄື່ອງໃນສາງມີທັງໝົດ ' + parseInt(this.productTakeOffForm.get('currentQuantity').value, 10) + ' ' + this.productTakeOffForm.get('unitName').value,
          icon: 'error'
        });
        this.productTakeOffForm.get('usedQuantity').setValue('');
      }
    }
  }

  createStockTakeOff() {
    this.btnDisabled = true;
    this.btnText = 'Processing ...';
    if (this.productTakeOffForm.valid) {
      this.stockServices.stockTakeOff(this.productTakeOffForm.value).then(rsp => {
        rsp.subscribe(product => {
          if (product['status'] === 'success') {
            this.dialogRef.close('success');
          } else {
            swal({
              title: 'ບໍ່ສາມາດບັນທຶກໄດ້ ກະລຸນາກວດຄືນ',
              // tslint:disable-next-line: max-line-length
              // text: 'ເຄື່ອງໃນສາງມີທັງໝົດ ' + parseInt(this.productTakeOffForm.get('currentQuantity').value, 10) + ' ' + this.productTakeOffForm.get('unitName').value,
              icon: 'error'
            });
            this.btnDisabled = false;
            this.btnText = 'ບັນທືກ ລາຍການ';
            return;
          }
        });
      });
    } else {
      swal({
        title: 'ຂໍ້ມູນບໍ່ຄົບຖ້ວນ ກະລຸນາກວດຄືນ',
        // tslint:disable-next-line: max-line-length
        // text: 'ເຄື່ອງໃນສາງມີທັງໝົດ ' + parseInt(this.productTakeOffForm.get('currentQuantity').value, 10) + ' ' + this.productTakeOffForm.get('unitName').value,
        icon: 'error'
      });
    }
  }

  padding(num: number, size: number) {
    let s = num + '';
    while (s.length < size) { s = '0' + s; }
    return s;
  }
}
