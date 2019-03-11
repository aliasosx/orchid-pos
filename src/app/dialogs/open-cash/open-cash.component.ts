import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-open-cash',
  templateUrl: './open-cash.component.html',
  styleUrls: ['./open-cash.component.css']
})
export class OpenCashComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialog: MatDialog, private _firebaseAuth: AngularFireAuth) {
    this.usersRef = db.collection<User>('users');
  }

  addCashload: FormGroup;
  usersRef: AngularFirestoreCollection<User>;
  users: Observable<any[]>;

  userSelected: any;

  ngOnInit() {
    this.addCashload = new FormGroup({
      loadDateTime: new FormControl(new Date),
      initBalance: new FormControl(),
      openAuthorizedBy: new FormControl(),
      eodCashBalance: new FormControl(),
      eodBankBalance: new FormControl(),
      cashBalance: new FormControl(),
      bankBalance: new FormControl(),
      close: new FormControl(),
      closeDatetime: new FormControl(),
      closeby: new FormControl(),
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
  approveProcess() {
    if (this.addCashload.get('closeAuthorizedBy').value) {
      //this._firebaseAuth.auth.signInAndRetrieveDataWithCredential();
    }
  }
}
