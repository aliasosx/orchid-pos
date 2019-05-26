import { Component, OnInit, Inject } from '@angular/core';
import { FoodFxServiceService } from 'src/app/services/food-fx-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';

@Component({
  selector: 'app-add-food-fx-tranx',
  templateUrl: './add-food-fx-tranx.component.html',
  styleUrls: ['./add-food-fx-tranx.component.css']
})
export class AddFoodFxTranxComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private _FoodFxService: FoodFxServiceService, private backendService: BackendServiceService, private dialogRef: MatDialogRef<AddFoodFxTranxComponent>, @Inject(MAT_DIALOG_DATA) public data) { }
  addFoodFxTranxForm: FormGroup;
  btnDisable = false;
  foods: any;
  units: any;
  products: any;

  ngOnInit() {
    this.addFoodFxTranxForm = new FormGroup({
      id: new FormControl(),
      foodFxId: new FormControl(this.data.id),
      foodId: new FormControl(),
      productId: new FormControl(),
      unitId: new FormControl(),
      quantity: new FormControl(0),
      note: new FormControl(),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
    });
    this.loadFoods();
  }

  async loadFoods() {
    await this.backendService.getFoods().then(rsp => {
      rsp.subscribe(foods => {
        this.foods = foods;
      });
    });
    await this.backendService.getUnit().then(rsp => {
      rsp.subscribe(units => {
        this.units = units;
      });
    });
    await this.backendService.getProducts().then(rsp => {
      rsp.subscribe(products => {
        this.products = products;
      });
    });
  }
  createFoodFxTranx() {
    if (this.addFoodFxTranxForm.valid) {
      this.btnDisable = true;
      this._FoodFxService.createFoodFxTranx(this.addFoodFxTranxForm.value).then(rsp => {
        rsp.subscribe(r => {
          if (r['status'] === 'success') {
            this.dialogRef.close('success');
          } else {
            this.btnDisable = false;
            return;
          }
        });
      });
    }
  }

}
