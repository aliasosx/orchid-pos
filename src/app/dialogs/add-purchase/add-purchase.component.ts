import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { MatDialogRef } from '@angular/material';
import { AngularFireStorage } from 'angularfire2/storage';
import { Purchase } from 'src/app/interfaces/purchase';
import { Vendor } from 'src/app/interfaces/vendor';
import { Product } from 'src/app/interfaces/product';
import { StockHistory } from 'src/app/interfaces/stockHistory';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { StockServicesService } from 'src/app/services/stock-services.service';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
declare var swal: any;

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css']
})
export class AddPurchaseComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private db: AngularFirestore, private DialogRef: MatDialogRef<AddPurchaseComponent>, private storage: AngularFireStorage, private stockService: StockServicesService, private be: BackendServiceService) {
    this.purchasesRef = db.collection<Purchase>('purchases');
    this.vendorsRef = db.collection<Vendor>('vendors');
    this.stockHistoriesRef = db.collection<StockHistory>('stockHistories');
  }
  saveDisabled = false;
  addFormPurchase: FormGroup;
  addFormPurchaseDetail: FormGroup;
  suppliers: any;

  purchasesRef: AngularFirestoreCollection<Purchase>;
  purchasesDoc: AngularFirestoreDocument<Purchase>;
  purchases: Observable<any[]>;

  vendors: Observable<any[]>;
  vendorsRef: AngularFirestoreCollection<Vendor>;
  vendorDoc: AngularFirestoreDocument<Vendor>;


  stockHistoriesRef: AngularFirestoreCollection<StockHistory>;
  stockHistoriesDoc: AngularFirestoreDocument<StockHistory>;
  stockHistories: Observable<any[]>;

  file: File;
  progressBarValue;

  productsForUpdate: Observable<Product[]>;
  productForUpdateCollect: AngularFirestoreCollection<Product>;

  productsNote: Observable<Product[]>;
  productNotesCollect: AngularFirestoreCollection<Product>;
  billPhoto = '../../../assets/icons/blue-10-512.png';
  purchase: any;
  products: any;
  ngOnInit() {
    this.addFormPurchase = new FormGroup({
      billNo: new FormControl(),
      billAmount: new FormControl(0),
      billDate: new FormControl(new Date()),
      billPhoto: new FormControl(this.billPhoto),
      supplierId: new FormControl(),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      approved: new FormControl(0),
      approveBy: new FormControl(),
      approvedDate: new FormControl(),
    });

    this.addFormPurchaseDetail = new FormGroup({
      purchaseId: new FormControl(),
      productId: new FormControl(),
      price: new FormControl(0),
      quantity: new FormControl(0),
      remarks: new FormControl(),
    });

    this.loadSuppliers();
    this.loadProducts();

    this.vendors = this.db.collection('vendors').valueChanges();
    this.products = this.db.collection('products').valueChanges();
  }
  addPurchase() {
    if (this.addFormPurchase.valid) {
      this.saveDisabled = true;
      this.be.createPurchaseBilling(this.addFormPurchase.value).then(async (rsp) => {
        rsp.subscribe(r => {
          this.purchase = r;
          this.addFormPurchaseDetail.get('purchaseId').setValue(r['id']);
        });
      });
    } else {
      swal('something went wrong!', 'Please correct data info before submit', 'error');
      return;
    }

  }
  loadProducts() {
    this.be.getAllProducts().then(c => {
      c.subscribe(cat => {
        this.products = cat;
      });
    });
  }
  loadSuppliers() {
    this.be.getVendor().then(c => {
      c.subscribe(cat => {
        this.suppliers = cat;
      });
    });
  }
  totalCal() {
    // tslint:disable-next-line: max-line-length
    this.addFormPurchase.get('total').setValue(parseInt(this.addFormPurchase.get('quantity').value) * parseInt(this.addFormPurchase.get('price').value));
  }

  uploadBills(event) {
    let selectedFiles: FileList;
    selectedFiles = event;
    if (selectedFiles.item(0)) {
      let file = selectedFiles.item(0);
      let uniqkey = 'pic' + Math.floor(Math.random() * 1000000);
      const uploadTask = this.storage.upload('/bills/' + uniqkey, file);

      uploadTask.percentageChanges().subscribe((value) => {
        this.progressBarValue = value.toFixed(2);
      });
      uploadTask.then((snapshot: firebase.storage.UploadTaskSnapshot) => {
        snapshot.ref.getDownloadURL().then(url => {
          this.addFormPurchase.get('billPhoto').setValue(url); // Image url
        }).catch((err) => {
          alert(err);
        });
      });
    }
  }


  async testQuery() {
    const c = await this.stockService.getLatestQuantityByProductName(this.addFormPurchase.get('productName')).then(resp => {
      console.log(resp);
    });
  }
  updateStock(product, purchase, id) {
    console.log('Stock hist update');
    console.log(product);
    const stockhist = {
      productId: id,
      productName: product.productName,
      beforeQuantity: product.currentQuantity,
      stockChange: parseInt(this.addFormPurchase.get('quantity').value),
      currentQuantity: (parseInt(this.addFormPurchase.get('quantity').value) + parseInt(product.currentQuantity)),
      updateDate: new Date(),
      updateSource: 'Purchase',
      purchaseDetailId: purchase,
      username: localStorage.getItem('username'),
      createdAt: new Date(),
    }
    this.db.collection('stockHistories').add(stockhist).then((resp) => {
      console.log(resp);
      this.updateCurrentStock(product, stockhist.currentQuantity, id);
    }).catch((err) => {
      console.log(err);
    });
  }
  updateCurrentStock(product, CurrentQuantity, id) {
    console.log('Stock product update');
    const _product: Product = product;
    console.log(product);
    _product.currentQuantity = CurrentQuantity;
    this.db.collection('products').doc(id).update(_product).then((resp) => {
      this.DialogRef.close('success');
    });
  }
}
