import { AddQuantityComponent } from './../../dialogs/add-quantity/add-quantity.component';
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
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { CouponAddPosComponent } from 'src/app/dialogs/coupon-add-pos/coupon-add-pos.component';
import { PromotionsService } from 'src/app/services/promotions.service';

declare var swal: any;

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private db: AngularFirestore, private dialog: MatDialog, private snackbar: MatSnackBar, private _firebaseAuth: AngularFireAuth, private router: Router, private backendServices: BackendServiceService, private promotionService: PromotionsService) {
    this.user = _firebaseAuth.authState;
    this.foodsRef = db.collection<Food>('foods');
    this.foodCategoriesRef = db.collection<FoodCategory>('food_categories', ref => {
      return ref.orderBy('foodCategoryNameLao', 'desc');
    });
    if (localStorage.getItem('token')) {
      this.username_info = JSON.parse(localStorage.getItem('usrObj'));
      this.loadFoodPage();
    } else {
      router.navigateByUrl('login');
    }
    this.checkOpenCashBal();
  }
  private user: Observable<firebase.User>;
  username_info: any;

  foodCategoriesRef: AngularFirestoreCollection<FoodCategory>;
  FoodCategories: Observable<any[]>;

  username: string = localStorage.getItem('username');

  foodsRef: AngularFirestoreCollection<Food>;
  // foods: Observable<any[]>;

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

  foodTypes: any;
  foods: any;

  searchFoodName: any;
  selectedCate: any;

  promotions: any;

  ngOnInit() {

    if (this.username) {
      this.loadFoodTypes();
      this.loadFoodPage();
      this.totalCalculation();
      if (localStorage.getItem('cart')) {
        this.virtualCart = JSON.parse(localStorage.getItem('cart'));
        // console.log(this.virtualCart);
      }
    } else {
      this.snackbar.open('Internet connection issue !!', 'OK', { duration: 2000 });
    }
  }

  loadFoodTypes() {
    this.backendServices.getFoodTypes().then(foodtypes => {
      foodtypes.subscribe(ft => {
        this.foodTypes = ft;
      });
    });
  }

  loadFoodPage() {
    this.backendServices.getFoodDisplay().then(foods => {
      foods.subscribe(fd => {
        this.foods = fd;
      });
    });
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
    // console.log(food);
    if (food.isParent === 1) {
      this.openSubFood(food);
    } else {
      const item = {
        'id': food.id,
        'foodId': food.id,
        'food': food.food_name,
        'food_name_en': food.food_name_en,
        'food_category': food.food_category,
        'price': food.price,
        'cost': food.cost,
        'quantity': 1,
        'total': food.price * 1,
        'username': JSON.parse(localStorage.getItem('usrObj')).username,
        'kitchen': food.kitchenName,
      };
      this.addCartsToDb(item);
    }
  }
  removeFromlist(food) {
    if (food) {
      const items = JSON.parse(localStorage.getItem('cart'));
      const cartBuffers = [];
      items.forEach((item, index) => {
        if (item.id === food.id) {
          items.splice(index, 1);
        } else {
          // cartBuffers.push(item);
        }
      });
      if (items.length > 0) {
        localStorage.setItem('cart', JSON.stringify(items));
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
      // this.loadCurrentCartStat();
    } else {
      return;
    }
  }
  loadCurrentCartStat() {
    if (localStorage.getItem('cart')) {
      this.virtualCart = JSON.parse(localStorage.getItem('cart'));
    } else {
      this.virtualCart = [];
    }
    // console.log(this.virtualCart);
  }
  addCartsToDb(food) {
    if (food) {
      if (this.virtualCart.length > 0) {
        let index = -1;
        for (let i = 0; i < this.virtualCart.length; i++) {
          if (this.virtualCart[i].foodId === food.foodId && this.virtualCart[i].subfoodId === food.subfoodId) {
            this.virtualCart[i].quantity += 1;
            this.virtualCart[i].total = this.virtualCart[i].quantity * this.virtualCart[i].price;
            index = 1;
            this.checkPromotion(food.id, this.virtualCart[i].quantity, this.virtualCart[i]);
            break;
          }
        }
        if (index === -1) {
          this.virtualCart.push(food);
          this.checkPromotion(food.id, 1, food);
        }
        this.totalCalculation();
      } else if (this.virtualCart.length === 0) {
        this.virtualCart.push(food);
        this.checkPromotion(food.id, 1, food);
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
            if (item.subfoodId) {
              if (item.foodId === cart.foodId && item.subfoodId === cart.subfoodId) {
                item['quantity'] = q;
                item['total'] = (q * item.price);
                this.checkPromotion(item.foodId, q, item);
                cartBuffers.push(item);
              } else {
                cartBuffers.push(item);
              }
            } else {
              if (item.foodId === cart.foodId) {
                item['quantity'] = q;
                item['total'] = (q * item.price);
                this.checkPromotion(item.foodId, q, item);
                cartBuffers.push(item);
              } else {
                cartBuffers.push(item);
              }
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
        this.loadCurrentCartStat();
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
      // console.log('before send to payment');
      // console.log(this.virtualCart);
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
          this.snackbar.open('Order completed', 'ok', { duration: 1000 });
        } else {
          this.loadCurrentCartStat();
          this.totalCalculation();
          return;
        }
      });
    }
  }
  async checkOpenCashBal() {
    this.backendServices.checkCashstat(JSON.parse(localStorage.getItem('usrObj')).id).then((resp_csh_stat) => {
      resp_csh_stat.subscribe(resp_csh => {
        if (resp_csh['status'] === 0) {
          swal({
            title: 'ບໍ່ທັນເອົາເງິນເຂົ້າ ລີ້ນຊັກເງິນກ່ອນ',
            text: 'ເອົາເງິນເຂົ້າ ລີ້ນຊັກເງິນກ່ອນເປິດການຂາຍທຸກຄັ້ງ',
            icon: 'warning',
            timer: 4000,
            dangerMode: true,
          }).then(() => {
            this.snackbar.open('Please load cash before sell', 'OK', { duration: 2000 });
            this.router.navigateByUrl('cashloads');
          }).catch(() => {
            this.snackbar.open('Please load cash before sell', 'OK', { duration: 2000 });
            this.router.navigateByUrl('cashloads');
          });
        } else {
          this.snackbar.open('Cash opened and Approved', 'OK', { duration: 2000 });
        }
      });
    });

  }
  onSelect(selected) {
    // console.log(this.selectedCate);
  }

  addCoupon() {
    const dialogRef = this.dialog.open(CouponAddPosComponent, { width: '600px' });
  }
  checkPromotion(foodId, quantity, food) {
    // console.log(food);
    this.promotionService.getpromotionsByFoodId(foodId).then(r => {
      r.subscribe(promotions => {
        this.promotions = promotions;

        if (this.promotions.length > 0) {
          // tslint:disable-next-line: max-line-length
          // this.snackbar.open('Promotion found for food ' + this.promotions[0].promotion_name + 'Quantity ' + quantity, 'OK', { duration: 10000 });
          if (quantity > this.promotions[0].promotion_min_quantity) {
            // tslint:disable-next-line: max-line-length
            this.snackbar.open('Promotion Condition Matched ' + this.promotions[0].promotion_name + 'Quantity ' + quantity, 'OK', { duration: 10000 });

            this.promotionService.getDiscountByFoodId(this.promotions[0].discountId).then(rx => {
              rx.subscribe(discountFood => {
                console.log(discountFood);
                const item = {
                  'id': discountFood[0].fId,
                  'foodId': discountFood[0].fId,
                  'food': discountFood[0].food_name,
                  'food_name_en': discountFood[0].food_name_en,
                  'food_category': discountFood[0].food_category,
                  'price': discountFood[0].price,
                  'cost': discountFood[0].cost,
                  'quantity': 1,
                  'total': discountFood[0].price * 1,
                  'username': JSON.parse(localStorage.getItem('usrObj')).username,
                  'kitchen': discountFood['kitchenName'],
                  'note': this.promotions[0].promotion_name,
                };
                console.log('=========== list item =================');
                console.log(item);
                if (item) {
                  this.addCartsToDb(item);
                }
              });
            });
          }
        }
      });
    });
  }
}
