import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { TransactionsViewComponent } from 'src/app/dialogs/transactions-view/transactions-view.component';
import { Food } from 'src/app/interfaces/food';
import { FoodCategory } from 'src/app/interfaces/foodCategory';
import { Kitchen } from 'src/app/interfaces/kitchen';
import { PaymentType } from 'src/app/interfaces/paymentType';
import { User } from 'src/app/interfaces/user';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';

import {
  ReportDetailsByFoodGroupComponent,
} from '../../dialogs/report-details-by-food-group/report-details-by-food-group.component';
import { Transaction } from './../../interfaces/transaction';

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

  providers: any;

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

  reportByDeriveryProviders: any;
  reportByDeriveryProviderSummary: any;

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

  commision: any;
  sumCommission = 0;


  ngOnInit() {
    this.dateForm = new FormGroup({
      startDate: new FormControl(new Date()),
      endDate: new FormControl(new Date()),
    });
    this.startDate = this.dateForm.get('startDate').value;
    this.endDate = this.dateForm.get('endDate').value;
  }
  async rptRevByDateRange() {
    this.sumCommission = 0;
    this.be.reportRevByDateRange(this.startDate, this.endDate).then(rpt => {
      rpt.subscribe(r => {
        this.revByDateRange = r[0]['reports'];
        // console.log(r);
        this.grandtotalCount = r[0]['reports'][0].count;
        this.grandtotalAmount = r[0]['reports'][0].total;
        this.totalCost = r[0]['reports'][0].total_cost;
        this.netProfit = r[0]['reports'][0].profit;
        this.commision = r[0]['commissionReport'];
        this.sumCommission = r[0]['sumCommissionReport'][0].sumCommission;
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

  async reportByDeriveryProvider() {
    this.be.getReportByDeriveryProviders(this.startDate, this.endDate).then(rpt => {
      rpt.subscribe(r => {
        console.log(r);
        this.reportByDeriveryProviders = r['reportByProviderTranx'];
        this.reportByDeriveryProviderSummary = r['reportByProviderSummary'];
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
      let i = await this.reportByDeriveryProvider();
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
  loadReportByFoodGroup(data) {
    const pre_data = {
      startDate: this.startDate,
      endDate: this.endDate,
      foodTypeId: data.foodTypeId,
      foodTypeName: data.foodTypeName
    };
    const dialogRef = this.dialog.open(ReportDetailsByFoodGroupComponent, {
      width: '900px',
      data: pre_data
    });
  }
}
