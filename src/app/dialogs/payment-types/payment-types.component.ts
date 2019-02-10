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
    this.paymentTypesRef = db.collection<PaymentType>('paymentTypes');
  }

  paymentTypesForm: FormGroup;

  banksRef: AngularFirestoreCollection<Bank>;
  banks: Observable<any[]>;

  paymentTypesRef: AngularFirestoreCollection<PaymentType>;
  paymentTypes: Observable<any[]>;

  saveBtnDisabled = false;
  updateBtnDisabled = false;

  ngOnInit() {
    this.paymentTypesForm = new FormGroup({
      id: new FormControl(),
      paymentCode: new FormControl(),
      paymentName: new FormControl(),
      paymentDescription: new FormControl(),
      bankAcquirer: new FormControl(),
      bank: new FormControl(),
      enabled: new FormControl(true),
    });
    this.banks = this.banksRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const banks = a.payload.doc.data();
        banks['id'] = a.payload.doc.id;
        return banks;
      });
    }));

    this.paymentTypes = this.paymentTypesRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const paymentTypes = a.payload.doc.data();
        paymentTypes['id'] = a.payload.doc.id;
        return paymentTypes;
      })
    }));
    this.updateBtnDisabled = true;
  }
  addPaymentType() {
    //console.log(this.paymentTypesForm.value);
    const c = this.db.collection<Bank>('banks', ref => {
      return ref.where('bankCode', '==', this.paymentTypesForm.get('bankAcquirer').value);
    }).snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const b = a.payload.doc.data();
        b['id'] = a.payload.doc.id;
        return b;
      });
    })).subscribe(bank => {
      bank.forEach(b => {
        this.paymentTypesForm.get('bank').setValue(b);
      });
      if (this.paymentTypesForm.valid && this.paymentTypesForm.get('bank').value) {
        this.db.collection('paymentTypes').add(this.paymentTypesForm.value).then(() => {
          this.snackbar.open('Payment added', 'Ok', { duration: 1000, verticalPosition: 'top' });
          this.paymentTypesForm.reset();
        }).catch((err) => {
          this.snackbar.open(err, 'Ok', { duration: 1000, verticalPosition: 'top' });
        });
      } else {
        this.snackbar.open('Form invalid', 'Ok', { duration: 1000, verticalPosition: 'top' });
      }
    });
  }
  removeItem(paymentType) {
    if (paymentType) {
      this.paymentTypesRef.doc(paymentType.id).delete().then(() => {
        this.snackbar.open('Deleted success', 'Ok', { duration: 1000, verticalPosition: 'top' });
      });
    }
  }
  updateItem() {
    if (this.paymentTypesForm.valid) {
      this.paymentTypesRef.doc(this.paymentTypesForm.get('id').value).update(this.paymentTypesForm.value).then(() => {
        this.snackbar.open('Update success', 'Ok', { duration: 1000, verticalPosition: 'top' });
        this.paymentTypesForm.reset();
        this.updateBtnDisabled = true;
        this.saveBtnDisabled = false;
      });
    }
  }
  loadFormClick(paymentType) {
    this.paymentTypesForm.setValue(paymentType);
    this.saveBtnDisabled = true;
    this.updateBtnDisabled = false;
  }
}
