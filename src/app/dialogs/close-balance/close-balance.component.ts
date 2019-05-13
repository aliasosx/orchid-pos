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
import { BackendServiceService } from 'src/app/services/common/backend-service.service';

declare var swal: any;

@Component({
  selector: 'app-close-balance',
  templateUrl: './close-balance.component.html',
  styleUrls: ['./close-balance.component.css']
})
export class CloseBalanceComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  constructor(private _firebaseAuth: AngularFireAuth, private db: AngularFirestore, private dialogRef: MatDialogRef<CloseBalanceComponent>, @Inject(MAT_DIALOG_DATA) public data: CashLoad, private datePipe: DatePipe, private snackbar: MatSnackBar, private dialog: MatDialog, private backendService: BackendServiceService) {
    this.usersRef = db.collection<User>('users');
    this.transactionsRef = db.collection<Transaction>('transactions', ref => {
      return ref.where('username', '==', localStorage.getItem('username'));
    });
  }
  _title = this.data.id;
  addCashload: FormGroup;

  // disableTextInHandAmount

  usersRef: AngularFirestoreCollection<User>;
  users: Observable<any[]>;

  transactionsRef: AngularFirestoreCollection<Transaction>;
  // transactions: Observable<any[]>;

  disableCloseJob = false;
  btnDisable = false;
  userDisable = false;
  eod: any;

  ngOnInit() {
    this.addCashload = new FormGroup({
      id: new FormControl(this.data.id),
      loadDateTime: new FormControl(),
      initBalance: new FormControl(0),
      openAuthorizedBy: new FormControl(),
      loadApproved: new FormControl(),
      eodCashBalance: new FormControl(0),
      eodBankBalance: new FormControl(0),
      cashBalance: new FormControl(0),
      cashInHands: new FormControl(0),
      closeBalance: new FormControl(0),
      totalSellAmount: new FormControl(0),
      note: new FormControl(0),
      closeDatetime: new FormControl(new Date()),
      closedby: new FormControl(JSON.parse(localStorage.getItem('usrObj')).username),
      closeAuthorizedBy: new FormControl(),
      closeApproved: new FormControl(),
      netbalance: new FormControl(0),
      refno: new FormControl(),
      staff: new FormControl(),
      openAuthorizedNameBy: new FormControl(),
      closeAuthorizedNameBy: new FormControl(),
      sellerName: new FormControl(),
      terminalId: new FormControl(),
      fwdBalance: new FormControl(0),
      takeOffBalance: new FormControl(0),
      expenditureAmount: new FormControl(0),
      closed: new FormControl(),
      createdAt: new FormControl(),
      updatedAt: new FormControl(),
    });
    if (this.data) {
      this.data['fwdBalance'] = 0;
      this.data['takeOffBalance'] = 0;
      this.addCashload.setValue(this.data);
      this.loadExpenditure();
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
    this.disableCloseJob = false;
    this.backendService.getEOD(JSON.parse(localStorage.getItem('usrObj')).id, this.data.id).then((eod_resp) => {
      eod_resp.subscribe(eod => {
        this.eod = eod;
        this.eod.forEach(element => {
          if (element.PaidType === 'BANK') {
            this.addCashload.get('eodBankBalance').setValue(element.total);
          } else if (element.PaidType === 'CASH') {
            this.addCashload.get('eodCashBalance').setValue(element.total);
          }
        });
        // tslint:disable-next-line: max-line-length
        this.addCashload.get('cashBalance').setValue(this.addCashload.get('eodCashBalance').value + this.addCashload.get('initBalance').value);
        this.addCashload.get('cashInHands').setValue(this.addCashload.get('cashBalance').value);
        // tslint:disable-next-line: max-line-length
        this.addCashload.get('totalSellAmount').setValue(this.addCashload.get('eodBankBalance').value + this.addCashload.get('eodCashBalance').value);
        // tslint:disable-next-line: max-line-length
        this.addCashload.get('netbalance').setValue(parseInt(this.addCashload.get('cashInHands').value, 10) - parseInt(this.addCashload.get('expenditureAmount').value, 10));
        this.balanceFwdCalculate();
      });
    });
  }
  calculateOnHandsAmount(amount) {
    // console.log(amount);
    this.addCashload.get('closeBalance').setValue(parseInt(amount, 10) - parseInt(this.addCashload.get('cashBalance').value, 10));
  }
  saveBalance() {
    swal({
      title: 'ແນ່ໃຈວ່າຈະ ບັນທຶກ',
      icon: 'warning',
      dangerMode: true,
    }).then(value => {
      if (value) {
        if (this.addCashload.valid) {
          this.addCashload.get('closed').setValue(1);
          this.addCashload.get('closeDatetime').setValue(new Date());
          // update all transactions order as settled
          this.backendService.settleOrder(this.data.id, { settled: 1 }).then(settleOrder => {
            settleOrder.subscribe(async (rst) => {
              if (rst['status'] === 'success') {
                this.snackbar.open('Transactions settled by cashId  ' + this.data.id, 'OK', { duration: 2000 });
                const csh = {
                  eodBankBalance: this.addCashload.get('eodBankBalance').value,
                  eodCashBalance: this.addCashload.get('eodCashBalance').value,
                  cashInHands: this.addCashload.get('cashInHands').value,
                  cashBalance: this.addCashload.get('cashBalance').value,
                  totalSellAmount: this.addCashload.get('eodBankBalance').value + this.addCashload.get('eodCashBalance').value,
                  fwdBalance: this.addCashload.get('fwdBalance').value,
                  takeOffBalance: this.addCashload.get('takeOffBalance').value,
                  // tslint:disable-next-line: max-line-length
                  netbalance: parseInt(this.addCashload.get('cashInHands').value, 10) - parseInt(this.addCashload.get('expenditureAmount').value, 10),
                  expenditureAmount: this.addCashload.get('expenditureAmount').value,
                  closed: 1,
                  closeDatetime: new Date(),
                  closedby: JSON.parse(localStorage.getItem('usrObj')).id,
                  note: this.addCashload.get('note').value,
                };
                let c = await this.backendService.cashLoadUpdate(this.data.id, csh).then((resp_csh) => {
                  resp_csh.subscribe(c => {
                    if (c) {
                      this.snackbar.open('EOD closed  ' + c, 'OK', { duration: 2000 });
                      // update current POS BAL
                      const cashBalanceEodTerminal = {
                        cashloadId: this.data.id,
                        balance: this.addCashload.get('fwdBalance').value,
                        locked: 0,
                      };
                      // tslint:disable-next-line: max-line-length
                      this.backendService.updateTerminalBalanceEod(this.addCashload.get('terminalId').value, cashBalanceEodTerminal).then(rsp => {
                        rsp.subscribe(r => {
                          if (r['status'] === 'success') {
                            // tslint:disable-next-line: max-line-length
                            this.snackbar.open('Terminal balance has been updated : ' + this.addCashload.get('fwdBalance').value, 'OK', { duration: 3000 });
                            this.dialogRef.close('success');
                          }
                        });
                      });
                    }
                  });
                });
              } else if (rst['status'] === 'err') {
                this.snackbar.open('Transactions settled Error by cashId  ' + this.data.id, 'Fail', { duration: 1000 });
                return;
              }
            });
          });
        }
      } else {
        return;
      }
    });
  }
  async balanceFwdCalculate() {
    // tslint:disable-next-line: max-line-length
    this.addCashload.get('fwdBalance').setValue(this.addCashload.get('netbalance').value - this.addCashload.get('takeOffBalance').value);
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
                // console.log(user.data().userName);
                let c = await this.addCashload.get('closeAuthorizedBy').setValue(user.data().userName);
                this.userDisable = true;
                this.btnDisable = true;
              });
            });
          }
        }).catch((err) => {
          // console.log(err.message);
          swal('Error!', err.message + ' Please try ...', 'error');
          this.btnDisable = false;
        });
      });
    } else {
      this.btnDisable = false;
    }
  }
  loadExpenditure() {
    this.backendService.getExpenditureAmountByCashId(this.data.id).then(rsp => {
      rsp.subscribe(expenditureAmount => {
        console.log(expenditureAmount);
        this.addCashload.get('expenditureAmount').setValue(expenditureAmount[0].expAmount);
      });
    });
  }
}
