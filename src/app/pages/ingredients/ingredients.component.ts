import { Component, OnInit } from '@angular/core';
import { BomService } from 'src/app/services/bom.service';
import { MatDialog } from '@angular/material';
import { AddIngredientComponent } from 'src/app/dialogs/add-ingredient/add-ingredient.component';
import { AddIngredientCategoryComponent } from 'src/app/dialogs/add-ingredient-category/add-ingredient-category.component';
import { AddRecipeComponent } from 'src/app/dialogs/add-recipe/add-recipe.component';
import { IngredientTakeOffComponent } from 'src/app/dialogs/ingredient-take-off/ingredient-take-off.component';
import { IngredientTakeInComponent } from 'src/app/dialogs/ingredient-take-in/ingredient-take-in.component';
import { ViewIngredientHistoryComponent } from 'src/app/dialogs/view-ingredient-history/view-ingredient-history.component';

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

  ngOnInit() {
    this.loadAllInit();
  }

  loadAllInit() {
    this.loadIngredients();
    this.loadStockChangeDisplay();
    this.loadStockDisplay();
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
      width: '400px',
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
  }
}
