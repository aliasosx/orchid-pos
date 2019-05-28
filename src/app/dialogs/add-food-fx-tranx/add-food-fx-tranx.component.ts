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
  foodFxTranxs: any;
  product: any;

  ngOnInit() {
    // console.log(this.data.fxId);
    this.addFoodFxTranxForm = new FormGroup({
      id: new FormControl(),
      foodFxId: new FormControl(this.data.fxId),
      productId: new FormControl(),
      unitId: new FormControl(),
      cost: new FormControl(0),
      quantity: new FormControl(0),
      total_cost: new FormControl(0),
      note: new FormControl(),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
    });
    this.loadFoods();
    this.loadFoodFxTranx();
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
  async loadFoodFxTranx() {
    this._FoodFxService.getFoodFxTranxById(this.data.fxId).then(rsp => {
      rsp.subscribe(foodFxTranxs => {
        this.foodFxTranxs = foodFxTranxs;
      });
    });
  }
  createFoodFxTranx() {
    if (this.addFoodFxTranxForm.valid) {
      this.btnDisable = true;
      this.addFoodFxTranxForm.get('cost').setValue(this.product.cost);
      // tslint:disable-next-line: max-line-length
      this.addFoodFxTranxForm.get('total_cost').setValue(parseInt(this.product.cost, 10) * parseInt(this.addFoodFxTranxForm.get('quantity').value, 10));
      this._FoodFxService.createFoodFxTranx(this.addFoodFxTranxForm.value).then(rsp => {
        rsp.subscribe(r => {
          if (r['status'] === 'success') {
            // this.dialogRef.close('success');
            this.loadFoodFxTranx();
            this.btnDisable = false;
          } else {
            this.btnDisable = false;
            return;
          }
        });
      });
    }
  }
  removeItem(id) {
    if (id) {
      this._FoodFxService.deleteFoodFxTranxById(id).then(rsp => {
        rsp.subscribe(r => {
          if (r['status'] === 'success') {
            this.loadFoodFxTranx();
          } else {
            return;
          }
        });
      });
    }
  }
  closeDialog() {
    this.dialogRef.close('success');
  }
  getProductById(id) {
    this.backendService.getProductById(id).then(async (rsp) => {
      await rsp.subscribe(product => { this.product = product; console.log(product); });
    });
  }
}
