import { map } from 'rxjs/operators';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StockServicesService } from 'src/app/services/stock-services.service';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { MatDialog } from '@angular/material';
import { AddProductsComponent } from 'src/app/dialogs/add-products/add-products.component';
import { PurchaseBuffer } from 'src/app/interfaces/purchaseBuffer';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

declare var swal: any;

@Component({
  selector: 'app-purchase-grid',
  templateUrl: './purchase-grid.component.html',
  styleUrls: ['./purchase-grid.component.css']
})
export class PurchaseGridComponent implements OnInit {
  @ViewChild('barcodeTxtSearch')
  barcodeTxt: any;
  // tslint:disable-next-line: max-line-length
  constructor(private stockService: StockServicesService, private backendService: BackendServiceService, private dialog: MatDialog, private db: AngularFirestore, private datePipe: DatePipe) {
    this.purchaseBufferRef = db.collection<PurchaseBuffer>('purchaseBuffers');
  }
  searchForm: FormGroup;
  productCategories: any;
  products: any;
  selectedCate: any;
  productName: any;
  purchaseBufferRef: AngularFirestoreCollection<PurchaseBuffer>;
  purchaseBuffers: Observable<any>;
  grandTotal = 0;
  items = [];
  itemList = 0;
  purchaseForm: FormGroup;
  currencies: any;
  barcode: any;

