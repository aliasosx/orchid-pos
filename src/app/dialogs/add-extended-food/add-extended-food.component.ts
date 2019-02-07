import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Food } from 'src/app/interfaces/food';
import { ExtendedFoodType } from 'src/app/interfaces/extendedFoodType';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-extended-food',
  templateUrl: './add-extended-food.component.html',
  styleUrls: ['./add-extended-food.component.css']
})
export class AddExtendedFoodComponent implements OnInit {

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
    console.log(this.data);
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
  }
  addExtendedFood() {
    this.extendedFoodLists.push(this.formAddSubFood.value);
  }
  removeExtenedFoodList() {

  }
  // Update extended Food to master Food
  addExtendedFoodToMaster() {
    if (this.extendedFoodLists) {
      let extendedFoods = {
        extendedFoods: this.extendedFoodLists
      };
      this.FoodsRef.doc(this.data.id).update(extendedFoods).then(() => {
        this.dialogRef.close('success');
      }).catch((err) => {
        this.snackbarRef.open(err, 'Fail', { duration: 2000, verticalPosition: 'top' });
        return;
      });
    } else {
      this.snackbarRef.open('Some value required not complete', 'Fail', { duration: 2000, verticalPosition: 'top' });
      return;
    }

  }

}
