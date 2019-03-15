import { Kitchen } from './../../interfaces/kitchen';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Transaction } from './../../interfaces/transaction';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PaymentType } from 'src/app/interfaces/paymentType';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private db: AngularFirestore, private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.username_info = user;
        return;
      } else {
        router.navigateByUrl('login');
      }
    });

    this.transactionsRef = db.collection<Transaction>('transactions');
    this.transactionsCurrentRef = db.collection<Transaction>('transactions', ref => {
      return ref.orderBy('transaction_date', 'asc');
    });
    this.transactionsKitchenRef = db.collection<Transaction>('transactions');
    this.kitchensRef = db.collection<Kitchen>('kitchens');
    this.transactionsPaymentRef = db.collection<Transaction>('transactions');
    this.paymentMethodRef = db.collection<PaymentType>('paymentTypes');
  }

  private user: Observable<firebase.User>;
  username_info: any;

  username;

  transactionsRef: AngularFirestoreCollection<Transaction>
  transactions: Observable<any[]>;

  transctionsByKitchens: Observable<any[]>;

  transactionCount: number = 0;
  transactionAmount: number = 0;

  transactionsCurrentRef: AngularFirestoreCollection<Transaction>
  transactionsCurrent: Observable<any[]>;

  transactionsKitchenRef: AngularFirestoreCollection<Transaction>;
  transactionsKitchens: Observable<any[]>;

  transactionCountDairy: number = 0;
  transactionAmountDiary: number = 0;

  kitchensRef: AngularFirestoreCollection<Kitchen>;
  kitchens: Observable<any[]>;
  reportByKitchen: any[] = [];
  transactionCurrentKitchen: Observable<any[]>;

  paymentMethodRef: AngularFirestoreCollection<PaymentType>;
  paymentMethods: Observable<any[]>;
  paymentMethodReport: any[] = [];
  transactionsPaymentRef: AngularFirestoreCollection<Transaction>;
  transactionsPayments: Observable<any[]>;

  currentDate = new Date();

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
        this.transactionAmount += parseInt(tranx.total_price);
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
        const tranx_date = new DatePipe('en-us').transform(tranx.transaction_date.toDate(), 'dd-MMM-yyyy');
        const currentDate = new DatePipe('en-us').transform(new Date(), 'dd-MMM-yyyy');
        if (tranx_date === currentDate) {
          this.transactionAmountDiary += parseInt(tranx.total_price);
          this.transactionCountDairy += parseInt(tranx.quantity);
        }
      });
    });
    // load Kitchen list
    this.transactionsKitchens = this.transactionsKitchenRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as Transaction;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));


    this.kitchens = this.kitchensRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as Kitchen;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));

    this.kitchens.subscribe(kitchens => {
      kitchens.forEach(kitchen => {
        this.transactionsKitchens.subscribe(tranxs => {
          let kitchenCount = 0;
          let kitchenAmount = 0;

          tranxs.forEach(tranx => {
            const tranx_date = new DatePipe('en-us').transform(tranx.transaction_date.toDate(), 'dd-MMM-yyyy');
            const currentDate = new DatePipe('en-us').transform(new Date(), 'dd-MMM-yyyy');
            if (tranx_date === currentDate) {
              if (tranx.kitchen === kitchen.kitchenName) {
                kitchenCount += parseInt(tranx.quantity);
                kitchenAmount += parseInt(tranx.total_price);
              }
            }
          });
          this.reportByKitchen.push({
            kitchen: kitchen.kitchenName,
            kitchenCount: kitchenCount,
            kitchenAmount: kitchenAmount
          });
        });
      });
    });

    this.paymentMethods = this.paymentMethodRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as PaymentType;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
    this.transactionsPayments = this.transactionsPaymentRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as Transaction;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
    this.paymentMethods.subscribe(_paymentTypes => {
      _paymentTypes.forEach(paymentType => {
        this.transactionsPayments.subscribe(tranxs => {
          let paymentCount = 0;
          let paymentAmount = 0;
          tranxs.forEach(tranx => {
            const tranx_date = new DatePipe('en-us').transform(tranx.transaction_date.toDate(), 'dd-MMM-yyyy');
            const currentDate = new DatePipe('en-us').transform(new Date(), 'dd-MMM-yyyy');
            // console.log(paymentType.paymentCode + ' - ' + tranx.paymentBy);
            if (tranx_date === currentDate) {
              if (tranx.paymentBy === paymentType.paymentCode) {
                paymentCount += parseInt(tranx.quantity);
                paymentAmount += parseInt(tranx.total_price);
              }
            }
          });
          this.paymentMethodReport.push({
            paymentMethod: paymentType.paymentCode,
            paymentCount: paymentCount,
            paymentAmount: paymentAmount
          });
        });
      });
    });
    // this.username = localStorage.getItem('username');
  }
}
