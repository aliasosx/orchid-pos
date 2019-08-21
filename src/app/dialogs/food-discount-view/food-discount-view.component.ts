import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { PromotionsService } from 'src/app/services/promotions.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-food-discount-view',
  templateUrl: './food-discount-view.component.html',
  styleUrls: ['./food-discount-view.component.css']
})
export class FoodDiscountViewComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  constructor(private promotionService: PromotionsService, private dialogRef: MatDialogRef<FoodDiscountViewComponent>, @Inject(MAT_DIALOG_DATA) public data) { }
  discountTranxForm: FormGroup;
  foodName: string;
  ngOnInit() {
    this.discountTranxForm = new FormGroup({
      id: new FormControl(),
      discount: new FormControl(),
      discountId: new FormControl(),
      foodId: new FormControl(),
      subfoodId: new FormControl(),
      userId: new FormControl(),
      currencyId: new FormControl(),
      percentageDiscount: new FormControl(),
      createdAt: new FormControl(),
      updatedAt: new FormControl(new Date()),
    });
    this.promotionService.getDiscountTranxByDiscountId(this.data).then(r => {
      r.subscribe(d => {
        this.foodName = d[0].food_name;
        this.discountTranxForm.setValue(d[0]);
      });
    });
  }
  save() {
    this.promotionService.updateDiscountTranx(this.discountTranxForm.get('id').value, this.discountTranxForm.value).then(r => {
      r.subscribe(rs => {
        // console.log(rs);
        if (rs['status'] === 'success') {
          this.dialogRef.close('success');
        }
      });
    });
  }
}
