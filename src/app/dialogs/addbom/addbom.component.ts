import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Food } from 'src/app/interfaces/food';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { map } from 'rxjs/operators';
import { Bom } from 'src/app/interfaces/bom';

@Component({
  selector: 'app-addbom',
  templateUrl: './addbom.component.html',
  styleUrls: ['./addbom.component.css']
})
export class AddbomComponent implements OnInit {

  constructor(private db: AngularFirestore) {
    this.foodsRef = db.collection<Food>('foods', ref => {
      return ref.where('kitchen', '==', 'Drink');
    });
    this.productsRef = db.collection<Product>('products', ref => {
      return ref.where('productTypeCode', '==', 'Materials');
    });
    this.bomRef = db.collection<Bom>('boms');
  }

  productCode: string;
  foodId: string;

  addBomForm: FormGroup;
  username = localStorage.getItem('user');

  foodsRef: AngularFirestoreCollection<Food>;
  foods: Observable<any[]>;
  food: any;
  productsRef: AngularFirestoreCollection<Product>;
  products: Observable<any[]>;
  product: any;

  resultLists: any;
  listBuffer: any[] = [];
  quantity = 0;

  bomRef: AngularFirestoreCollection<Bom>;
  bom: Observable<any[]>;

  productsBuffer: any[] = [];

  ngOnInit() {
    this.addBomForm = new FormGroup({
      food: new FormControl(),
      products: new FormControl(),
      username: new FormControl(this.username),
      enabled: new FormControl(true),
      createdAt: new FormControl(new Date()),
    });

    this.foods = this.foodsRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const foods = a.payload.doc.data() as Food;
        foods['id'] = a.payload.doc.id;
        return foods;
      });
    }));

    this.products = this.productsRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const products = a.payload.doc.data() as Product;
        products['id'] = a.payload.doc.id;
        return products;
      });
    }));

  }
  addTolist() {
    if (this.product && this.food && this.quantity) {
      this.product['bom_quantity'] = this.quantity;
      this.productsBuffer.push(this.product);
      this.listBuffer.push({
        food: this.food,
        products: this.product,
        enabled: true,
        createdAt: new Date(),
        username: this.username,
      });
    }
  }
  foodSelectedChange(value) {
    this.foodId = value;
    this.db.collection<Food>('foods', ref => {
      return ref.where('foodId', '==', this.foodId);
    }).get().subscribe(foods => {
      foods.docs.forEach(food => {
        this.food = food.data();
      });
    });
  }
  productSelectedChange(value) {
    this.productCode = value;
    this.db.collection<Product>('products', ref => {
      return ref.where('productCode', '==', value);
    }).get().subscribe(products => {
      products.docs.forEach(product => {
        this.product = product.data();
      });
    });
  }
  quantityChange(value) {
    this.quantity = 0;
    this.quantity = value;
  }
  removeItem(product) {
    if (product) {
      this.productsBuffer.forEach((p, index) => {
        console.log(this.productsBuffer);
        if (p.productName === product.productName) {
          console.log(index);
          this.productsBuffer.splice(index, 1);
        }
      });
    }
  }
}
