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
      this.updateTransactionLog(order);
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
    if (order) {
      order.food.forEach(element => {
        console.log(element);
        let transaction = {
          transaction_date: new Date(),
          foodName: element.food,
          cost: element.cost,
          price: element.price,
          quantity: element.quantity,
          total_price: element.quantity * element.price,
          total_cost: element.cost * element.quantity,
          kitchen: element.kitchen,
          profit: (element.quantity * element.price) - (element.cost * element.quantity),
          bill_amount: order.grandtotal,
          settled: true,
          username: this.username,
          orderId: order.orderId,
          paymentBy: order.paymentType, // Bank Cash QR
          refno: order.refno,
          invoiceno: order.invoiceno,
        };
        this.db.collection<Transaction>('transactions').add(transaction).then(() => {
          this.snackbarRef.open('Transaction posted ', 'ok', { duration: 1000 });
        });
      });
    } else {
      this.snackbarRef.open('Transaction posted Failed', 'ok', { duration: 1000 });
    }

  }
}
