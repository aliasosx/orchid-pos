import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BomService } from 'src/app/services/bom.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-ingredient-category',
  templateUrl: './add-ingredient-category.component.html',
  styleUrls: ['./add-ingredient-category.component.css']
})
export class AddIngredientCategoryComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddIngredientCategoryComponent>, private bomService: BomService) { }
  ingredientTypesForm: FormGroup;
  disabledBtn = false;
  ingredientTypes: any;

  ngOnInit() {
    this.ingredientTypesForm = new FormGroup({
      ingredientTypeName: new FormControl(),
      descriptions: new FormControl(),
    });
    this.getIngredientTypes();
  }
  createIngredientType() {
    if (this.ingredientTypesForm.valid) {
      this.bomService.createIngredientType(this.ingredientTypesForm.value).then(r => {
        r.subscribe(rsp => {
          if (rsp['status'] === 'success') {
            this.dialogRef.close('success');
          }
        });
      });
    }
  }
  getIngredientTypes() {
    this.bomService.getIngredientTypes().then(r => {
      r.subscribe(ingredientTypes => {
        this.ingredientTypes = ingredientTypes;
      });
    });
  }
}
