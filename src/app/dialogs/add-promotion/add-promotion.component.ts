import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PromotionsService } from 'src/app/services/promotions.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.css']
})
export class AddPromotionComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private backendService: BackendServiceService, private promotionService: PromotionsService, private dialogRef: MatDialogRef<AddPromotionComponent>, @Inject(MAT_DIALOG_DATA) public data) { }
  promotionForm: FormGroup;
  coupons: any;
  promotionTypes: any;
  promotion: any;
  foodTypes: any;
  showGroup = 'hidden';

  async ngOnInit() {
    this.promotionForm = new FormGroup({
      promotion_name: new FormControl(),
      description: new FormControl(),
      promotion_min_quantity: new FormControl(0),
      promotion_quantity: new FormControl(0),
      discountId: new FormControl(0),
      promotionTypeId: new FormControl(0),
      expiry_date: new FormControl(),
      foodTypeId: new FormControl(),
      enabled: new FormControl(0),
    });
    console.log(this.data);
    if (this.data) {
      this.promotionForm = new FormGroup({
        id: new FormControl(),
        promotion_name: new FormControl(),
        description: new FormControl(),
        promotion_min_quantity: new FormControl(0),
        promotion_quantity: new FormControl(0),
        discountId: new FormControl(0),
        promotionTypeId: new FormControl(0),
        expiry_date: new FormControl(),
        foodTypeId: new FormControl(),
        enabled: new FormControl(0),
        createdAt: new FormControl(),
        updatedAt: new FormControl(),
      });
      if (this.data.foodTypeName) {
        this.showGroup = '';
      } else {
        this.showGroup = 'hidden';
      }
      let p = await this.loadPromotionMaster();
    }

    this.loadDiscount();
    this.loadPromotionTypes();
    this.loadFoodTypes();
  }
  loadDiscount() {
    this.promotionService.getCouponDiscount().then(r => {
      r.subscribe(coupons => this.coupons = coupons);
    });
  }
  loadPromotionTypes() {
    this.promotionService.getPromotionTypes().then(r => {
      r.subscribe(promotionTypes => {
        this.promotionTypes = promotionTypes;
      });
    });
  }
  loadPromotionMaster() {
    this.promotionService.getPromotionsRawById(this.data.id).then(r => {
      r.subscribe(async (promotion) => {
        if (promotion) {
          this.promotion = await promotion;
          this.promotionForm.setValue(promotion[0]);
        }
      });
    });
  }
  savePromotion() {
    if (this.promotionForm.valid) {
      if (this.data) {
        this.updatePromotion();
        return;
      } else {
        this.promotionService.createPromotion(this.promotionForm.value).then(r => {
          r.subscribe(promotion => {
            if (promotion['status'] === 'success') {
              this.dialogRef.close('success');
            }
          });
        });
      }
    } else {
      console.log(this.promotionForm.value);
    }

  }
  updatePromotion() {
    if (this.promotionForm.valid) {
      this.promotionService.updatePromotionsById(this.promotionForm.get('id').value, this.promotionForm.value).then(r => {
        r.subscribe(promotion => {
          if (promotion['status'] === 'success') {
            this.dialogRef.close('success');
          }
        });
      });
    }
  }
  foodTypeSelected(e) {
    if (e) {
      if (e === '2') {
        this.showGroup = '';
      } else if (e === '1') {
        this.showGroup = 'hidden';
      }
    }
  }
  loadFoodTypes() {
    this.backendService.getFoodTypes().then(r => {
      r.subscribe(foodTypes => {
        this.foodTypes = foodTypes;
      });
    });
  }
}
