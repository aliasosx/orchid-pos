import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Order } from 'src/app/interfaces/order';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from 'src/app/interfaces/transaction';

declare var swal: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialog: MatDialog, private snackbarRef: MatSnackBar) {
    this.orderRef = db.collection<Order>('orders', ref => {
      return ref.where('completed', '==', false).orderBy('orderDateTime', 'asc');
    });
    this.transactionsRef = db.collection<Transaction>('transactions');
  }

  orderRef: AngularFirestoreCollection<Order>;
  orders: Observable<any[]>;

  transactionsRef: AngularFirestoreCollection<Transaction>;
  transactions: Observable<any[]>;
  transaction: Transaction;

  username: string = 'administrator';

  ngOnInit() {
    this.orders = this.orderRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data();
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
  }
  updateFoodDone(order, food) {
    let _condition;
    if (food.done == true) {
      _condition == false;
    } else if (food.done == false) {
      _condition == true;
    }
    this.orderRef.doc(order.id).get().subscribe(f => {
      console.log(f.data().food);
    });
  }
  async markOrderComplete(order) {
    let c = await this.orderRef.doc(order.id).update({
      completed: true,
      orderFinishTime: new Date(),
      status: 'completed',
      username: this.username,
    }).then(() => {
      this.snackbarRef.open('Order completed', 'ok', { duration: 1000, verticalPosition: 'top' });
    });
  }
  async markOrderCancel(order) {
    let c = await this.orderRef.doc(order.id).update({
      completed: true,
      orderFinishTime: new Date(),
      status: 'cancel',
      username: this.username,
    }).then(() => {
      this.snackbarRef.open('Order has been canceled', 'ok', { duration: 1000, verticalPosition: 'top' });
    });
  }
  async updateTransactionLog(order) {
    /*
      let transaction = {
      transaction_date: new Date(),
      foodId: number,
      foodName: order.food.food,
      cost: number,
      price: number,
      quantity: number;
      total_price: number;
      total_cost: number;
      kitchen: string;
      profit: number;
      settled: boolean;
      username: string;
      orderId: string;
      paymentBy: string; // Bank Cash QR
      refno: string;
      invoiceno: string;
      };
    */
  }
}
