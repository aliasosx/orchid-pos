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
import { Bom } from 'src/app/interfaces/bom';
import { StockServicesService } from 'src/app/services/stock-services.service';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';

declare var swal: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialog: MatDialog, private snackbarRef: MatSnackBar,
    // tslint:disable-next-line: max-line-length
    private _firebaseAuth: AngularFireAuth, private router: Router, private _stockService: StockServicesService, private backendService: BackendServiceService) {

    if (localStorage.getItem('token')) {
      this.username_info = JSON.parse(localStorage.getItem('usrObj'));
      // this.username = user.displayName;
      this.orderRef = db.collection<Order>('orders', ref => {
        return ref.where('completed', '==', 0).orderBy('orderDateTime', 'asc');
      });
      this.transactionsRef = db.collection<Transaction>('transactions');
      this.productsRef = db.collection<Product>('products');

      this.bomRef = db.collection<Bom>('boms');

    } else {
      router.navigateByUrl('login');
    }

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
  username: string = localStorage.getItem('username');

  formFoodList: FormGroup;
  foodsList: any = [];

  sendBtnDisable = false;

  foodUpdateStatus = false;

  bomRef: AngularFirestoreCollection<Bom>;
  boms: Observable<any[]>;


  ngOnInit() {
    this.orders = this.orderRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as Order;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
    // this.updateTransactionsLogfix('9ef7f220-3423-11e9-b71a-3d88757dda31');
  }
  async updateFoodDone(order, _food) {
    if (this.foodUpdateStatus === false) {
      //  Clear cache
      this.foodsList = [];
      // console.log(_food.done);
      if (_food.done == true) {
        _food.done = false;
      } else if (_food.done === false) {
        _food.done = true;
      }
      // console.log(_food.done);
      this.foodUpdateStatus = true;
      const cs = await this.orderRef.doc(order.id).get().toPromise().then(_order => {
        if (_order.exists) {
          const o = _order.data() as Order;
          //  populate food data
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
          const food = {
            food: this.foodsList
          };
          this.db.collection<Order>('orders').doc(order.id).update(food).then(() => {
            this.snackbarRef.open('Food Order Updated', 'ok', { duration: 1000 });
            this.foodsList = [];
            this.foodUpdateStatus = false;
          });
        } else {
          this.snackbarRef.open('Error Updated, Please try again later', 'ok', { duration: 1000 });
          this.foodsList = [];
          this.foodUpdateStatus = false;
        }
      });
    } else {
      this.snackbarRef.open('Wait task complete and try again', 'ok', { duration: 1000, verticalPosition: 'top' });
      return;
    }
  }
  async markOrderComplete(order) {
    swal({
      title: 'ໄດ້ກວດສອບລາຍການທັງໝົດຄົບແລ້ວ ແລະ ພ້ອມສົ່ງ',
      icon: 'warning',
      dangerMode: true,
    }).then(async (value) => {
      if (value) {
        // process complete order
        const completeOrder = {
          completed: 1,
          orderFinishTime: new Date(),
          status: 'completed',
        };
        this.backendService.updateOrder(order.orderId, completeOrder).then((resp_order) => {
          resp_order.subscribe(async (completeOrderResp) => {
            if (completeOrderResp['status'] === 'success') {
              // firebase complete
              let c = await this.orderRef.doc(order.id).update({
                completed: true,
                orderFinishTime: new Date(),
                status: 'completed',
                username: this.username,
              }).then(async () => {
                this.snackbarRef.open('Order completed', 'ok', { duration: 1000 });
                let c = await this.releaseTicket(order.ticket);
                this.updateUserActivity('Make order complete by Order ID ' + order.orderId);
                this.updateTransactionLog(order);
              });
              // end firebase
            }
          });
        });
      }
    });
  }
  async markOrderCancel(order) {
    //  Check time
    swal({
      title: 'ແນ່ໃຈວ່າຈະຍົກເລີກລາຍການນີ້',
      icon: 'warning',
      dangerMode: true,
    }).then(async (value) => {
      if (value) {
        // check time
        let currentConsumingTime_chk;
        let currDate_chk: any = new Date();
        let StartDate_chk: any;
        StartDate_chk = order.orderDateTime.toDate();
        currentConsumingTime_chk = (currDate_chk - StartDate_chk) / 60000;
        if (currentConsumingTime_chk > 10) {
          swal('ບໍ່ສາມາດຍົກເລິກລາຍການໄດ້', 'ລາຍການທີ່ສັ່ງເກິນ 10 ນາທີ ບໍ່ສາມາດຍົກເລິກໄດ້', 'error');
          return;
        } else {
          const cancelOrder = {
            completed: 1,
            orderFinishTime: new Date(),
            status: 'canceled'
          };
          this.backendService.updateOrder(order.orderId, cancelOrder).then(async (resp_cancel_Order) => {
            resp_cancel_Order.subscribe(async (cancel_order) => {
              if (cancel_order['status'] === 'success') {
                // firebase db
                let currentConsumingTime;
                let a = await this.orderRef.doc(order.id).get().subscribe(o => {
                  let currDate: any = new Date();
                  let StartDate: any;
                  if (o.exists) {
                    StartDate = o.data().orderDateTime.toDate();
                    currentConsumingTime = (currDate - StartDate) / 60000;
                    if (currentConsumingTime > 10) {
                      swal('ບໍ່ສາມາດຍົກເລິກລາຍການໄດ້', 'ລາຍການທີ່ສັ່ງເກິນ 10 ນາທີ ບໍ່ສາມາດຍົກເລິກໄດ້', 'error');
                      return;
                    } else {
                      this.orderRef.doc(order.id).update({
                        completed: true,
                        orderFinishTime: new Date(),
                        status: 'cancel',
                        username: this.username,
                      }).then(async () => {
                        this.updateUserActivity('Make order Cancel by Order ID ' + order.orderId);
                        this.snackbarRef.open('Order has been canceled', 'ok', { duration: 1000 });
                        let c = await this.releaseTicket(order.ticket);
                      });
                    }
                  }
                });
                // end
              }
            });
          });
        }
      }
    });
  }
  async releaseTicket(ticket) {
    let ticketId = '';
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
        // console.log(element);
        const transaction = {
          transaction_date: new Date(),
          foodId: element.foodId, //  FoodId
          foodName: element.food,
          cost: element.cost,
          price: element.price,
          quantity: element.quantity,
          total_price: element.quantity * element.price,
          total_cost: element.cost * element.quantity,
          kitchen: element.kitchen,
          profit: (element.quantity * element.price) - (element.cost * element.quantity),
          bill_amount: order.grandtotal,
          settled: false,
          username: this.username,
          orderId: order.orderId,
          paymentBy: order.paymentType, //  Bank Cash QR
          refno: order.refno,
          invoiceno: order.invoiceno,
          ticket: order.ticket,
          qrRefno: order.qrRefno,
          food_category: element.food_category
        };
        this.db.collection<Transaction>('transactions').add(transaction).then(async () => {
          this.snackbarRef.open('Transaction posted ', 'ok', { duration: 1000 });
          let s = await this.stockUpdate(order);
          this.updateStockBOM(order);
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
        console.log('********************* Stock update for Sale direct products *********************');
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
                //  post stock change
                let stockhist = {
                  productId: doc.id,
                  productName: doc.data().productName,
                  beforeQuantity: productCurrentQuantity,
                  stockChange: fd.quantity,
                  currentQuantity: newProductCurrentQuantity,
                  updateDate: new Date(),
                  updateSource: 'ordering', //  Sale module Or Purchase
                  createdAt: new Date(),
                  orderId: order.id,
                }
                this.db.collection<StockHistory>('stockHistories').add(stockhist).then(() => {
                  this.snackbarRef.open('Stock history added for ' + order.id, 'ok', { duration: 1000 });
                });

              });
            }
            else {
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
  async updateStockBOM(order) {
    let productCurrentQuantity = 0;
    let newProductCurrentQuantity = 0;

    let products = [];
    if (order) {
      order.food.forEach(fd => {
        console.log(fd);
        console.log('********************* Stock update for BOM products *********************');
        this.bomRef.get().subscribe(async (boms) => {
          boms.docs.forEach(doc => {
            console.log(doc.data());
            console.log(doc.data().food.foodId + ' - ' + fd.foodId);
            if (doc.data().food.foodId == fd.foodId) {
              // console.log(doc.data());
              //  Fetch all products relate in BOM
              doc.data().products.forEach(product => {
                console.log(product);
                console.log('-------------- update stock for ' + product.productName + ' --------------');
                productCurrentQuantity = 0;
                newProductCurrentQuantity = 0;

                this.db.collection<Product>('products', ref => {
                  return ref.where('productName', '==', product.productName);
                }).get().subscribe((product_master) => {
                  console.log('getLatestQuantityByProductName');
                  product_master.docs.forEach(p => {
                    productCurrentQuantity = p.data().currentQuantity;
                    newProductCurrentQuantity = p.data().currentQuantity - (product.bom_quantity * fd.quantity);

                    console.log('Current quantity is : ' + productCurrentQuantity);
                    console.log('New quantity is : ' + newProductCurrentQuantity);

                    this.db.collection<Product>('products').doc(product.id).update({
                      currentQuantity: newProductCurrentQuantity,
                    }).then(async () => {
                      // tslint:disable-next-line: max-line-length
                      this.snackbarRef.open('Stock Updated new Quantity for ' + product.productName + ' : ' + newProductCurrentQuantity + ' Unit(s)', 'ok', { duration: 1000 });
                      console.log('Stock tracking update');
                      let stockhist = {
                        productId: product.id,
                        productName: product.productName,
                        beforeQuantity: productCurrentQuantity,
                        stockChange: product.bom_quantity,
                        currentQuantity: newProductCurrentQuantity,
                        updateDate: new Date(),
                        updateSource: 'ordering', //  Sale module Or Purchase
                        createdAt: new Date(),
                        orderId: order.id,
                        username: this.username,
                      }
                      let n = await this.db.collection<StockHistory>('stockHistories').add(stockhist).then(() => {
                        this.snackbarRef.open('Stock history added for ' + order.id, 'ok', { duration: 1000 });
                      });
                    });
                  });
                });
              });
            } else {
              this.snackbarRef.open('Food not existing on BOM stock !', 'OK', { duration: 1000 });
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
  updateUserActivity(_activities) {
    const activity = {
      userId: JSON.parse(localStorage.getItem('usrObj')).id,
      activities: _activities
    };
    this.backendService.userActivityLog(activity).then((resp) => {
      resp.subscribe((x) => {
        if (x['status'] === 'success') {
          this.snackbarRef.open('User audit loging done...', 'OK', { duration: 1000 });
        }
      });
    });
  }
}
