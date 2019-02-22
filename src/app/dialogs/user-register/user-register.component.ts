import { map } from 'rxjs/operators';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

import * as uuid from 'uuid';

import { User } from 'src/app/interfaces/user';
import { Role } from 'src/app/interfaces/role';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  constructor(private _firebaseAuth: AngularFireAuth, private db: AngularFirestore, private router: Router,
    private dialogRef: MatDialogRef<UserRegisterComponent>, private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.usersRef = db.collection<User>('users');
    this.rolesRef = db.collection<Role>('roles');
  }
  userRegistrationForm: FormGroup;
  photoSrc = '../../../assets/images/man01.png';

  message = '';
  showAlert = 'hidden';
  saveBtnDisable = true;
  usersRef: AngularFirestoreCollection<User>;
  showRole = 'hidden';
  messageTitle = 'ລົງທະບຽນ';
  buttonMessage = 'ບັນທືກ';
  rolesRef: AngularFirestoreCollection<Role>;
  roles: Observable<any[]>;
  updateFlag: boolean = false;
  ngOnInit() {
    const uuid1Emp = uuid.v1();
    this.userRegistrationForm = new FormGroup({
      id: new FormControl(),
      userId: new FormControl(),
      googleId: new FormControl(),
      email: new FormControl(),
      userName: new FormControl(),
      password: new FormControl(),
      employeeCode: new FormControl(uuid1Emp),
      gender: new FormControl(),
      fullName: new FormControl(),
      dateOfbirth: new FormControl(),
      placeOfBirth: new FormControl(),
      idCardno: new FormControl(),
      photo: new FormControl(),
      mobile: new FormControl(),
      enabled: new FormControl(true),
      role: new FormControl('staff'),
      registeringDate: new FormControl(new Date()),
      employedDate: new FormControl(new Date()),
    });
    this.roles = this.rolesRef.valueChanges();
    if (this.data) {
      this.showRole = '';
      this.userRegistrationForm.setValue(this.data);
      this.updateFlag = true;
      this.messageTitle = 'Update User information';
      this.buttonMessage = 'ແກ້ໄຂ';
      this.saveBtnDisable = false;
    } else {
      this.showRole = 'hidden';
    }
  }
  addUser() {
    if (this.updateFlag && this.data) {
      this.updateUser();
    } else {
      if (this.userRegistrationForm.valid) {

        this.saveBtnDisable = true;
        this._firebaseAuth.auth.createUserWithEmailAndPassword(this.userRegistrationForm.get('email').value,
          this.userRegistrationForm.get('password').value.trim()).then((resp) => {
            if (this.userRegistrationForm.valid) {
              this.userRegistrationForm.get('photo').setValue(this.photoSrc);
              this.userRegistrationForm.get('userId').setValue(resp.user.uid);
              this.usersRef.add(this.userRegistrationForm.value).then(() => {
                this.dialogRef.close('success');
              });
            }
          }).catch((err) => {
            this.message = err.message;
            this.showAlert = '';
          });
      } else {
        this.snackbar.open('Please correct all input form', 'OK', { duration: 2000 });
      }
    }
  }
  checkPasswordIntegrity(e) {
    if (this.updateFlag) {
      return;
    }
    if (this.userRegistrationForm.get('password').value.trim() === e.target.value.trim()) {
      this.showAlert = 'hidden';
      this.saveBtnDisable = false;
    } else {
      this.saveBtnDisable = true;
      this.message = 'Password not match';
      this.showAlert = '';
    }
  }
  checkUserDuplicate(e) {
    this.usersRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as User;
        data['id'] = a.payload.doc.id;
        return data;
      });
    })).subscribe(users => {
      users.forEach(user => {
        if (user.userName.toLowerCase().trim() === e.toLowerCase().trim()) {
          // console.log(user.userName + ' - ' + e);
          this.saveBtnDisable = true;
          this.message = 'Username already exist';
          this.showAlert = '';
          this.snackbar.open(this.message, 'Fail', { duration: 5000 });
        } else {
          this.showAlert = 'hidden';
          // this.saveBtnDisable = false;
        }
      });
    });
  }
  checkEmailDuplicate(e) {
    this.usersRef.get().subscribe(users => {
      users.docs.forEach(user => {
        if (user.data().email === e.trim()) {
          console.log(user.data());
          this.saveBtnDisable = true;
          this.message = 'Email already exist';
          this.showAlert = '';
          this.snackbar.open(this.message, 'Fail', { duration: 5000 });
        } else {
          this.showAlert = 'hidden';
        }
      });
    });
  }
  updateUser() {
    if (this.userRegistrationForm.valid) {
      this.saveBtnDisable = true;
      this.buttonMessage = 'Saving ...';
      this.usersRef.doc(this.data.id).update(this.userRegistrationForm.value).then(() => {
        this.dialogRef.close('success');
      }).catch((err) => {
        this.snackbar.open(err.message, 'OK', { duration: 5000 });
        this.saveBtnDisable = false;
      });
    }
  }
}
