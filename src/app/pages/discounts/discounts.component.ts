import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';
import { PromotionsService } from 'src/app/services/promotions.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ViewDiscountByIdComponent } from 'src/app/dialogs/view-discount-by-id/view-discount-by-id.component';
import { AddDiscountComponent } from 'src/app/dialogs/add-discount/add-discount.component';
import { AdditionalFoodsComponent } from 'src/app/dialogs/additional-foods/additional-foods.component';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private backendService: BackendServiceService, private promotionService: PromotionsService, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.loadDiscounts();
  }
  disconts: any;
  ngOnInit() {
  }
  loadDiscounts() {
    this.promotionService.getDiscounts().then(d => {
      d.subscribe(disconts => {
        this.disconts = disconts;
        // console.log(disconts);
      });
    });
  }
  toggleEnable(id, event) {
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
    this.backendService.updateCouponTranxEnable(id, couponTranx).then(rsp => {
      rsp.subscribe(r => {
        this.loadDiscounts();
        this.snackBar.open('Updated', 'OK', { duration: 1000 });
      });
    });
  }
  toggleValid(id, event) {
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

    this.backendService.updateCouponTranxValid(id, couponTranx).then(rsp => {
      rsp.subscribe(r => {

        this.loadDiscounts();
        this.snackBar.open('Updated', 'OK', { duration: 1000 });
      });
    });
  }
  openCouponView(discount) {
    const dialogRef = this.dialog.open(ViewDiscountByIdComponent, {
      width: '800px',
      data: discount,
    });
  }
  openAddPromotion() {
    const dialogRef = this.dialog.open(AddDiscountComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(r => this.loadDiscounts());
  }
  openAddAdditionalFood(discountId) {
    console.log(discountId);
    const dialogRef = this.dialog.open(AdditionalFoodsComponent, {
      width: '600px',
      data: discountId
    });
    dialogRef.afterClosed().subscribe(r => this.loadDiscounts());
  }
}
