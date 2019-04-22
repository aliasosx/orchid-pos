import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BackendServiceService } from './../../services/common/backend-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-coupon-view',
  templateUrl: './coupon-view.component.html',
  styleUrls: ['./coupon-view.component.css']
})
export class CouponViewComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private be: BackendServiceService, private dialogRef: MatDialogRef<CouponViewComponent>, @Inject(MAT_DIALOG_DATA) public data) { }
  couponForm: FormGroup;

  ngOnInit() {
    this.couponForm = new FormGroup({
      id: new FormControl(),
      discount_code: new FormControl(),
      discount_description: new FormControl(),
      discount_valid_from: new FormControl(),
      discount_valid_thru: new FormControl(),
      discount_valid: new FormControl(),
      discount_limit_time: new FormControl(0),
      enabled: new FormControl(0),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
    });
  }

}
