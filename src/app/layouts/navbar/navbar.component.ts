import { RestaurantInfo } from './../../interfaces/restaurantInfo';
import { Webmenu } from './../../interfaces/webmenu';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

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
        this.username_info = user;
        this.navBarShow = '';
        return;
      } else {
        //router.navigateByUrl('login');
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

  title = "Letter'P restaurant";
  menusRef: AngularFirestoreCollection<Webmenu>;
  menus: Observable<any[]>;

  restaurantInfoRef: AngularFirestoreCollection<RestaurantInfo>;
  RestaurantInfos: Observable<any[]>;

  ngOnInit() {
    this.menus = this.menusRef.valueChanges();
    this.RestaurantInfos = this.restaurantInfoRef.valueChanges();
  }
  logOut() {
    this._firebaseAuth.auth.signOut().then(() => {

    });
  }

}
