import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FoodFxServiceService } from 'src/app/services/food-fx-service.service';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { map, filter } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-food-fx',
  templateUrl: './add-food-fx.component.html',
  styleUrls: ['./add-food-fx.component.css']
})
export class AddFoodFxComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private _foodFxService: FoodFxServiceService, private backendService: BackendServiceService, private dialogRef: MatDialogRef<AddFoodFxComponent>, private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data) { }
  addFoodFxForm: FormGroup;
  foods: any;
  btnText = 'ສ້າງ';
  foodFxs: any;
  updateFlg = false;

  ngOnInit() {
    if (this.data) {
      this.addFoodFxForm = new FormGroup({
        id: new FormControl(),
        foodFxCode: new FormControl(),
        foodFxName: new FormControl(),
        remarks: new FormControl(),
        cost: new FormControl(0),
        foodId: new FormControl(),
        userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
        enabled: new FormControl(1),
        createdAt: new FormControl(),
        updatedAt: new FormControl(),
      });
      this.loadFoodFx();
      this.btnText = 'ແກ້ໄຂ';
      this.updateFlg = true;
    } else {
      this.addFoodFxForm = new FormGroup({
        foodFxName: new FormControl(),
        remarks: new FormControl(),
        cost: new FormControl(0),
        foodId: new FormControl(),
        userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
        enabled: new FormControl(1),
      });
    }
    this.loadFoods();
  }
  async loadFoods() {
    await this.backendService.getFoods().then(rsp => { // kitchenId
      rsp.subscribe(foods => {
        // of(foods).pipe(filter(food => food['kitchenId'] === 2)).subscribe(a => console.log(a));
        this.foods = foods;
      });
    });
  }
  async loadFoodFx() {
    await this._foodFxService.getFoodFxById(this.data.fxId).then(rsp => {
      rsp.subscribe(foodFxs => {
        this.foodFxs = foodFxs;
        this.addFoodFxForm.setValue(this.foodFxs[0]);
      });
    });
  }

  addNewFoodFx() {
    if (this.addFoodFxForm.valid) {
      if (this.updateFlg === false) {
        this._foodFxService.createFoodFx(this.addFoodFxForm.value).then(rsp => {
          rsp.subscribe(r => {
            // console.log(r);
            if (r['status'] === 'success') {
              this.dialogRef.close('success');
            } else {
              this.snackbar.open('Something when wrong!!!', 'Error', { duration: 3000 });
              return;
            }
          });
        });
      } else if (this.updateFlg === true) {
        this._foodFxService.updateFoodFxById(this.addFoodFxForm.get('id').value, this.addFoodFxForm.value).then(rsp => {
          rsp.subscribe(r => {
            // console.log(r);
            if (r['status'] === 'success') {
              this.dialogRef.close('success');
            } else {
              this.snackbar.open('Something when wrong!!!', 'Error', { duration: 3000 });
              return;
            }
          });
        });
      }

    }
  }

}
