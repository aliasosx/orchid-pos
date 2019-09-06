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
  }
  ingredientForm: FormGroup;
  ingredientTypes: any;
  vendors: any;
  units: any;
  disabledBtn = false;
  ngOnInit() {
    this.ingredientForm = new FormGroup({
      id: new FormControl(),
      ingredientName: new FormControl(),
      ingredientTypeId: new FormControl(),
      quantityPerUnit: new FormControl(0),
      unitId: new FormControl(),
      unitPerPack: new FormControl(0),
      unitPrice: new FormControl(0),
      packPrice: new FormControl(0),
      supplierId: new FormControl(),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      enabled: new FormControl(),
      deleted: new FormControl(),
      createdAt: new FormControl(),
      updatedAt: new FormControl()
    });

    if (this.ingredienId) {
      this.bomService.getIngredientById(this.ingredienId).then(r => {
        r.subscribe(ingredient => {
          if (ingredient) {
            this.ingredientForm.setValue(ingredient[0]);
          }
        });
      });
    } else {
      return;
    }
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
}
