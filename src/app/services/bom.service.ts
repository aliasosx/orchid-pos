import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BomService {

  constructor(private _http: HttpClient) { }

  backendService = environment.backendUrl.url;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  async createBom(bom) {
    return this._http.post(this.backendService + 'bom', bom, this.httpOptions);
  }
  async getProductsForBom() {
    return this._http.get(this.backendService + 'productBoms', this.httpOptions);
  }


}
