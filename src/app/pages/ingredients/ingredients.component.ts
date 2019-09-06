import { Component, OnInit } from '@angular/core';
import { BomService } from 'src/app/services/bom.service';
import { MatDialog } from '@angular/material';
import { AddIngredientComponent } from 'src/app/dialogs/add-ingredient/add-ingredient.component';

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
  ngOnInit() {
    this.loadIngredients();
  }
  loadIngredients() {
    this.bomService.getIngredientsShow().then(r => {
      r.subscribe(ingredients => {
        this.ingredients = ingredients;
      });
    });
  }
  openAddIngredient() {
    const dialogRef = this.dialog.open(AddIngredientComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadIngredients();
    });
  }
  openIngredient(id) {
    const ing = this.dialog.open(AddIngredientComponent, {
      width: '400px',
      data: id
    });
    ing.afterClosed().subscribe(() => {
      this.loadIngredients();
    });
  }

}
