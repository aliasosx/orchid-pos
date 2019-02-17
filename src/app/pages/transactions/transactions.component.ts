import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/interfaces/transaction';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialog: MatDialog, private snackbarRef: MatSnackBar, private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.username_info = user;
        return;
      } else {
        router.navigateByUrl('login');
      }
    });
    this.transactionsRef = db.collection<Transaction>('transactions', ref => {
      return ref.orderBy('transaction_date', 'asc');
    });
  }
  private user: Observable<firebase.User>;
  username_info: any;

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
