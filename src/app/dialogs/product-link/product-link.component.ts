import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { StockServicesService } from 'src/app/services/stock-services.service';

@Component({
  selector: 'app-product-link',
  templateUrl: './product-link.component.html',
  styleUrls: ['./product-link.component.css']
})
export class ProductLinkComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private stockService: StockServicesService, private dialogRef: MatDialogRef<ProductLinkComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  stockTranxForm: FormGroup;
  btnDisabled = false;
  stockTranxs: any;
  foodsStock: any;

  ngOnInit() {
    this.stockTranxForm = new FormGroup({
      productId: new FormControl(this.data.pid),
      foodId: new FormControl(),
      remarks: new FormControl(),
      enabled: new FormControl(1),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      createdAt: new FormControl(new Date()),
      updatedAt: new FormControl(new Date()),
    });
    if (this.data) {
      this.loadExistingList();
      this.loadFoods();
    }
  }
  addStockTranx() {
    if (this.stockTranxForm.valid) {
      this.stockService.createStockTranx(this.stockTranxForm.value).then(rsp => {
        rsp.subscribe(rspx => {
          this.loadExistingList();

        });
      });
    }

  }
  async loadExistingList() {
    this.stockService.getStockTranxByProductId(this.data.pid).then(rsp => {
      rsp.subscribe(stockTransx => {
        this.stockTranxs = stockTransx;
      });
    });
  }
  loadFoods() {
    this.stockService.getStockFood().then(rsp => {
      rsp.subscribe(foodsStock => {
        this.foodsStock = foodsStock;
      });
    });
  }

}
