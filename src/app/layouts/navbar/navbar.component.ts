import { RestaurantInfo } from './../../interfaces/restaurantInfo';
import { Webmenu } from './../../interfaces/webmenu';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Role } from 'src/app/interfaces/role';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private db: AngularFirestore, private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        // console.log(user.providerData);
        this.username_info = user;
        this.googleId = user.uid;
        this.navBarShow = '';
        this.loadMenu();
        db.collection<User>('users').get().subscribe(users => {
          users.docs.forEach(u => {
            if (u.data().userId === user.uid) {
              localStorage.setItem('username', u.data().userName);
            }
          });
        });
        return;
      } else {
        // router.navigateByUrl('login');
        this.navBarShow = 'hidden';
      }
    });

    this.menusRef = db.collection<Webmenu>('webmenus', ref => {
      return ref.orderBy('menuId', 'asc');
    });
    this.restaurantInfoRef = db.collection<RestaurantInfo>('restaurant_info');
    this.usersRef = db.collection<User>('users');
  }

  navBarShow = '';

  private user: Observable<firebase.User>;
  username_info: any;
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
  ngOnInit() {
    this.menus = this.menusRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data();
        data['id'] = a.payload.doc.id;
        // this.loadMenu();
        return data;
      });
    }));
    this.RestaurantInfos = this.restaurantInfoRef.valueChanges();
    // this.loadMenu();
  }
  loadMenu() {
    this.menusByRoles = [];
    this.usersRef.get().subscribe(users => {
      users.docs.forEach(user => {
        if (user.data().userId === this.googleId) {
          // Get Roles
          this.db.collection<Role>('roles', ref => {
            return ref.where('roleCode', '==', user.data().role);
          }).get().subscribe(roles => {
            roles.forEach(role => {
              role.data().menus.forEach(menu => {
                if (menu.toLowerCase() === 'dashboards') {
                  this.menusByRoles.push({
                    menuName: menu.toUpperCase(),
                    menuLink: ''
                  });
                } else {
                  this.menusByRoles.push({
                    menuName: menu.toUpperCase(),
                    menuLink: menu.toLowerCase(),
                  });
                }
              });
              // console.log(this.menus);
            });
          });
        }
      });
    });
  }
  logOut() {
    this._firebaseAuth.auth.signOut().then(() => {

    });
  }

}
