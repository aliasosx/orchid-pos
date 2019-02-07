import { map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { Food } from 'src/app/interfaces/food';
import { Observable } from 'rxjs';
import { ExtendedFoodType } from 'src/app/interfaces/extendedFoodType';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AddExtendedFoodComponent } from './../add-extended-food/add-extended-food.component';
import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-view-extended-food',
  templateUrl: './view-extended-food.component.html',
  styleUrls: ['./view-extended-food.component.css']
})
export class ViewExtendedFoodComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialogRef: MatDialogRef<AddExtendedFoodComponent>, private snackbarRef: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.extendedFoodTypesRef = db.collection('extendedFoodTypes');
    this.FoodsRef = db.collection<Food>('foods');
  }

  FoodsRef: AngularFirestoreCollection<Food>;
  extendedFoodTypesRef: AngularFirestoreCollection<ExtendedFoodType>;
  extendedFoodTypes: Observable<any[]>;

  formAddSubFood: FormGroup;
  extendedFoodLists: any = [];

  ngOnInit() {
    this.formAddSubFood = new FormGroup({
      'extendedFoodName': new FormControl(),
      'cost': new FormControl(0),
      'price': new FormControl(0),
      'noted': new FormControl(),
    });

    this.extendedFoodTypes = this.extendedFoodTypesRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as ExtendedFoodType;
        data['id'] = a.payload.doc.id;
        return data;
      })
    }));
    this.extendedFoodLists = this.data.extendedFoods;
  }
  updateFood(food) {
    this.formAddSubFood.setValue(food);
  }
  removeExtenedFoodList(extendedFoodList) {

  }
  addExtendedFoodToMaster() {
    this.extendedFoodLists.push(this.formAddSubFood.value);
    if (this.extendedFoodLists) {
      let extendedFoods = {
        extendedFoods: this.extendedFoodLists
      };
      this.FoodsRef.doc(this.data.id).update(extendedFoods).then(() => {
        //this.dialogRef.close('success');
        this.snackbarRef.open('added complete', 'Ok', { duration: 1000 });
      }).catch((err) => {
        this.snackbarRef.open(err, 'Fail', { duration: 1000 });
        return;
      });
    } else {
      this.snackbarRef.open('Some value required not complete', 'Fail', { duration: 1000 });
      return;
    }

  }
  addExtendedFood() {
    this.extendedFoodLists.push(this.formAddSubFood.value);
  }
}
