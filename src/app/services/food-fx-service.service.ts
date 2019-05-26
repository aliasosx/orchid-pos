import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodFxServiceService {

  constructor(private _http: HttpClient) { }
  backendService = environment.backendUrl.url;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  async getFoodFx() {
    return this._http.get(this.backendService + 'foodFx', this.httpOptions);
  }
  async createFoodFx(data) {
    return this._http.post(this.backendService + 'foodFx', data, this.httpOptions);
  }
  async createFoodFxTranx(data) {
    return this._http.post(this.backendService + 'foodFxTranx', data, this.httpOptions);
  }

}
