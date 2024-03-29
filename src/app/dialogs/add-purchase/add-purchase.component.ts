import { ApprovedUsersComponent } from './../approved-users/approved-users.component';
import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
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
  constructor(private db: AngularFirestore, private DialogRef: MatDialogRef<AddPurchaseComponent>, private storage: AngularFireStorage, private stockService: StockServicesService, private be: BackendServiceService, private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data, private dialog: MatDialog) {
    this.purchasesRef = db.collection<Purchase>('purchases');
    this.vendorsRef = db.collection<Vendor>('vendors');
    this.stockHistoriesRef = db.collection<StockHistory>('stockHistories');
  }

  showProductlist = false;
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

  productList: any;
  productName = '';
  totalAmount = 0;
  units: any;
  unitQuantity = 0;
  billTotalAmount = 0;

  ngOnInit() {
    if (this.data) {
      this.showProductlist = true;
      this.addFormPurchase = new FormGroup({
        id: new FormControl(),
        approveNameBy: new FormControl(),
        billRefno: new FormControl(),
        billNo: new FormControl(),
        billAmount: new FormControl(0),
        billDate: new FormControl(new Date()),
        billPhoto: new FormControl(this.billPhoto),
        vendorId: new FormControl(),
        userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
        approved: new FormControl(0),
        approveBy: new FormControl(),
        approvedDate: new FormControl(),
        createdAt: new FormControl(),
        updatedAt: new FormControl(),
      });

      this.addFormPurchaseDetail = new FormGroup({
        purchaseId: new FormControl(),
        productId: new FormControl(),
        price: new FormControl(0),
        billQuantity: new FormControl(0),
        quantity: new FormControl(0),
        total: new FormControl(0),
        unitId: new FormControl(),
        pricePerUnit: new FormControl(0),
        remarks: new FormControl(),
        userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      });

      this.saveDisabled = true;
      this.addFormPurchaseDetail.get('purchaseId').setValue(this.data.pid);
      this.loadPurchaseData(this.data.pid);
    } else {
      this.addFormPurchase = new FormGroup({
        billNo: new FormControl(),
        billAmount: new FormControl(0),
        billDate: new FormControl(new Date()),
        billPhoto: new FormControl(this.billPhoto),
        vendorId: new FormControl(),
        userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
        approved: new FormControl(0),
        approveBy: new FormControl(),
        approvedDate: new FormControl(),
      });

      this.addFormPurchaseDetail = new FormGroup({
        purchaseId: new FormControl(),
        productId: new FormControl(),
        price: new FormControl(0),
        billQuantity: new FormControl(0),
        quantity: new FormControl(0),
        total: new FormControl(0),
        unitId: new FormControl(),
        pricePerUnit: new FormControl(0),
        remarks: new FormControl(),
        userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      });
    }
    this.loadSuppliers();
    this.loadProducts();
    this.loadUnits();
    this.loadTotalBilling(this.addFormPurchaseDetail.get('purchaseId').value);
  }

  loadPurchaseData(id) {
    this.be.getPurchaseById(id).then(rsp => {
      rsp.subscribe(r => {
        this.addFormPurchase.setValue(r);
        this.loadPurchaseDetails(id);
      });
    });
  }

  async addPurchase() {
    if (this.addFormPurchase.valid) {
      // console.log(this.addFormPurchase.value);
      this.saveDisabled = true;
      this.be.createPurchaseBilling(this.addFormPurchase.value).then(async (rsp) => {
        rsp.subscribe(async (r) => {
          this.purchase = r;
          let c = await this.addFormPurchaseDetail.get('purchaseId').setValue(r['id']);
          let d = await this.loadPurchaseDetails(r['id']);
          this.loadTotalBilling(r['id']);
          this.snackbar.open('Billing has been submited by id: ' + r['billNo']);
        });
      });
    } else {
      swal('something went wrong!', 'Please correct data info before submit', 'error', { timer: 1000 });
      return;
    }
  }
  deletePurchaseDetail(purchaseDetailId) {
    if (purchaseDetailId.pid) {
      this.be.deletePurchaseDetail(purchaseDetailId.pid).then(rsp => {
        rsp.subscribe(r => {
          this.loadPurchaseDetails(this.addFormPurchaseDetail.get('purchaseId').value);
          this.loadTotalBilling(this.addFormPurchaseDetail.get('purchaseId').value);
          this.snackbar.open('billing has been deleted id ' + purchaseDetailId.pid, 'OK', { duration: 1000 });
        });
      });
    }
  }

  async loadPurchaseDetails(id) {
    let c = await this.be.getPurchaseDetailById(id).then(rsp => {
      rsp.subscribe(r => {
        // console.log(r);
        this.productList = r;
      });
    });
  }

  getUnitsDetail(event) {
    this.be.getUnitById(event.target.value).then(unitQ => {
      // this.unitQuantity = this.addFormPurchaseDetail.get('quantity').value / unitQ['quantityPerUnit'];
      unitQ.subscribe(u => {
        // tslint:disable-next-line: max-line-length
        this.addFormPurchaseDetail.get('pricePerUnit').setValue(Math.round(this.addFormPurchaseDetail.get('price').value / (u['quantityPerUnit'] * this.addFormPurchaseDetail.get('billQuantity').value)));
        this.addFormPurchaseDetail.get('quantity').setValue(this.addFormPurchaseDetail.get('billQuantity').value * u['quantityPerUnit']);
        this.totalCalculate();
      });
    });
  }

  productSelectText(event) {
    this.productName = event.target.options[event.target.options.selectedIndex].text;
  }
  loadUnits() {
    this.be.getUnit().then(c => {
      c.subscribe(cat => {
        this.units = cat;
      });
    });
  }
  totalCalculate() {
    // tslint:disable-next-line: max-line-length
    this.totalAmount = parseInt(this.addFormPurchaseDetail.get('pricePerUnit').value) * parseInt(this.addFormPurchaseDetail.get('quantity').value);
    this.addFormPurchaseDetail.get('total').setValue(this.totalAmount);
  }

  addProductTolist() {
    if (this.addFormPurchaseDetail.valid) {
      this.checkOverBill(this.addFormPurchaseDetail.get('purchaseId').value);
      this.showProductlist = true;
    } else {
      this.snackbar.open('Form incorrect please fill all Field required', 'OK', { duration: 1000 });
    }
  }

  loadProducts() {
    this.be.getProducts().then(c => {
      c.subscribe(cat => {
        this.products = cat;
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

  closePurchase() {
    this.DialogRef.close('success');
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

  updateStock(product, purchase, id) {
    // console.log('Stock hist update');
    // console.log(product);
    const stockhist = {
      productId: id,
      productName: product.productName,
      beforeQuantity: product.currentQuantity,
      stockChange: parseInt(this.addFormPurchase.get('quantity').value, 10),
      currentQuantity: (parseInt(this.addFormPurchase.get('quantity').value, 10) + parseInt(product.currentQuantity, 10)),
      updateDate: new Date(),
      updateSource: 'Purchase',
      purchaseDetailId: purchase,
      username: localStorage.getItem('username'),
      createdAt: new Date(),
    };
    this.db.collection('stockHistories').add(stockhist).then((resp) => {
      // console.log(resp);
      this.updateCurrentStock(product, stockhist.currentQuantity, id);
    }).catch((err) => {
      // console.log(err);
    });
  }
  updateCurrentStock(product, CurrentQuantity, id) {
    // console.log('Stock product update');
    const _product: Product = product;
    // console.log(product);
    _product.currentQuantity = CurrentQuantity;
    this.db.collection('products').doc(id).update(_product).then((resp) => {
      this.DialogRef.close('success');
    });
  }

  loadTotalBilling(id) {
    this.be.checkOverBill(id).then(rsp => {
      this.be.checkOverBill(id).then(rsp => {
        rsp.subscribe(r => {
          this.billTotalAmount = r[0].BillTotal;
        });
      });
    });
  }
  async checkOverBill(id) {
    this.be.checkOverBill(id).then(rsp => {
      rsp.subscribe(r => {
        this.billTotalAmount = parseInt(r[0].BillTotal, 10);
        if (r[0].BillTotal) {
          // tslint:disable-next-line: max-line-length
          if (parseInt(this.addFormPurchaseDetail.get('total').value, 10) + parseInt(r[0].BillTotal, 10) < parseInt(this.addFormPurchase.get('billAmount').value, 10)) {
            this.be.createPurchaseDetail(this.addFormPurchaseDetail.value).then(rspx => {
              rspx.subscribe(rs => {
                this.loadPurchaseDetails(rs['purchaseId']);
                this.loadTotalBilling(id);
                this.snackbar.open('Billing detail added', 'OK', { duration: 1000 });
                // swal('ທ່ານບໍ່ສາມາດເພີ່ມ ລາຍການ ເກິນຈຳນວນໃນໃບບິນໄດ້', 'You cannot add over Bill amount', 'error', { timer: 2000 });
              });
            });
            // tslint:disable-next-line: max-line-length
          } else if (parseInt(this.addFormPurchaseDetail.get('total').value + r[0].BillTotal, 10) > parseInt(this.addFormPurchase.get('billAmount').value, 10)) {


            // console.log(parseInt(this.addFormPurchaseDetail.get('total').value, 10) + parseInt(r[0].BillTotal, 10));
            // console.log(this.addFormPurchase.get('billAmount').value);


            swal('ທ່ານບໍ່ສາມາດເພີ່ມ ລາຍການ ເກິນຈຳນວນໃນໃບບິນໄດ້', 'You cannot add over Bill amount', 'error', { timer: 4000 });
            return;
          }
        } else {
          this.be.createPurchaseDetail(this.addFormPurchaseDetail.value).then(rspx => {
            rspx.subscribe(rs => {
              this.loadPurchaseDetails(rs['purchaseId']);
              this.snackbar.open('Billing detail added', 'OK', { duration: 1000 });
            });
          });
        }
      });
    });
  }
}
