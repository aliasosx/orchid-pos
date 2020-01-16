import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AddNoteComponent } from 'src/app/dialogs/add-note/add-note.component';
import { CouponAddPosComponent } from 'src/app/dialogs/coupon-add-pos/coupon-add-pos.component';
import { DiscSelectionComponent } from 'src/app/dialogs/disc-selection/disc-selection.component';
import { PaymentCashComponent } from 'src/app/dialogs/payment-cash/payment-cash.component';
import { SubfoodsComponent } from 'src/app/dialogs/subfoods/subfoods.component';
import { Cart } from 'src/app/interfaces/cart';
import { Food } from 'src/app/interfaces/food';
import { User } from 'src/app/interfaces/user';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { MembersService } from 'src/app/services/members.service';
import { PromotionsService } from 'src/app/services/promotions.service';

import { AddQuantityComponent } from './../../dialogs/add-quantity/add-quantity.component';
import { FoodCategory } from './../../interfaces/foodCategory';

declare var swal: any;

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {
  @ViewChild('memberInput')
  memberInput: any;

  // tslint:disable-next-line: max-line-length
  constructor(private db: AngularFirestore, private dialog: MatDialog, private snackbar: MatSnackBar, private _firebaseAuth: AngularFireAuth, private router: Router, private backendServices: BackendServiceService, private promotionService: PromotionsService, private memberService: MembersService) {
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
    this.loadDiscs();
    this.loadDeriveries();
  }
  private user: Observable<firebase.User>;
  username_info: any;
  deriveries: any;
  foodCategoriesRef: AngularFirestoreCollection<FoodCategory>;
  FoodCategories: Observable<any[]>;
  exchangeRates: any;
  username: string = localStorage.getItem('username');


  foodsRef: AngularFirestoreCollection<Food>;
  // foods: Observable<any[]>;

  cartsRef: AngularFirestoreCollection<Cart>;
  carts: Observable<any[]>;

  deriveryOption = false;

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
  discs: any;

  searchFoodName: any;
  selectedCate: any;

  promotions: any;
  groupCounting = 0;


  member: any;
  showMember = 'hidden';
  beforePoints = 0;
  afterPoints = 0;
  orderForm: FormGroup;

  ngOnInit() {

    if (this.username) {
      this.loadFoodTypes();
      this.loadFoodPage();
      this.totalCalculation();
      this.getExchangeRate();
      if (localStorage.getItem('cart')) {
        this.virtualCart = JSON.parse(localStorage.getItem('cart'));
      }
    } else {
      this.snackbar.open('Internet connection issue !!', 'OK', { duration: 2000 });
    }

    this.orderForm = new FormGroup({
      memberId: new FormControl(),
      memberName: new FormControl()
    });
    if (localStorage.getItem('memberInfo')) {
      this.cardNoSelected(JSON.parse(localStorage.getItem('memberInfo')).cardNo);
    } else {
      this.initializeMember();
    }
    if (JSON.parse(localStorage.getItem('derivery'))) {
      this.deriveryOption = JSON.parse(localStorage.getItem('derivery'));
      if (JSON.parse(localStorage.getItem('derivery')) === true) {
        swal({
          title: 'ທ່ານໄດ້ເລືອກຮູບແບບ ການຈັດສົ່ງ',
          text: 'ກະລຸນາກວດສອບ ຮູບແບບແບບການຈັດສົ່ງ ລາຄາຈະແຕກຕ່າງຈາກປົກກະຕິ',
          icon: 'warning',
          timer: 5000,
        });
      }
    }
    this.memberInput.nativeElement.focus();
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
        // console.log(fd);
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
  async foodChoosed(food) {
    // Start Choose Food

    if (this.deriveryOption === false) {
      this.promotionService.discountsDetailFoodId(food.id).then(r => {
        r.subscribe(promotion => {
          // console.log(promotion);
          if (promotion[0] && promotion[0].discountAmt) {
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
                'discount': promotion[0].discountAmt,
                'quantity': 1,
                'total_discount': promotion[0].discountAmt,
                'total': (food.price * 1) - promotion[0].discountAmt,
                'username': JSON.parse(localStorage.getItem('usrObj')).username,
                'kitchen': food.kitchenName,
              };
              this.addCartsToDb(item);
            }
            // return promotion[0].discountAmt;
          } else if (promotion[0] && promotion[0].discountTypeId !== 3) {
            this.promotionService.getDiscountAdditionalFoodByDiscountId(promotion[0].dId).then(r => {
              r.subscribe(aFood => {
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
                    'discount': 0,
                    'cost': food.cost,
                    'quantity': 1,
                    'total_discount': promotion[0].discountAmt,
                    'total': food.price * 1,
                    'username': JSON.parse(localStorage.getItem('usrObj')).username,
                    'kitchen': food.kitchenName,
                  };
                  this.addCartsToDb(item);
                }
                if (aFood) {
                  this.backendServices.getFoodDisplayByFoodId(aFood[0].foodId).then(rf => {
                    rf.subscribe(a_food => {
                      const food_add = a_food[0];
                      const item = {
                        'id': food_add.id,
                        'foodId': food_add.id,
                        'food': food_add.food_name,
                        'food_name_en': food_add.food_name_en,
                        'food_category': food_add.food_category,
                        'price': aFood[0].price,
                        'discount': 0,
                        'cost': food_add.cost,
                        'quantity': aFood[0].quantity,
                        'total_discount': promotion[0].discountAmt,
                        'total': aFood[0].price * aFood[0].quantity,
                        'username': JSON.parse(localStorage.getItem('usrObj')).username,
                        'kitchen': food_add.kitchenName,
                      };
                      this.addCartsToDb(item);
                    });
                  });
                }
              });
            });
          } else {
            console.log('No Promotion');
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
                'discount': 0,
                'cost': food.cost,
                'quantity': 1,
                'total_discount': 0,
                'total': food.price * 1,
                'username': JSON.parse(localStorage.getItem('usrObj')).username,
                'kitchen': food.kitchenName,
              };
              this.addCartsToDb(item);
            }
          }
        });
      });
    } else if (this.deriveryOption === true) {
      // Derivery Price Swap
      this.promotionService.discountsDetailFoodId(food.id).then(r => {
        r.subscribe(promotion => {
          // console.log(promotion);
          if (promotion[0] && promotion[0].discountAmt) {
            if (food.isParent === 1) {
              this.openSubFood(food);
            } else {
              const item = {
                'id': food.id,
                'foodId': food.id,
                'food': food.food_name,
                'food_name_en': food.food_name_en,
                'food_category': food.food_category,
                'price': food.deriveryPrice,
                'cost': food.deriveryCost,
                'discount': promotion[0].discountAmt,
                'quantity': 1,
                'total_discount': promotion[0].discountAmt,
                'total': (food.deriveryPrice * 1) - promotion[0].discountAmt,
                'username': JSON.parse(localStorage.getItem('usrObj')).username,
                'kitchen': food.kitchenName,
              };

              this.addCartsToDb(item);
            }
            // return promotion[0].discountAmt;
          } else if (promotion[0] && promotion[0].discountTypeId !== 3) {
            this.promotionService.getDiscountAdditionalFoodByDiscountId(promotion[0].dId).then(r => {
              r.subscribe(aFood => {
                if (food.isParent === 1) {
                  this.openSubFood(food);
                } else {
                  const item = {
                    'id': food.id,
                    'foodId': food.id,
                    'food': food.food_name,
                    'food_name_en': food.food_name_en,
                    'food_category': food.food_category,
                    'price': food.deriveryPrice,
                    'cost': food.deriveryCost,
                    'discount': 0,
                    'quantity': 1,
                    'total_discount': promotion[0].discountAmt,
                    'total': food.deriveryPrice * 1,
                    'username': JSON.parse(localStorage.getItem('usrObj')).username,
                    'kitchen': food.kitchenName,
                  };
                  this.addCartsToDb(item);
                }
                if (aFood) {
                  this.backendServices.getFoodDisplayByFoodId(aFood[0].foodId).then(rf => {
                    rf.subscribe(a_food => {
                      const food_add = a_food[0];
                      const item = {
                        'id': food_add.id,
                        'foodId': food_add.id,
                        'food': food_add.food_name,
                        'food_name_en': food_add.food_name_en,
                        'food_category': food_add.food_category,
                        'price': aFood[0].price,
                        'discount': 0,
                        'cost': food_add.cost,
                        'quantity': aFood[0].quantity,
                        'total_discount': promotion[0].discountAmt,
                        'total': aFood[0].price * aFood[0].quantity,
                        'username': JSON.parse(localStorage.getItem('usrObj')).username,
                        'kitchen': food_add.kitchenName,
                      };
                      this.addCartsToDb(item);
                    });
                  });
                }
              });
            });
          } else {
            console.log('No Promotion');
            if (food.isParent === 1) {
              this.openSubFood(food);
            } else {
              const item = {
                'id': food.id,
                'foodId': food.id,
                'food': food.food_name,
                'food_name_en': food.food_name_en,
                'food_category': food.food_category,
                'price': food.deriveryPrice,
                'cost': food.deriveryCost,
                'discount': 0,
                'quantity': 1,
                'total_discount': 0,
                'total': food.deriveryPrice * 1,
                'username': JSON.parse(localStorage.getItem('usrObj')).username,
                'kitchen': food.kitchenName,
              };
              this.addCartsToDb(item);
            }
          }
        });
      });
    }


    // End Food Select
  }
  removeFromlist(food) {
    if (food) {
      this.groupCounting = 0;
      const items = JSON.parse(localStorage.getItem('cart'));
      const cartBuffers = [];
      items.forEach((item, index) => {
        if (item.id === food.id) {
          items.splice(index, 1);
        } else {
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
      if (!this.member) {
        this.loadCurrentPoint(16, this.total);
      } else {
        this.loadCurrentPoint(this.member['mId'], this.total);
      }
    } else {
      if (!this.member) {
        this.loadCurrentPoint(16, this.total);
      } else {
        this.loadCurrentPoint(this.member['mId'], this.total);
      }
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
            this.virtualCart[i].total_discount = this.virtualCart[i].discount * this.virtualCart[i].quantity;
            // tslint:disable-next-line: max-line-length
            this.virtualCart[i].total = this.virtualCart[i].quantity * this.virtualCart[i].price - this.virtualCart[i].total_discount;
            index = 1;
            // this.checkPromotion(food.id, this.virtualCart[i].quantity, this.virtualCart[i]);
            break;
          }
        }
        if (index === -1) {
          this.virtualCart.push(food);
          // this.checkPromotion(food.id, 1, food);
        }
        this.totalCalculation();
      } else if (this.virtualCart.length === 0) {
        this.virtualCart.push(food);
        // this.checkPromotion(food.id, 1, food);
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
                item['total_discount'] = item['discount'] * q;
                item['total'] = (q * item.price) - item['discount'] * q;
                // this.checkPromotion(item.foodId, q, item);
                cartBuffers.push(item);
              } else {
                cartBuffers.push(item);
              }
            } else {
              if (item.foodId === cart.foodId) {
                item['quantity'] = q;
                item['total'] = (q * item.price) - item['discount'] * q;
                // this.checkPromotion(item.foodId, q, item);
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
      const dialogCashRef = this.dialog.open(PaymentCashComponent, {
        width: '800px',
        data: {
          cart: this.virtualCart,
          total: this.total,
          username: this.username,
          member: {
            memberId: this.member.mId,
            cardNo: this.member.cardNo,
            memberName: this.member.fullname,
            memberPoints: this.beforePoints
          }
        }
      });
      dialogCashRef.afterClosed().subscribe(res => {
        if (res) {
          this.loadCurrentCartStat();
          this.totalCalculation();
          this.setMemberStaticDefault();
          this.clearCardValue();
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

    this.promotionService.getpromotionsByFoodId(foodId).then(r => {
      r.subscribe(promotions => {
        this.promotions = promotions;

        if (this.promotions.length > 0) {
          // tslint:disable-next-line: max-line-length
          // this.snackbar.open('Promotion found for food ' + this.promotions[0].promotion_name + 'Quantity ' + quantity, 'OK', { duration: 10000 });
          if (quantity % this.promotions[0].promotion_min_quantity === 1 && quantity > this.promotions[0].promotion_min_quantity) {
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

    // Check promotion by Group

    this.backendServices.getFoodById(foodId).then(r => {
      r.subscribe(foodx => {
        this.promotionService.getPromotionGroupByGroupId(foodx['foodTypeId']).then(rs => {
          rs.subscribe(promotionGroup => {
            this.groupCounting += 1;
            this.promotions = promotionGroup;

            if (this.promotions.length > 0) {
              // tslint:disable-next-line: max-line-length
              if (this.groupCounting % this.promotions[0].promotion_min_quantity === 1 && this.groupCounting > this.promotions[0].promotion_min_quantity) {
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
                      'note': '',
                    };
                    console.log('=========== list item =================');
                    // console.log(item);
                    if (item) {
                      this.addCartsToDb(item);
                    }
                  });
                });
              }
            }
          });
        });
      });
    });
  }
  loadDiscs() {
    this.backendServices.getDiscs().then(r => {
      r.subscribe(discs => {
        this.discs = discs;
      });
    });
  }
  discSelected(discId, cart) {
    this.backendServices.getDiscById(discId).then(r => {
      r.subscribe(disc => {
        if (disc['length'] > 0) {
          if (cart) {
            let items = [];
            const cartBuffers = [];
            items = JSON.parse(localStorage.getItem('cart'));
            items.forEach(item => {
              if (item.foodId === cart.foodId) {
                if (disc[0].multiplier === 1) {
                  item['orgPrice'] = item['price'];
                  item['orgCost'] = item['cost'];
                  item['disc'] = disc[0].disc_name;
                  item['price'] = (item['price'] + disc[0].price) * disc[0].multiplier;
                  item['cost'] = (item['cost'] + disc[0].cost) * disc[0].multiplier;
                } else if (disc[0].multiplier === 0) {
                  item['disc'] = disc[0].disc_name;
                  item['orgPrice'] = item['orgPrice'];
                  item['orgCost'] = item['orgCost'];
                  item['price'] = 0;
                  item['cost'] = 0;
                } else if (item['price'] === 0 && disc[0].multiplier === 1) {
                  item['orgPrice'] = item['orgPrice'];
                  item['orgCost'] = item['orgCost'];
                  item['disc'] = disc[0].disc_name;
                  item['price'] = (item['price'] + disc[0].price) * disc[0].multiplier;
                  item['cost'] = (item['cost'] + disc[0].cost) * disc[0].multiplier;
                }
                item['total'] = item['price'] * item['quantity'];
                item['sign'] = disc[0].sign;
                cartBuffers.push(item);
              } else {
                cartBuffers.push(item);
              }
            });
            if (cartBuffers.length > 0) {
              localStorage.setItem('cart', JSON.stringify(cartBuffers));
              this.totalCalculation();
              this.loadCurrentCartStat();
            }
          } else {
            return;
          }
        } else {
          let items = [];
          const cartBuffers = [];
          items = JSON.parse(localStorage.getItem('cart'));
          items.forEach(item => {
            if (item.foodId === cart.foodId) {
              item['disc'] = '';
              item['disc_price'] = 0;
              item['price'] = item['orgPrice'];
              item['cost'] = item['orgCost'];
              item['total'] = item['price'] * item['quantity'];
              item['sign'] = 'N';
              cartBuffers.push(item);
            } else {
              cartBuffers.push(item);
            }
          });
          if (cartBuffers.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cartBuffers));
          }
          this.totalCalculation();
          this.loadCurrentCartStat();
        }
      });
    });
  }
  cardNoSelected(cardNo) {
    if (cardNo.length === 5) {
      const memberInfo = {
        cardNo: cardNo,
      };
      localStorage.setItem('memberInfo', JSON.stringify(memberInfo));

      this.memberService.getMemberByCardNo(cardNo).then(r => {
        r.subscribe(member => {
          if (member['length'] === 0) {
            this.showMember = '';
            this.memberService.getMemberByCardNo('99999').then(rx => {
              rx.subscribe(memberDefault => {
                this.member = memberDefault[0];
                this.showMember = '';
                const m = memberDefault[0];
                this.orderForm.get('memberId').setValue(m['mId']);
                this.orderForm.get('memberName').setValue(m['cardNo'] + '|' + m['fullname'] + '|' + m['mobile']);
                this.loadCurrentPoint(m['mId'], this.total);
              });
            });
          } else {
            this.member = member[0];
            this.showMember = '';
            const m = member[0];
            this.orderForm.get('memberId').setValue(m['mId']);
            this.orderForm.get('memberName').setValue(m['cardNo'] + '|' + m['fullname'] + '|' + m['mobile']);
            this.loadCurrentPoint(m['mId'], this.total);
          }
        });
      });
    } else if (cardNo.length === 0) {
      const memberInfo = {
        cardNo: '99999',
      };
      localStorage.setItem('memberInfo', JSON.stringify(memberInfo));
      this.memberService.getMemberByCardNo('99999').then(r => {
        r.subscribe(member => {
          if (!member) { this.showMember = 'hidden'; return; }
          this.member = member[0];
          this.showMember = '';
          const m = member[0];
          this.orderForm.get('memberId').setValue(m['mId']);
          this.orderForm.get('memberName').setValue(m['cardNo'] + '|' + m['fullname'] + '|' + m['mobile']);
          this.loadCurrentPoint(m['mId'], this.total);
        });
      });
    }
  }

  setMemberStaticDefault() {
    const memberInfo = {
      cardNo: '99999',
    };
    localStorage.setItem('memberInfo', JSON.stringify(memberInfo));
  }

  initializeMember() {
    const memberInfo = {
      cardNo: '99999',
    };
    localStorage.setItem('memberInfo', JSON.stringify(memberInfo));
    this.memberService.getMemberByCardNo('99999').then(r => {
      r.subscribe(member => {
        this.member = member[0];
        this.showMember = '';
        const m = member[0];
        this.orderForm.get('memberId').setValue(m['mId']);
        this.orderForm.get('memberName').setValue(m['cardNo'] + '|' + m['fullname'] + '|' + m['mobile']);
        this.loadCurrentPoint(m['mId'], this.total);
      });
    });
  }
  async loadCurrentPoint(memberId, total_price) {
    if (!total_price) { total_price = 0; }
    await this.memberService.getCurrentPoint(memberId, total_price).then(r => {
      r.subscribe(pointMaster => {
        this.beforePoints = pointMaster[0].points;
        // console.log(pointMaster);
      });
    });
  }
  clearCardValue() {
    this.memberInput.nativeElement.value = '';
    this.initializeMember();
  }
  loadDeriveries() {
    this.backendServices.getDeriveries().then(r => {
      r.subscribe(deriveries => {
        this.deriveries = deriveries;
      });
    });
  }
  discSelect(food) {
    const discSelectionDialogRef = this.dialog.open(DiscSelectionComponent, {
      width: '400px',
      data: food,
    });
    discSelectionDialogRef.afterClosed().subscribe(discSize => {
      console.log(discSize);
    });
  }
  async getDiscountByFoodId(foodId) {
    this.promotionService.discountsDetailFoodId(foodId).then(r => {
      r.subscribe(promotion => {
        if (promotion) {
          console.log(promotion[0]);
          return promotion[0].discountAmt;
        } else {
          console.log('No Promotion Found');
          return 0;
        }
      });
    });
  }
  deriverChange(e) {
    swal({
      title: 'ແນ່ໃຈບໍ່ວ່າຕ້ອງການປ່ຽນ',
      text: 'ການປ່ຽນຮູບແບບການສົ້ງ ຈະຕ້ອງໄດ້ ລົບລາຍການທີ້ເລຶອກໄວ້ອອກໝົດ',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((result) => {
      if (result) {
        localStorage.removeItem('cart');
        this.deriveryOption = e;
        this.virtualCart = [];
        this.totalCalculation();
        localStorage.setItem('derivery', JSON.stringify(this.deriveryOption));
      } else {
        this.deriveryOption = !e;
        localStorage.setItem('derivery', JSON.stringify(this.deriveryOption));
      }
    }).catch(() => {
      this.deriveryOption = !e;
      return;
    });
  }
  getExchangeRate() {
    this.backendServices.getExchangeRate().then(exch => {
      exch.subscribe(rates => {
        this.exchangeRates = rates;
        console.log(this.exchangeRates);
      });
    });
  }
}
