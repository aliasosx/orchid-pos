import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PromotionsService } from 'src/app/services/promotions.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css']
})
export class AddDiscountComponent implements OnInit {

  constructor(private promotionService: PromotionsService, private dialogRef: MatDialogRef<AddDiscountComponent>) { }
  discountForm: FormGroup;
  ngOnInit() {
    this.discountForm = new FormGroup({
      discount_code: new FormControl(),
      discount_description: new FormControl(),
      discount_valid_from: new FormControl(new Date()),
      discount_valid_thru: new FormControl(),
      discount_valid: new FormControl(1),
      discount_limit_time: new FormControl(0),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
    });
  }
  save() {
    if (!this.discountForm.valid) { return; }
    this.promotionService.createPromotion(this.discountForm.value).then(r => {
      r.subscribe(rsp => {
        if (rsp['status'] === 'success') {
          this.dialogRef.close('success');
        }
      });
    });
  }
}
