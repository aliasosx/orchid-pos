import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import * as uuid from 'uuid';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  constructor(private _firebaseAuth: AngularFireAuth, private db: AngularFirestore, private router: Router,
    private dialogRef: MatDialogRef<UserRegisterComponent>, private snackbar: MatSnackBar) {
    this.usersRef = db.collection<User>('users');
  }
  userRegistrationForm: FormGroup;
  photoSrc = '../../../assets/images/man01.png';

  message = '';
  showAlert = 'hidden';
  saveBtnDisable = true;
  usersRef: AngularFirestoreCollection<User>;

  ngOnInit() {
    this.userRegistrationForm = new FormGroup({
      userId: new FormControl(),
      googleId: new FormControl(),
      email: new FormControl(),
      userName: new FormControl(),
      password: new FormControl(),
      employeeCode: new FormControl(),
      gender: new FormControl(),
      fullName: new FormControl(),
      dateOfbirth: new FormControl(),
      placeOfBirth: new FormControl(),
      idCardno: new FormControl(),
      photo: new FormControl(),
      mobile: new FormControl(),
      enabled: new FormControl(true),
      role: new FormControl(),
      registeringDate: new FormControl(new Date()),
      employedDate: new FormControl(new Date()),
    });
  }
  addUser() {
    if (this.userRegistrationForm.valid) {
      this._firebaseAuth.auth.createUserWithEmailAndPassword(this.userRegistrationForm.get('email').value,
        this.userRegistrationForm.get('password').value.trim()).then((resp) => {
          if (this.userRegistrationForm.valid) {
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
  checkPasswordIntegrity(e) {
    if (this.userRegistrationForm.get('password').value.trim() === e.target.value.trim()) {
      this.showAlert = 'hidden';
      this.saveBtnDisable = false;
    } else {
      this.saveBtnDisable = true;
      this.message = 'Password not match';
      this.showAlert = '';
    }
  }
}
