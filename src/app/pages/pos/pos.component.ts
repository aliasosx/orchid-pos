import { map } from 'rxjs/operators';
import { Food } from 'src/app/interfaces/food';
import { Observable } from 'rxjs';
import { FoodCategory } from './../../interfaces/foodCategory';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SubfoodsComponent } from 'src/app/dialogs/subfoods/subfoods.component';
import { Cart } from 'src/app/interfaces/cart';

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
    this.cartsRef = db.collection<Cart>('carts');
  }

  foodCategoriesRef: AngularFirestoreCollection<FoodCategory>;
  FoodCategories: Observable<any[]>;

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
        this.totalCalculation();
      } else {
        this.totalCalculation();
        return;
      }
    });
    this.totalCalculation();
  }
  foodChoosed(food) {
    if (food.price == 0) {
      this.openSubFood(food);
    } else {
      let item = {
        'food': food.food_name,
        'price': food.price,
        'quantity': 1,
        'total': food.price * 1
      }
      this.foodCartList.push(item);
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
    this.carts.subscribe(f => {
      f.forEach(element => {
        if (element.total > 0) {
          this.total += element.total;
        }
      });
    });
  }
  addCartsToDb(cart) {
    if (cart) {
      this.cartsRef.add(cart).then(() => {
      });
    }
  }
}
