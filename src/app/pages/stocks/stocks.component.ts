import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { StockHistory } from 'src/app/interfaces/stockHistory';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AddPurchaseComponent } from 'src/app/dialogs/add-purchase/add-purchase.component';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { ProductTakeoffComponent } from 'src/app/dialogs/product-takeoff/product-takeoff.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  constructor(private db: AngularFirestore, private dialog: MatDialog, private be: BackendServiceService) {
    this.stocksRef = db.collection<StockHistory>('stockHistories', ref => {
      return ref.orderBy('updateDate', 'desc');
    });
  }
  searchProduct: any;
  stocksRef: AngularFirestoreCollection<StockHistory>;
  stocks: Observable<any[]>;
  stockTaskOffList: any;
  showStockList = true;
  stocksShow: any;
  reports: any;
  reportForm: FormGroup;

  ngOnInit() {

    this.reportForm = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
    });

    this.loadStock();
    this.stocks = this.stocksRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as StockHistory;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
  }
  openPurchaseProduct() {
    const dialogRef = this.dialog.open(AddPurchaseComponent, { width: '1000px' });
  }

  openProductTakeOff() {
    const dialogRef = this.dialog.open(ProductTakeoffComponent, { width: '700px' });
    dialogRef.afterClosed().subscribe(rsp => {
      if (rsp === 'success') {
        this.loadStock();
      } else {
        return;
      }
    });
  }
  loadStock() {
    this.be.getShowStocks().then(rsp => {
      rsp.subscribe(r => {
        // console.log(r);
        this.stocksShow = r['stocks'];
        this.stockTaskOffList = r['stockTakeOff'];
      });
    });
  }
  async loadReport() {
    if (this.reportForm.valid) {
      this.be.getReportStockByFoodCat(this.reportForm.value).then(rsp => {
        rsp.subscribe(reports => {
          this.reports = reports;
          console.log(reports);
        });
      });
    }
  }
}
