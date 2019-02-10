import { map } from 'rxjs/operators';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { Bank } from 'src/app/interfaces/banks';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentType } from 'src/app/interfaces/paymentType';

@Component({
  selector: 'app-payment-types',
  templateUrl: './payment-types.component.html',
  styleUrls: ['./payment-types.component.css']
})
export class PaymentTypesComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialogRef: MatDialogRef<PaymentTypesComponent>, private snackbar: MatSnackBar) {
    this.banksRef = db.collection<Bank>('banks', ref => {
      return ref.where('enabled', '==', true);
    });
  }

  paymentTypesForm: FormGroup;

  banksRef: AngularFirestoreCollection<Bank>;
  banks: Observable<any[]>;

  paymentTypesRef: AngularFirestoreCollection<PaymentType>;
  paymentTypes: Observable<any[]>;

  ngOnInit() {
    this.paymentTypesForm = new FormGroup({
      paymentCode: new FormControl(),
      paymentName: new FormControl(),
      paymentDescription: new FormControl(),
      bankAcquirer: new FormControl(),
    });
    this.banks = this.banksRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const banks = a.payload.doc.data();
        banks['id'] = a.payload.doc.id;
        return banks;
      });
    }));
  }

}
