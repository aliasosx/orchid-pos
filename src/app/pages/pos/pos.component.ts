import { DatePipe } from '@angular/common';
import { CashLoad } from 'src/app/interfaces/cashLoad';
import { AddQuantityComponent } from './../../dialogs/add-quantity/add-quantity.component';
import { map } from 'rxjs/operators';
import { Food } from 'src/app/interfaces/food';
import { Observable } from 'rxjs';
import { FoodCategory } from './../../interfaces/foodCategory';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SubfoodsComponent } from 'src/app/dialogs/subfoods/subfoods.component';
import { Cart } from 'src/app/interfaces/cart';
import { AddNoteComponent } from 'src/app/dialogs/add-note/add-note.component';
import { PaymentCashComponent } from 'src/app/dialogs/payment-cash/payment-cash.component';
import { PaymentBanksChannelComponent } from 'src/app/dialogs/payment-banks-channel/payment-banks-channel.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private db: AngularFirestore, private dialog: MatDialog, private snackbar: MatSnackBar, private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    this.foodsRef = db.collection<Food>('foods');
    this.foodCategoriesRef = db.collection<FoodCategory>('food_categories', ref => {
      return ref.orderBy('foodCategoryNameLao', 'desc');
    });

    this.user.subscribe(user => {
      if (user) {
        this.username_info = user;
        this.loadFoodPage({ index: 0 });
      } else {
        router.navigateByUrl('login');
      }
    });
    this.checkOpenCashBal();
  }
  private user: Observable<firebase.User>;
  username_info: any;

  foodCategoriesRef: AngularFirestoreCollection<FoodCategory>;
  FoodCategories: Observable<any[]>;

  username: string = localStorage.getItem('username');

  foodsRef: AngularFirestoreCollection<Food>;
  foods: Observable<any[]>;

  cartsRef: AngularFirestoreCollection<Cart>;
  carts: Observable<any[]>;

  foodCartList: any = [];
  itemSelected: any = [];
  total = 0;

  localCart: any[] = [];
  items: any[] = [];
  usersRef: AngularFirestoreCollection<User>;
  users: Observable<any[]>;
  virtualCart: Cart[] = [];
  disablePaymentBtn = false;

  ngOnInit() {
    this.FoodCategories = this.foodCategoriesRef.valueChanges();
    if (this.username) {
      this.loadFoodPage({ index: 0 });
      this.totalCalculation();
      if (localStorage.getItem('cart')) {
        this.virtualCart = JSON.parse(localStorage.getItem('cart'));
      }
    } else {
      this.snackbar.open('Internet connection issue !!', 'OK', { duration: 2000 });
    }
  }
  loadFoodPage(page) {
    if (page.index === 0) {
      this.foods = this.db.collection<Food>('foods').snapshotChanges().pipe(map(change => {
        return change.map(a => {
          const foods = a.payload.doc.data();
          foods['id'] = a.payload.doc.id;
          return foods;
        });
      }));
    } else {
      this.foods = this.db.collection<Food>('foods', ref => {
        return ref.where('food_category', '==', page.tab.textLabel);
      }).snapshotChanges().pipe(map(change => {
        return change.map(a => {
          const foods = a.payload.doc.data();
          foods['id'] = a.payload.doc.id;
          return foods;
        });
      }));
    }
  }

  openSubFood(food) {
    const dialogRef = this.dialog.open(SubfoodsComponent, {
      width: '400px',
      data: {
        food: food,
        username: this.username
      }
    });
    dialogRef.afterClosed().subscribe(feedBack => {
      if (feedBack) {
        this.foodCartList.push(feedBack);
        this.addCartsToDb(feedBack);
      } else {
        return;
      }
    });
  }
  foodChoosed(food) {
    if (food.price === 0) {
      this.openSubFood(food);
    } else {
      const item = {
        'id': food.id,
        'foodId': food.foodId,
        'food': food.food_name,
        'food_name_en': food.food_name_en,
        'food_category': food.food_category,
        'price': food.price,
        'cost': food.cost,
        'quantity': 1,
        'total': food.price * 1,
        'username': this.username,
        'kitchen': food.kitchen,
      };
      this.addCartsToDb(item);
    }
  }
  removeFromlist(food) {
    if (food) {
      const items = JSON.parse(localStorage.getItem('cart'));
      const cartBuffers = [];
      // console.log(items);
      items.forEach((item, index) => {
        if (item.id === food.id) {
          items.splice(index, 1);
        } else {
          cartBuffers.push(item);
        }
      });
      if (cartBuffers.length > 0) {
        localStorage.setItem('cart', JSON.stringify(cartBuffers));
        this.loadCurrentCartStat();
        this.totalCalculation();
      } else {
        localStorage.removeItem('cart');
        this.virtualCart = [];
        this.totalCalculation();
      }
    }
  }
  totalCalculation() {
    this.total = 0;
    if (localStorage.getItem('cart')) {
      const items = JSON.parse(localStorage.getItem('cart'));
      items.forEach(item => {
        this.total += item.total;
      });
      // console.log(this.total);
    } else {
      // console.log(this.total);
      return;
    }
  }
  loadCurrentCartStat() {
    if (localStorage.getItem('cart')) {
      this.virtualCart = JSON.parse(localStorage.getItem('cart'));
    } else {
      this.virtualCart = [];
    }
  }
  addCartsToDb(food) {
    if (food) {
      if (this.virtualCart.length > 0) {
        let index = -1;
        for (let i = 0; i < this.virtualCart.length; i++) {
          if (this.virtualCart[i].foodId === food.foodId) {
            this.virtualCart[i].quantity += 1;
            this.virtualCart[i].total = this.virtualCart[i].quantity * this.virtualCart[i].price;
            index = 1;
            break;
          }
        }
        if (index === -1) {
          this.virtualCart.push(food);
        }
        this.totalCalculation();
      } else if (this.virtualCart.length === 0) {
        this.virtualCart.push(food);
        this.totalCalculation();
      }
      localStorage.setItem('cart', JSON.stringify(this.virtualCart));
      this.totalCalculation();
    }
  }
  addToCartCollection(cart) {
    if (cart) {
      this.db.collection<Cart>('carts').add(cart);
    }
  }
  loadCart() {
    this.items = [];
    if (localStorage.getItem('cart') === null) {
      return;
    }
    if (localStorage.getItem('cart') != null) {
      const cart = JSON.parse(localStorage.getItem('cart'));
      for (let i = 0; i < cart.length; i++) {
        const item = JSON.parse(cart[i]);
        this.items.push({
          food: item.food,
          quantity: item.quantity,
        });
      }
    }

  }

  openQuantity(cart) {
    const dialogRef = this.dialog.open(AddQuantityComponent, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe((q) => {
      if (q) {
        if (cart) {
          cart['quantity'] = q;
          let items = [];
          const cartBuffers = [];
          items = JSON.parse(localStorage.getItem('cart'));
          items.forEach(item => {
            if (item.foodId === cart.foodId) {
              item['quantity'] = q;
              item['total'] = (q * item.price);
              cartBuffers.push(item);
            } else {
              cartBuffers.push(item);
            }
          });
          if (cartBuffers.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cartBuffers));
            this.totalCalculation();
          }
        } else {
          return;
        }
        this.totalCalculation();
      } else {
        return;
      }
    });
    this.totalCalculation();
  }
  addnote(cart) {
    const dialogRef = this.dialog.open(AddNoteComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe((note) => {
      if (note) {
        if (cart) {
          cart['note'] = note.note;
          let items = [];
          const cartBuffers = [];

          items = JSON.parse(localStorage.getItem('cart'));
          items.forEach(item => {
            if (item.foodId === cart.foodId) {
              item['note'] = note.note;
              cartBuffers.push(item);
            } else {
              cartBuffers.push(item);
            }
          });
          if (cartBuffers.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cartBuffers));
          }
        } else {
          return;
        }
      } else {
        return;
      }
    });
  }
  openPaymentCash() {
    if (this.total > 0 && this.username) {
      // console.log(this.username);
      const dialogCashRef = this.dialog.open(PaymentCashComponent, {
        width: '800px',
        data: {
          cart: this.virtualCart,
          total: this.total,
          username: this.username
        }
      });
      dialogCashRef.afterClosed().subscribe(res => {
        if (res) {
          this.loadCurrentCartStat();
          this.totalCalculation();
          this.snackbar.open('Order completed', 'ok', { duration: 1000, verticalPosition: 'top' });
        } else {
          this.loadCurrentCartStat();
          this.totalCalculation();
          return;
        }
      });
    }
  }
  async checkOpenCashBal() {
    const currentDate = new DatePipe('en-us').transform(new Date(), 'dd-MMM-yyyy');
    let cashloadsOb: Observable<any[]>;
    let countCashLoad = 0;
    cashloadsOb = await this.db.collection<CashLoad>('cashloads', ref => {
      return ref.where('closeby', '==', localStorage.getItem('username'));
    }).snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as CashLoad;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));

    let c = await cashloadsOb.subscribe(csh => {
      countCashLoad = csh.length;
    });

    if (countCashLoad > 0) {
      cashloadsOb.subscribe(cashloads => {
        cashloads.forEach(casload => {
          const loadDate = new DatePipe('en-us').transform(casload.loadDateTime.toDate(), 'dd-MMM-yyyy');
          if (currentDate === loadDate && casload.loadApproved === true) {
            this.snackbar.open('Cash opened and Approved', 'OK', { duration: 2000 });
          } else {
            this.snackbar.open('Please load cash before sell', 'OK', { duration: 2000 });
            this.router.navigateByUrl('cashloads');
          }
        });
      });
    } else {
      this.snackbar.open('Please load cash before sell', 'OK', { duration: 2000 });
      this.router.navigateByUrl('cashloads');
    }
  }
}
