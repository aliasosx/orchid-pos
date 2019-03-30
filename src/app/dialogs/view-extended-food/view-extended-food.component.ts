import { BackendServiceService } from './../../services/common/backend-service.service';
import { FormGroup, FormControl } from '@angular/forms';
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

  updateFlg = false;
  addnewFlg = false;
  btnSaveCaption = 'Add new';

  subFoods: any;

  ngOnInit() {
    // console.log(this.data);
    this.formAddSubFood = new FormGroup({
      'id': new FormControl(),
      'sfId': new FormControl(),
      'foodId': new FormControl(),
      'subFoodId': new FormControl(),
      'subFoodName': new FormControl(),
      'subFoodNameEn': new FormControl(),
      'currencyId': new FormControl(),
      'cost': new FormControl(0),
      'price': new FormControl(0),
      'discountId': new FormControl(0),
      'updateById': new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
    });
    if (this.data.subFood) {
      this.updateFlg = true;
      this.addnewFlg = false;
      this.loadInitData();
    } else {
      this.updateFlg = false;
      this.addnewFlg = true;
    }
  }
  async loadStartUp() {
    this.extendedFoodLists = [];

    this.extendedFoodLists = this.data.subFood;
  }
  updateFood(food) {
    this.addnewFlg = false;
    this.updateFlg = true;
    this.btnSaveCaption = 'Update';
    this.formAddSubFood.setValue(food);
  }
  removeExtenedFoodList(extendedFoodList) {

  }
  async addExtendedFoodToMaster() {
    if (this.addnewFlg === true) {
      alert('Not function yet');
    } else if (this.updateFlg === true) {
      console.log(this.data);
      console.log(this.formAddSubFood.value);
      // tslint:disable-next-line: max-line-length
      let c = await this.besrv.updateFoodTranxById(this.formAddSubFood.get('id').value, this.formAddSubFood.value).subscribe((async (rs) => {
        if (rs['status'] === 'success') {
          this.formAddSubFood.reset();
          this.btnSaveCaption = 'Add new';
          this.updateFlg = false;
          this.addnewFlg = true;
          let a = await this.loadInitData();
        } else {
          alert('Something when wrong please check on console log!!');
          return;
        }
      }));
    }
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
  async loadInitData() {
    let c = await this.besrv.getSubfoodById(this.data.food.id).then(subfoods => {
      subfoods.subscribe(sf => {
        this.subFoods = sf;
      });
    });
    let d = await this.besrv.getSubFood().then((sf) => {
      sf.subscribe(sx => {
        this.extendedFoodTypes = sx;
      });
    });
  }
}
