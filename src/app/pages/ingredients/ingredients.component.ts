import { Component, OnInit } from '@angular/core';
import { BomService } from 'src/app/services/bom.service';
import { MatDialog } from '@angular/material';
import { AddIngredientComponent } from 'src/app/dialogs/add-ingredient/add-ingredient.component';
import { AddIngredientCategoryComponent } from 'src/app/dialogs/add-ingredient-category/add-ingredient-category.component';
import { AddRecipeComponent } from 'src/app/dialogs/add-recipe/add-recipe.component';
import { IngredientTakeOffComponent } from 'src/app/dialogs/ingredient-take-off/ingredient-take-off.component';
import { IngredientTakeInComponent } from 'src/app/dialogs/ingredient-take-in/ingredient-take-in.component';
import { ViewIngredientHistoryComponent } from 'src/app/dialogs/view-ingredient-history/view-ingredient-history.component';

import { FormGroup, FormControl } from '@angular/forms';
import { AddIngredientFoodComponent } from 'src/app/dialogs/add-ingredient-food/add-ingredient-food.component';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  constructor(private bomService: BomService, private dialog: MatDialog) {

  }
  searchIngredients: any;
  ingredients: any;
  stocks: any;
  stocksChanges: any;
  recipeMasters: any;
  recipes: any;
  reports: any;
  recipesList = [];
  groupByIngredient: any;
  ingredientFoodViews: any;
  dateForm: FormGroup;
  ingredientFoodDataFormatted = [];
  preLoadData: any[] = [];
  ngOnInit() {
    this.dateForm = new FormGroup({
      startDate: new FormControl(new Date()),
      endDate: new FormControl(new Date())
    });
    this.loadAllInit();
  }

  loadAllInit() {
    this.loadIngredients();
    this.loadStockChangeDisplay();
    this.loadStockDisplay();
    this.loadRecipes();
    this.loadReports();
    this.loadIngredientFoodView();
  }
  loadIngredients() {
    this.bomService.getIngredientsShow().then(r => {
      r.subscribe(ingredients => {
        this.ingredients = ingredients;
      });
    });
  }
  loadStockDisplay() {
    this.bomService.getIngredientStockDisplay().then(r => {
      r.subscribe(stocks => {
        this.stocks = stocks;
      });
    });
  }
  loadStockChangeDisplay() {
    this.bomService.getIngredientStockChangeDisplay().then(r => {
      r.subscribe(stocks => {
        this.stocksChanges = stocks;
      });
    });
  }
  loadReports() {
    this.bomService.getReports(this.dateForm.value).then(r => {
      r.subscribe(reports => {
        this.reports = reports;
      });
    });
  }
  loadRecipes() {
    this.recipesList = [];
    this.bomService.getRecipesMasters().then(r => {
      r.subscribe(recipeMasters => {
        if (recipeMasters) {
          this.recipeMasters = recipeMasters;
          this.recipeMasters.forEach(recipeMaster => {
            this.bomService.getRecipeByRecipesMasters(recipeMaster['rmId']).then(rx => {
              rx.subscribe(recipe => {
                this.recipesList.push({
                  recipeMaster: recipeMaster,
                  recipe: recipe,
                });
              });
            });
          });
        }
      });
    });
    // console.log(this.recipesList);

  }
  loadIngredientFoodView() {
    this.bomService.getingredientFoodsItemAddViews().then(r => {
      r.subscribe(ingredientFoods => {
        this.ingredientFoodViews = ingredientFoods;
        this.preLoadData.push(ingredientFoods);
        this.preLoadData.forEach(p => {
          if (p.length > 0) {
            console.log(p);
          }
        });
      });
    });
  }
  openAddIngredient() {
    const dialogRef = this.dialog.open(AddIngredientComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadAllInit();
    });
  }
  openIngredient(id) {
    const ing = this.dialog.open(AddIngredientComponent, {
      width: '600px',
      data: id
    });
    ing.afterClosed().subscribe(() => {
      this.loadAllInit();
    });
  }
  openIngredientType() {
    const dialogRef = this.dialog.open(AddIngredientCategoryComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadAllInit();
    });
  }
  openRecips() {
    const dialogRef = this.dialog.open(AddRecipeComponent, {
      width: '800px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadAllInit();
    });
  }
  openIngredientTakeOff(item) {
    const dialogRef = this.dialog.open(IngredientTakeOffComponent, {
      width: '800px',
      data: item,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadAllInit();
    });
  }
  openIngredientBuy(ingredient) {
    const dialogRef = this.dialog.open(IngredientTakeInComponent, {
      width: '800px',
      data: ingredient,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadAllInit();
    });
  }

  viewHistory(item) {
    const dialogRef = this.dialog.open(ViewIngredientHistoryComponent, {
      width: '900px',
      data: item,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadAllInit();
    });
  }
  openAddRecipe() {
    const dialogRef = this.dialog.open(AddRecipeComponent, {
      width: '800px',
    });
    dialogRef.afterClosed().subscribe(r => {
      this.loadAllInit();
    });
  }
  updateRecipe(item) {
    const dialogRef = this.dialog.open(AddRecipeComponent, {
      width: '800px',
      data: item,
    });
    dialogRef.afterClosed().subscribe(rf => {
      if (rf === 'success') {
        this.loadAllInit();
      }
      localStorage.removeItem('recipes');
      localStorage.removeItem('recipeName');
    });
  }
  openIngredientFood() {
    const dialogRef = this.dialog.open(AddIngredientFoodComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(r => {
      this.loadIngredientFoodView();
    });
  }
}
