import { LoadingScreenService } from './../../services/loading-screen/loading-screen.service';
import { AuthenticationService } from './../../services/authentication.service';
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

  // tslint:disable-next-line: max-line-length
  constructor(private _firebaseAuth: AngularFireAuth, private db: AngularFirestore, private router: Router, private dialog: MatDialog, private authService: AuthenticationService, private loadingScreenService: LoadingScreenService) {
    if (localStorage.getItem('token')) {
      router.navigateByUrl('/');
    }
    this.webUsersRef = db.collection<Userlogin>('userlogins');
  }
  private user: Observable<firebase.User>;
  webUsersRef: AngularFirestoreCollection<Userlogin>
  usersWeblogins: Observable<any[]>;

  userInfomation: any;
  userProfile: any;

  usersForm: FormGroup;
  loginCount = 0;

  loginBtnDisable = false;

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
    if (this.loginCount >= 3) {
      swal({
        title: 'ທ່ານ login ຜິດຫຼາຍຄັ້ງແລ້ວ',
        text: 'ກະລຸນານຕິດຕໍ່ ຜູ້ດູແລລະບົບ',
        icon: 'warning',
        dangerMode: false,
      });
      return;
    }
    if (this.usersForm.valid) {
      return this._firebaseAuth.auth.signInWithEmailAndPassword(this.usersForm.get('email').value.trim() + '@letter-p.com',
        this.usersForm.get('password').value.trim()).then((res) => {
          this.userProfile = res.additionalUserInfo.profile;
          const newUser = res.additionalUserInfo.isNewUser;
        }).catch((err) => {
          this.loginCount += 1;
          swal({
            title: 'ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ',
            text: err.message,
            icon: 'warning',
            dangerMode: false,
          });
        });
    } else {
      this.loginCount += 1;
      swal({
        title: 'ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ',
        text: '',
        icon: 'warning',
        dangerMode: false,
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
  async loginByToken() {
    // this.loadingScreenService.startLoading();
    if (this.usersForm.valid) {
      this.loginBtnDisable = true;
      // tslint:disable-next-line: max-line-length
      const c = await this.authService.login(this.usersForm.get('email').value.trim(), this.usersForm.get('password').value.trim()).then(resp => {
        if (resp) {
          resp.subscribe(async (x) => {
            if (x['status'] === 'Authentication failed') {
              swal({
                title: 'ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ',
                text: '',
                icon: 'warning',
                dangerMode: false,
              });
              this.loginBtnDisable = false;
            } else if (x['token']) {
              const a = await localStorage.setItem('token', x['token']);
              const b = await localStorage.setItem('username', x['user'].username);
              const d = await localStorage.setItem('usrObj', JSON.stringify(x['user']));
              location.reload();
              // this.loadingScreenService.stopLoading();
            }
          });
        }
      });
    }
  }
}
