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
  foodTranxs: any;

  ngOnInit() {
    this.formAddSubFood = new FormGroup({
      'id': new FormControl(),
      'sfId': new FormControl(),
      'foodId': new FormControl(this.data.pFood.fid),
      'subFoodId': new FormControl(),
      'subFoodName': new FormControl(),
      'subFoodNameEn': new FormControl(),
      'currencyId': new FormControl(2),
      'cost': new FormControl(0),
      'price': new FormControl(0),
      'discountId': new FormControl(),
      'updateById': new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
    });

    this.updateFlg = false;
    this.addnewFlg = true;
    this.loadInitData();

  }
  async loadStartUp() {
    this.extendedFoodLists = [];
    this.extendedFoodLists = this.data.subFood;
    this.loadInitData();
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
      this.formAddSubFood.get('foodId').setValue(this.data.pFood.fid);
      let c = await this.besrv.createFoodTranx({
        foodId: this.data.pFood.fid,
        subfoodId: parseInt(this.formAddSubFood.get('subFoodId').value),
        price: parseInt(this.formAddSubFood.get('price').value),
        cost: parseInt(this.formAddSubFood.get('cost').value),
        currencyId: 2,
        updateById: JSON.parse(localStorage.getItem('usrObj')).id
      }).subscribe(async (resp) => {
        if (resp['status'] === 'success') {
          // console.log('Add module');
          this.formAddSubFood.reset();
          this.updateFlg = false;
          this.addnewFlg = true;
          let a = await this.loadInitData();
        }
      });
    } else if (this.updateFlg === true) {
      // tslint:disable-next-line: max-line-length
      console.log('update module');
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
  checkChange(e) {
    this.formAddSubFood.get('subFoodId').setValue(e);
  }
  addExtendedFood() {
    this.extendedFoodLists.push(this.formAddSubFood.value);
  }
  removeitem(doc) {
    // console.log(doc);
    this.besrv.removeItemFromMasterFood(doc.subFoodId, doc.foodId, doc.id).then(rsp => {
      rsp.subscribe(r => {
        this.loadInitData();
      });
    });
  }
  async loadInitData() {
    let c = await this.besrv.getSubfoodById(this.data.pFood.fid).then(subfoods => {
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
