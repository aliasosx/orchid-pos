import { BackendServiceService } from './../../services/common/backend-service.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore, } from 'angularfire2/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import * as uuid from 'uuid';
import { StockServicesService } from 'src/app/services/stock-services.service';
@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private dialog: MatDialog, private db: AngularFirestore, private stockService: StockServicesService, private be: BackendServiceService, private DialogRef: MatDialogRef<ViewProductsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  addProductForm: FormGroup;
  foods: any;
  productCategories: any;
  productCategoriesP: any;
  units: any;
  suppliers: any;
  currencies: any;
  btnDisable = false;
  btnMsg = 'ບັນທຶກ';

  ngOnInit() {
    let uid = uuid.v4();
    this.addProductForm = new FormGroup({
      id: new FormControl(),
      barcode: new FormControl(),
      product_code: new FormControl(),
      product_name: new FormControl(),
      product_description: new FormControl(),
      price: new FormControl(),
      quantity: new FormControl(),
      photo: new FormControl(),
      cost: new FormControl(0),
      minimum: new FormControl(0),
      currentQuantity: new FormControl(0),
      categoryId: new FormControl(),
      currencyId: new FormControl(),
      supplierId: new FormControl(),
      quantityPerPack: new FormControl(),
      package: new FormControl(),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      foodId: new FormControl(),
      productCategoryId: new FormControl(),
      expireDate: new FormControl(),
      createdAt: new FormControl(new Date()),
      updatedAt: new FormControl(new Date()),
      unitId: new FormControl(),
      initQuantity: new FormControl(),
    });

    // this.addProductForm.setValue(this.data);

    this.loadProductTypes();
    this.loadUnits();
    this.loadSuppliers();
    this.loadCurrencies();
    this.loadFoods();
    this.loadProductCategoriesP();
    if (this.data) {
      this.loadproductById(this.data.pid);
    }
  }
  updateProduct() {
    if (this.addProductForm.valid) {
      this.btnDisable = true;
      this.btnMsg = 'Saving ...';
      this.be.updateProduct(this.addProductForm.value).then(rsp => {
        rsp.subscribe(r => {
          if (r['status'] === 'success') {
            this.DialogRef.close('success');
          } else {
            this.btnDisable = false;
            return;
          }
        });
      });
    }
  }
  loadProductCategoriesP() {
    this.stockService.getProductCategories().then(rsp => {
      rsp.subscribe(productCategoriesP => {
        this.productCategoriesP = productCategoriesP;
      });
    });
  }
  loadproductById(id) {
    this.be.getProductById(id).then(p => {
      p.subscribe(product => {
        this.addProductForm.setValue(product);
      });
    });
  }

  loadFoods() {
    this.be.getFoods().then(f => {
      f.subscribe(foods => {
        this.foods = foods;
      });
    });
  }
  loadProductTypes() {
    this.be.getProductCategories().then(c => {
      c.subscribe(cat => {
        this.productCategories = cat;
      });
    });
  }
  loadUnits() {
    this.be.getUnit().then(c => {
      c.subscribe(cat => {
        this.units = cat;
      });
    });
  }
  loadSuppliers() {
    this.be.getSuppliers().then(c => {
      c.subscribe(cat => {
        this.suppliers = cat;
      });
    });
  }
  loadCurrencies() {
    this.be.getCurrencies().then(c => {
      c.subscribe(cat => {
        this.currencies = cat;
      });
    });
  }
}
