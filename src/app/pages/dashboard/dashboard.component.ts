import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Transaction } from './../../interfaces/transaction';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { firestore } from 'firebase';
import { DatePipe } from '@angular/common';

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
      //this.transactionCountDairy = tranxs.length;

      tranxs.forEach(tranx => {
        let tranx_date = new DatePipe('en-us').transform(tranx.transaction_date.toDate(), 'dd-MMM-yyyy');
        let currentDate = new DatePipe('en-us').transform(new Date(), 'dd-MMM-yyyy');
        //console.log(currentDate);
        if (tranx_date == currentDate) {
          console.log(tranx.transaction_date.toDate() + ' Q ' + tranx.quantity);
          this.transactionAmountDiary += tranx.total_price;
          this.transactionCountDairy += tranx.quantity;
        }
      });
    });
  }
}
