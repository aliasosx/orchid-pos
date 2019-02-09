import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, FirestoreSettingsToken } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';
import { NavbarComponent } from './layouts/navbar/navbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule,
  MatCardModule, MatFormFieldModule, MatProgressBarModule,
  MatSnackBarModule, MatStepperModule, MatTabsModule, MatDivider, MatDividerModule, MatListModule
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
    TicketsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule.enablePersistence(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatCardModule, MatFormFieldModule, MatProgressBarModule,
    MatSnackBarModule, MatStepperModule, MatTabsModule, MatDividerModule, MatListModule
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
  ]
  ,
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
