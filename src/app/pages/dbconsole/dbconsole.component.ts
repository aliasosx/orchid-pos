import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/interfaces/transaction';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dbconsole',
  templateUrl: './dbconsole.component.html',
  styleUrls: ['./dbconsole.component.css']
})
export class DbconsoleComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit() {

  }
  updateTransactionsLogfix(foodId) {
    this.db.collection<Transaction>('transactions').snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as Transaction;
        data['id'] = a.payload.doc.id;
        return data;
      });
    })).subscribe(tx => {
      tx.forEach(t => {
        if (t.foodId == foodId) {
          this.db.collection<Transaction>('transactions').doc(t.id).update({
            cost: 5800,
            total_cost: 5800 * 1,
            profit: 13000 - 5800,
          }).then(() => {
            console.log('Transaction log updated');
          });
        }
      })
    });
  }

}
