import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Transaction } from './../../interfaces/transaction';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialog: MatDialog, private snackbarRef: MatSnackBar) {
    this.transactionsRef = db.collection<Transaction>('transactions', ref => {
      return ref.orderBy('orderId', 'asc');
    });
  }

  transactionsRef: AngularFirestoreCollection<Transaction>;
  transactions: Observable<any[]>;

  ngOnInit() {
    this.transactions = this.transactionsRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const transactions = a.payload.doc.data() as Transaction;
        transactions['id'] = a.payload.doc.id;
        return transactions;
      });
    }));
  }

}
