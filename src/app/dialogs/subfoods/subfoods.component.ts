import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Food } from 'src/app/interfaces/food';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-subfoods',
  templateUrl: './subfoods.component.html',
  styleUrls: ['./subfoods.component.css']
})
export class SubfoodsComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialogRef: MatDialogRef<SubfoodsComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private snackbar: MatSnackBar) {
    this.foodsRef = db.collection<Food>('foods', ref => {
      return ref.where('id', '==', data.id);
    });
  }
  btnDisable = false;

  foodsRef: AngularFirestoreCollection<Food>;
  foods: Observable<any[]>;
  // extendedFoods
  extendedFoodList: any;
  subFoodsForm: FormGroup;

  ngOnInit() {
    // load food data
    /*
    this.foods = this.foodsRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data();
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
    */
    console.log(this.data);
    this.subFoodsForm = new FormGroup({
      'id': new FormControl(this.data.id),
      'food': new FormControl(this.data.food_name),
      'subFood': new FormControl(),
      'price': new FormControl(0),
      'quantity': new FormControl(1),
      'total': new FormControl(0),
    });
    this.extendedFoodList = this.data.extendedFoods;
  }
  selectedFood(event) {
    this.extendedFoodList.forEach(element => {
      if (element.extendedFoodName == event) {
        this.subFoodsForm.get('subFood').setValue(element.extendedFoodName);
        this.subFoodsForm.get('price').setValue(element.price);
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
