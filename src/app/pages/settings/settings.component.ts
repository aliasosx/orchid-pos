import { AddFoodCategoryComponent } from './../../dialogs/add-food-category/add-food-category.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  openAddFoodCat() {
    const dialogRef = this.dialog.open(AddFoodCategoryComponent, { width: '600px' });
  }

}
