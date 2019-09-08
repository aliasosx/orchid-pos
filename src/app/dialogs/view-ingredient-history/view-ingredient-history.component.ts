import { Component, OnInit, Inject } from '@angular/core';
import { BomService } from 'src/app/services/bom.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-view-ingredient-history',
  templateUrl: './view-ingredient-history.component.html',
  styleUrls: ['./view-ingredient-history.component.css']
})
export class ViewIngredientHistoryComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private bomService: BomService, private dialogRef: MatDialogRef<ViewIngredientHistoryComponent>, @Inject(MAT_DIALOG_DATA) public data) { }
  stockHistories: any;

  ngOnInit() {
    this.loadIngredientChangeHist();
  }
  loadIngredientChangeHist() {
    this.bomService.getIngredientStockChangeById(this.data.StockId).then(r => {
      r.subscribe(stockHist => {
        console.log(stockHist);
        this.stockHistories = stockHist;
      });
    });
  }

}
