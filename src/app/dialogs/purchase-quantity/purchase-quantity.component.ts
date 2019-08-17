import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-purchase-quantity',
  templateUrl: './purchase-quantity.component.html',
  styleUrls: ['./purchase-quantity.component.css']
})
export class PurchaseQuantityComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PurchaseQuantityComponent>) { }
  quantityForm: FormGroup;
  total = 0;

  ngOnInit() {
    this.quantityForm = new FormGroup({
      quantity: new FormControl(1),
      quantityPerPack: new FormControl(1),
      packs: new FormControl(1),
    });
  }
  onPackChange() {
    this.total = 0;
    this.total = parseInt(this.quantityForm.get('packs').value, 10) * parseInt(this.quantityForm.get('quantityPerPack').value, 10);
    this.quantityForm.get('quantity').setValue(this.total);
  }
  saveQuantity() {
    this.dialogRef.close(this.quantityForm.get('quantity').value);
  }
}
