import { RestaurantInfo } from './../../interfaces/restaurantInfo';
import { Webmenu } from './../../interfaces/webmenu';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private db: AngularFirestore) {
    this.menusRef = db.collection<Webmenu>('webmenus', ref => {
      return ref.orderBy('menuId', 'asc');
    });
    this.restaurantInfoRef = db.collection<RestaurantInfo>('restaurant_info');
  }
  title = "Letter'P restaurant";
  menusRef: AngularFirestoreCollection<Webmenu>;
  menus: Observable<any[]>;

  restaurantInfoRef: AngularFirestoreCollection<RestaurantInfo>;
  RestaurantInfos: Observable<any[]>;

  ngOnInit() {
    this.menus = this.menusRef.valueChanges();
    this.RestaurantInfos = this.restaurantInfoRef.valueChanges();
  }

}
