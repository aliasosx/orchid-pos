import { BankingComponent } from './../../dialogs/banking/banking.component';
import { AddFoodCategoryComponent } from './../../dialogs/add-food-category/add-food-category.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ExtendedFoodTypeComponent } from 'src/app/dialogs/extended-food-type/extended-food-type.component';
import { TicketsComponent } from 'src/app/dialogs/tickets/tickets.component';
import { PaymentTypesComponent } from 'src/app/dialogs/payment-types/payment-types.component';

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
  openExtendedFoodType() {
    const dialogRef = this.dialog.open(ExtendedFoodTypeComponent, { width: '600px' });
  }
  openTicketMainternance() {
    const dialogRef = this.dialog.open(TicketsComponent, { width: '600px' });
  }
  openPaymentType() {
    const dialogRef = this.dialog.open(PaymentTypesComponent, { width: '600px' });
  }
  openBanking() {
    const dialogRef = this.dialog.open(BankingComponent, { width: '600px' });
  }

}
