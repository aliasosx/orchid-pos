import { RestaurantInfo } from './../../interfaces/restaurantInfo';
import { Webmenu } from './../../interfaces/webmenu';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { NewpasswordComponent } from 'src/app/dialogs/newpassword/newpassword.component';

declare var swal: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private db: AngularFirestore, private _firebaseAuth: AngularFireAuth, private router: Router, private dialog: MatDialog, ) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(async (user) => {
      if (user) {
        // console.log(user);
        this.username_info = user;
        this.googleId = user.uid;
        this.navBarShow = '';
        // this.loadMenu();
        await db.collection<User>('users').get().subscribe(users => {
          users.docs.forEach(u => {
            if (u.data().userId === user.uid) {
              localStorage.setItem('username', u.data().userName);
              if (localStorage.getItem('username')) {
                this.loadMenus();
              } else {
                window.location.reload();
              }
            }
          });
        });
        return;
      } else {
        this.navBarShow = 'hidden';
      }
    });

    this.menusRef = db.collection<Webmenu>('webmenus', ref => {
      return ref.orderBy('menuId', 'asc');
    });
    this.restaurantInfoRef = db.collection<RestaurantInfo>('restaurant_info');

  }

  navBarShow = '';

  private user: Observable<firebase.User>;
  username_info: any;
  username = localStorage.getItem('username');
  googleId: string;
  title = 'Letter\'P restaurant';
  menusRef: AngularFirestoreCollection<Webmenu>;
  menus: Observable<any[]>;

  restaurantInfoRef: AngularFirestoreCollection<RestaurantInfo>;
  RestaurantInfos: Observable<any[]>;

  usersRef: AngularFirestoreCollection<User>;
  users: Observable<any[]>;
  currentRole: string;
  menusByRoles: any[] = [];

  userMenus: any[] = [];

  ngOnInit() {
    this.RestaurantInfos = this.restaurantInfoRef.valueChanges();
  }

  loadMenus() {
    this.userMenus = [];
    this.users = this.db.collection<User>('users', ref => {
      return ref.where('userName', '==', localStorage.getItem('username'));
    }).snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as User;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));

    this.users.subscribe(users => {
      users.forEach(user => {
        user.menus.forEach(element => {
          this.userMenus.push(element.toUpperCase());
        });
      });
    });
  }

  logOut() {
    this._firebaseAuth.auth.signOut().then(() => {
      localStorage.removeItem('username');
      this.router.navigateByUrl('login');
    });
  }
  openNewPassword() {
    const dialogRef = this.dialog.open(NewpasswordComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return; }
      let currUser = this._firebaseAuth.auth.currentUser;
      currUser.updatePassword(result).then(() => {
        swal({
          title: 'password update successful',
          icon: 'success'
        });
      }).catch((err) => {
        swal({
          icon: 'error',
          title: err.message,
        });
      });
    });
  }

}
