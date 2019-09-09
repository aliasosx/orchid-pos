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
  // tslint:disable-next-line: max-line-length
  MatSnackBarModule, MatStepperModule, MatTabsModule, MatDividerModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatMenuModule, MatTooltipModule, MatInputModule, MatExpansionModule, MatTableModule, MatPaginatorModule, MatChipsModule, MatRadioModule, MatButtonToggleModule, MatSlideToggleModule,
} from '@angular/material';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';
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
import { DatePipe, CurrencyPipe } from '@angular/common';
import { UserRegisterComponent } from './dialogs/user-register/user-register.component';
import { BomComponent } from './pages/bom/bom.component';
import { AddbomComponent } from './dialogs/addbom/addbom.component';
import { FoodPipePipe } from './pipes/food-pipe.pipe';
import { ProductPipe } from './pipes/product.pipe';
import { KitchenOrdersComponent } from './pages/kitchen-orders/kitchen-orders.component';
import { AddQuantityComponent } from './dialogs/add-quantity/add-quantity.component';
import { DbconsoleComponent } from './pages/dbconsole/dbconsole.component';
import { StocksComponent } from './pages/stocks/stocks.component';
import { NewpasswordComponent } from './dialogs/newpassword/newpassword.component';
import { StocksPipePipe } from './pipes/stocks-pipe.pipe';
import { StaffBenefitComponent } from './dialogs/staff-benefit/staff-benefit.component';
import { CashloadComponent } from './pages/cashload/cashload.component';
import { OpenCashComponent } from './dialogs/open-cash/open-cash.component';
import { PasswordInputComponent } from './dialogs/password-input/password-input.component';
import { CloseBalanceComponent } from './dialogs/close-balance/close-balance.component';
import { KitchenMonComponent } from './pages/kitchen-mon/kitchen-mon.component';
import { UnitsComponent } from './dialogs/units/units.component';
import { ViewBilldetailsComponent } from './dialogs/view-billdetails/view-billdetails.component';
import { KitchenTransactionsComponent } from './pages/kitchen-transactions/kitchen-transactions.component';
import { KitchenReportAdminComponent } from './pages/kitchen-report-admin/kitchen-report-admin.component';
import { OrdersHistoryComponent } from './pages/orders-history/orders-history.component';
import { ViewOrderDetailsComponent } from './dialogs/view-order-details/view-order-details.component';
import { LoadingscreenComponent } from './pages/loadingscreen/loadingscreen.component';
import { ApprovedUsersComponent } from './dialogs/approved-users/approved-users.component';
import { AddSubFoodTranxComponent } from './dialogs/add-sub-food-tranx/add-sub-food-tranx.component';
import { ScreenLoadingComponent } from './loadings/screen-loading/screen-loading.component';
import { CancelRemarksComponent } from './dialogs/cancel-remarks/cancel-remarks.component';
import { CouponViewComponent } from './dialogs/coupon-view/coupon-view.component';
import { CouponListComponent } from './dialogs/coupon-list/coupon-list.component';
import { FoodCategoryPipePipe } from './pipes/food-category-pipe.pipe';
import { TestPagesComponent } from './pages/test-pages/test-pages.component';
import { AddChildBomComponent } from './dialogs/add-child-bom/add-child-bom.component';
import { CouponAddPosComponent } from './dialogs/coupon-add-pos/coupon-add-pos.component';
import { ExpendituresComponent } from './pages/expenditures/expenditures.component';
import { CreateExpenditureComponent } from './dialogs/create-expenditure/create-expenditure.component';
import { KitchenReportsComponent } from './pages/kitchen-reports/kitchen-reports.component';
import { ProductLinkComponent } from './dialogs/product-link/product-link.component';
import { ProductTakeoffComponent } from './dialogs/product-takeoff/product-takeoff.component';
import { ProductByIdPipe } from './pipes/product-by-id.pipe';
import { CustomerScreenComponent } from './pages/customer-screen/customer-screen.component';
import { FoodFxComponent } from './pages/food-fx/food-fx.component';
import { AddFoodFxComponent } from './dialogs/add-food-fx/add-food-fx.component';
import { AddFoodFxTranxComponent } from './dialogs/add-food-fx-tranx/add-food-fx-tranx.component';
import { StockEODAddComponent } from './dialogs/stock-eodadd/stock-eodadd.component';
import { UnitConversionsPipe } from './pipes/unit-conversions.pipe';
import { GroupByPipe } from './pipes/group-by.pipe';
import { StockhistoryComponent } from './dialogs/stockhistory/stockhistory.component';
import { PurchaseGridComponent } from './pages/purchase-grid/purchase-grid.component';
import { ProductCatPipePipe } from './pipes/product-cat-pipe.pipe';
import { PurchaseSearchPipe } from './pipes/purchase-search.pipe';
import { TakeOffByDatePipePipe } from './pipes/take-off-by-date-pipe.pipe';
import { ListTransactionsComponent } from './dialogs/list-transactions/list-transactions.component';
import { BalancesComponent } from './pages/balances/balances.component';
import { AddPaymentComponent } from './pages/add-payment/add-payment.component';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { PromotionsPipe } from './pipes/promotions.pipe';
import { AddPromotionComponent } from './dialogs/add-promotion/add-promotion.component';
import { AddPromotionFoodComponent } from './dialogs/add-promotion-food/add-promotion-food.component';
import { DynamicsPromotionsComponent } from './pages/dynamics-promotions/dynamics-promotions.component';
import { PromotionRoleComponent } from './dialogs/promotion-role/promotion-role.component';
import { MembersComponent } from './dialogs/members/members.component';
import { MemberPipePipe } from './pipes/member-pipe.pipe';
import { MemberByPhonePipe } from './pipes/member-by-phone.pipe';
import { ProductByBarcodePipe } from './pipes/product-by-barcode.pipe';
import { TransactionsViewComponent } from './dialogs/transactions-view/transactions-view.component';
import { PurchaseQuantityComponent } from './dialogs/purchase-quantity/purchase-quantity.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { ViewDiscountByIdComponent } from './dialogs/view-discount-by-id/view-discount-by-id.component';
import { FoodDiscountViewComponent } from './dialogs/food-discount-view/food-discount-view.component';
import { AddDiscountComponent } from './dialogs/add-discount/add-discount.component';
import { DiscSelectionComponent } from './dialogs/disc-selection/disc-selection.component';
import { AdditionalFoodsComponent } from './dialogs/additional-foods/additional-foods.component';
import { MemberlistsComponent } from './pages/memberlists/memberlists.component';
import { ViewMemberComponent } from './pages/view-member/view-member.component';
import { AddNewMemberComponent } from './dialogs/add-new-member/add-new-member.component';
import { MemberRedimComponent } from './dialogs/member-redim/member-redim.component';
import { RedimHistoryComponent } from './dialogs/redim-history/redim-history.component';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { AddIngredientComponent } from './dialogs/add-ingredient/add-ingredient.component';
import { AddIngredientCategoryComponent } from './dialogs/add-ingredient-category/add-ingredient-category.component';
import { AddRecipeComponent } from './dialogs/add-recipe/add-recipe.component';
import { IngredientTakeOffComponent } from './dialogs/ingredient-take-off/ingredient-take-off.component';
import { IngredientTakeInComponent } from './dialogs/ingredient-take-in/ingredient-take-in.component';
import { ViewIngredientHistoryComponent } from './dialogs/view-ingredient-history/view-ingredient-history.component';
import { CurrenciesComponent } from './shared/currencies/currencies.component';
import { IngredientPurchaseComponent } from './pages/ingredient-purchase/ingredient-purchase.component';

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
    DbconsoleComponent,
    StocksComponent,
    NewpasswordComponent,
    StocksPipePipe,
    StaffBenefitComponent,
    CashloadComponent,
    OpenCashComponent,
    PasswordInputComponent,
    CloseBalanceComponent,
    KitchenMonComponent,
    UnitsComponent,
    ViewBilldetailsComponent,
    KitchenTransactionsComponent,
    KitchenReportAdminComponent,
    OrdersHistoryComponent,
    ViewOrderDetailsComponent,
    LoadingscreenComponent,
    ApprovedUsersComponent,
    AddSubFoodTranxComponent,
    ScreenLoadingComponent,
    CancelRemarksComponent,
    CouponViewComponent,
    CouponListComponent,
    FoodCategoryPipePipe,
    TestPagesComponent,
    AddChildBomComponent,
    CouponAddPosComponent,
    ExpendituresComponent,
    CreateExpenditureComponent,
    KitchenReportsComponent,
    ProductLinkComponent,
    ProductTakeoffComponent,
    ProductByIdPipe,
    CustomerScreenComponent,
    FoodFxComponent,
    AddFoodFxComponent,
    AddFoodFxTranxComponent,
    StockEODAddComponent,
    UnitConversionsPipe,
    GroupByPipe,
    StockhistoryComponent,
    PurchaseGridComponent,
    ProductCatPipePipe,
    PurchaseSearchPipe,
    TakeOffByDatePipePipe,
    ListTransactionsComponent,
    BalancesComponent,
    AddPaymentComponent,
    PromotionsComponent,
    PromotionsPipe,
    AddPromotionComponent,
    AddPromotionFoodComponent,
    DynamicsPromotionsComponent,
    PromotionRoleComponent,
    MembersComponent,
    MemberPipePipe,
    MemberByPhonePipe,
    ProductByBarcodePipe,
    TransactionsViewComponent,
    PurchaseQuantityComponent,
    DiscountsComponent,
    ViewDiscountByIdComponent,
    FoodDiscountViewComponent,
    AddDiscountComponent,
    DiscSelectionComponent,
    AdditionalFoodsComponent,
    MemberlistsComponent,
    ViewMemberComponent,
    AddNewMemberComponent,
    MemberRedimComponent,
    RedimHistoryComponent,
    IngredientsComponent,
    AddIngredientComponent,
    AddIngredientCategoryComponent,
    AddRecipeComponent,
    IngredientTakeOffComponent,
    IngredientTakeInComponent,
    ViewIngredientHistoryComponent,
    CurrenciesComponent,
    IngredientPurchaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
    MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatCardModule, MatFormFieldModule, MatProgressBarModule,
    MatSnackBarModule, MatStepperModule, MatTabsModule, MatDividerModule, MatListModule, MatDatepickerModule, MatNativeDateModule,
    MatMenuModule, MatTooltipModule, MatStepperModule, MatInputModule, MatExpansionModule, MatTableModule, MatPaginatorModule,
    MatChipsModule, MatRadioModule, MatButtonToggleModule, MatSlideToggleModule,
    HttpClientModule,
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
    NewpasswordComponent,
    StaffBenefitComponent,
    OpenCashComponent,
    PasswordInputComponent,
    CloseBalanceComponent,
    UnitsComponent,
    ViewBilldetailsComponent,
    ViewOrderDetailsComponent,
    ApprovedUsersComponent,
    AddSubFoodTranxComponent,
    ScreenLoadingComponent,
    CancelRemarksComponent,
    CouponViewComponent,
    CouponListComponent,
    AddChildBomComponent,
    CouponAddPosComponent,
    CreateExpenditureComponent,
    ProductLinkComponent,
    ProductTakeoffComponent,
    AddFoodFxComponent,
    AddFoodFxTranxComponent,
    StockEODAddComponent,
    StockhistoryComponent,
    ListTransactionsComponent,
    AddPaymentComponent,
    AddPromotionComponent,
    AddPromotionFoodComponent,
    PromotionRoleComponent,
    MembersComponent,
    TransactionsViewComponent,
    PurchaseQuantityComponent,
    ViewDiscountByIdComponent,
    FoodDiscountViewComponent,
    AddDiscountComponent,
    DiscSelectionComponent,
    AdditionalFoodsComponent,
    ViewMemberComponent,
    AddNewMemberComponent,
    MemberRedimComponent,
    RedimHistoryComponent,
    AddIngredientComponent,
    AddIngredientCategoryComponent,
    AddRecipeComponent,
    IngredientTakeOffComponent,
    IngredientTakeInComponent,
    ViewIngredientHistoryComponent,
    CurrenciesComponent,
  ]
  ,
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: FirestoreSettingsToken, useValue: {} },
    DatePipe, ProductByIdPipe, CurrencyPipe, ProductCatPipePipe, PurchaseSearchPipe, TakeOffByDatePipePipe, PromotionsPipe,
    MemberPipePipe, MemberByPhonePipe,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
