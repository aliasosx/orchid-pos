import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Order } from 'src/app/interfaces/order';
import { Observable, from } from 'rxjs';
import { map, filter, groupBy, mergeMap, toArray } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kitchen-orders',
  templateUrl: './kitchen-orders.component.html',
  styleUrls: ['./kitchen-orders.component.css']
})
export class KitchenOrdersComponent implements OnInit {

  constructor(private db: AngularFirestore, private _firebaseAuth: AngularFireAuth, private router: Router) {


    if (localStorage.getItem('token')) {
      this.username_info = JSON.parse(localStorage.getItem('usrObj'));
      return;
    } else {
      router.navigateByUrl('login');
    }

    this.ordersRef = db.collection<Order>('orders', ref => {
      return ref.where('completed', '==', false).orderBy('orderDateTime', 'asc');
    });
  }
  kitchenState;
  showList = '';
  private user: Observable<firebase.User>;
  username_info: any;
  ordersRef: AngularFirestoreCollection<Order>;
  orders: Observable<any[]>;

  kitchen = localStorage.getItem('kitchen');

  orderList: any[] = [];
  order_tracks: any;

  ngOnInit() {
    this.orders = this.ordersRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const orders = a.payload.doc.data() as Order;
        orders['id'] = a.payload.doc.id;
        return orders;
      });
    }));
  }
}
