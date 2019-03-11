import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Component, OnInit, Inject } from '@angular/core';
import { CashLoad } from 'src/app/interfaces/cashLoad';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from 'src/app/interfaces/transaction';
import { DatePipe } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import { PasswordInputComponent } from '../password-input/password-input.component';

declare var swal: any;

@Component({
  selector: 'app-close-balance',
  templateUrl: './close-balance.component.html',
  styleUrls: ['./close-balance.component.css']
})
export class CloseBalanceComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  constructor(private _firebaseAuth: AngularFireAuth, private db: AngularFirestore, private dialogRef: MatDialogRef<CloseBalanceComponent>, @Inject(MAT_DIALOG_DATA) public data: CashLoad, private datePipe: DatePipe, private snackbar: MatSnackBar, private dialog: MatDialog) {
    this.usersRef = db.collection<User>('users');
    this.transactionsRef = db.collection<Transaction>('transactions', ref => {
      return ref.where('username', '==', localStorage.getItem('username'));
    });
  }
  _title = this.data.id;
  addCashload: FormGroup;

  disableTextInHandAmount

  usersRef: AngularFirestoreCollection<User>;
  users: Observable<any[]>;

  transactionsRef: AngularFirestoreCollection<Transaction>;
  // transactions: Observable<any[]>;

  disableCloseJob = false;
  btnDisable = false;
  userDisable = false;
  ngOnInit() {
    this.addCashload = new FormGroup({
      id: new FormControl(this.data.id),
      loadDateTime: new FormControl(),
      initBalance: new FormControl(0),
      openAuthorizedBy: new FormControl(),
      eodCashBalance: new FormControl(0),
      eodBankBalance: new FormControl(0),
      cashBalance: new FormControl(0),
      cashInHands: new FormControl(0),
      closeBalance: new FormControl(0),
      totalSellAmount: new FormControl(0),
      note: new FormControl(0),
      close: new FormControl(false),
      closeDatetime: new FormControl(new Date()),
      closeby: new FormControl(localStorage.getItem('username')),
      closeAuthorizedBy: new FormControl(),
    });
    if (this.data) {
      this.addCashload.setValue(this.data);
    }
    this.users = this.usersRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as User;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
  }
  closeBalanceProcess() {
    swal({
      title: 'ແນ່ໃຈວ່າຈະປີດຍອດຂາຍ',
      icon: 'warning',
      dangerMode: true,
    }).then(value => {

      let sum_cash = 0;
      let sum_bank = 0;
      let total_cash = 0;
      let totalSell = 0;
      if (value) {
        this.disableCloseJob = true;
        this.transactionsRef.get().subscribe(transactions => {
          transactions.docs.forEach(async (transaction) => {
            let transactionDate = this.datePipe.transform(transaction.data().transaction_date.toDate(), 'dd-MMM-yyyy');
            let nowDate = this.datePipe.transform(new Date(), 'dd-MMM-yyyy');
            // sum cash
            if (transactionDate === nowDate && transaction.data().paymentBy === 'CASH' && transaction.data().settled === false) {
              // console.log(transactionDate + ' => ' + transaction.data().price + ' - ' + transaction.data().quantity + ' - ' + transaction.data().total_price);
              sum_cash += transaction.data().total_price;
              this.db.collection<Transaction>('transactions').doc(transaction.id).update({
                settled: true,
              });
              // console.log(sum);
            } else if (transactionDate === nowDate && transaction.data().paymentBy !== 'CASH' && transaction.data().settled === false) {
              console.log(transactionDate + ' => ' + transaction.data().price + ' - ' + transaction.data().quantity + ' - ' + transaction.data().total_price);
              sum_bank += transaction.data().total_price;
              this.db.collection<Transaction>('transactions').doc(transaction.id).update({
                settled: true,
              });
            } else {
              swal({
                title: 'ລາຍການທັງໝົດ ປິດແລ້ວ',
                text: 'ບໍ່ສາມາດດຳເນິນການຕໍ່ໄດ້',
                icon: 'error',
              });
              return;
            }
            this.addCashload.get('eodCashBalance').setValue(sum_cash);
            this.addCashload.get('eodBankBalance').setValue(sum_bank);
            totalSell = sum_cash + sum_bank;
            total_cash = this.addCashload.get('eodCashBalance').value + this.addCashload.get('initBalance').value;
            this.addCashload.get('cashBalance').setValue(total_cash);
            this.addCashload.get('totalSellAmount').setValue(totalSell);
          });
        });
      } else {
        this.disableCloseJob = false;
        return;
      }
    });
  }

  calculateOnHandsAmount(amount) {
    // console.log(amount);
    this.addCashload.get('closeBalance').setValue(parseInt(amount) - parseInt(this.addCashload.get('cashBalance').value));
  }

  saveBalance() {
    swal({
      title: 'ແນ່ໃຈວ່າຈະ ບັນທຶກ',
      icon: 'warning',
      dangerMode: true,
    }).then(value => {
      if (value) {
        if (this.addCashload.valid) {
          this.addCashload.get('close').setValue(true);
          this.addCashload.get('closeDatetime').setValue(new Date());

          this.db.collection<CashLoad>('cashloads').doc(this.data.id).update(this.addCashload.value).then(() => {
            this.snackbar.open('Closed', 'OK', { duration: 1000 });
            this.dialogRef.close('succes');
          });
        }
      } else {
        return;
      }
    });
  }

  async approveProcess() {
    this.btnDisable = true;
    if (this.addCashload.get('closeAuthorizedBy').value) {
      const dialogRefs = this.dialog.open(PasswordInputComponent, {
        width: '300px'
      });
      dialogRefs.afterClosed().subscribe(pwd => {
        // tslint:disable-next-line: max-line-length
        this._firebaseAuth.auth.signInAndRetrieveDataWithEmailAndPassword(this.addCashload.get('closeAuthorizedBy').value, pwd).then((resp) => {
          if (resp) {
            this.db.collection<User>('users', ref => {
              return ref.where('email', '==', this.addCashload.get('closeAuthorizedBy').value);
            }).get().subscribe(users => {
              users.docs.forEach(async (user) => {
                console.log(user.data().userName);
                let c = await this.addCashload.get('closeAuthorizedBy').setValue(user.data().userName);
                this.userDisable = true;
                this.btnDisable = true;
              });
            });
          }
        }).catch((err) => {
          console.log(err.message);
          swal('Error!', err.message + ' Please try ...', 'error');
          this.btnDisable = false;
        });
      });
    } else {
      this.btnDisable = false;
    }
  }
}
