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

  }

}
