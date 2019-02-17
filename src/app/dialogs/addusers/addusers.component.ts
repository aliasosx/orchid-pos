import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as uuid from 'uuid';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from 'src/app/interfaces/user';
import { Observable } from 'rxjs';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Role } from 'src/app/interfaces/role';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-addusers',
  templateUrl: './addusers.component.html',
  styleUrls: ['./addusers.component.css']
})
export class AddusersComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialogRef: MatDialogRef<AddusersComponent>, private snackbar: MatSnackBar) {
    this.usersRef = db.collection<User>('users');
    this.rolesRef = db.collection<Role>('roles');
  }

  addUserForm: FormGroup;
  usersRef: AngularFirestoreCollection<User>;
  users: Observable<any[]>;

  rolesRef: AngularFirestoreCollection<Role>;
  roles: Observable<any[]>;

  showAlert = "hidden";
  userBtnDisable = false;

  ngOnInit() {
    const uuid1 = uuid.v1();
    const uuid1Emp = uuid.v1();
    this.addUserForm = new FormGroup({
      userId: new FormControl(uuid1),
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
    });
    this.roles = this.rolesRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as Role;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
  }
  checkUserNameAvailable(username) {
    this.usersRef.get().subscribe(users => {
      users.forEach(user => {
        if (user.data().userName == username) {
          this.showAlert = "";
          this.userBtnDisable = true;
        } else {
          this.showAlert = "hidden";
          this.userBtnDisable = false;
        }
      });
    });
  }
  addUser() {
    this.userBtnDisable = true;
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
}
