import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/interfaces/transaction';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ViewBilldetailsComponent } from 'src/app/dialogs/view-billdetails/view-billdetails.component';
declare var swal: any;
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private db: AngularFirestore, private dialog: MatDialog, private snackbarRef: MatSnackBar, private _firebaseAuth: AngularFireAuth, private router: Router) {

    if (localStorage.getItem('token')) {
      this.username_info = JSON.parse(localStorage.getItem('usrObj'));
      return;
    } else {
      router.navigateByUrl('login');
    }

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
  settleToggle(tranx) {
    if (tranx) {
      swal({
        title: 'ແນ່ໃຈວ່າ ຈະປ່ຽນແປງ',
        icon: 'warning',
        dangerMode: true,
      }).then((value) => {
        if (value) {
          this.db.collection<Transaction>('transactions').doc(tranx.id).update({
            settled: !tranx.settled,
          });
        }
      });
    }
  }
  viewBillDetail(tranx) {
    if (tranx) {
      const dialogRef = this.dialog.open(ViewBilldetailsComponent, {
        width: '800px',
        data: tranx,
      });
    }
  }

}
