import { Component, OnInit, Inject } from '@angular/core';
import { BomService } from 'src/app/services/bom.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';

@Component({
  selector: 'app-ingredient-take-in',
  templateUrl: './ingredient-take-in.component.html',
  styleUrls: ['./ingredient-take-in.component.css']
})
export class IngredientTakeInComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private bomService: BomService, @Inject(MAT_DIALOG_DATA) public data, private backendService: BackendServiceService, private dialogRef: MatDialogRef<IngredientTakeInComponent>) { }
  purchaseForm: FormGroup;
  ingredientStockChangeTypes: any;
  units: any;
  btnDisabled = false;
  currencies: any;

  ngOnInit() {
    console.log(this.data);
    this.purchaseForm = new FormGroup({
      refno: new FormControl(this.backendService.padding(Math.floor(Math.random() * 60000000000) + 1, 12)),
      changeHistoryId: new FormControl(2),
      ingredientId: new FormControl(this.data.ingredientId),
      prevQuantity: new FormControl(this.data.currentQuantity),
      usedQuantity: new FormControl(0),
      currentQuantity: new FormControl(),
      src_price: new FormControl(this.data.unitPrice),
      src_currCodeId: new FormControl(2),
      exchange_rate: new FormControl(1),
      convertedAmount: new FormControl(),
      remarks: new FormControl(),
      userId: new FormControl(this.backendService.getUserId()),
      unitId: new FormControl(this.data.unitId),
    });
    this.loadIngredientChangeTypes();
    this.loadUnits();
    this.loadCurrencies();
  }
  loadInitData() {
    this.purchaseForm.get('prevQuantity').setValue(this.data.currentQuantity);
  }
  loadIngredientChangeTypes() {
    this.bomService.getIngredientStockChangeTypes().then(r => {
      r.subscribe(stockChangeType => {
        this.ingredientStockChangeTypes = stockChangeType;
      });
    });
  }
  loadUnits() {
    this.backendService.getUnit().then(r => {
      r.subscribe(u => {
        this.units = u;
      });
    });
  }
  public loadCurrencies() {
    this.backendService.getCurrencies().then(r => {
      r.subscribe(curr => this.currencies = curr);
    });
  }
  public getCurrencyRate(currencyId) {
    this.backendService.getCurrency(currencyId).then(r => {
      r.subscribe(rate => {
        this.purchaseForm.get('exchange_rate').setValue(rate[0].rate);
        // tslint:disable-next-line: max-line-length
        this.purchaseForm.get('convertedAmount').setValue(this.purchaseForm.get('exchange_rate').value * this.purchaseForm.get('usedQuantity').value * this.purchaseForm.get('src_price').value);
      });
    });
  }
  savePurchase() {
    if (this.purchaseForm.valid) {
      this.btnDisabled = true;
      this.purchaseForm.get('currentQuantity').setValue(this.data.currentQuantity + this.purchaseForm.get('usedQuantity').value);
      this.bomService.createIngredientChangeHistory(this.purchaseForm.value).then(r => {
        r.subscribe(chg => {
          if (chg['status'] === 'success') {
            this.dialogRef.close('success');
          }
        });
      });
    } else {
      this.btnDisabled = false;
      return;
    }
  }
  onQuantityChanged() {
    // tslint:disable-next-line: max-line-length
    this.purchaseForm.get('convertedAmount').setValue(this.purchaseForm.get('exchange_rate').value * this.purchaseForm.get('usedQuantity').value * this.purchaseForm.get('src_price').value);
  }
  onPriceChanged() {
    // tslint:disable-next-line: max-line-length
    this.purchaseForm.get('convertedAmount').setValue(this.purchaseForm.get('exchange_rate').value * this.purchaseForm.get('usedQuantity').value * this.purchaseForm.get('src_price').value);
  }
}
