import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { StockHistory } from 'src/app/interfaces/stockHistory';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { AddPurchaseComponent } from 'src/app/dialogs/add-purchase/add-purchase.component';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { ProductTakeoffComponent } from 'src/app/dialogs/product-takeoff/product-takeoff.component';
import { FormGroup, FormControl } from '@angular/forms';
import { GroupBy } from 'src/app/interfaces/groupBy';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // tslint:disable-next-line: max-line-length
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
  displayedColumns: string[] = ['no', 'product_name', 'quantity', 'unit', 'cost', 'total_cost'];
  drinkCat: any;
  stockReports: any;
  totalCost = [];

  ngOnInit() {
    this.reportForm = new FormGroup({
      startDate: new FormControl(new Date()),
      endDate: new FormControl(new Date()),
      dcId: new FormControl(),
    });

    this.loadStock();
    this.loadDrinkCate();
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
  getTotalCost() {
    let total = [];
    if (this.totalCost) {
      // console.log(Object.entries(this.stockReports).map(t => t.total_cost).reduce((acc, value) => acc + value, 0));
      return this.totalCost.map(t => t.total_cost).reduce((acc, value) => acc + value, 0);
    }
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
        this.stocksShow = r['stocks'];
        this.stockTaskOffList = r['stockTakeOff'];
      });
    });
  }
  async loadReport() {
    this.totalCost = [];
    if (this.reportForm.valid) {
      this.be.getReportStockByFoodCat(this.reportForm.value).then(rsp => {
        rsp.subscribe(reports => {
          this.reports = new MatTableDataSource(reports['takeOffReport']);
          this.reports.paginator = this.paginator;
          Object.entries(reports['takeOffReport']).forEach(element => {
            this.totalCost.push(element[1]);
          });
        });
      });
    }
  }
  async loadDrinkCate() {
    this.be.getDrinkCategories().then(rsp => {
      rsp.subscribe(drinkCat => this.drinkCat = drinkCat);
    });
  }
}
