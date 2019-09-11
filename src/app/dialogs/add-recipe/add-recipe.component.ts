import { Component, OnInit } from '@angular/core';
import { BomService } from 'src/app/services/bom.service';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
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
  recipeBuffer = [];
  recipeList: any;
  selectedIngredient: any;
  disabledText = false;

  ngOnInit() {
    this.recipeForm = new FormGroup({
      recipeName: new FormControl(),
      subfoodId: new FormControl(),
      foodId: new FormControl(),
      ingredientId: new FormControl(),
      ingredientName: new FormControl(),
      quantity: new FormControl(),
      unitId: new FormControl(),
      unitName: new FormControl(),
      descriptions: new FormControl(),
      userId: new FormControl(JSON.parse(localStorage.getItem('usrObj')).id),
      enabled: new FormControl(1),
      createdAt: new FormControl(new Date()),
      updatedAt: new FormControl(new Date())
    });
    this.loadTempIngredients();
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
      // console.log(this.ingredients);
      r.subscribe(ingredients => this.ingredients = ingredients);
    });
  }
  loadSubFoods() {
    this.backendService.getSubfoods().then(r => {
      r.subscribe(subfoods => this.subfoods = subfoods);
    });
  }
  loadTempIngredients() {
    if (JSON.parse(localStorage.getItem('recipes'))) {
      this.recipeList = JSON.parse(localStorage.getItem('recipes'));
      this.recipeForm.get('recipeName').setValue(JSON.parse(localStorage.getItem('recipeName')));
      this.disabledText = true;
    }
  }
  addIngredient() {
    if (this.recipeForm.valid) {
      console.log(this.recipeForm.value);
      const buffer = [];
      if (this.recipeList) {
        buffer.push(this.recipeList);
        buffer.push(this.recipeForm.value);
        localStorage.setItem('recipes', JSON.stringify(buffer));
      } else {
        buffer.push(this.recipeForm.value);
        localStorage.setItem('recipeName', JSON.stringify(this.recipeForm.get('recipeName').value));
        localStorage.setItem('recipes', JSON.stringify(buffer));
      }
      this.loadTempIngredients();
    } else {
      console.log('Form invalid');
    }
  }
  getIngredientById(id) {
    this.bomService.getIngredientById(id).then(r => {
      r.subscribe(ingredient => {
        this.recipeForm.get('ingredientName').setValue(ingredient[0].ingredientName);
        this.recipeForm.get('unitId').setValue(ingredient[0].unitId);
        this.getUnitNameById(ingredient[0].unitId);
      });
    });
  }
  getUnitNameById(unitId) {
    this.backendService.getUnitById(unitId).then(r => {
      r.subscribe(unit => {
        this.recipeForm.get('unitName').setValue(unit['unit_name']);
      });
    });
  }
}
