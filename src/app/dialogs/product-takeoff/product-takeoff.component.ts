import { Component, OnInit } from '@angular/core';
import { StockServicesService } from 'src/app/services/stock-services.service';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { ProductByIdPipe } from 'src/app/pipes/product-by-id.pipe';

declare var swal: any;

@Component({
  selector: 'app-product-takeoff',
  templateUrl: './product-takeoff.component.html',
  styleUrls: ['./product-takeoff.component.css']
})
export class ProductTakeoffComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private stockServices: StockServicesService, private backendServices: BackendServiceService, ) { }

  productTakeOffForm: FormGroup;
  products: any;
  units: any;
  unitsPerPack = 0;

  ngOnInit() {
    const refno = this.padding(Math.floor(Math.random() * 600000) + 1, 12);
    this.productTakeOffForm = new FormGroup({
      refno: new FormControl(refno),
      productId: new FormControl(),
      quantity: new FormControl(),
      unitId: new FormControl(),
      unitName: new FormControl(),
      quantityNeeded: new FormControl(),
      currentQuantity: new FormControl(),
      totalQuantity: new FormControl(),
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
    const prod = new ProductByIdPipe().transform(this.products, product);
    this.productTakeOffForm.get('currentQuantity').setValue(prod[0].currentQuantity);
    this.productTakeOffForm.get('unitId').setValue(prod[0].unitId);
    this.backendServices.getUnitById(prod[0].unitId).then(u => {
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
      this.unitsPerPack = e;
      this.quantityCalculation();
    }
  }
  quantityCalculation() {
    if (parseInt(this.productTakeOffForm.get('quantityNeeded').value, 10) > 0 && this.unitsPerPack > 0) {
      // tslint:disable-next-line: max-line-length
      const totalQuantity = parseInt(this.productTakeOffForm.get('quantityNeeded').value, 10) * this.unitsPerPack;
      if (totalQuantity <= parseInt(this.productTakeOffForm.get('currentQuantity').value, 10)) {
        this.productTakeOffForm.get('totalQuantity').setValue(totalQuantity);
      } else {
        swal({
          title: 'ເກິນຈຳນວນເຄື່ອງໃນສາງ , ກະລຸນາກວດສອບໃໝ່',
          // tslint:disable-next-line: max-line-length
          text: 'ເຄື່ອງໃນສາງມີທັງໝົດ ' + parseInt(this.productTakeOffForm.get('currentQuantity').value, 10) + ' ' + this.productTakeOffForm.get('unitName').value,
          icon: 'error'
        });
        this.productTakeOffForm.get('totalQuantity').setValue('');
      }
    }
  }
  padding(num: number, size: number) {
    let s = num + '';
    while (s.length < size) { s = '0' + s; }
    return s;
  }
}
