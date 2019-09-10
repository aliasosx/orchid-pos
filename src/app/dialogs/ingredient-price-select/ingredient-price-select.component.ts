import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BackendServiceService } from './../../services/common/backend-service.service';
import { Component, OnInit, Inject } from '@angular/core';
import { BomService } from 'src/app/services/bom.service';

@Component({
  selector: 'app-ingredient-price-select',
  templateUrl: './ingredient-price-select.component.html',
  styleUrls: ['./ingredient-price-select.component.css']
})
export class IngredientPriceSelectComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private bomService: BomService, private backendService: BackendServiceService, @Inject(MAT_DIALOG_DATA) public data, private dialogRef: MatDialogRef<IngredientPriceSelectComponent>) { }
  currencies: any;
  priceForm: FormGroup;
  ngOnInit() {
    this.priceForm = new FormGroup({
      ingId: new FormControl(),
      unitId: new FormControl(),
      srcUnitPrice: new FormControl(),
      srcUnitCurrCodeId: new FormControl(),
      unitPrice: new FormControl(),
      srcPackPrice: new FormControl(),
      srcPackCurrCodeId: new FormControl(),
      packPrice: new FormControl(),
      rate: new FormControl(),
      currency_name: new FormControl(),
      ingredientName: new FormControl(),
      quantity: new FormControl(),
      quantityPerUnit: new FormControl(),
      refno: new FormControl(),
      unitPerPack: new FormControl(),
      unit_name: new FormControl(),
      total: new FormControl(),
      currentQuantity: new FormControl(),
    });
    this.priceForm.setValue(this.data);
    this.loadCurrencies();
  }
  loadCurrencies() {
    this.backendService.getCurrencies().then(r => {
      r.subscribe(curr => this.currencies = curr);
    });
  }
  srcUnitPriceChange(value) {
    this.priceForm.get('unitPrice').setValue(value);
  }
  srcPackPrice(value) {
    this.priceForm.get('packPrice').setValue(value);
  }
  saveAmount() {
    if (this.priceForm.valid) {
      const buffer = [];
      buffer.push(this.priceForm.value);
      this.dialogRef.close(buffer);
    } else {
      return;
    }
  }
}
