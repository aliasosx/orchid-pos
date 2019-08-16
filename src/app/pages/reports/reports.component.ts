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
import { TransactionsViewComponent } from 'src/app/dialogs/transactions-view/transactions-view.component';

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
  kitchenPayments: any;
  foodKitchenPaymentSummary = 0;
  foodKitchenTotalCost = 0;

  totalPaymentDrinkKitchen = 0;

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
  derivery_provider_totals: any;
  revByFoodTypeDateRange: any;
  revByPaymentDateRange: any;
  revByFoodsDateRange: any;

  reportProcess: string;

  startDate: Date;
  endDate: Date;

  dateForm: FormGroup;

  deriver_grandtotal = 0;
  deriver_commission = 0;
  deriver_costs = 0;
  deriver_profit = 0;
  deriver_netprofit = 0;
  derver_list: any[] = [];

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
    this.foodKitchenPaymentSummary = 0;
    this.foodKitchenTotalCost = 0;
    this.totalPaymentDrinkKitchen = 0;

    this.derver_list = [];
    this.deriver_commission = 0;
    this.deriver_costs = 0;
    this.deriver_grandtotal = 0;
    this.deriver_profit = 0;

    this.be.reportRevByKitchenByDateRange(this.startDate, this.endDate).then(rpt => {
      rpt.subscribe(r => {
        this.revByKitchenDateRange = r['reports'];
        this.kitchenPayments = r['payment_reports'];
        this.derivery_provider_totals = r['derivery_provider_total'];
        r['payment_reports'].forEach(element => {
          if (element.kitchenName === 'Food') {
            this.foodKitchenPaymentSummary += element.amount;
            // console.log(this.foodKitchenPaymentSummary);
          } else if (element.kitchenName === 'Drink') {
            this.totalPaymentDrinkKitchen += element.amount;
          }
        });
        r['reports'].forEach(element => {
          if (element.kitchenName === 'Food') {
            this.foodKitchenTotalCost += element.total_cost;
          }
        });
        r['derivery_provider_total'].forEach(element => {
          this.deriver_grandtotal += element.grandtotal;
          this.deriver_commission += element.commission;
          this.deriver_costs += parseInt(element.costs, 10);
          this.deriver_netprofit += (element.grandtotal - element.commission);
          this.deriver_profit += (element.grandtotal - element.commission - element.costs);

        });
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
      this.startDate = this.dateForm.get('startDate').value;
      this.endDate = this.dateForm.get('endDate').value;
      // console.log(this.startDate + ' - ' + this.endDate);
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
  }
  toDateEvent(e) {
    this.toDateEnd = new Date(e.target.value);
    this.endDate = this.toDateEnd;
  }
  viewTransaction(orderId) {
    const dialog = this.dialog.open(TransactionsViewComponent, {
      width: '800px',
      data: orderId,
    });
  }
}
