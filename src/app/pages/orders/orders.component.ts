import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Order } from 'src/app/interfaces/order';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from 'src/app/interfaces/transaction';
import { FormGroup, FormControl } from '@angular/forms';

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

  formFoodList: FormGroup;

  ngOnInit() {
    this.formFoodList = new FormGroup({
      food: new FormControl(),
    });

    this.orders = this.orderRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as Order;
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

    // get Foods from Order

    let foods = [];
    this.orderRef.doc(order.id).get().subscribe(order => {
      const o = order.data();
      o.food.forEach(element => {
        if (element.id == food.id) {
          element.done = true;
          foods.push(element);
        } else {
          foods.push(element);
        }
      });
    });
    // update to order

    this.formFoodList.get('food').setValue(foods);
    console.log(this.formFoodList.get('food').value);
    //order.food = foods;
    console.log(this.formFoodList.value);

    this.orderRef.doc(order.id).update({
      food: this.formFoodList.get('food').value
    }).then(() => {
      this.snackbarRef.open('Update done', 'Ok', { duration: 1000, verticalPosition: 'top' });
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
