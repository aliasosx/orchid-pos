import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Product } from '../interfaces/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StockServicesService {

  constructor(private db: AngularFirestore) { }
  productsRef: AngularFirestoreCollection<Product>;
  productsDoc: AngularFirestoreDocument<Product>;

  CurrentQuantity: number;

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
}
