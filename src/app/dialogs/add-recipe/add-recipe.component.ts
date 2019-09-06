import { Component, OnInit } from '@angular/core';
import { BomService } from 'src/app/services/bom.service';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/common/backend-service.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private bomService: BomService, private dialogRef: MatDialogRef<AddRecipeComponent>, private backendService: BackendServiceService) {
    this.loadFoodName();
    this.loadFoodType();
    this.loadIngredients();
    this.loadSubFoods();
  }
  recipeForm: FormGroup;
  recipes: any;
  foods: any;
  foodTypes: any;
  foodType: any;
  ingredients: any;
  subfoods: any;

  ngOnInit() {
    this.recipeForm = new FormGroup({
      subfoodId: new FormControl(),
      foodId: new FormControl(),
      ingredientId: new FormControl(),
      quantity: new FormControl(),
      unitId: new FormControl(),
      descriptions: new FormControl(),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      enabled: new FormControl(1),
      createdAt: new FormControl(),
      updatedAt: new FormControl()
    });
  }
  loadFoodName() {
    this.backendService.getFoods().then(r => {
      r.subscribe(foods => this.foods = foods);
    });
  }
  loadFoodType() {
    this.backendService.getFoodTypes().then(r => {
      r.subscribe(foodTypes => this.foodTypes = foodTypes);
    });
  }
  loadIngredients() {
    this.bomService.getIngredients().then(r => {
      r.subscribe(ingredients => this.ingredients = ingredients);
    });
  }
  loadSubFoods() {
    this.backendService.getSubfoods().then(r => {
      r.subscribe(subfoods => this.subfoods = subfoods);
    });
  }
}
