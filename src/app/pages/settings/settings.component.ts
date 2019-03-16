import { BankingComponent } from './../../dialogs/banking/banking.component';
import { AddFoodCategoryComponent } from './../../dialogs/add-food-category/add-food-category.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ExtendedFoodTypeComponent } from 'src/app/dialogs/extended-food-type/extended-food-type.component';
import { TicketsComponent } from 'src/app/dialogs/tickets/tickets.component';
import { PaymentTypesComponent } from 'src/app/dialogs/payment-types/payment-types.component';
import { VendorsComponent } from 'src/app/dialogs/vendors/vendors.component';
import { AddusersComponent } from 'src/app/dialogs/addusers/addusers.component';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { UsersComponent } from 'src/app/dialogs/users/users.component';
import { StaffBenefitComponent } from 'src/app/dialogs/staff-benefit/staff-benefit.component';
import { UnitsComponent } from 'src/app/dialogs/units/units.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private dialog: MatDialog, private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.username_info = user;
        return;
      } else {
        router.navigateByUrl('login');
      }
    });
  }
  private user: Observable<firebase.User>;
  username_info: any;

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
  openMenuSetting() {

  }
  openVendors() {
    const dialogRef = this.dialog.open(VendorsComponent, { width: '600px' });
  }
  openAddUser() {
    const dialogRef = this.dialog.open(UsersComponent, { width: '1024px' });
  }
  openStaffBenefit() {
    const dialogRef = this.dialog.open(StaffBenefitComponent, {
      width: '800px'
    });
  }
  openUnit() {
    const dialogRef = this.dialog.open(UnitsComponent, {
      width: '600px'
    });
  }
}
