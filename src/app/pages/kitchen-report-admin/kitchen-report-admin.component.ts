import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Transaction } from 'src/app/interfaces/transaction';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Food } from 'src/app/interfaces/food';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-kitchen-report-admin',
  templateUrl: './kitchen-report-admin.component.html',
  styleUrls: ['./kitchen-report-admin.component.css']
})
export class KitchenReportAdminComponent implements OnInit {

  constructor(private db: AngularFirestore) {
    this.transactionsRef = db.collection<Transaction>('transactions', ref => {
      return ref.where('kitchen', '==', 'Food');
    });
  }
  viewReport = 'hidden';

  initDate: Date;

  transactionsRef: AngularFirestoreCollection<Transaction>;
  transactions: Observable<any[]>;
  transactionsReport: any[] = [];
  transactionCount = 0;
  transactionVolume = 0;


  foodsRef: AngularFirestoreCollection<Food>;
  foods: Observable<any[]>;
  foodsTransactions: any[] = [];
  foodsCountTranx = 0;
  foodsAmountTranx = 0;
  foodsCostTranx = 0;

  ngOnInit() {

  }
  async loadReport() {
    this.transactions = this.transactionsRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as Transaction;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));

    this.transactions.subscribe(tranxs => {
      this.transactionCount = 0;
      this.transactionVolume = 0;
      this.loadReportByFoods(tranxs);
    });
  }
  dateEvent(e) {
    if (e) {
      this.initDate = e.target.value;
    }
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

        let _cost = 0;

        tranxs.forEach(tranx => {
          const tranxDate = new DatePipe('en-us').transform(tranx.transaction_date.toDate(), 'dd-MMM-yyyy');
          const selectedDate = new DatePipe('en-us').transform(this.initDate, 'dd-MMM-yyyy');

          if (tranxDate === selectedDate) {
            if (tranx.foodId === food.foodId) {
              _foodName = tranx.foodName;
              this.foodsCountTranx += parseInt(tranx.quantity);
              this.foodsAmountTranx += parseInt(tranx.total_price);
              this.foodsCostTranx += parseInt(tranx.total_cost);
              _cost = parseInt(tranx.cost);
            }
          }
        });
        if (this.foodsCountTranx > 0) {
          this.foodsTransactions.push({
            foodname: _foodName,
            foodQuantity: this.foodsCountTranx,
            foodAmount: this.foodsAmountTranx,
            foodCost: this.foodsCostTranx,
            cost: _cost,
          });
        }
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
    this.viewReport = '';
  }
}
