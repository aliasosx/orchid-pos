import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-coupon-add-pos',
  templateUrl: './coupon-add-pos.component.html',
  styleUrls: ['./coupon-add-pos.component.css']
})
export class CouponAddPosComponent implements OnInit {

  constructor() { }

  couponForm: FormGroup;

  ngOnInit() {
    this.couponForm = new FormGroup({
      coupon: new FormControl(),
    });
  }

}
