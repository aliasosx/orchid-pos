import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViewBilldetailsComponent } from '../view-billdetails/view-billdetails.component';
import { Order } from 'src/app/interfaces/order';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view-order-details',
  templateUrl: './view-order-details.component.html',
  styleUrls: ['./view-order-details.component.css']
})
export class ViewOrderDetailsComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private db: AngularFirestore, private dialogRef: MatDialogRef<ViewBilldetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.ordersRef = db.collection<Order>('orders', ref => ref.where('orderId', '==', data.orderId));
  }
  ordersRef: AngularFirestoreCollection<Order>;
  orders: Observable<any[]>;
  foods: any[];
  ngOnInit() {
    this.foods = [];
    this.orders = this.ordersRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as Order;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
    this.orders.subscribe(orders => {
      orders.forEach(order => {
        order.food.forEach(fd => {
          // console.log(fd);
          this.foods.push(fd);
        });
      });
    });
    // console.log(this.data);
  }
}
