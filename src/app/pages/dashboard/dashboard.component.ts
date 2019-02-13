import { Kitchen } from './../../interfaces/kitchen';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Transaction } from './../../interfaces/transaction';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { firestore } from 'firebase';
import { DatePipe } from '@angular/common';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private db: AngularFirestore) {
    this.transactionsRef = db.collection<Transaction>('transactions');
    let currentDate = firestore.Timestamp.fromDate(new Date());
    //console.log(currentDate.toDate());
    this.transactionsCurrentRef = db.collection<Transaction>('transactions', ref => {
      return ref.orderBy('transaction_date', 'asc');
    });

    this.kitchensRef = db.collection<Kitchen>('kitchens');
  }

  transactionsRef: AngularFirestoreCollection<Transaction>
  transactions: Observable<any[]>;
  transctionsByKitchens: Observable<any[]>;

  transactionCount: number = 0;
  transactionAmount: number = 0;

  transactionsCurrentRef: AngularFirestoreCollection<Transaction>
  transactionsCurrent: Observable<any[]>;

  transactionCountDairy: number = 0;
  transactionAmountDiary: number = 0;

  kitchensRef: AngularFirestoreCollection<Kitchen>;
  kitchens: Observable<any[]>;
  reportByKitchen: any[] = [];

  ngOnInit() {
    this.transactions = this.transactionsRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as Transaction;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));

    this.transactions.subscribe(tranxs => {
      this.transactionCount = tranxs.length;
      tranxs.forEach(tranx => {
        this.transactionAmount += tranx.total_price;
      });
    });
    this.transactionsCurrent = this.transactionsCurrentRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as Transaction;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));

    this.transactionsCurrent.subscribe(tranxs => {
      this.transactionAmountDiary = 0;
      this.transactionCountDairy = 0;
      tranxs.forEach(tranx => {
        let tranx_date = new DatePipe('en-us').transform(tranx.transaction_date.toDate(), 'dd-MMM-yyyy');
        let currentDate = new DatePipe('en-us').transform(new Date(), 'dd-MMM-yyyy');
        if (tranx_date == currentDate) {
          this.transactionAmountDiary += tranx.total_price;
          this.transactionCountDairy += tranx.quantity;
        }
      });
    });

    // load Kitchen list
    this.kitchens = this.kitchensRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as Kitchen;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));

    this.kitchens.subscribe(async (kitchens) => {
      let _kitchenName = "";
      kitchens.forEach(kitchen => {
        this.db.collection<Transaction>('transactions', ref => {
          _kitchenName = kitchen.kitchenName;
          console.log(kitchen.kitchenName);
          return ref.where('kitchen', '==', kitchen.kitchenName);
        }).snapshotChanges().pipe(map(change => {
          return change.map(a => {
            //console.log(a.payload.doc.data());
            const data = a.payload.doc.data() as Transaction;
            data['id'] = a.payload.doc.id;
            return data;
          });
        })).subscribe(async (tranxs) => {
          let kitchenCount = 0;
          let kitchenAmount = 0;
          let c = await tranxs.forEach(tranx => {
            kitchenCount += tranx.quantity;
            kitchenAmount += tranx.total_price;
          });
          console.log(_kitchenName);
          this.reportByKitchen.push({
            kitchen: _kitchenName,
            kitchenCount: kitchenCount,
            kitchenAmount: kitchenAmount
          });
          console.log(this.reportByKitchen);

        });
      });
    });
    //console.log(this.reportByKitchen);
  }
}
