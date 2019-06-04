import { map } from 'rxjs/operators';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StockServicesService } from 'src/app/services/stock-services.service';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { MatDialog } from '@angular/material';
import { AddProductsComponent } from 'src/app/dialogs/add-products/add-products.component';
import { FirebaseFirestore } from 'angularfire2';
import { PurchaseBuffer } from 'src/app/interfaces/purchaseBuffer';
import { Observable } from 'rxjs';

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

  purchaseBufferRef: AngularFirestoreCollection<PurchaseBuffer>;
  purchaseBuffers: Observable<any>;
  grandTotal = 0;
  items = [];
  ngOnInit() {
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
  takePurchase(product) {
    console.log(product);
    this.db.collection('purchaseBuffers').ref.get().then(docs => {
      if (docs.size > 0) {
        docs.forEach(element => {
          console.log(element.data().product_name + ' - ' + product.product_name);
          if (element.data().product_name === product.product_name) {
            this.updateItemQuantity(element.id, element.data().quantity, element.data().cost);
          } else {
            const purchase_data = {
              billingNo: 10000,
              productId: product.id,
              product_name: product.product_name,
              cost: product.cost,
              quantity: 1,
              total: product.cost,
              purchaseDate: new Date(),
              userId: JSON.parse(localStorage.getItem('usrObj')).id,
            };
            this.db.collection('purchaseBuffers').add(purchase_data).then(rsp => {
            });
          }
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
}
