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
    private router: Router) {

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
  toEndDateDiff: Date;

  grandtotalAmount = 0;

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

  ngOnInit() {

  }
  async loadReport() {
    if (this.toDateEnd != null && this.fromDate != null) {
      this.viewReport = '';
      this.toDateEnd.setDate(this.toDateEnd.getDate() + 1);
      this.transactionsRef = this.db.collection<Transaction>('transactions', ref => {
        return ref.where('transaction_date', '>=', this.fromDate).where('transaction_date', '<=', this.toDateEnd);
      });
      this.transactions = await this.transactionsRef.snapshotChanges().pipe(map(change => {
        return change.map(a => {
          const transactions = a.payload.doc.data() as Transaction;
          transactions['id'] = a.payload.doc.id;
          return transactions;
        });
      }));
      this.transactions.subscribe(async (tranxs) => {
        this.grandtotalAmount = 0;
        this.totalCost = 0;
        tranxs.forEach(tranx => {
          this.grandtotalAmount += tranx.total_price;
          this.totalCost += tranx.total_cost;
          this.netProfit = this.grandtotalAmount - this.totalCost;
        });
        let a = await this.loadReportByUser(tranxs);
      });

    } else {
      this.snackbar.open('Please select date range before process', 'ok', { duration: 2000 });
      this.viewReport = 'hidden';
    }
  }
  fromDateEvent(e) {
    this.fromDate = e.target.value;
    // console.log(new DatePipe('en-us').transform(this.fromDate, 'dd-MMM-yyyy'));
  }
  async loadReportByUser(tranxs) {
    this.userTransactions = [];

    this.usersRef = await this.db.collection<User>('users');
    this.users = await this.usersRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const users = a.payload.doc.data() as User;
        users['id'] = a.payload.doc.id;
        return users;
      });
    }));
    // Normal user transactions
    const staff = await this.users.subscribe(users => {
      users.forEach(user => {
        this.userAmountTranx = 0;
        tranxs.forEach(tranx => {
          if (tranx.username.toLowerCase() === user.fullName.toLowerCase()) {
            this.userAmountTranx += tranx.total_price;
            // console.log(this.userAmountTranx);
          }
        });
        this.userTransactions.push({
          gender: user.gender,
          username: user.fullName,
          userAmountTranx: this.userAmountTranx
        });
      });

    });
    // admin user transactions
    this.userAmountTranx = 0;
    tranxs.forEach(tranx => {
      if (tranx.username.toLowerCase() === 'administrator') {
        this.userAmountTranx += tranx.total_price;
      }
    });
    this.userTransactions.push({
      gender: 'Mr',
      username: 'administrator',
      userAmountTranx: this.userAmountTranx
    });
    this.loadReportByKitchen(tranxs);
  }
  async loadReportByKitchen(tranxs) {
    this.kitchenAmountTranx = 0;
    this.kitchenTransactions = [];
    this.kitchens = await this.db.collection<Kitchen>('kitchens').snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const kitchens = a.payload.doc.data() as Kitchen;
        kitchens['id'] = a.payload.doc.id;
        return kitchens;
      });
    }));
    this.kitchens.subscribe(kitchens => {
      this.kitchenAmountTranx = 0;
      this.kitchenCostTranx = 0;
      kitchens.forEach(kitchen => {
        this.kitchenAmountTranx = 0;
        this.kitchenCostTranx = 0;
        tranxs.forEach(tranx => {
          if (kitchen.kitchenName.toLowerCase() === tranx.kitchen.toLowerCase()) {
            this.kitchenAmountTranx += tranx.total_price;
            this.kitchenCostTranx += tranx.total_cost;
          }
        });
        this.kitchenTransactions.push({
          kitchen: kitchen.kitchenName,
          kitchenAmount: this.kitchenAmountTranx,
          kitchenCost: this.kitchenCostTranx,
        });
      });
    });
    this.loadReportByFoodCategories(tranxs);
  }

  async loadReportByFoodCategories(tranxs) {
    this.foodCategoriesAmountTranx = 0;
    this.foodCategoriesTransactions = [];

    this.foodCategories = await this.db.collection<FoodCategory>('food_categories').snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const foodCategories = a.payload.doc.data() as FoodCategory;
        foodCategories['id'] = a.payload.doc.id;
        return foodCategories;
      });
    }));
    this.foodCategories.subscribe(foodCategories => {
      this.foodCategoriesTransactions = [];
      foodCategories.forEach(foodCategory => {
        this.foodCategoriesAmountTranx = 0;
        this.foodCategoriesCostTranx = 0;
        // console.log(foodCategory);
        tranxs.forEach(tranx => {
          if (tranx.food_category === foodCategory.foodCategoryNameLao) {
            // console.log(tranx.food_category + ' - ' + foodCategory.foodCategoryNameLao)
            this.foodCategoriesAmountTranx += tranx.total_price;
            this.foodCategoriesCostTranx += tranx.total_cost;
          }
        });
        this.foodCategoriesTransactions.push({
          foodCategory: foodCategory.foodCategoryNameLao,
          foodCategoryAmount: this.foodCategoriesAmountTranx,
          foodCategoryCost: this.foodCategoriesCostTranx,
        });
      });
      this.foodCategoriesTransactions.sort((a, b) => {
        const firstAmount = a.foodCategoryAmount;
        const secondAmount = b.foodCategoryAmount;

        let comparison = 0;
        if (firstAmount > secondAmount) {
          comparison = -1;
        } else if (firstAmount < secondAmount) {
          comparison = 1;
        }
        return comparison;
      });
    });
    this.loadReportByFoods(tranxs);
  }
  async loadReportByFoods(tranxs) {
    this.foodsAmountTranx = 0;
    this.foodsTransactions = [];

    this.foodsRef = await this.db.collection<Food>('foods');
    this.foods = await this.foodsRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const foods = a.payload.doc.data() as Food;
        foods['id'] = a.payload.doc.id;
        return foods;
      });
    }));
    let c = await this.foods.subscribe(foods => {
      this.foodsTransactions = [];
      foods.forEach(food => {
        let _foodName = '';
        this.foodsAmountTranx = 0;
        this.foodsCountTranx = 0;
        this.foodsCostTranx = 0;
        tranxs.forEach(tranx => {
          if (tranx.foodId === food.foodId) {
            _foodName = tranx.foodName;
            this.foodsCountTranx += parseInt(tranx.quantity);
            this.foodsAmountTranx += parseInt(tranx.total_price);
            this.foodsCostTranx += parseInt(tranx.total_cost);
          }
        });
        this.foodsTransactions.push({
          foodname: _foodName,
          foodQuantity: this.foodsCountTranx,
          foodAmount: this.foodsAmountTranx,
          foodCost: this.foodsCostTranx,
        });
      });
      this.foodsTransactions.sort((a, b) => {
        const firstAmount = a.foodAmount;
        const secondAmount = b.foodAmount;
        let comparison = 0;
        if (firstAmount > secondAmount) {
          comparison = -1;
        } else if (firstAmount < secondAmount) {
          comparison = 1;
        }
        return comparison;
      });
    });
    this.loadReportsByPayment(tranxs);
  }
  async loadReportsByPayment(tranxs) {
    this.paymentsRef = await this.db.collection<PaymentType>('paymentTypes');
    this.payments = await this.paymentsRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const payments = a.payload.doc.data() as PaymentType;
        payments['id'] = a.payload.doc.id;
        return payments;
      });
    }));

    this.payments.subscribe(payments => {
      this.paymentsAmountTranx = 0;
      this.paymentsTransactions = [];

      payments.forEach(payment => {
        this.paymentsAmountTranx = 0;
        this.paymentsCountTranx = 0;
        tranxs.forEach(tranx => {
          if (tranx.paymentBy.toLowerCase() === payment.paymentCode.toLowerCase()) {
            this.paymentsCountTranx += tranx.quantity;
            this.paymentsAmountTranx += tranx.total_price;
          }
        });
        this.paymentsTransactions.push({
          paymentName: payment.paymentCode,
          paymentCount: this.paymentsCountTranx,
          paymentAmount: this.paymentsAmountTranx
        });
      });
      this.paymentsTransactions.sort((a, b) => {
        const firstAmount = a.paymentAmount;
        const secondAmount = b.paymentAmount;
        let comparison = 0;
        if (firstAmount > secondAmount) {
          comparison = -1;
        } else if (firstAmount < secondAmount) {
          comparison = 1;
        }
        return comparison;
      });

    });
  }
  toDateEvent(e) {
    this.toDateEnd = e.target.value;
    this.toEndDateDiff = e.target.value;
    this.toDateEnd.setDate(this.toDateEnd.getDate() + 1);
  }
}
