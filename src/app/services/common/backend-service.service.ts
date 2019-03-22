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

}
