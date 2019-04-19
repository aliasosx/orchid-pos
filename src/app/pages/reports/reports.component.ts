import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Transaction } from './../../interfaces/transaction';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/interfaces/user';
import { Kitchen } from 'src/app/interfaces/kitchen';
import { FoodCategory } from 'src/app/interfaces/foodCategory';
import { Food } from 'src/app/interfaces/food';
import { PaymentType } from 'src/app/interfaces/paymentType';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private snackbar: MatSnackBar,
    private datePipe: DatePipe,
    private db: AngularFirestore,
    private dialog: MatDialog,
    private snackbarRef: MatSnackBar,
    private _firebaseAuth: AngularFireAuth,
    private router: Router,
    private be: BackendServiceService
  ) {

    if (localStorage.getItem('token')) {
      this.username_info = JSON.parse(localStorage.getItem('usrObj'));
      return;
    } else {
      router.navigateByUrl('login');
    }


  }
  private user: Observable<firebase.User>;
  username_info: any;

  transactionsRef: AngularFirestoreCollection<Transaction>;
  transactions: Observable<any[]>;
  events: string[] = [];


  usersRef: AngularFirestoreCollection<User>;
  users: Observable<any[]>;

  fromDate: Date;
  toDateEnd: Date;

  grandtotalAmount = 0;
  grandtotalCount = 0;

  userTransactions: any[] = [];
  userCountTranx = 0;
  userAmountTranx = 0;

  kitchenRef: AngularFirestoreCollection<Kitchen>;
  kitchenTransactions: any[] = [];
  kitchenCostTranx = 0;
  kitchenCountTranx = 0;
  kitchenAmountTranx = 0;
  kitchens: Observable<any[]>;

  foodCategoriesRef: AngularFirestoreCollection<FoodCategory>;
  foodCategories: Observable<any[]>;
  foodCategoriesTransactions: any[] = [];
  foodCategoriesCountTranx = 0;
  foodCategoriesAmountTranx = 0;
  foodCategoriesCostTranx = 0;

  foodsRef: AngularFirestoreCollection<Food>;
  foods: Observable<any[]>;
  foodsTransactions: any[] = [];
  foodsCountTranx = 0;
  foodsAmountTranx = 0;
  foodsCostTranx = 0;

  paymentsRef: AngularFirestoreCollection<PaymentType>;
  payments: Observable<any[]>;
  paymentsTransactions: any[] = [];
  paymentsCountTranx = 0;
  paymentsAmountTranx = 0;
  totalCost = 0;
  netProfit = 0;
  viewReport = 'hidden';

  revByDateRange: any;
  revByUsersDateRange: any;
  revByKitchenDateRange: any;
  revByFoodTypeDateRange: any;
  revByPaymentDateRange: any;
  revByFoodsDateRange: any;

  reportProcess: string;

  startDate: Date;
  endDate: Date;

  dateForm: FormGroup;

  ngOnInit() {
    this.dateForm = new FormGroup({
      startDate: new FormControl(new Date()),
      endDate: new FormControl(new Date()),
    });
    this.startDate = this.dateForm.get('startDate').value;
    this.endDate = this.dateForm.get('endDate').value;
  }
  async rptRevByDateRange() {
    this.be.reportRevByDateRange(this.startDate, this.endDate).then(rpt => {
      rpt.subscribe(r => {
        this.revByDateRange = r;
        this.grandtotalCount = r[0].count;
        this.grandtotalAmount = r[0].total;
        this.totalCost = r[0].total_cost;
        this.netProfit = r[0].profit;
      });
    });
  }
  async rptRevByUsersByDateRange() {
    this.be.reportRevByUsersByDateRange(this.startDate, this.endDate).then(rpt => {
      rpt.subscribe(r => {
        this.revByUsersDateRange = r;
      });
    });
  }

  async rptRevByKitchenByDateRange() {
    this.be.reportRevByKitchenByDateRange(this.startDate, this.endDate).then(rpt => {
      rpt.subscribe(r => {
        this.revByKitchenDateRange = r;
      });
    });
  }
  async rptRevByFoodTypeByDateRange() {
    this.be.reportRevByFoodTypeByDateRange(this.startDate, this.endDate).then(rpt => {
      rpt.subscribe(r => {
        this.revByFoodTypeDateRange = r;
      });
    });
  }
  async rptRevByPaymentByDateRange() {
    this.be.reportRevByPaymentByDateRange(this.startDate, this.endDate).then(rpt => {
      rpt.subscribe(r => {
        this.revByPaymentDateRange = r;
      });
    });
  }
  async rptRevByFoodsByDateRange() {
    this.be.reportsRevByFoodsByDateRange(this.startDate, this.endDate).then(rpt => {
      rpt.subscribe(r => {
        this.revByFoodsDateRange = r;
      });
    });
  }

  async loadReport() {
    if (this.startDate != null && this.endDate != null) {

      console.log(this.startDate + ' - ' + this.endDate);

      this.reportProcess = 'Processing ...';
      this.viewReport = '';
      let c = await this.rptRevByDateRange();
      let d = await this.rptRevByUsersByDateRange();
      let e = await this.rptRevByKitchenByDateRange();
      let f = await this.rptRevByFoodTypeByDateRange();
      let g = await this.rptRevByPaymentByDateRange();
      let h = await this.rptRevByFoodsByDateRange();
      this.reportProcess = '';
    }
  }

  fromDateEvent(e) {
    this.fromDate = new Date(e.target.value);
    this.startDate = this.fromDate;
    this.startDate.setDate(this.fromDate.getDate() + 1);
  }
  toDateEvent(e) {
    this.toDateEnd = new Date(e.target.value);
    this.endDate = this.toDateEnd;
    this.endDate.setDate(this.toDateEnd.getDate() + 1);
  }
}
