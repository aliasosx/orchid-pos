import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CouponViewComponent } from '../coupon-view/coupon-view.component';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css']
})
export class CouponListComponent implements OnInit {

  constructor(private be: BackendServiceService, private dialog: MatDialog, private dialogRef: MatDialogRef<CouponListComponent>) { }

  couponList: any;

  ngOnInit() {
    this.loadCouponList();
  }
  async loadCouponList() {
    this.be.getCoupons().then(rsp => {
      rsp.subscribe(coupons => {
        console.log(coupons);
        this.couponList = coupons;
      });
    });
  }
  viewCoupon(id) {
    const dialog = this.dialog.open(CouponViewComponent, {
      width: '900px',
      data: id,
    });
  }

}
