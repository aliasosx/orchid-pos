import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Product } from '../interfaces/product';
import { map } from 'rxjs/operators';

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
}
