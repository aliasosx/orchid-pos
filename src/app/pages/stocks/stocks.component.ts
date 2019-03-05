import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { StockHistory } from 'src/app/interfaces/stockHistory';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  constructor(private db: AngularFirestore) {
    this.stocksRef = db.collection<StockHistory>('stockHistories', ref => {
      return ref.orderBy('updateDate', 'desc');
    });
  }

  stocksRef: AngularFirestoreCollection<StockHistory>;
  stocks: Observable<any[]>

  ngOnInit() {
    this.stocks = this.stocksRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as StockHistory;
        data['id'] = a.payload.doc.id;
        return data;
      })
    }));
  }

}
