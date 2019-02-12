import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Order } from 'src/app/interfaces/order';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from 'src/app/interfaces/transaction';
import { FormGroup, FormControl } from '@angular/forms';
import { Ticket } from 'src/app/interfaces/ticket';

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
  foodsList: any = [];

  sendBtnDisable = false;

  ngOnInit() {
    this.orders = this.orderRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as Order;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
  }
  async updateFoodDone(order, _food) {
    // Clear cache
    this.foodsList = [];
    if (_food.done === true) {
      _food.done = false;
    } else {
      _food.done = true;
    }
    const cs = await this.orderRef.doc(order.id).get().toPromise().then(_order => {
      if (_order.exists) {
        const o = _order.data() as Order;
        // populate food data
        o.food.forEach(element => {
          if (element.id === _food.id) {
            element.done = true;
            this.foodsList.push(element);
          } else {
            this.foodsList.push(element);
          }
        });
      }
    }).then(() => {
      if (this.foodsList.length > 0) {
        let food = {
          food: this.foodsList
        };
        this.db.collection<Order>('orders').doc(order.id).update(food).then(() => {
          this.snackbarRef.open('Food Order Updated', 'ok', { duration: 1000 });
          this.foodsList = [];
        });
      } else {
        this.snackbarRef.open('Error Updated, Please try again later', 'ok', { duration: 1000 });
        this.foodsList = [];
      }
    });
  }
  async markOrderComplete(order) {
    let c = await this.orderRef.doc(order.id).update({
      completed: true,
      orderFinishTime: new Date(),
      status: 'completed',
      username: this.username,
    }).then(async () => {
      this.snackbarRef.open('Order completed', 'ok', { duration: 1000 });
      let c = await this.releaseTicket(order.ticket);
    });
  }
  async markOrderCancel(order) {
    let c = await this.orderRef.doc(order.id).update({
      completed: true,
      orderFinishTime: new Date(),
      status: 'cancel',
      username: this.username,
    }).then(async () => {
      this.snackbarRef.open('Order has been canceled', 'ok', { duration: 1000 });
      let c = await this.releaseTicket(order.ticket);
    });
  }
  async releaseTicket(ticket) {
    console.log(ticket);
    let ticketId = "";
    if (ticket) {
      const c = await this.db.collection<Ticket>('tickets', ref => {
        return ref.where('ticket', '==', parseInt(ticket));
      }).snapshotChanges().pipe(map(change => {
        return change.map(a => {
          const tickets = a.payload.doc.data() as Ticket;
          tickets['id'] = a.payload.doc.id;
          ticketId = a.payload.doc.id;
          return tickets;
        });
      }));
      c.subscribe(a => {
        this.db.collection<Ticket>('tickets').doc(ticketId).update({
          used: false
        }).then(() => {
          this.snackbarRef.open('Ticket ' + ticket + ' released', 'ok', { duration: 1000 });
        });
      });
    }
  }
  async updateTransactionLog(order) {
    /*
    let transaction = {
      transaction_date: new Date(),
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
