import { Component, OnInit, Inject } from '@angular/core';
import { PromotionsService } from 'src/app/services/promotions.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-promotion-food',
  templateUrl: './add-promotion-food.component.html',
  styleUrls: ['./add-promotion-food.component.css']
})
export class AddPromotionFoodComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private backendService: BackendServiceService, private promotionService: PromotionsService, @Inject(MAT_DIALOG_DATA) public data, private dialogRef: MatDialogRef<AddPromotionFoodComponent>) { }
  foods: any;
  foodForms: FormGroup;
  promotionTranxForm: FormGroup;
  foodTypes: any;
  foodCatName: any;
  ngOnInit() {

    this.promotionTranxForm = new FormGroup({
      id: new FormControl(),
      discountId: new FormControl(this.data.id),
      foodId: new FormControl(),
      subfoodId: new FormControl(),
      discount: new FormControl(0),
      percentageDiscount: new FormControl(0),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      currencyId: new FormControl(2),
      createdAt: new FormControl(new Date()),
      updatedAt: new FormControl(new Date()),
    });


    this.loadFoods();
    this.loadFoodTypes();
    // console.log(this.data.promotion_type_name.toUpperCase());
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
  savePromotion() {
    if (!this.promotionTranxForm.valid) { return; }
    this.promotionTranxForm.get('percentageDiscount').setValue(parseInt(this.promotionTranxForm.get('percentageDiscount').value, 10) / 100);
    this.promotionService.createPromotionTranx(this.promotionTranxForm.value).then(r => {
      r.subscribe(promotionTranx => {
        if (promotionTranx['status'] === 'success') {
          this.dialogRef.close('success');
        }
      });
    });
  }

}
