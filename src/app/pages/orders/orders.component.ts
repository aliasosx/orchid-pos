import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Order } from 'src/app/interfaces/order';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from 'src/app/interfaces/transaction';
import { FormGroup, FormControl } from '@angular/forms';
import { Ticket } from 'src/app/interfaces/ticket';
import { Product } from 'src/app/interfaces/product';
import { StockHistory } from 'src/app/interfaces/stockHistory';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

declare var swal: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialog: MatDialog, private snackbarRef: MatSnackBar, private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.username_info = user;
        this.username = user.displayName;
        this.orderRef = db.collection<Order>('orders', ref => {
          return ref.where('completed', '==', false).orderBy('orderDateTime', 'asc');
        });
        this.transactionsRef = db.collection<Transaction>('transactions');
        this.productsRef = db.collection<Product>('products');
      } else {
        router.navigateByUrl('login');
      }
    });
  }
  private user: Observable<firebase.User>;
  username_info: any;

  orderRef: AngularFirestoreCollection<Order>;
  orders: Observable<any[]>;

  transactionsRef: AngularFirestoreCollection<Transaction>;
  transactions: Observable<any[]>;
  transaction: Transaction;

  productsRef: AngularFirestoreCollection<Product>;
  products: Observable<any[]>;
  username: string;

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
    //console.log(_food.done);
    if (_food.done == true) {
      _food.done = false;
    } else if (_food.done == false) {
      _food.done = true;
    }
    //console.log(_food.done);
    const cs = await this.orderRef.doc(order.id).get().toPromise().then(_order => {
      if (_order.exists) {
        const o = _order.data() as Order;
        // populate food data
        o.food.forEach(element => {
          if (element.id === _food.id) {
            element.done = _food.done;
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
    swal({
      title: 'ໄດ້ກວດສອບລາຍການທັງໝົດຄົບແລ້ວ ແລະ ພ້ອມສົ່ງ',
      icon: "warning",
      dangerMode: true,
    }).then(async (value) => {
      if (value) {
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
    });
  }
  async markOrderCancel(order) {
    // Check time
    swal({
      title: 'ແນ່ໃຈວ່າຈະຍົກເລີກລາຍການນີ້',
      icon: "warning",
      dangerMode: true,
    }).then(async (value) => {
      if (value) {
        let currentConsumingTime;
        let a = await this.orderRef.doc(order.id).get().subscribe(o => {
          let currDate: any = new Date();
          let StartDate: any;
          if (o.exists) {
            StartDate = o.data().orderDateTime.toDate();
            currentConsumingTime = (currDate - StartDate) / 60000;
            if (currentConsumingTime > 10) {
              swal('ບໍ່ສາມາດຍົກເລິກລາຍການໄດ້', "ລາຍການທີ່ສັ່ງເກິນ 10 ນາທີ ບໍ່ສາມາດຍົກເລິກໄດ້", "error");
              return;
            } else {
              this.orderRef.doc(order.id).update({
                completed: true,
                orderFinishTime: new Date(),
                status: 'cancel',
                username: this.username,
              }).then(async () => {
                this.snackbarRef.open('Order has been canceled', 'ok', { duration: 1000 });
                let c = await this.releaseTicket(order.ticket);
              });
            }
          }
        });
      }
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
        //console.log(element);
        let transaction = {
          transaction_date: new Date(),
          foodId: element.foodId, // FoodId
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
          ticket: order.ticket,
          qrRefno: order.qrRefno,
        };
        this.db.collection<Transaction>('transactions').add(transaction).then(() => {
          this.snackbarRef.open('Transaction posted ', 'ok', { duration: 1000 });
          this.stockUpdate(order);
        });
      });
    } else {
      this.snackbarRef.open('Transaction posted Failed', 'ok', { duration: 1000 });
    }
  }
  async stockUpdate(order) {
    let productCurrentQuantity = 0;
    let newProductCurrentQuantity = 0;
    if (order) {

      order.food.forEach(fd => {
        console.log(fd);
        this.productsRef.get().subscribe(product => {
          product.forEach(doc => {
            if (doc.data().foodId == fd.foodId) {
              console.log(doc.data());
              productCurrentQuantity = doc.data().currentQuantity;
              console.log('Food ' + doc.data().productName);
              console.log('Current quantity is : ' + productCurrentQuantity);
              console.log('Sale quantity is : ' + fd.quantity);
              newProductCurrentQuantity = productCurrentQuantity - fd.quantity;
              console.log('New stock quantity is : ' + newProductCurrentQuantity);
              this.db.collection<Product>('products').doc(doc.id).update({
                currentQuantity: newProductCurrentQuantity,
              }).then(() => {
                console.log('================ Stock updated ================');
                this.snackbarRef.open('Stock Updated new Quantity ' + newProductCurrentQuantity + ' Unit(s)', 'ok', { duration: 1000 });
                // post stock change
                let stockhist = {
                  productId: doc.id,
                  productName: doc.data().productName,
                  beforeQuantity: productCurrentQuantity,
                  stockChange: fd.quantity,
                  currentQuantity: newProductCurrentQuantity,
                  updateDate: new Date(),
                  updateSource: 'ordering', // Sale module Or Purchase
                  createdAt: new Date(),
                  orderId: order.id,
                }
                this.db.collection<StockHistory>('stockHistories').add(stockhist).then(() => {
                  this.snackbarRef.open('Stock history added for ' + order.id, 'ok', { duration: 1000 });
                });

              });
            } else {
              this.snackbarRef.open('Food not existing on Products stock !', 'OK', { duration: 1000 });
              console.log('================  Product not existing ================ ');
              return;
            }
          });
        });
      });
    } else {
      return;
    }
  }
}
