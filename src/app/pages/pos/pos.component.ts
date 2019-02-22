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
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {

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
  total: number = 0;

  localCart: any[] = [];
  items: any[] = [];
  usersRef: AngularFirestoreCollection<User>;
  users: Observable<any[]>;
  virtualCard: Cart[] = [];
  disablePaymentBtn = false;

  ngOnInit() {
    this.FoodCategories = this.foodCategoriesRef.valueChanges();
    if (this.username) {
      this.carts = this.db.collection<Cart>('carts', ref => {
        return ref.where('username', '==', this.username);
      }).snapshotChanges().pipe(map(change => {
        return change.map(a => {
          const data = a.payload.doc.data();
          data['id'] = a.payload.doc.id;
          return data;
        });
      }));
    }
    this.loadFoodPage({ index: 0 });
    this.totalCalculation();
    if (localStorage.getItem('cart')) {
      this.virtualCard = JSON.parse(localStorage.getItem('cart'));
    }
  }
  loadFoodPage(page) {
    if (page.index == 0) {
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
    if (food.price == 0) {
      this.openSubFood(food);
    } else {
      let item = {
        'id': food.id,
        'foodId': food.foodId,
        'food': food.food_name,
        'food_category': food.food_category,
        'price': food.price,
        'cost': food.cost,
        'quantity': 1,
        'total': food.price * 1,
        'username': this.username,
        'kitchen': food.kitchen,
      }
      this.addCartsToDb(item);
    }
  }
  removeFromlist(food) {
    if (food) {
      /*
      this.db.collection<Cart>('carts').doc(food.id).delete().then(() => {
      });
      */

    }
    this.totalCalculation();
  }
  totalCalculation() {
    this.total = 0;
    this.virtualCard.forEach(v => {
      this.total += v.total;
    });
    /*
    this.db.collection<Cart>('carts').get().subscribe(f => {
      f.forEach(item => {
        this.total += item.data().total;
      })
    });
    */

  }
  addCartsToDb(food) {
    if (food) {
      if (this.virtualCard.length > 0) {
        let index = -1;
        for (var i = 0; i < this.virtualCard.length; i++) {
          if (this.virtualCard[i].foodId === food.foodId) {
            this.virtualCard[i].quantity += 1;
            this.virtualCard[i].total = this.virtualCard[i].quantity * this.virtualCard[i].price;
            index = 1;
            break;
          }
        }
        if (index == -1) {
          this.virtualCard.push(food);
        }
        this.totalCalculation();
      } else if (this.virtualCard.length == 0) {
        this.virtualCard.push(food);
        this.totalCalculation();
      }
      localStorage.setItem('cart', JSON.stringify(this.virtualCard));
      /*
      this.db.collection<Cart>('carts').get().subscribe(items => {
        if (!items.empty) {
          items.docs.forEach(item => {
            if (item.data().foodId === food.foodId) {
              let cart = item.data();
              cart['quantity'] = item.data().quantity + 1;
              cart['total'] = item.data().price * cart.quantity;
              this.db.collection<Cart>('carts').doc(item.id).update(cart).then(() => {
                this.totalCalculation();
              });
            }
          });
        } else {
          this.db.collection<Cart>('carts').add(food).then(() => {
            this.totalCalculation();
          }).catch((err) => {
            console.log(err);
          });
        }
      });

      /*
      this.db.collection<Cart>('carts', ref => {
        return ref.where('food', '==', food.food)
      }).get().subscribe((item) => {
        if (!item.empty) {
          item.docs.forEach(doc => {
            let cart = doc.data();
            cart['quantity'] = doc.data().quantity + 1;
            cart['total'] = doc.data().price * cart.quantity;
            this.db.collection('carts').doc(doc.id).update(cart).then(() => {
              this.totalCalculation();
            });
          });
        } else {
          // add new item

          this.db.collection('carts').add(food).then(() => {
            this.totalCalculation();
          }).catch((err) => {
            console.log(err);
          });

        }
      });

      */


    }
  }
  addToCartCollection(cart) {
    console.log(cart);
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
      let cart = JSON.parse(localStorage.getItem('cart'));
      for (var i = 0; i < cart.length; i++) {
        let item = JSON.parse(cart[i]);
        this.items.push({
          food: item.food,
          quantity: item.quantity,
        });
      }
    }

  }

  addnote(cart) {
    const dialogRef = this.dialog.open(AddNoteComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((note) => {
      if (note) {
        if (cart) {
          cart['note'] = note.note;
          this.db.collection<Cart>('carts').doc(cart.id).update(cart).then(() => {
          });
        } else {
          return;
        }
      } else {
        return;
      }
    });
  }
  openPaymentCash() {
    if (this.total > 0) {
      const dialogCashRef = this.dialog.open(PaymentCashComponent, {
        width: '800px',
        data: {
          total: this.total,
          username: this.username
        }
      });
      dialogCashRef.afterClosed().subscribe(res => {
        if (res) {
          this.snackbar.open('Order completed', 'ok', { duration: 1000, verticalPosition: 'top' });
          this.totalCalculation();
        } else {
          return;
        }
      });
    }
  }
  opentBanksChannel(total) {
    const dialogCashRef = this.dialog.open(PaymentBanksChannelComponent, {
      width: '800px',
      data: {
        total: this.total
      }
    });
  }
}
