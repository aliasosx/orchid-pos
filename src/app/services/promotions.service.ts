import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor(private _http: HttpClient) { }
  backendService = environment.backendUrl.url;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  async getPromotions() {
    return this._http.get(this.backendService + 'promotions', this.httpOptions);
  }
  async getPromotionsById(id) {
    return this._http.get(this.backendService + 'promotionsById/' + id, this.httpOptions);
  }
  async getPromotionsRawById(id) {
    return this._http.get(this.backendService + 'promotionRawById/' + id, this.httpOptions);
  }
  async updatePromotionsById(id, food) {
    return this._http.put(this.backendService + 'promotions/' + id, food, this.httpOptions);
  }
  async getpromotionsByFoodId(id) {
    return this._http.get(this.backendService + 'promotionsByFoodId/' + id, this.httpOptions);
  }
  async getDiscountByFoodId(id) {
    return this._http.get(this.backendService + 'promotionDiscountByFoodId/' + id, this.httpOptions);
  }
  async getCouponDiscount() {
    return this._http.get(this.backendService + 'discountCoupons', this.httpOptions);
  }
  async getPromotionTypes() {
    return this._http.get(this.backendService + 'promotionTypes', this.httpOptions);
  }
  async createPromotion(data) {
    return this._http.post(this.backendService + 'discount', data, this.httpOptions);
  }
  async createPromotionTranx(data) {
    return this._http.post(this.backendService + 'discountTranx', data, this.httpOptions);
  }
  async getPromotionGroupByGroupId(id) {
    return this._http.get(this.backendService + 'promotionGroupByFoodId/' + id, this.httpOptions);
  }
  async getFoodMeatType() {
    return this._http.get(this.backendService + 'foodMeatTypes', this.httpOptions);
  }
  async getFoodMeatTypeById(id) {
    return this._http.get(this.backendService + 'foodMeatTypes/' + id, this.httpOptions);
  }
  async getDiscounts() {
    return this._http.get(this.backendService + 'discountViews', this.httpOptions);
  }
  async getDiscountDetailById(id) {
    return this._http.get(this.backendService + 'discountsDetailViewById/' + id, this.httpOptions);
  }
  async getDiscountTranxByDiscountId(id) {
    return this._http.get(this.backendService + 'discountTranxByDiscountId/' + id, this.httpOptions);
  }
  async updateDiscountTranx(id, data) {
    return this._http.put(this.backendService + 'discountTranx/' + id, data, this.httpOptions);
  }
  async discountsDetailFoodId(foodId) {
    return this._http.get(this.backendService + 'discountsDetailFoodId/' + foodId, this.httpOptions);
  }
  async getDiscountTypes() {
    return this._http.get(this.backendService + 'discountTypes', this.httpOptions);
  }
  async createAdditionalFood(data) {
    return this._http.post(this.backendService + 'createAdditionalFood', data, this.httpOptions);
  }
  async getDiscountAdditionalFoodByDiscountId(discountId) {
    return this._http.get(this.backendService + 'viewAdditionalFoodList/' + discountId, this.httpOptions);
  }
  async deleteDiscountAdditionalFoodBy(id) {
    const cmd = {
      deleted: 1
    };
    return this._http.put(this.backendService + 'deleteAdditionalFood/' + id, cmd, this.httpOptions);
  }
}
