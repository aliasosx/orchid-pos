import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Order } from 'src/app/interfaces/order';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ViewOrderDetailsComponent } from 'src/app/dialogs/view-order-details/view-order-details.component';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css']
})
export class OrdersHistoryComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialog: MatDialog) {
    this.ordersRef = db.collection<Order>('orders', ref => {
      return ref.orderBy('orderDateTime', 'desc').limit(100);
    });
  }
  ordersRef: AngularFirestoreCollection<Order>;
  orders: Observable<any[]>;
  ngOnInit() {
    this.orders = this.ordersRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data();
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
  }
  openOrderDetail(tranx) {
    if (tranx) {
      const dialogRef = this.dialog.open(ViewOrderDetailsComponent, {
        width: '800px',
        data: tranx,
      });
    }
  }
}
