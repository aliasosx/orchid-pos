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

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private snackbar: MatSnackBar, private datePipe: DatePipe, private db: AngularFirestore, private dialog: MatDialog, private snackbarRef: MatSnackBar, private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.username_info = user;
        return;
      } else {
        router.navigateByUrl('login');
      }
    });

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

  grandtotalAmount: number = 0;

  userTransactions: any[] = [];
  userCountTranx: number = 0;
  userAmountTranx: number = 0;

  viewReport = "hidden";

  ngOnInit() {

  }
  loadReport() {
    if (this.toDateEnd != null && this.fromDate != null) {
      this.viewReport = '';
      this.toDateEnd.setDate(this.toDateEnd.getDate() + 1);
      this.transactionsRef = this.db.collection<Transaction>('transactions', ref => {
        return ref.where('transaction_date', '>=', this.fromDate).where('transaction_date', '<=', this.toDateEnd);
      });
      this.transactions = this.transactionsRef.snapshotChanges().pipe(map(change => {
        return change.map(a => {
          const transactions = a.payload.doc.data() as Transaction;
          transactions['id'] = a.payload.doc.id;
          return transactions;
        });
      }));
      this.transactions.subscribe(tranxs => {
        this.grandtotalAmount = 0;
        tranxs.forEach(tranx => {
          this.grandtotalAmount += tranx.total_price;
        });
      });
    } else {
      this.snackbar.open('Please select date range before process', 'ok', { duration: 2000 });
      this.viewReport = 'hidden';
    }
  }
  fromDateEvent(e) {
    this.fromDate = e.target.value;
    //console.log(new DatePipe('en-us').transform(this.fromDate, 'dd-MMM-yyyy'));
  }
  toDateEvent(e) {
    this.toDateEnd = e.target.value;
    this.toDateEnd.setDate(this.toDateEnd.getDate() + 1);
    console.log(this.toDateEnd);
  }
}
