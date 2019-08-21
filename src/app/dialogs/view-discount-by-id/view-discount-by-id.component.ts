import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { PromotionsService } from 'src/app/services/promotions.service';
import { FoodDiscountViewComponent } from '../food-discount-view/food-discount-view.component';

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
        console.log(promos);
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
}
