import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { StockServicesService } from 'src/app/services/stock-services.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-stockhistory',
  templateUrl: './stockhistory.component.html',
  styleUrls: ['./stockhistory.component.css']
})
export class StockhistoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // tslint:disable-next-line: max-line-length
  constructor(private stockService: StockServicesService, private dialogRef: MatDialogRef<StockhistoryComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  stockHistories: any;
  tableDataSource: any;
  displayedColumns = ['no', 'previous quantity', 'used', 'current quantity', 'orderId', 'Updated At'];
  ngOnInit() {
    this.loadStockHist();
  }
  async loadStockHist() {
    const json = {
      stockId: this.data,
      stockHistDate: new Date(),
    };
    await this.stockService.getStockHistoriesByDate(json).then(rsp => {
      rsp.subscribe(async (stockHistories) => {
        this.stockHistories = await stockHistories;
        this.tableDataSource = await new MatTableDataSource(this.stockHistories);
        this.tableDataSource.paginator = this.paginator;
        console.log(stockHistories);
      });
    });
  }

}
