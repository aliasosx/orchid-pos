import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Userlogin } from 'src/app/interfaces/userlogin';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { UserRegisterComponent } from 'src/app/dialogs/user-register/user-register.component';
import * as uuid from 'uuid';
declare var swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _firebaseAuth: AngularFireAuth, private db: AngularFirestore, private router: Router,
    private dialog: MatDialog
  ) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.userInfomation = user;
        this.router.navigateByUrl('/');
      } else {
        this.userInfomation = null;
      }
    });
    this.webUsersRef = db.collection<Userlogin>('userlogins');
  }
  private user: Observable<firebase.User>;
  webUsersRef: AngularFirestoreCollection<Userlogin>
  usersWeblogins: Observable<any[]>;

  userInfomation: any;
  userProfile: any;

  usersForm: FormGroup;

  ngOnInit() {
    this.usersForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  loginGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((res) => {
      console.log(res);
      this.userProfile = res.additionalUserInfo.profile;
      this.webUsersRef.get().subscribe(users => {
        if (!users.empty) {
          users.forEach(user => {
            // console.log(user);
            if (user.data().name === this.userProfile.name) {
              return;
            } else {
              // console.log('Add new User');
              this.webUsersRef.add(this.userProfile);
              localStorage.setItem('users', this.userProfile);
              return;
            }
          });
        } else {
          // console.log('Add new User');
          this.webUsersRef.add(this.userProfile);
          localStorage.setItem('users', this.userProfile);
          return;
        }
      });
    });
  }
  loginFacebook() {
    return this._firebaseAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((res) => {
      this.userProfile = res.additionalUserInfo.profile;
      this.webUsersRef.get().subscribe(users => {
        if (!users.empty) {
          users.forEach(user => {
            // console.log(user);
            if (user.data().name === this.userProfile.name) {
              return;
            } else {
              // console.log('Add new User');
              this.webUsersRef.add(this.userProfile);
              localStorage.setItem('users', this.userProfile);
              return;
            }
          });
        } else {
          // console.log('Add new User');
          this.webUsersRef.add(this.userProfile);
          localStorage.setItem('users', this.userProfile);
          return;
        }
      });
    });
  }
  loginByEmail() {
    if (this.usersForm.valid) {
      return this._firebaseAuth.auth.signInWithEmailAndPassword(this.usersForm.get('email').value.trim(), this.usersForm.get('password').value.trim()).then((res) => {
        this.userProfile = res.additionalUserInfo.profile;
        const newUser = res.additionalUserInfo.isNewUser;
      }).catch((err) => {
        swal({
          title: 'ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ',
          text: err.message,
          icon: 'warning',
          dangerMode: false,
        });
      });
    }
  }

  openRegister() {
    this.dialog.open(UserRegisterComponent, {
      width: '800px',
    });
  }

  userSignUp() {
    return this._firebaseAuth.auth.createUserWithEmailAndPassword('sayyalinh@outlook.com', '123456').then((resp) => {
      alert(resp['message']);
    }).catch((err) => {
      swal({
        title: 'ຜູ້ໃຊ້ ບໍ່ມີໃນລະບົບ',
        text: 'ຖ້າແມ່ນ ຜູ້ໃຊ້ໃໝ່ກະລຸນາລົງທະບຽນ',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      });
    });
  }
  logOut() {
    this._firebaseAuth.auth.signOut().then(() => {

    });
  }
}
