import { CloseBalanceComponent } from './../../dialogs/close-balance/close-balance.component';
import { CashLoad } from './../../interfaces/cashLoad';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { OpenCashComponent } from 'src/app/dialogs/open-cash/open-cash.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cashload',
  templateUrl: './cashload.component.html',
  styleUrls: ['./cashload.component.css']
})
export class CashloadComponent implements OnInit {

  constructor(private dialog: MatDialog, private db: AngularFirestore, private snackbar: MatSnackBar) {
    this.cashloadsRef = db.collection<CashLoad>('cashloads');
  }

  cashloadsRef: AngularFirestoreCollection<CashLoad>;
  cashloads: Observable<any[]>;

  ngOnInit() {
    this.cashloads = this.cashloadsRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as CashLoad;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
  }
  openCash() {
    const dialogRef = this.dialog.open(OpenCashComponent, {
      width: '600px'
    });
  }
  removeCashLoad(id) {
    if (id) {
      this.db.collection<CashLoad>('cashloads').doc(id).delete().then(() => {
        this.snackbar.open('Record has been removed', 'OK', { duration: 1000 });
      });
    }
  }
  openCloseBalance(cash) {
    const dialogRef = this.dialog.open(CloseBalanceComponent, {
      width: '600px',
      data: cash
    });
  }
}
