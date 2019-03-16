import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Food } from 'src/app/interfaces/food';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-subfoods',
  templateUrl: './subfoods.component.html',
  styleUrls: ['./subfoods.component.css']
})
export class SubfoodsComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialogRef: MatDialogRef<SubfoodsComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private snackbar: MatSnackBar) {
    this.foodsRef = db.collection<Food>('foods', ref => {
      return ref.where('id', '==', this.data.food.id);
    });
  }
  btnDisable = false;

  foodsRef: AngularFirestoreCollection<Food>;
  foods: Observable<any[]>;
  // extendedFoods
  extendedFoodList: any;
  subFoodsForm: FormGroup;
  username: string = 'administrator';
  ngOnInit() {
    // load food data

    this.subFoodsForm = new FormGroup({
      'id': new FormControl(this.data.food.id),
      'food': new FormControl(this.data.food.food_name),
      'subFood': new FormControl(),
      'cost': new FormControl(),
      'price': new FormControl(0),
      'quantity': new FormControl(1),
      'total': new FormControl(0),
      'username': new FormControl(this.data.username),
      'kitchen': new FormControl(),
      'foodId': new FormControl(),
      'food_category': new FormControl(),
    });
    this.extendedFoodList = this.data.food.extendedFoods;
  }
  selectedFood(event) {
    this.extendedFoodList.forEach(element => {
      if (element.extendedFoodName == event) {
        this.subFoodsForm.get('subFood').setValue(element.extendedFoodName);
        this.subFoodsForm.get('price').setValue(element.price);
        this.subFoodsForm.get('cost').setValue(element.cost);
        this.subFoodsForm.get('cost').setValue(element.cost);
        this.subFoodsForm.get('kitchen').setValue(this.data.food.kitchen);
        this.subFoodsForm.get('foodId').setValue(this.data.food.foodId);
        this.subFoodsForm.get('food_category').setValue(this.data.food.food_category);
      }
    });
  }
  addFood() {
    if (this.subFoodsForm.valid) {
      this.btnDisable = true;
      this.subFoodsForm.get('total').setValue(this.subFoodsForm.get('price').value * this.subFoodsForm.get('quantity').value);
      this.dialogRef.close(this.subFoodsForm.value);
    } else {
      this.snackbar.open('Data incomplete please check!', 'Fails', { duration: 1000, verticalPosition: 'top' });
    }
  }
}
