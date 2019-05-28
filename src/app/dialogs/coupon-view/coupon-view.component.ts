import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BackendServiceService } from './../../services/common/backend-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { copyStyles } from '@angular/animations/browser/src/util';

@Component({
  selector: 'app-coupon-view',
  templateUrl: './coupon-view.component.html',
  styleUrls: ['./coupon-view.component.css']
})
export class CouponViewComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private be: BackendServiceService, private dialogRef: MatDialogRef<CouponViewComponent>, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data) { }
  couponForm: FormGroup;
  couponDetailsForm: FormGroup;

  updateFlag = 'add';
  btnText = 'Create';

  foods: any;
  subFoods: any;
  currencies: any;

  subFoodsShow = 'hidden';
  displayCoupons: any;

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

    this.couponDetailsForm = new FormGroup({
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
        this.displayCoupons = coupons;
      });
    });
  }
  createCoupon() {
    if (this.couponForm.valid && this.updateFlag === 'add') {
      this.be.createCoupon(this.couponForm.value).then(rsp => {
        rsp.subscribe(rsp_coupon => {
          console.log(rsp_coupon);
          this.couponDetailsForm.get('discountId').setValue(rsp_coupon['id']);
        });
      });
    } else if (this.couponForm.valid && this.updateFlag === 'view') {
      this.updateCoupon();
    }
  }
  createCouponDetail() {
    // console.log(this.updateFlag);

    if (this.couponDetailsForm.valid) {
      if (this.updateFlag === 'add') {
        this.be.createCouponTranx(this.couponDetailsForm.value).then(rsp => {
          rsp.subscribe(couponDetail => {
            this.loadCouponList(this.couponDetailsForm['discountId']);
          });
        });
      } else if (this.updateFlag === 'view') {
        this.be.updateCouponTranx(this.couponDetailsForm.get('id').value, this.couponDetailsForm.value).then(rsp => {
          rsp.subscribe(couponTranx => {
            this.couponDetailsForm.reset();
            this.loadUpdateData();
          });
        });
      }
    } else {
      // console.log(this.couponDetailsForm);
      this.snackBar.open('Form not complete!!', 'OK', { duration: 1000 });
    }
  }
  closeDialog() {
    // this.dialogRef.close('done');
    this.be.getBanks().then(rsp => {
      rsp.subscribe(r => {
        // console.log(r);
      });
    });
  }
  loadUpdateData() {
    console.log(this.data);
    if (this.data) {
      this.loadCouponById(this.data);
      this.loadDisplayCoupon();
    }
  }

  loadCouponDetailsUpdate() {
    this.be.getDiscountTranxByDiscountId(this.data).then(rsp => {
      rsp.subscribe(discountTranx => {
        if (discountTranx) {
          this.couponDetailsForm.setValue(discountTranx[0]);
        }
      });
    });
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
            this.loadCouponDetailsUpdate();
          }
        });
      });
    } else {
      this.snackBar.open('Form invalid', 'OK', { duration: 1000 });
    }
  }

  loadDisplayCoupon() {
    this.be.getDiscountTranxByDiscountId(this.data).then(rsp => {
      rsp.subscribe(discountTranxs => {
        console.log(discountTranxs);
        this.displayCoupons = discountTranxs;
      });
    });
  }
  loadCouponUpdate(couponId) {
    if (couponId) {
      this.be.getOneCouponById(couponId).then(rsp => {
        rsp.subscribe(coupontranxs => {
          this.couponDetailsForm.setValue(coupontranxs);
        });
      });
    }
  }


  toggleEnable(event) {
    const enable = !event;

    let _enabled;
    if (enable === false) {
      _enabled = 0;
    } else if (enable === true) {
      _enabled = 1;
    }

    const couponTranx = {
      enabled: _enabled
    };
    this.be.updateCouponTranxEnable(this.data, couponTranx).then(rsp => {
      rsp.subscribe(r => {

        this.loadUpdateData();
        this.snackBar.open('Updated', 'OK', { duration: 1000 });
      });
    });
  }
  toggleValid(event) {
    const enable = !event;
    let _enabled;
    if (enable === false) {
      _enabled = 0;
    } else if (enable === true) {
      _enabled = 1;
    }

    const couponTranx = {
      discount_valid: _enabled
    };

    this.be.updateCouponTranxValid(this.data, couponTranx).then(rsp => {
      rsp.subscribe(r => {

        this.loadUpdateData();
        this.snackBar.open('Updated', 'OK', { duration: 1000 });
      });
    });
  }
}
