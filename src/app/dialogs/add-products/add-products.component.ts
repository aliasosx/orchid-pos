import { BackendServiceService } from './../../services/common/backend-service.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Vendor } from 'src/app/interfaces/vendor';
import { ProductType } from 'src/app/interfaces/productType';
import { Product } from 'src/app/interfaces/product';
import { Unit } from 'src/app/interfaces/unit';
import { Food } from 'src/app/interfaces/food';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import * as uuid from 'uuid';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private dialog: MatDialog, private db: AngularFirestore, private be: BackendServiceService, private DialogRef: MatDialogRef<AddProductsComponent>) {
    this.vendorsRef = this.db.collection<Vendor>('vendors');
    this.productTypesRef = this.db.collection<ProductType>('productTypes');
    this.productsRef = this.db.collection<Product>('products');
  }
  showAlert = 'hidden';
  addProductForm: FormGroup;
  vendor: Vendor;
  vendorsRef: AngularFirestoreCollection<Vendor>;
  vendorDoc: AngularFirestoreDocument<Vendor>;
  vendors: Observable<any[]>;

  productTypesRef: AngularFirestoreCollection<ProductType>;
  productTypeDoc: AngularFirestoreDocument<ProductType>;
  productType: ProductType;
  productTypes: Observable<any[]>;

  product: Product;
  productsRef: AngularFirestoreCollection<Product>;
  productDoc: AngularFirestoreDocument<Product>;


  foods: any;
  productCategories: any;
  suppliers: any;
  units: any;
  currencies: any;

  ngOnInit() {
    let uid = uuid.v4();
    const refno = this.padding(Math.floor(Math.random() * 6000) + 1, 12);
    this.addProductForm = new FormGroup({
      uuids: new FormControl(uid),
      barcode: new FormControl(refno),
      product_code: new FormControl(),
      product_name: new FormControl(),
      cost: new FormControl(0),
      minimum: new FormControl(0),
      currentQuantity: new FormControl(0),
      categoryId: new FormControl(),
      currencyId: new FormControl(),
      supplierId: new FormControl(),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      foodId: new FormControl(),
      expireDate: new FormControl(),
      createdAt: new FormControl(new Date()),
      updatedAt: new FormControl(new Date()),
      unitId: new FormControl(),
    });
    this.vendors = this.db.collection('vendors').valueChanges();
    this.productTypes = this.db.collection('productTypes').valueChanges();


    // this.addProductForm.get('userId').setValue('administrator');

    this.loadFoods();
    this.loadProductTypes();
    this.loadUnits();
    this.loadSuppliers();
    this.loadCurrencies();
  }
  addProduct() {
    if (this.addProductForm.valid) {

      this.be.createProduct(this.addProductForm.value).then(rsp => {
        rsp.subscribe(r => {
          if (r['status'] === 'success') {
            this.DialogRef.close('success');
          } else {
            return;
          }
        });
      });

    }
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


  padding(num: number, size: number) {
    let s = num + '';
    while (s.length < size) { s = '0' + s; }
    return s;
  }
}
