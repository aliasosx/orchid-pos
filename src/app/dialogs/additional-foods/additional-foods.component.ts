import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PromotionsService } from 'src/app/services/promotions.service';

@Component({
  selector: 'app-additional-foods',
  templateUrl: './additional-foods.component.html',
  styleUrls: ['./additional-foods.component.css']
})
export class AdditionalFoodsComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private backendService: BackendServiceService, private promotionService: PromotionsService, @Inject(MAT_DIALOG_DATA) public data) {
    this.loadFoodTypes();
    this.loadFoods();
    this.loadAdditionalDiscountFood();
  }
  additionalForm: FormGroup;
  foodTypes: any;
  foodCatName: any;
  foods: any;
  additionalFoods: any;
  btnDisable = false;

  ngOnInit() {
    this.additionalForm = new FormGroup({
      foodId: new FormControl(),
      discountId: new FormControl(this.data),
      quantity: new FormControl(0),
      price: new FormControl(0),
      cost: new FormControl(0),
    });
  }
  loadFoods() {
    this.backendService.getFoods().then(r => {
      r.subscribe(foods => {
        this.foods = foods;
      });
    });
  }
  loadFoodTypes() {
    this.backendService.getFoodTypes().then(r => {
      r.subscribe(foodTypes => {
        // console.log(foodTypes);
        this.foodTypes = foodTypes;
      });
    });
  }
  loadAdditionalDiscountFood() {
    this.promotionService.getDiscountAdditionalFoodByDiscountId(this.data).then(r => {
      r.subscribe(ads => {
        // console.log(foodTypes);
        this.additionalFoods = ads;
      });
    });
  }
  deleteFood(id) {
    this.promotionService.deleteDiscountAdditionalFoodBy(id).then(r => {
      r.subscribe(rsp => {
        this.loadAdditionalDiscountFood();
      });
    });
  }
  addAdditionalFood() {
    if (this.additionalForm.valid) {
      this.btnDisable = true;
      this.promotionService.createAdditionalFood(this.additionalForm.value).then(r => {
        r.subscribe(rsp => {
          this.loadAdditionalDiscountFood();
          this.additionalForm.reset();
          this.btnDisable = false;
        });
      });
    } else {
      return;
    }
  }
}
