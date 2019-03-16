import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Transaction } from 'src/app/interfaces/transaction';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-kitchen-transactions',
  templateUrl: './kitchen-transactions.component.html',
  styleUrls: ['./kitchen-transactions.component.css']
})
export class KitchenTransactionsComponent implements OnInit {

  constructor(private db: AngularFirestore) {
    this.transactionsRef = db.collection<Transaction>('transactions', ref => {
      return ref.where('kitchen', '==', 'Food').orderBy('transaction_date', 'asc');
    });
  }

  transactionsRef: AngularFirestoreCollection<Transaction>;
  transactions: Observable<any[]>;
  currentDate = new Date();
  ngOnInit() {
    this.transactions = this.transactionsRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as Transaction;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
  }

}
