import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';

@Component({
  selector: 'app-transactions-view',
  templateUrl: './transactions-view.component.html',
  styleUrls: ['./transactions-view.component.css']
})
export class TransactionsViewComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private be: BackendServiceService, private dialogRef: MatDialogRef<TransactionsViewComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    this.loadTransactions();
  }
  tranx: any;
  invoice: string;
  refno: string;
  billAmount: number;
  tranxDate: any;

  ngOnInit() {
  }
  loadTransactions() {
    this.be.getTransactionsByOrderId(this.data).then(r => {
      r.subscribe(tranx => {
        this.tranx = tranx;
        this.invoice = tranx[0].invoiceno;
        this.refno = tranx[0].refno;
        this.billAmount = tranx[0].grandtotal;
        this.tranxDate = tranx[0].orderDateTime;
      });
    });
  }

}
