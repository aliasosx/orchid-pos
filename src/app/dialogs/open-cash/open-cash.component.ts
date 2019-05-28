import { BackendServiceService } from './../../services/common/backend-service.service';
import { CashLoad } from './../../interfaces/cashLoad';
import { PasswordInputComponent } from './../password-input/password-input.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { Observable } from 'rxjs';

declare var swal: any;

@Component({
  selector: 'app-open-cash',
  templateUrl: './open-cash.component.html',
  styleUrls: ['./open-cash.component.css']
})
export class OpenCashComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private db: AngularFirestore, private dialog: MatDialog, private _firebaseAuth: AngularFireAuth, private dialogRef: MatDialogRef<OpenCashComponent>, private backendService: BackendServiceService) {
    this.usersRef = db.collection<User>('users');
  }

  addCashload: FormGroup;
  usersRef: AngularFirestoreCollection<User>;
  users: Observable<any[]>;

  userSelected: any;

  btnDisable = false;
  terminals: any;
  balance = 0;
  cashloadId = 0;

  ngOnInit() {
    this.addCashload = new FormGroup({
      loadDateTime: new FormControl(new Date),
      initBalance: new FormControl(),
      openAuthorizedBy: new FormControl(),
      loadApproved: new FormControl(0),
      eodCashBalance: new FormControl(0),
      eodBankBalance: new FormControl(0),
      cashBalance: new FormControl(0),
      cashInHands: new FormControl(0),
      closeBalance: new FormControl(0),
      totalSellAmount: new FormControl(0),
      close: new FormControl(0),
      closeDatetime: new FormControl(),
      closeby: new FormControl(localStorage.getItem('username')),
      staff: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      closeAuthorizedBy: new FormControl(),
      closeApproved: new FormControl(0),
      openAuthorizedNameBy: new FormControl(),
      closeAuthorizedNameBy: new FormControl(),
      sellerName: new FormControl(),
      terminalId: new FormControl(),
      note: new FormControl(),
      cashloadId: new FormControl(),
      refno: new FormControl(),
    });
    this.users = this.usersRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as User;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
    this.loadTerminals();
  }

  async addInitialBalance() {
    // console.log(this.addCashload.value);
    if (this.addCashload.get('initBalance').value) {
      const refno = this.padding(Math.floor(Math.random() * 10000000000) + 1, 12);
      this.addCashload.get('refno').setValue(refno);
      this.addCashload.get('sellerName').setValue(JSON.parse(localStorage.getItem('usrObj')).username);

      let c = await this.backendService.openCashload(this.addCashload.value).then((x) => {
        x.subscribe(async (cs) => {
          console.log(cs['id']);
          this.dialogRef.close({
            cashId: cs['id'],
            status: 'success'
          });
        });
      });
    } else {
      // console.log('error');
    }
  }
  async approveProcess() {
    this.btnDisable = true;
    if (this.addCashload.get('openAuthorizedBy').value) {
      const dialogRefs = this.dialog.open(PasswordInputComponent, {
        width: '300px'
      });
      dialogRefs.afterClosed().subscribe(pwd => {
        // tslint:disable-next-line: max-line-length
        this._firebaseAuth.auth.signInAndRetrieveDataWithEmailAndPassword(this.addCashload.get('openAuthorizedBy').value, pwd).then((resp) => {
          if (resp) {
            this.db.collection<User>('users', ref => {
              return ref.where('email', '==', this.addCashload.get('openAuthorizedBy').value);
            }).get().subscribe(users => {
              users.docs.forEach(async (user) => {
                // console.log(user.data().userName);
                let c = await this.addCashload.get('openAuthorizedBy').setValue(user.data().userName);
                this.db.collection<CashLoad>('cashloads').add(this.addCashload.value).then((resps) => {
                  this.dialogRef.close('success');
                }).catch((err) => {
                  // console.log(err.message);
                  this.btnDisable = false;
                });
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

  padding(num: number, size: number) {
    let s = num + '';
    while (s.length < size) { s = '0' + s; }
    return s;
  }
  loadTerminals() {
    this.backendService.getTerminals().then(t => {
      t.subscribe(terminals => {
        // console.log(terminals);
        this.terminals = terminals;
      });
    });
  }
  loadBalance(e) {
    this.backendService.getTerminalById(e).then(rsp => {
      rsp.subscribe(bal => {
        this.balance = bal[0].balance;
        this.cashloadId = bal[0].id;
        this.addCashload.get('initBalance').setValue(bal[0].balance);
      });
    });
  }
}
