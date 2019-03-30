import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  constructor(private _http: HttpClient) { }
  backendService = environment.backendUrl.url;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  async openCashload(cashloadInst) {
    return this._http.post(this.backendService + 'cashloads', cashloadInst, this.httpOptions);
  }
  async removeCashload(id) {
    return this._http.delete(this.backendService + 'cashloads/' + id, this.httpOptions);
  }
  async cashLoadUpdate(id, cashloadInst) {
    return this._http.put(this.backendService + 'cashloads/' + id, cashloadInst, this.httpOptions);
  }

  async getCashload() {
    return this._http.get(this.backendService + 'cashloads', this.httpOptions);
  }

  async getUsers() {
    return this._http.get(this.backendService + 'users', this.httpOptions);
  }
  async createOrder(order) {
    return this._http.post(this.backendService + 'orders', order, this.httpOptions);
  }
  async createOrderDetail(orderDetail) {
    return this._http.post(this.backendService + 'orderdetails', orderDetail, this.httpOptions);
  }
  async updateOrder(orderId, order) {
    return this._http.put(this.backendService + 'orders/' + orderId, order, this.httpOptions);
  }
  async userActivityLog(activity) {
    return this._http.post(this.backendService + 'useractivity', activity, this.httpOptions);
  }
  async getKitchens() {
    return this._http.get(this.backendService + 'kitchens', this.httpOptions);
  }
  async getRoles() {
    return this._http.get(this.backendService + 'roles', this.httpOptions);
  }
  async checkCashstat(id) {
    return this._http.get(this.backendService + 'cashload_stat/' + id, this.httpOptions);
  }
  async loadCurrentCashloadByUser(id) {
    return this._http.get(this.backendService + 'cashloadByuser/' + id, this.httpOptions);
  }
  async getIncompleteOrder(id) {
    return this._http.get(this.backendService + 'orderIncomplete/' + id, this.httpOptions);
  }
  async getEOD(id, cashloadId) {
    const data = {
      cashloadId: cashloadId
    };
    return this._http.post(this.backendService + 'orderEOD/' + id, data, this.httpOptions);
  }

  async settleOrder(cashloadId, order) {
    return this._http.put(this.backendService + 'orderBatchSettle/' + cashloadId, order, this.httpOptions);
  }
  async getFoodTypes() {
    return this._http.get(this.backendService + 'foodtypes', this.httpOptions);
  }
  async createFoodTypes(foodtype) {
    return this._http.post(this.backendService + 'foodtypes', foodtype, this.httpOptions);
  }
  async updateFoodTypes(id, foodtype) {
    return this._http.put(this.backendService + 'foodtypes/' + id, foodtype, this.httpOptions);
  }
  // subfood
  async getSubFood() {
    return this._http.get(this.backendService + 'subfoods', this.httpOptions);
  }
  async createSubFood(subfood) {
    return this._http.post(this.backendService + 'subfoods', subfood, this.httpOptions);
  }
  async updateSubFood(id, subfood) {
    return this._http.put(this.backendService + 'subfoods/' + id, subfood, this.httpOptions);
  }

  // vendor
  async getVendor() {
    return this._http.get(this.backendService + 'vendors', this.httpOptions);
  }
  async createVendor(vendors) {
    return this._http.post(this.backendService + 'vendors', vendors, this.httpOptions);
  }
  async updateVendor(id, vendors) {
    return this._http.put(this.backendService + 'vendors/' + id, vendors, this.httpOptions);
  }
  // unit
  async getUnit() {
    return this._http.get(this.backendService + 'units', this.httpOptions);
  }
  async createUnit(units) {
    return this._http.post(this.backendService + 'units', units, this.httpOptions);
  }
  async updateUnit(id, units) {
    return this._http.put(this.backendService + 'units/' + id, units, this.httpOptions);
  }

  // Food
  async getFoods() {
    return this._http.get(this.backendService + 'foods', this.httpOptions);
  }
  async getFoodsById(id) {
    if (id) {
      return this._http.get(this.backendService + 'foods/' + id, this.httpOptions);
    } else {
      alert('No ID');
    }

  }

  async createFood(food) {
    return this._http.post(this.backendService + 'foods', food, this.httpOptions);
  }
  async updateFood(id, food) {
    return this._http.put(this.backendService + 'foods/' + id, food, this.httpOptions);
  }
  async getCurrencies() {
    return this._http.get(this.backendService + 'currencies', this.httpOptions);
  }
  async getSubfoods() {
    return this._http.get(this.backendService + 'subfoods', this.httpOptions);
  }
  async getFoodDisplay() {
    return this._http.get(this.backendService + 'foodsDisplay', this.httpOptions);
  }
  async getSubfoodById(id) {
    return this._http.get(this.backendService + 'subfoodByFoodId/' + id, this.httpOptions);
  }
  updateFoodTranxById(id, foodTranx) {
    return this._http.put(this.backendService + 'foodtranxs/' + id, foodTranx, this.httpOptions);
  }
  getFoodTranxByFoodId(id) {
    return this._http.get(this.backendService + 'foodtranxs/' + id, this.httpOptions);
  }
  createFoodTranx(foodtranx) {
    return this._http.post(this.backendService + 'foodtranxs', foodtranx, this.httpOptions);
  }
}

