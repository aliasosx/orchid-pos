import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Food } from 'src/app/interfaces/food';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { map } from 'rxjs/operators';
import { Bom } from 'src/app/interfaces/bom';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-addbom',
  templateUrl: './addbom.component.html',
  styleUrls: ['./addbom.component.css']
})
export class AddbomComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialogRef: MatDialogRef<AddbomComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
  username = localStorage.getItem('username');

  foodsRef: AngularFirestoreCollection<Food>;
  foods: Observable<any[]>;
  food: any;
  productsRef: AngularFirestoreCollection<Product>;
  products: Observable<any[]>;
  product: any;

  bomList: any = [];

  resultLists: any;
  listBuffer: Bom;
  quantity = 0;

  bomRef: AngularFirestoreCollection<Bom>;
  bom: Observable<any[]>;

  productsBuffer: any[] = [];
  title: string;
  saveButtonTitle: string;
  ngOnInit() {

    this.addBomForm = new FormGroup({
      id: new FormControl(),
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

    if (this.data) {
      this.saveButtonTitle = 'Update';
      this.title = 'ແກ້ໄຂລາຍການ ' + this.data.food.food_name;
      this.addBomForm.setValue(this.data);
      this.addBomForm.get('food').setValue(this.data.food.foodId);
      this.food = this.data.food;
      this.productsBuffer = this.data.products;
      this.listBuffer = this.data;
      this.addBomForm.get('food').disable();

    } else {
      this.title = 'ເພີ່ມລາຍການ';
      this.saveButtonTitle = 'ບັນທຶກ';
    }
  }
  addTolist() {
    if (this.product && this.food && this.quantity) {
      this.product['bom_quantity'] = this.quantity;
      this.productsBuffer.push(this.product);
    }
  }
  saveBom() {
    if (this.listBuffer) {
      if (this.data) {
        this.listBuffer.products = this.productsBuffer;
        console.log(this.listBuffer);
        this.db.collection('boms').doc(this.data.id).update(this.listBuffer).then(() => {
          this.dialogRef.close('success');
        });
      } else {
        this.listBuffer.products = this.productsBuffer;
        this.db.collection('boms').add(this.listBuffer).then(() => {
          this.dialogRef.close('success');
        });
      }
    } else {
      console.log(this.listBuffer);
    }
  }
  foodSelectedChange(value) {
    this.foodId = value;
    this.db.collection<Food>('foods', ref => {
      return ref.where('foodId', '==', this.foodId);
    }).get().subscribe(foods => {
      foods.docs.forEach(food => {
        this.food = food.data();
        this.listBuffer = {
          food: this.food,
          enabled: true,
          createdAt: new Date(),
          username: this.username,
        };
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
