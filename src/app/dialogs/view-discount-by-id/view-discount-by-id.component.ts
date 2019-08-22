import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { PromotionsService } from 'src/app/services/promotions.service';
import { FoodDiscountViewComponent } from '../food-discount-view/food-discount-view.component';
import { AddPromotionFoodComponent } from '../add-promotion-food/add-promotion-food.component';

@Component({
  selector: 'app-view-discount-by-id',
  templateUrl: './view-discount-by-id.component.html',
  styleUrls: ['./view-discount-by-id.component.css']
})
export class ViewDiscountByIdComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private dialogRef: MatDialogRef<ViewDiscountByIdComponent>, @Inject(MAT_DIALOG_DATA) public data, private promotionService: PromotionsService, private dialog: MatDialog) {
    this.loadDiscount();
  }
  promos: any;
  promocode: string;
  promoDiscription: string;
  ngOnInit() {

  }
  loadDiscount() {
    this.promotionService.getDiscountDetailById(this.data.id).then(r => {
      r.subscribe(promos => {
        this.promos = promos;
        this.promocode = promos[0].discount_code;
        this.promoDiscription = promos[0].discount_description;
        // console.log(promos);
      });
    });
  }
  updateFoodDiscount(discountTranxId) {
    const dialogRefs = this.dialog.open(FoodDiscountViewComponent, {
      width: '300px',
      data: discountTranxId,
    });
    dialogRefs.afterClosed().subscribe(rs => {
      if (rs === 'success') {
        this.loadDiscount();
      }
    });
    return;
  }
  openAddPromotionFood() {
    const dialogRefs = this.dialog.open(AddPromotionFoodComponent, {
      width: '400px',
      data: this.data,
    });
    dialogRefs.afterClosed().subscribe(rsp => {
      this.loadDiscount();
    });
  }
  toggleEnable(id, event) {
    console.log(id);
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
    console.log(couponTranx);
    this.promotionService.updateDiscountTranx(id, couponTranx).then(rsp => {
      rsp.subscribe(r => {
        console.log(r);
        this.loadDiscount();
        // this.snackBar.open('Updated', 'OK', { duration: 1000 });
      });
    });
  }
}
