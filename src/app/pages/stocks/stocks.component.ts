import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { StockHistory } from 'src/app/interfaces/stockHistory';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AddPurchaseComponent } from 'src/app/dialogs/add-purchase/add-purchase.component';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { ProductTakeoffComponent } from 'src/app/dialogs/product-takeoff/product-takeoff.component';

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

  showStockList = false;
  stocksShow: any;

  ngOnInit() {
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
    const dialogRef = this.dialog.open(ProductTakeoffComponent, { width: '800px' });
  }
  loadStock() {
    this.be.getShowStocks().then(rsp => {
      rsp.subscribe(r => {
        this.stocksShow = r;
      });
    });
  }

}
