import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PromotionsService } from 'src/app/services/promotions.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Promotion } from 'src/app/interfaces/promotions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.css']
})
export class AddPromotionComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private db: AngularFirestore, private backendService: BackendServiceService, private promotionService: PromotionsService, private dialogRef: MatDialogRef<AddPromotionComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    this.promotionsRef = db.collection<Promotion>('promotions');
  }
  promotionForm: FormGroup;
  coupons: any;
  promotionTypes: any;
  promotion: any;
  foodTypes: any;
  showGroup = 'hidden';

  promotionsRef: AngularFirestoreCollection<Promotion>;
  promotions: Observable<any[]>;

  selectedPromotionType: any;
  foodMeatTypes: any;
  ingrediens: any;

  masterQuantity: any;
  slaveQuantity: any;
  promotionQuantity: any;

  async ngOnInit() {
    this.promotionForm = new FormGroup({
      promotion_name: new FormControl(),
      description: new FormControl(),
      masterGroups: new FormControl(),
      slaveGroups: new FormControl(),
      promotionGroup: new FormControl(),
      promotionTypeId: new FormControl(),
      expiry_date: new FormControl(),
      enabled: new FormControl(false),
      createdAt: new FormControl(new Date()),
      updatedAt: new FormControl(new Date()),
    });
    console.log(this.data);
    if (this.data) {
      this.promotionForm = new FormGroup({
        id: new FormControl(),
        promotion_name: new FormControl(),
        description: new FormControl(),
        promotion_min_quantity: new FormControl(0),
        promotion_quantity: new FormControl(0),
        promotionTypeId: new FormControl(0),
        expiry_date: new FormControl(),
        foodTypeId: new FormControl(),
        enabled: new FormControl(false),
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
    this.loadMeatType();
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
    /*
    this.promotionService.getPromotionsRawById(this.data.id).then(r => {
      r.subscribe(async (promotion) => {
        if (promotion) {
          this.promotion = await promotion;
          this.promotionForm.setValue(promotion[0]);
        }
      });
    });
    */
    this.promotionForm.setValue(this.data);
  }
  savePromotion() {
    if (this.promotionForm.valid) {
      if (this.data) {
        this.updatePromotion();
        return;
      } else {
        this.promotionsRef.add(this.promotionForm.value).then(rsp => {
          this.dialogRef.close('success');
        });
        /*
        this.promotionService.createPromotion(this.promotionForm.value).then(r => {
          r.subscribe(promotion => {
            if (promotion['status'] === 'success') {
              this.dialogRef.close('success');
            }
          });
        });
        */
      }
    } else {
      console.log(this.promotionForm);
    }

  }
  updatePromotion() {

    /*
    this.promotionService.updatePromotionsById(this.promotionForm.get('id').value, this.promotionForm.value).then(r => {
      r.subscribe(promotion => {
        if (promotion['status'] === 'success') {
          this.dialogRef.close('success');
        }
      });
    });
    */
    this.promotionsRef.doc(this.promotionForm.get('id').value).update(this.promotionForm.value).then(r => {
      this.dialogRef.close('success');
    });
  }
  foodTypeSelected(e) {
    this.selectedPromotionType = this.promotionTypes.filter(a => a.id === e);
    console.log(this.selectedPromotionType);
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
  loadMeatType() {
    this.promotionService.getFoodMeatType().then(r => {
      r.subscribe(meatTypes => {
        this.foodMeatTypes = meatTypes;
      });
    });
  }
  ingredienChange(e) {
    this.promotionService.getFoodMeatTypeById(e).then(r => {
      r.subscribe(ingrediens => {
        ingrediens['quantity'] = this.promotionQuantity;
        this.promotionForm.get('masterGroups').setValue(ingrediens[0]);
      });
    });
  }
  slaveChange(e) {
    console.log(e);
    this.backendService.getFoodTypesById(e).then(r => {
      r.subscribe(foodTypes => {
        console.log(foodTypes);
        this.promotionForm.get('slaveGroups').setValue(foodTypes[0]);
      });
    });
  }
  PromotionGroupChange(e) {
    this.promotionService.getFoodMeatTypeById(e).then(r => {
      r.subscribe(ingrediens => {
        this.ingrediens = ingrediens;
        this.promotionForm.get('promotionGroup').setValue(ingrediens[0]);
        console.log(this.ingrediens);
      });
    });
  }
}
