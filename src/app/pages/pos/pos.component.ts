import { map } from 'rxjs/operators';
import { Food } from 'src/app/interfaces/food';
import { Observable } from 'rxjs';
import { FoodCategory } from './../../interfaces/foodCategory';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SubfoodsComponent } from 'src/app/dialogs/subfoods/subfoods.component';
import { Cart } from 'src/app/interfaces/cart';
import { AddNoteComponent } from 'src/app/dialogs/add-note/add-note.component';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialog: MatDialog) {
    this.foodCategoriesRef = db.collection<FoodCategory>('food_categories', ref => {
      return ref.orderBy('foodCategoryNameLao', 'desc');
    });
    this.foodsRef = db.collection<Food>('foods');
    this.cartsRef = db.collection<Cart>('carts', ref => {
      return ref.where('username', '==', this.username);
    });
  }

  foodCategoriesRef: AngularFirestoreCollection<FoodCategory>;
  FoodCategories: Observable<any[]>;

  username: string = 'administrator';

  foodsRef: AngularFirestoreCollection<Food>;
  foods: Observable<any[]>;

  cartsRef: AngularFirestoreCollection<Cart>;
  carts: Observable<any[]>;

  foodCartList: any = [];
  itemSelected: any = [];
  total: number = 0;

  ngOnInit() {
    this.FoodCategories = this.foodCategoriesRef.valueChanges();
    this.foods = this.foodsRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data();
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
    this.carts = this.cartsRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data();
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));

    this.totalCalculation();
  }
  openSubFood(food) {
    const dialogRef = this.dialog.open(SubfoodsComponent, {
      width: '400px',
      data: food
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
        'food': food.food_name,
        'price': food.price,
        'quantity': 1,
        'total': food.price * 1,
        'username': 'administrator'
      }
      this.addCartsToDb(item);
    }
    this.totalCalculation();

  }
  removeFromlist(food) {
    if (food) {
      this.cartsRef.doc(food.id).delete().then(() => {
      });
    }
    this.totalCalculation();
  }
  totalCalculation() {
    this.total = 0;
    this.db.collection<Cart>('carts').get().subscribe(f => {
      f.forEach(item => {
        this.total += item.data().total;
      })
    });

  }
  addCartsToDb(food) {
    //Check cart item exist
    //console.log(food);
    if (food) {
      this.db.collection<Cart>('carts', ref => {
        return ref.where('food', '==', food.food)
      }).get().subscribe((item) => {
        if (!item.empty) {
          item.docs.forEach(doc => {
            let cart = doc.data();
            cart['quantity'] = doc.data().quantity + 1;
            cart['total'] = doc.data().price * cart.quantity;
            this.db.collection('carts').doc(doc.id).update(cart).then(() => {

            });
          });
        } else {
          // add new item
          if (food) {
            this.cartsRef.add(food).then(() => {
            });
            this.totalCalculation();
          }
        }
      });
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
          this.cartsRef.doc(cart.id).update(cart).then(() => {

          });
        } else {
          return;
        }
      } else {
        return;
      }
    });
  }

}
