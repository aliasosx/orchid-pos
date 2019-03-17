import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Transaction } from 'src/app/interfaces/transaction';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Food } from 'src/app/interfaces/food';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-kitchen-report-admin',
  templateUrl: './kitchen-report-admin.component.html',
  styleUrls: ['./kitchen-report-admin.component.css']
})
export class KitchenReportAdminComponent implements OnInit {

  constructor(private db: AngularFirestore) {
    this.transactionsRef = db.collection<Transaction>('transactions', ref => {
      return ref.where('kitchen', '==', 'Food');
    });
  }
  viewReport = 'hidden';

  initDate: Date;

  transactionsRef: AngularFirestoreCollection<Transaction>;
  transactions: Observable<any[]>;
  transactionsReport: any[] = [];
  transactionCount = 0;
  transactionVolume = 0;

  foodReport: any[] = [];

  ngOnInit() {

  }
  async loadReport() {

    this.transactionCount = 0;
    this.transactionVolume = 0;
    this.transactionsReport = [];

    let c = await this.db.collection<Food>('foods', ref => {
      return ref.where('kitchen', '==', 'Food');
    }).get().subscribe(foods => {
      foods.docs.forEach(food => {
        let _food = '';
        this.transactionCount = 0;
        this.transactionVolume = 0;
        this.foodReport = [];

        this.db.collection<Transaction>('transactions').snapshotChanges().pipe(map(change => {
          return change.map(a => {
            const data = a.payload.doc.data() as Transaction;
            data['id'] = a.payload.doc.id;
            return data;
          });
        })).subscribe(tranxs => {
          tranxs.forEach(tranx => {
            const tranx_date = new DatePipe('en-us').transform(tranx.transaction_date, 'dd-MMM-yyyy');
            const pickedDate = new DatePipe('en-us').transform(this.initDate, 'dd-MMM-yyyy');

            console.log(tranx_date + ' = ' + pickedDate);
            if (tranx_date === pickedDate) {
              this.db.collection<Food>('foods', ref => {
                return ref.where('kitchen', '==', 'Food');
              }).get().subscribe(fds => {
                fds.forEach(fd => {
                  console.log(fd);
                });
              });
            }

          });
        });
      });
    });

  }
  dateEvent(e) {
    // console.log(new DatePipe('en-us').transform(e.target.value, 'dd-MMM-yyyy'));
    if (e) {
      this.initDate = e.target.value;
    }
  }
}
