import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Transaction } from 'src/app/interfaces/transaction';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view-billdetails',
  templateUrl: './view-billdetails.component.html',
  styleUrls: ['./view-billdetails.component.css']
})
export class ViewBilldetailsComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialogRef: MatDialogRef<ViewBilldetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.transactionsRef = db.collection<Transaction>('transactions', ref => { return ref.where('invoiceno', '==', data.invoiceno).orderBy('transaction_date', 'asc') });
  }
  transactionsRef: AngularFirestoreCollection<Transaction>;
  transactions: Observable<any[]>;
  billTotal = 0;
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
