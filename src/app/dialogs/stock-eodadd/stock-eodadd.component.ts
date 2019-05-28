import { Component, OnInit, Inject } from '@angular/core';
import { StockServicesService } from 'src/app/services/stock-services.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';

@Component({
  selector: 'app-stock-eodadd',
  templateUrl: './stock-eodadd.component.html',
  styleUrls: ['./stock-eodadd.component.css']
})
export class StockEODAddComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private _stockService: StockServicesService, private backendService: BackendServiceService, private dialogRef: MatDialogRef<StockEODAddComponent>, @Inject(MAT_DIALOG_DATA) public data) { }
  stockEodForm: FormGroup;
  products: any;
  product: any;
  stockText = '';
  initTxtReadOnly = false;
  stockEODDetail: any;

  async ngOnInit() {
    this.stockEodForm = new FormGroup({
      id: new FormControl(),
      cashloadId: new FormControl(this.data.cashId),
      productId: new FormControl(),
      initQuantity: new FormControl(0),
      eodQuantity: new FormControl(0),
      stockQuantity: new FormControl(0),
      stockQuantityEod: new FormControl(0),
      quantityPerPack: new FormControl(0),
      status: new FormControl(),
      note: new FormControl(),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
    });
    if (this.data.start === true) {
      this.initTxtReadOnly = true;
    } else {
      this.initTxtReadOnly = false;
    }
    await this.loadInitData();

  }
  async  loadInitData() {
    this.backendService.getProducts().then(rsp => {
      rsp.subscribe(products => this.products = products);
      this.loadStockEODDisplay();
    });
  }
  async loadProductById(id) {
    this.backendService.getProductById(id).then(rsp => {
      rsp.subscribe(product => {
        if (this.data.start === true) {
          this.stockEodForm.get('stockQuantity').setValue(product['currentQuantity']);
        } else {
          this.stockEodForm.get('stockQuantityEod').setValue(product['currentQuantity']);
        }
        // tslint:disable-next-line: max-line-length
        this.stockText = Math.floor(parseInt(product['currentQuantity'], 10) / parseInt(product['quantityPerPack'], 10)) + ' ແກັດ , ' + Math.floor(parseInt(product['currentQuantity'], 10) % parseInt(product['quantityPerPack'], 10)) + ' ໜ່ວຍ = ' + parseInt(product['currentQuantity'], 10) + ' ໜ່ວຍ';
        this.stockEodForm.get('quantityPerPack').setValue(product['quantityPerPack']);
        this.product = product;
      });
    });
  }
  selectedProduct(id) {
    this.loadProductById(id);
  }
  createStocEOD() {
    this._stockService.createStockEod(this.stockEodForm.value).then(rsp => {
      rsp.subscribe(r => {
        this.loadInitData();
      });
    });
  }
  async loadStockEODDisplay() {
    this._stockService.getStockEODByCashId(this.data.cashId).then(rsp => {
      rsp.subscribe(r => {
        this.stockEODDetail = r;
      });
    });
  }
  removeCashLoad(id) {
    this._stockService.deleteStockEod(id).then(rsp => {
      rsp.subscribe(r => {
        this.loadInitData();
      });
    });
  }
  updateStockEOD() {
    this._stockService.updateStockEod(this.stockEodForm.get('id').value, this.stockEodForm.value).then(rsp => {
      rsp.subscribe(r => {
        this.loadInitData();
      });
    });
  }
  closeDialog() {
    this.dialogRef.close('success');
  }
}
