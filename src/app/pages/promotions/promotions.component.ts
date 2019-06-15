import { Component, OnInit } from '@angular/core';
import { PromotionsService } from 'src/app/services/promotions.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  constructor(private promotionServices: PromotionsService) { }
  searchPromotion: any;
  promotions: any;
  promotionDetails: any;

  promotionsList: any[] = [];
  promotionFoodsList: any[] = [];
  ngOnInit() {
    this.loadPromotions();
  }

  async loadPromotions() {
    this.promotionsList = [];
    this.promotionServices.getPromotions().then(r => {
      r.subscribe(promotions => {
        this.promotions = promotions;
        this.promotions.forEach(promotion => {
          console.log(promotion);
          this.promotionServices.getPromotionsById(promotion.id).then(rx => {
            rx.subscribe(promotionDetail => {
              this.promotionsList.push({
                promotion: promotion,
                foods: promotionDetail,
              });
            });
          });
        });
      });
      // console.log(this.promotionFoodsList);
    });
  }
  openAddNewDialog() {

  }
  toggleEnaledPFood(promotion) {
    // console.log(foods.pFood.fid);
    let enabled;
    if (promotion.promotion.enabled === 1) {
      enabled = 0;
    } else if (promotion.promotion.enabled === 0) {
      enabled = 1;
    }
    const foodEnabled = {
      enabled
    };
    this.promotionServices.updatePromotionsById(promotion.promotion.id, foodEnabled).then(rsp => {
      rsp.subscribe(r => {
        if (r['status'] === 'success') {
          this.loadPromotions();
        }
      });
    });
  }
}
