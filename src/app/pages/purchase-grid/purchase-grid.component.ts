import { map } from 'rxjs/operators';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StockServicesService } from 'src/app/services/stock-services.service';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { MatDialog } from '@angular/material';
import { AddProductsComponent } from 'src/app/dialogs/add-products/add-products.component';
import { PurchaseBuffer } from 'src/app/interfaces/purchaseBuffer';
import { Observable } from 'rxjs';

declare var swal: any;



@Component({
  selector: 'app-purchase-grid',
  templateUrl: './purchase-grid.component.html',
  styleUrls: ['./purchase-grid.component.css']
})
export class PurchaseGridComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private stockService: StockServicesService, private backendService: BackendServiceService, private dialog: MatDialog, private db: AngularFirestore) {
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

  ngOnInit() {

    this.purchaseForm = new FormGroup({
      purchaseDate: new FormControl(),
    });

    this.loadProductCategories();
    this.loadProducts();
    this.purchaseBuffers = this.purchaseBufferRef.snapshotChanges().pipe(map(change => {
      this.grandTotal = 0;
      return change.map(a => {
        const purchases = a.payload.doc.data() as PurchaseBuffer;
        purchases['id'] = a.payload.doc.id;
        this.grandTotal += a.payload.doc.data().total;
        return purchases;
      });
    }));
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
            timer: 2000
          });
        });
      } else if (this.purchaseForm.valid) {
        const purchase_data = {
          billingNo: 10000,
          productId: product.id,
          product_name: product.product_name,
          cost: product.cost,
          quantity: 1,
          total: product.cost,
          purchaseDate: new Date(this.purchaseForm.get('purchaseDate').value),
          billDate: new Date(this.purchaseForm.get('purchaseDate').value),
          userId: JSON.parse(localStorage.getItem('usrObj')).id,
        };
        this.db.collection('purchaseBuffers').add(purchase_data).then(rsp => {
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
    const data = {
      quantity: quantity,
      total: quantity * cost
    };
    this.db.collection('purchaseBuffers').doc(id).update(data);
  }
  updateItemCost(id, quantity, cost) {
    const data = {
      cost: cost,
      quantity: quantity,
      total: quantity * cost
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
}
