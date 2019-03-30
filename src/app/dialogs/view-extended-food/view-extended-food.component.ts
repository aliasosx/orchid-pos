import { BackendServiceService } from './../../services/common/backend-service.service';
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

  // tslint:disable-next-line: max-line-length
  constructor(private db: AngularFirestore, private dialogRef: MatDialogRef<AddExtendedFoodComponent>, private snackbarRef: MatSnackBar, private besrv: BackendServiceService
    , @Inject(MAT_DIALOG_DATA) public data: any) {
  }



  formAddSubFood: FormGroup;
  extendedFoodLists: any = [];
  extendedFoodTypes: any;

  ngOnInit() {

    this.formAddSubFood = new FormGroup({
      'id': new FormControl(),
      'foodId': new FormControl(),
      'subFoodId': new FormControl(),
      'subFoodName': new FormControl(),
      'subFoodNameEn': new FormControl(),
      'currencyId': new FormControl(),
      'cost': new FormControl(0),
      'price': new FormControl(0),
      'discountId': new FormControl(0),
      'updateById': new FormControl(0),
      'createdAt': new FormControl(0),
      'updatedAt': new FormControl(0),
      'enabled': new FormControl(0),
    });

    this.besrv.getSubFood().then((sf) => {
      sf.subscribe(sx => {
        this.extendedFoodTypes = sx;
      });
    });
    this.extendedFoodLists = this.data.subFood;
  }
  updateFood(food) {
    console.log(food);
    this.formAddSubFood.setValue(food);
  }
  removeExtenedFoodList(extendedFoodList) {

  }
  addExtendedFoodToMaster() {
    /*
    this.extendedFoodLists.push(this.formAddSubFood.value);
    if (this.extendedFoodLists) {
      let extendedFoods = {
        extendedFoods: this.extendedFoodLists
      };
      this.FoodsRef.doc(this.data.id).update(extendedFoods).then(() => {
        // this.dialogRef.close('success');
        this.snackbarRef.open('added complete', 'Ok', { duration: 1000 });
      }).catch((err) => {
        this.snackbarRef.open(err, 'Fail', { duration: 1000 });
        return;
      });
    } else {
      this.snackbarRef.open('Some value required not complete', 'Fail', { duration: 1000 });
      return;
    }
    */

  }
  addExtendedFood() {
    this.extendedFoodLists.push(this.formAddSubFood.value);
  }
  removeitem(doc) {
    /*
    this.extendedFoodLists.forEach((item, index) => {
      if (item.extendedFoodName === doc.extendedFoodName) {
        this.extendedFoodLists.splice(index, 1);
      }
    });
    let extendedFoods = {
      extendedFoods: this.extendedFoodLists
    };
    this.FoodsRef.doc(this.data.id).update(extendedFoods).then(() => {
      //this.dialogRef.close('success');
      this.snackbarRef.open('removed complete', 'Ok', { duration: 1000 });
    }).catch((err) => {
      this.snackbarRef.open(err, 'Fail', { duration: 1000 });
      return;
    });
    */
  }
}
