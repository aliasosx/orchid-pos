import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Order } from 'src/app/interfaces/order';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-kitchen-orders',
  templateUrl: './kitchen-orders.component.html',
  styleUrls: ['./kitchen-orders.component.css']
})
export class KitchenOrdersComponent implements OnInit {

  constructor(private db: AngularFirestore) {
    this.ordersRef = db.collection<Order>('orders', ref => {
      return ref.where('completed', '==', false).orderBy('orderDateTime', 'asc');
    });
  }

  ordersRef: AngularFirestoreCollection<Order>;
  orders: Observable<any[]>;

  kitchen = localStorage.getItem('kitchen');

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
