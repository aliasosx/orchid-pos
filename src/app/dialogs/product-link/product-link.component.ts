import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-link',
  templateUrl: './product-link.component.html',
  styleUrls: ['./product-link.component.css']
})
export class ProductLinkComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ProductLinkComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  stockTranxForm: FormGroup;

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
    console.log(this.data);
  }
  addStockTranx() {

  }
}
