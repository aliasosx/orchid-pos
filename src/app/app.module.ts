import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule, FirestoreSettingsToken } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';
import { NavbarComponent } from './layouts/navbar/navbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule,
  MatCardModule, MatFormFieldModule, MatProgressBarModule,
  MatSnackBarModule, MatStepperModule, MatTabsModule, MatDivider, MatDividerModule, MatListModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FoodsComponent } from './pages/foods/foods.component';
import { ProductsComponent } from './pages/products/products.component';
import { PosComponent } from './pages/pos/pos.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AddFoodComponent } from './dialogs/add-food/add-food.component';
import { ViewFoodComponent } from './dialogs/view-food/view-food.component';
import { AddFoodCategoryComponent } from './dialogs/add-food-category/add-food-category.component';
import { ExtendedFoodTypeComponent } from './dialogs/extended-food-type/extended-food-type.component';
import { AddExtendedFoodComponent } from './dialogs/add-extended-food/add-extended-food.component';
import { ViewExtendedFoodComponent } from './dialogs/view-extended-food/view-extended-food.component';
import { SubfoodsComponent } from './dialogs/subfoods/subfoods.component';
import { AddNoteComponent } from './dialogs/add-note/add-note.component';
import { PaymentCashComponent } from './dialogs/payment-cash/payment-cash.component';
import { PaymentBanksChannelComponent } from './dialogs/payment-banks-channel/payment-banks-channel.component';
import { TicketsComponent } from './dialogs/tickets/tickets.component';
import { PaymentTypesComponent } from './dialogs/payment-types/payment-types.component';
import { BankingComponent } from './dialogs/banking/banking.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { AddProductsComponent } from './dialogs/add-products/add-products.component';
import { ViewProductsComponent } from './dialogs/view-products/view-products.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { AddPurchaseComponent } from './dialogs/add-purchase/add-purchase.component';
import { ViewPurchaseComponent } from './dialogs/view-purchase/view-purchase.component';
import { VendorsComponent } from './dialogs/vendors/vendors.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UsersComponent } from './dialogs/users/users.component';
import { AddusersComponent } from './dialogs/addusers/addusers.component';
import { LoginComponent } from './authentication/login/login.component';
import { DatePipe } from '@angular/common';
import { UserRegisterComponent } from './dialogs/user-register/user-register.component';
import { BomComponent } from './pages/bom/bom.component';
import { AddbomComponent } from './dialogs/addbom/addbom.component';
import { FoodPipePipe } from './pipes/food-pipe.pipe';
import { ProductPipe } from './pipes/product.pipe';
import { KitchenOrdersComponent } from './pages/kitchen-orders/kitchen-orders.component';
import { AddQuantityComponent } from './dialogs/add-quantity/add-quantity.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    FoodsComponent,
    ProductsComponent,
    PosComponent,
    SettingsComponent,
    AddFoodComponent,
    ViewFoodComponent,
    AddFoodCategoryComponent,
    ExtendedFoodTypeComponent,
    AddExtendedFoodComponent,
    ViewExtendedFoodComponent,
    SubfoodsComponent,
    AddNoteComponent,
    PaymentCashComponent,
    PaymentBanksChannelComponent,
    TicketsComponent,
    PaymentTypesComponent,
    BankingComponent,
    OrdersComponent,
    TransactionsComponent,
    ReportsComponent,
    AddProductsComponent,
    ViewProductsComponent,
    PurchaseComponent,
    AddPurchaseComponent,
    ViewPurchaseComponent,
    VendorsComponent,
    UsersComponent,
    AddusersComponent,
    LoginComponent,
    UserRegisterComponent,
    BomComponent,
    AddbomComponent,
    FoodPipePipe,
    ProductPipe,
    KitchenOrdersComponent,
    AddQuantityComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
    MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatCardModule, MatFormFieldModule, MatProgressBarModule,
    MatSnackBarModule, MatStepperModule, MatTabsModule, MatDividerModule, MatListModule, MatDatepickerModule, MatNativeDateModule,
  ],
  entryComponents: [
    AddFoodComponent,
    ViewFoodComponent,
    AddFoodCategoryComponent,
    ExtendedFoodTypeComponent,
    AddExtendedFoodComponent,
    ViewExtendedFoodComponent,
    SubfoodsComponent,
    AddNoteComponent,
    PaymentCashComponent,
    PaymentBanksChannelComponent,
    TicketsComponent,
    PaymentTypesComponent,
    BankingComponent,
    AddProductsComponent,
    ViewProductsComponent,
    AddPurchaseComponent,
    ViewPurchaseComponent,
    VendorsComponent,
    AddusersComponent,
    UserRegisterComponent,
    UsersComponent,
    AddbomComponent,
    AddQuantityComponent,
  ]
  ,
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
