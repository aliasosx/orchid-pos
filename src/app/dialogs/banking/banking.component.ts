import { map } from 'rxjs/operators';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Bank } from 'src/app/interfaces/banks';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.css']
})
export class BankingComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialogRef: MatDialogRef<BankingComponent>, private snackbar: MatSnackBar) {
    this.banksRef = db.collection<Bank>('banks');
  }

  bankingForm: FormGroup;
  banksRef: AngularFirestoreCollection<Bank>;
  banks: Observable<any[]>;

  ngOnInit() {
    this.bankingForm = new FormGroup({
      bankCode: new FormControl(),
      bankName: new FormControl(),
      enabled: new FormControl(true),
    });
    this.banks = this.banksRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const banks = a.payload.doc.data();
        banks['id'] = a.payload.doc.id;
        return banks;
      })
    }));
  }
  addBank() {
    if (this.bankingForm.valid) {
      this.db.collection('banks').add(this.bankingForm.value).then(() => {
        this.snackbar.open('Bank added', 'Ok', { duration: 1000, verticalPosition: 'top' });
      });
    }
  }
  removeBank(docId) {
    if (docId) {
      this.db.collection('banks').doc(docId).delete().then(() => {
        this.snackbar.open('Bank deleted', 'Ok', { duration: 1000, verticalPosition: 'top' });
      });
    }
  }
}
