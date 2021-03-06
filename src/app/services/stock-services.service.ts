import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

import { Product } from '../interfaces/product';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockServicesService {

  constructor(private db: AngularFirestore, private _http: HttpClient) { }
  productsRef: AngularFirestoreCollection<Product>;
  productsDoc: AngularFirestoreDocument<Product>;

  CurrentQuantity: number;


  backendService = environment.backendUrl.url;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  getLatestQuantityByProductName(productName): Promise<Product> {
    return new Promise((resolve, reject) => {
      return this.db.collection('products', ref => {
        return ref.where('productName', '==', productName);
      });
    });
  }
  getLatestQuantityByProductCode(productCode): Promise<Product> {
    return new Promise((resolve, reject) => {
      return this.db.collection('products', ref => {
        return ref.where('productCode', '==', productCode);
      }).snapshotChanges().pipe(map(change => {
        return change.map(a => {
          const products = a.payload.doc.data() as Product;
          products['id'] = a.payload.doc.id;
          return products;
        });
      }));
    });
  }
  async getCurrentStocks() {
    return this._http.get(this.backendService + 'currentStocks', this.httpOptions);
  }
  async getCurrentStocksByDateRange(dateRange) {
    return this._http.post(this.backendService + 'currentStocksByDate', dateRange, this.httpOptions);
  }
  async getStockTranxByProductId(id) {
    return this._http.get(this.backendService + 'stockTranxByProductId/' + id, this.httpOptions);
  }
  async getStockFood() {
    return this._http.get(this.backendService + 'stockFoodByKitchen', this.httpOptions);
  }
  async createStockTranx(data) {
    return this._http.post(this.backendService + 'createStockTranx', data, this.httpOptions);
  }
  async deleteStockTranx(id) {
    return this._http.delete(this.backendService + 'stockTranx/' + id, this.httpOptions);
  }
  async stockTakeOff(data) {
    return this._http.post(this.backendService + 'stockTakeOff', data, this.httpOptions);
  }

  async getStockEOD() {
    return this._http.get(this.backendService + 'stockFoodByKitchen', this.httpOptions);
  }

  async createStockEod(data) {
    return this._http.post(this.backendService + 'stockeod', data, this.httpOptions);
  }
  async getStockEODByCashId(id) {
    return this._http.get(this.backendService + 'stockeodDisplay/' + id, this.httpOptions);
  }
  async deleteStockEod(id) {
    return this._http.delete(this.backendService + 'stockeod/' + id, this.httpOptions);
  }
  async updateStockEod(id, data) {
    return this._http.put(this.backendService + 'stockeod/' + id, data, this.httpOptions);
  }
  async getStockHistoriesByDate(data) {
    return this._http.post(this.backendService + 'getStockHistory', data, this.httpOptions);
  }
  async getProductCategories() {
    return this._http.get(this.backendService + 'getProductCategories', this.httpOptions);
  }
  async stockEODProcess(id) {
    return this._http.get(this.backendService + 'stockedoprocess/' + id, this.httpOptions);
  }
  async getReportGroupByDate(dateRange) {
    return this._http.post(this.backendService + 'reportGroupByDate', dateRange, this.httpOptions);
  }
}
