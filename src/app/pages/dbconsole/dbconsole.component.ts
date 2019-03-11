import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/interfaces/transaction';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { StockHistory } from 'src/app/interfaces/stockHistory';

@Component({
  selector: 'app-dbconsole',
  templateUrl: './dbconsole.component.html',
  styleUrls: ['./dbconsole.component.css']
})
export class DbconsoleComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit() {

  }
  async updateTransactionsLogfix() {
    /*
    this.db.collection<Transaction>('transactions', ref => {
      return ref.where('username', '==', localStorage.getItem('username'));
    }).get().subscribe(transctions => {
      transctions.docs.forEach(transaction => {
        console.log(transaction.id + ' => ' + transaction.data().settled);
        this.db.collection<Transaction>('transactions').doc(transaction.id).update({
          'settled': false,
        }).then((resp) => {
          console.log(resp)
        });
      })
    });
    */
  }

}
