import { User } from 'firebase';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as uuid from 'uuid';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Role } from 'src/app/interfaces/role';
import { map } from 'rxjs/operators';
import { Userlogin } from 'src/app/interfaces/userlogin';

@Component({
  selector: 'app-addusers',
  templateUrl: './addusers.component.html',
  styleUrls: ['./addusers.component.css']
})
export class AddusersComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialogRef: MatDialogRef<AddusersComponent>, private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.usersRef = db.collection<User>('users');
    this.rolesRef = db.collection<Role>('roles');
    this.webuserRef = db.collection<Userlogin>('userlogins');
  }
  webUsers: Observable<any[]>;
  addUserForm: FormGroup;
  usersRef: AngularFirestoreCollection<User>;
  users: Observable<any[]>;

  rolesRef: AngularFirestoreCollection<Role>;
  roles: Observable<any[]>;

  showAlert = "hidden";
  userBtnDisable = false;

  webuserRef: AngularFirestoreCollection<Userlogin>;
  userExist: boolean = false;
  ngOnInit() {
    const uuid1 = uuid.v1();
    const uuid1Emp = uuid.v1();
    this.addUserForm = new FormGroup({
      userId: new FormControl(uuid1),
      googleId: new FormControl(),
      userName: new FormControl(),
      password: new FormControl(),
      employeeCode: new FormControl(uuid1Emp),
      gender: new FormControl(),
      fullName: new FormControl(),
      photo: new FormControl(),
      dateOfbirth: new FormControl(),
      placeOfBirth: new FormControl(),
      idCardno: new FormControl(),
      mobile: new FormControl(),
      enabled: new FormControl(true),
      registeringDate: new FormControl(new Date()),
      employedDate: new FormControl(new Date()),
      role: new FormControl()
    });
    this.roles = this.rolesRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as Role;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));

    this.webUsers = this.webuserRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as Userlogin;
        data['docid'] = a.payload.doc.id;
        return data;
      });
    }));
    console.log(this.data);
    if (this.data) {
      this.addUserForm.setValue(this.data);
    }
  }
  checkUserNameAvailable(username) {
    this.usersRef.get().subscribe(users => {
      users.forEach(user => {
        if (user.data().userName == username) {
          this.showAlert = "";
          this.userBtnDisable = true;
          this.userExist = true;
        } else {
          this.showAlert = "hidden";
          this.userBtnDisable = false;
          this.userExist = false;
        }
      });
    });
  }
  addUser() {
    this.userBtnDisable = true;
    this.checkUserNameAvailable(this.addUserForm.get('userName').value);

    if (this.addUserForm.valid) {
      this.usersRef.add(this.addUserForm.value).then(() => {
        this.snackbar.open('User has been added', 'ok', { duration: 1000 });
        this.dialogRef.close('success');
      });
    } else {
      this.userBtnDisable = false;
      this.snackbar.open('Form incomplete plesae check', 'fail', { duration: 1000 });
    }
  }
  webUserSelectChange(docId) {
    let webuser;
    this.webuserRef.doc(docId).get().subscribe(user => {
      this.checkUserNameAvailable(user.data().given_name);
      this.addUserForm.get('userName').setValue(user.data().given_name);
      this.addUserForm.get('fullName').setValue(user.data().name);
      this.addUserForm.get('googleId').setValue(user.data().id);
      if (user.data().gender == 'male') {
        this.addUserForm.get('gender').setValue('Mr');
      } else {
        this.addUserForm.get('gender').setValue('Mrs');
      }
      this.addUserForm.get('photo').setValue(user.data().picture);
    });
  }
}
