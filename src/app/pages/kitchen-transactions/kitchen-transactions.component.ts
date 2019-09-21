import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Transaction } from 'src/app/interfaces/transaction';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-kitchen-transactions',
  templateUrl: './kitchen-transactions.component.html',
  styleUrls: ['./kitchen-transactions.component.css']
})
export class KitchenTransactionsComponent implements OnInit {

  constructor(private be: BackendServiceService) {

  }

  currentDate = new Date();
  initDate: Date;
  foodsTransactions: any;
  grandTotal = 0;
  startDate: Date;
  foodList: any[] = [];
  viewReport = 'hidden';
  totalDiscs = 0;
  dateFrom: FormGroup;
  reportBySubfoods: any;
  reportBySubFoodDetails: any;

  ngOnInit() {
    this.viewReport = 'hidden';
    this.loadReport();
    this.dateFrom = new FormGroup({
      initDate: new FormControl(new Date()),
    });
  }
  async loadReport() {
    this.startDate = this.dateFrom.get('initDate').value;
    this.be.reportsKitchenAdmin(this.dateFrom.get('initDate').value, this.dateFrom.get('initDate').value, 'Food').then(rsp => {
      this.foodList = [];
      let _total = 0;
      let _count = 0;
      rsp.subscribe(r => {
        this.foodsTransactions = r['reports'];
        this.foodList.push(r['reports']);
        this.reportBySubfoods = r['report_BySubfood'];
        this.foodList.forEach(f => {
          f.forEach(element => {
            _total += parseInt(element.total_cost, 10);
            _count += parseInt(element.quantity, 10);
          });
        });
        this.grandTotal = _total;
        this.totalDiscs = _count;
        if (_total > 0) {
          this.viewReport = '';
        } else {
          this.viewReport = 'hidden';
        }
      });
    });
  }
  async loadReportBySubFood(subfoodId) {
    // tslint:disable-next-line: max-line-length
    this.be.reportsKitchenBySubfoodId(this.dateFrom.get('initDate').value, this.dateFrom.get('initDate').value, 'Food', subfoodId).then(r => {
      r.subscribe(reportBySubFoodDetails => this.reportBySubFoodDetails = reportBySubFoodDetails);
    });
  }
  async dateEvent(e) {
    if (e) {
      this.initDate = e.target.value;
      this.startDate = this.initDate;
      this.startDate.setDate(this.initDate.getDate() + 1);
      let c = await this.loadReport();
    }
  }
}
