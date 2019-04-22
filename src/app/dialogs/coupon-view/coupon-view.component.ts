import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BackendServiceService } from './../../services/common/backend-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-coupon-view',
  templateUrl: './coupon-view.component.html',
  styleUrls: ['./coupon-view.component.css']
})
export class CouponViewComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private be: BackendServiceService, private dialogRef: MatDialogRef<CouponViewComponent>, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data) { }
  couponForm: FormGroup;
  couponDetails: FormGroup;

  updateFlag = 'add';
  btnText = 'Create';

  foods: any;
  subFoods: any;
  currencies: any;

  subFoodsShow = 'hidden';
  displayCoupon: any;


  ngOnInit() {
    this.couponForm = new FormGroup({
      id: new FormControl(),
      discount_code: new FormControl(),
      discount_description: new FormControl(),
      discount_valid_from: new FormControl(),
      discount_valid_thru: new FormControl(),
      discount_valid: new FormControl(0),
      discount_limit_time: new FormControl(0),
      enabled: new FormControl(0),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      createdAt: new FormControl(),
      updatedAt: new FormControl(),
    });

    this.couponDetails = new FormGroup({
      id: new FormControl(),
      discountId: new FormControl(),
      foodId: new FormControl(),
      subfoodId: new FormControl(),
      discount: new FormControl(0),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      currencyId: new FormControl(2),
      createdAt: new FormControl(),
      updatedAt: new FormControl(),
    });

    if (this.data) {
      this.updateFlag = 'view';
      this.btnText = 'Update';
      this.loadUpdateData();
    } else {
      this.updateFlag = 'add';
      this.btnText = 'Create';
    }
    this.initStart();
  }

  initStart() {
    this.loadFoods();
    // this.loadSubFoods()
    this.loadCurrency();
  }
  loadFoods() {
    this.be.getFoods().then(f => {
      f.subscribe(foods => {
        this.foods = foods;
      });
    });
  }
  loadSubFoods(foodId) {
    if (foodId) {
      this.be.getSubfoodById(foodId).then(sf => {
        sf.subscribe(subFoods => {
          this.subFoods = subFoods;
        });
      });
    }
  }
  loadCurrency() {
    this.be.getCurrencies().then(c => {
      c.subscribe(currencies => {
        this.currencies = currencies;
      });
    });
  }
  selectedFood(event) {
    if (event) {
      this.loadSubFoods(event.target.value);
    }
  }
  loadCouponList(id) {
    this.be.getCouponById(id).then(rsp => {
      rsp.subscribe(coupons => {
        this.displayCoupon = coupons;
      });
    });
  }
  createCoupon() {
    if (this.couponForm.valid && this.updateFlag === 'add') {
      this.be.createCoupon(this.couponForm.value).then(rsp => {
        rsp.subscribe(rsp_coupon => {
          console.log(rsp_coupon);
          this.couponDetails.get('discountId').setValue(rsp_coupon['id']);
        });
      });
    } else if (this.couponForm.valid && this.updateFlag === 'view') {
      this.updateCoupon();
    }
  }
  createCouponDetail() {
    if (this.couponDetails.valid) {
      this.be.createCouponTranx(this.couponDetails.value).then(rsp => {
        rsp.subscribe(couponDetail => {
          this.loadCouponList(this.couponDetails['discountId']);
        });
      });
    }
  }
  closeDialog() {
    this.dialogRef.close('done');
  }
  loadUpdateData() {
    console.log(this.data);
    if (this.data) {
      this.loadCouponById(this.data);
    }
  }
  loadCouponById(id) {
    this.be.getCouponsById(id).then(rsp => {
      rsp.subscribe(coupon => {
        const fromDate = new DatePipe('en-us').transform(coupon['discount_valid_from'], 'yyyy-MM-dd');
        const endDate = new DatePipe('en-us').transform(coupon['discount_valid_thru'], 'yyyy-MM-dd');
        this.couponForm.setValue(coupon);
        this.couponForm.get('discount_valid_from').setValue(fromDate);
        this.couponForm.get('discount_valid_thru').setValue(endDate);
      });
    });
  }
  updateCoupon() {
    if (this.couponForm.valid) {
      this.be.updateCoupon(this.data, this.couponForm.value).then(rsp => {
        rsp.subscribe(r => {
          if (r[0] === 1) {
            this.snackBar.open('Update done', 'OK', { duration: 1000 });
            this.loadCouponTranx();
          }
        });
      });
    } else {
      this.snackBar.open('Form invalid', 'OK', { duration: 1000 });
    }
  }
  loadCouponTranx() {
    this.be.getCouponsTranx().then(rsp => {
      rsp.subscribe(r => {
        this.couponDetails.setValue(r);
      });
    });
  }
}
