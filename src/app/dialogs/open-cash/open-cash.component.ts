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
  constructor(private db: AngularFirestore, private dialog: MatDialog, private _firebaseAuth: AngularFireAuth, private dialogRef: MatDialogRef<OpenCashComponent>) {
    this.usersRef = db.collection<User>('users');
  }

  addCashload: FormGroup;
  usersRef: AngularFirestoreCollection<User>;
  users: Observable<any[]>;

  userSelected: any;

  btnDisable = false;

  ngOnInit() {
    this.addCashload = new FormGroup({
      loadDateTime: new FormControl(new Date),
      initBalance: new FormControl(0),
      openAuthorizedBy: new FormControl(),
      eodCashBalance: new FormControl(0),
      eodBankBalance: new FormControl(0),
      cashBalance: new FormControl(0),
      cashInHands: new FormControl(0),
      closeBalance: new FormControl(0),
      close: new FormControl(false),
      closeDatetime: new FormControl(),
      closeby: new FormControl(localStorage.getItem('username')),
      closeAuthorizedBy: new FormControl(),
    });

    this.users = this.usersRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as User;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
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
                console.log(user.data().userName);
                let c = await this.addCashload.get('openAuthorizedBy').setValue(user.data().userName);
                this.db.collection<CashLoad>('cashloads').add(this.addCashload.value).then((resps) => {
                  console.log(resps);
                  this.dialogRef.close('success');
                }).catch((err) => {
                  console.log(err.message);
                  this.btnDisable = false;
                });
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
