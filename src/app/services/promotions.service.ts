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
  async updatePromotionsById(id, food) {
    return this._http.put(this.backendService + 'promotions/' + id, food, this.httpOptions);
  }
  async getpromotionsByFoodId(id) {
    return this._http.get(this.backendService + 'promotionsByFoodId/' + id, this.httpOptions);
  }
  async getDiscountByFoodId(id) {
    return this._http.get(this.backendService + 'promotionDiscountByFoodId/' + id, this.httpOptions);
  }
}
