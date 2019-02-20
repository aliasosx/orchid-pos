import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Userlogin } from 'src/app/interfaces/userlogin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _firebaseAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) {
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
  userInfomation: any;
  userProfile: any;
  ngOnInit() {
  }
  private user: Observable<firebase.User>;

  webUsersRef: AngularFirestoreCollection<Userlogin>
  usersWeblogins: Observable<any[]>;

  loginGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((res) => {
      console.log(res);
      this.userProfile = res.additionalUserInfo.profile;
      this.webUsersRef.get().subscribe(users => {
        if (!users.empty) {
          users.forEach(user => {
            //console.log(user);
            if (user.data().name == this.userProfile.name) {
              return;
            } else {
              //console.log('Add new User');
              this.webUsersRef.add(this.userProfile);
              localStorage.setItem('users', this.userProfile);
              return;
            }
          });
        } else {
          //console.log('Add new User');
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
            //console.log(user);
            if (user.data().name == this.userProfile.name) {
              return;
            } else {
              //console.log('Add new User');
              this.webUsersRef.add(this.userProfile);
              localStorage.setItem('users', this.userProfile);
              return;
            }
          });
        } else {
          //console.log('Add new User');
          this.webUsersRef.add(this.userProfile);
          localStorage.setItem('users', this.userProfile);
          return;
        }
      });
    });
  }
  loginByEmail() {
    return this._firebaseAuth.auth.signInWithEmailAndPassword();
  }
  logOut() {
    this._firebaseAuth.auth.signOut().then(() => {

    });
  }
}
