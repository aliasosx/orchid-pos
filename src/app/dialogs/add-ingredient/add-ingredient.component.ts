import { Component, OnInit, Inject } from '@angular/core';
import { BomService } from 'src/app/services/bom.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private bomService: BomService, private backendService: BackendServiceService, private dialogRef: MatDialogRef<AddIngredientComponent>, @Inject(MAT_DIALOG_DATA) public ingredienId) {
    this.loadIngredientTypes();
    this.loadSupplier();
    this.loadUnits();
    this.loadKitchen();
    this.loadCurrencies();
    this.loadIngredientPackUnit();
  }
  ingredientForm: FormGroup;
  ingredientTypes: any;
  vendors: any;
  units: any;
  disabledBtn = false;
  kitchens: any;
  currencies: any;
  rate = 1;
  packUnits: any;

  ngOnInit() {
    this.ingredientForm = new FormGroup({
      id: new FormControl(),
      refno: new FormControl(this.backendService.padding(Math.floor(Math.random() * 60000000000) + 1, 12)),
      ingredientName: new FormControl(),
      ingredientTypeId: new FormControl(),
      quantityPerUnit: new FormControl(0),
      unitId: new FormControl(),
      unitPerPack: new FormControl(0),
      unitPrice: new FormControl(0),
      packPrice: new FormControl(0),
      supplierId: new FormControl(),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      remarks: new FormControl(),
      currentQuantity: new FormControl(0),
      srcUnitPrice: new FormControl(),
      srcUnitCurrCodeId: new FormControl(2),
      srcPackPrice: new FormControl(),
      srcPackCurrCodeId: new FormControl(2),
      exchangeRate: new FormControl(),
      enabled: new FormControl(1),
      deleted: new FormControl(0),
      createdAt: new FormControl(),
      updatedAt: new FormControl(),
      kitchenId: new FormControl(),
      packUnitId: new FormControl(1),
    });

    if (this.ingredienId) {
      this.bomService.getIngredientById(this.ingredienId).then(r => {
        r.subscribe(ingredient => {
          if (ingredient) {
            console.log(ingredient);
            this.ingredientForm.setValue(ingredient[0]);
          }
        });
      });
    } else {
      return;
    }
  }
  loadIngredientPackUnit() {
    this.bomService.getIngredientPackUnit().then(r => {
      r.subscribe(packs => this.packUnits = packs);
    });
  }
  loadIngredientTypes() {
    this.bomService.getIngredientTypes().then(r => {
      r.subscribe(ingredientTypes => this.ingredientTypes = ingredientTypes);
    });
  }
  loadSupplier() {
    this.backendService.getVendor().then(r => {
      r.subscribe(vendors => this.vendors = vendors);
    });
  }
  loadUnits() {
    this.backendService.getUnit().then(r => {
      r.subscribe(units => this.units = units);
    });
  }
  loadCurrencies() {
    this.backendService.getCurrencies().then(r => {
      r.subscribe(curr => this.currencies = curr);
    });
  }
  createIngredient() {
    if (this.ingredientForm.valid) {
      this.disabledBtn = true;
      if (this.ingredienId) {
        this.bomService.updateIngredient(this.ingredienId, this.ingredientForm.value).then(r => {
          r.subscribe(rsp => {
            if (rsp['status'] === 'success') {
              this.dialogRef.close('success');
              return;
            } else {
              this.disabledBtn = false;
              return;
            }
          });
        });
      }
      this.bomService.createIngredient(this.ingredientForm.value).then((r) => {
        r.subscribe(rsp => {
          if (rsp['status'] === 'success') {
            this.dialogRef.close('success');
          } else {
            this.disabledBtn = false;
            return;
          }
        });
      });
    } else {
      this.disabledBtn = false;
      return;
    }
  }
  loadKitchen() {
    this.backendService.getKitchens().then(r => {
      r.subscribe(k => this.kitchens = k);
    });
  }
  changeCurrUnitPrice(e) {
    this.getCurrencyRate(e);
  }
  changeCurrPack(e) {
    this.getCurrencyRate(e);
    this.ingredientForm.get('srcPackCurrCodeId').setValue(e);
  }
  srcAmountChange() {
    // tslint:disable-next-line: max-line-length
    this.ingredientForm.get('unitPrice').setValue(this.rate * this.ingredientForm.get('srcUnitPrice').value);
  }
  srcPackAmountChange() {
    // tslint:disable-next-line: max-line-length
    this.ingredientForm.get('packPrice').setValue(this.rate * this.ingredientForm.get('srcPackPrice').value);
  }
  getCurrencyRate(currencyId) {
    this.backendService.getCurrency(currencyId).then(r => {
      r.subscribe(rate => {
        this.rate = rate[0].rate;
        this.ingredientForm.get('exchangeRate').setValue(rate[0].rate);
        // console.log(this.rate);
        // tslint:disable-next-line: max-line-length
        this.ingredientForm.get('unitPrice').setValue(this.rate * this.ingredientForm.get('srcUnitPrice').value);
        // tslint:disable-next-line: max-line-length
        this.ingredientForm.get('packPrice').setValue(this.rate * this.ingredientForm.get('srcPackPrice').value);
      });
    });
  }
}