  ngOnInit() {
    this.purchaseForm = new FormGroup({
      purchaseDate: new FormControl(this.datePipe.transform(new Date(), 'yyyy-MM-dd')),
      src_amount: new FormControl(),
      src_currency: new FormControl(),
      dest_amount: new FormControl(),
      rate_conversion: new FormControl(),
    });
    this.loadProductCategories();
    this.loadProducts();
    this.loadCurrencies();
    this.purchaseBuffers = this.purchaseBufferRef.snapshotChanges().pipe(map(change => {
      this.grandTotal = 0;
      return change.map(a => {
        const purchases = a.payload.doc.data() as PurchaseBuffer;
        purchases['id'] = a.payload.doc.id;
        this.grandTotal += a.payload.doc.data().total;
        return purchases;
      });
    }));
    this.barcodeTxt.nativeElement.focus();
  }
  async loadProductCategories() {
    this.stockService.getProductCategories().then(rsp => {
      rsp.subscribe(productCategories => this.productCategories = productCategories);
    });
  }
  async loadProducts() {
    this.backendService.getProducts().then(rsp => {
      rsp.subscribe(products => this.products = products);
    });
  }
  openAddNewProd() {
    const dialogRef = this.dialog.open(AddProductsComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(r => {
      this.loadProductCategories();
      this.loadProducts();
    });
  }
  async takePurchase(product) {
    // console.log(product);
    const cart = this.db.collection<PurchaseBuffer>('purchaseBuffers');
    cart.ref.where('productId', '==', product.id).get().then(r => {
      // console.log(r.docs.length);
      if (r.docs.length > 0) {
        this.itemList = r.docs.length;
        r.forEach(e => {
          // console.log(e.data());
          swal({
            text: 'ສິນຄ້ານີ້ ມີໃນ ລາຍການແລ້ວ ກະລຸນາເລື່ອກ ອັນໃໝ່',
            icon: 'error',
            timer: 3000
          });
        });
      } else if (this.purchaseForm.valid) {
        const purchase_data = {
          billingNo: this.padding(Math.floor(Math.random() * 60000000000) + 1, 12),
          productId: product.id,
          product_name: product.product_name,
          src_amount: product.cost,
          src_currency: 2,
          dest_amount: 0,
          rate_conversion: 1,
          cost: product.cost,
          quantity: 1,
          total: product.cost,
          purchaseDate: new Date(this.purchaseForm.get('purchaseDate').value),
          billDate: new Date(this.purchaseForm.get('purchaseDate').value),
          userId: JSON.parse(localStorage.getItem('usrObj')).id,
        };
        this.db.collection('purchaseBuffers').add(purchase_data).then(rsp => {
          this.purchaseForm.get('src_currency').value(purchase_data.src_currency);
        });
      } else {
        swal({
          title: 'ເລືອກວັນທີ່ຊື້ກ່ອນ',
          icon: 'error',
          timer: 2000
        });
      }
    });
  }
  removeItem(id) {
    this.db.collection('purchaseBuffers').doc(id).delete();
  }
  updateItemQuantity(id, quantity, cost) {
    console.log(this.purchaseForm.get('dest_amount').value);
    const data = {
      quantity: quantity,
      total: quantity * parseInt(this.purchaseForm.get('dest_amount').value, 10),
    };
    this.db.collection('purchaseBuffers').doc(id).update(data);
  }
  updateItemCost(id, quantity, cost, src_amount?, src_currency?) {
    const data = {
      src_amount: src_amount,
      src_currency: src_currency,
      cost: cost,
      quantity: quantity,
      total: quantity * parseInt(this.purchaseForm.get('dest_amount').value, 10),
    };
    this.db.collection('purchaseBuffers').doc(id).update(data);
  }
  caculateGrandTotal(total) {
    console.log(total);
  }
  savePurchase() {
    swal({
      title: 'ທ່ານແນ່ໃຈບໍ່ວ່າ ຈະບັນທຶກ',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((res) => {
      if (res) {
        const items = [];
        this.db.collection<PurchaseBuffer>('purchaseBuffers').ref.get().then(async (rsp) => {

          if (rsp.size > 0) {
            rsp.forEach(e => {
              const product = {
                id: e.data().productId,
                cost: e.data().cost,
                quantity: e.data().quantity,
                billDate: e.data().billDate,
                userId: JSON.parse(localStorage.getItem('usrObj')).id,
              };
              this.backendService.updateProductOnly(product).then(p_rsp => {
                p_rsp.subscribe(r => {
                });
              });
            });
            this.createPurchase(rsp);
          } else {
            swal('No Data', 'Data is not engough', 'error');
            return;
          }
          // console.log(items);
        });
      } else {
        return;
      }
    });
  }
  async createPurchase(buffer) {
    if (buffer) {
      const purchase = {
        amount: this.grandTotal,
        billDate: new Date(this.purchaseForm.get('purchaseDate').value),
        userId: JSON.parse(localStorage.getItem('usrObj')).id,
      };
      this.backendService.createPurchase(purchase).then(purchase_rsp => {
        purchase_rsp.subscribe(pch_rsp => {
          // console.log(pch_rsp);
          buffer.forEach(e => {
            const purchaseDetail = {
              purchaseId: pch_rsp['id'],
              productId: e.data().productId,
              price: e.data().cost,
              billQuantity: e.data().quantity,
              quantity: e.data().quantity,
              vendorId: 1,
              total: parseInt(e.data().cost, 10) * parseInt(e.data().quantity, 10),
            };
            this.backendService.createPurchaseDetail(purchaseDetail).then(purDetail => {
              purDetail.subscribe(r => {
                if (r['status'] === 'success') {
                  this.db.collection('purchaseBuffers').doc(e.id).delete();
                }
              });
            });
          });
          swal('Purchase done', 'Purchase done...', 'success');
          this.loadProducts();
        });
      });
    }
  }
  async loadCurrencies() {
    this.backendService.getCurrencies().then(r => {
      r.subscribe(currencies => this.currencies = currencies);
    });
  }
  async CurrnecySelected(src_amount, id, quantity) {
    // console.log(e);
    const e = this.purchaseForm.get('src_currency').value;
    console.log(e);
    if (e) {
      this.backendService.getCurrency(e).then(r => {
        r.subscribe(async (conversion_rate) => {
          // console.log(conversion_rate);
          const data = {
            rate_conversion: conversion_rate[0].rate,
            dest_amount: src_amount * conversion_rate[0].rate,
            cost: (src_amount * conversion_rate[0].rate),
            total: (src_amount * conversion_rate[0].rate) * quantity,
          };
          this.db.collection('purchaseBuffers').doc(id).update(data);
        });
      });
    } else {
      this.purchaseForm.get('rate_conversion').setValue(1);
    }
  }
  padding(num: number, size: number) {
    let s = num + '';
    while (s.length < size) { s = '0' + s; }
    return s;
  }
  onBarcodeRead() {
    // console.log(this.barcode);
    if (this.barcode.length > 10) {
      this.backendService.getProductByBarcode(this.barcode).then(r => {
        r.subscribe(product => {
          if (product[0]) {
            this.takePurchase(product[0]);
          }
        });
      });
    }
  }
}
