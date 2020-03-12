import { CurrencyPipe, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule, FirestoreSettingsToken } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxPaginationModule } from 'ngx-pagination';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { AddChildBomComponent } from './dialogs/add-child-bom/add-child-bom.component';
import { AddDiscountComponent } from './dialogs/add-discount/add-discount.component';
import { AddExtendedFoodComponent } from './dialogs/add-extended-food/add-extended-food.component';
import { AddFoodCategoryComponent } from './dialogs/add-food-category/add-food-category.component';
import { AddFoodFxTranxComponent } from './dialogs/add-food-fx-tranx/add-food-fx-tranx.component';
import { AddFoodFxComponent } from './dialogs/add-food-fx/add-food-fx.component';
import { AddFoodComponent } from './dialogs/add-food/add-food.component';
import { AddIngredientCategoryComponent } from './dialogs/add-ingredient-category/add-ingredient-category.component';
import { AddIngredientFoodComponent } from './dialogs/add-ingredient-food/add-ingredient-food.component';
import { AddIngredientComponent } from './dialogs/add-ingredient/add-ingredient.component';
import { AddNewMemberComponent } from './dialogs/add-new-member/add-new-member.component';
import { AddNoteComponent } from './dialogs/add-note/add-note.component';
import { AddProductsComponent } from './dialogs/add-products/add-products.component';
import { AddPromotionFoodComponent } from './dialogs/add-promotion-food/add-promotion-food.component';
import { AddPromotionComponent } from './dialogs/add-promotion/add-promotion.component';
import { AddPurchaseComponent } from './dialogs/add-purchase/add-purchase.component';
import { AddQuantityComponent } from './dialogs/add-quantity/add-quantity.component';
import { AddRecipeComponent } from './dialogs/add-recipe/add-recipe.component';
import { AddSubFoodTranxComponent } from './dialogs/add-sub-food-tranx/add-sub-food-tranx.component';
import { AddbomComponent } from './dialogs/addbom/addbom.component';
import { AdditionalFoodsComponent } from './dialogs/additional-foods/additional-foods.component';
import { AddusersComponent } from './dialogs/addusers/addusers.component';
import { ApprovedUsersComponent } from './dialogs/approved-users/approved-users.component';
import { BankingComponent } from './dialogs/banking/banking.component';
import { CancelRemarksComponent } from './dialogs/cancel-remarks/cancel-remarks.component';
import { CloseBalanceComponent } from './dialogs/close-balance/close-balance.component';
import { CouponAddPosComponent } from './dialogs/coupon-add-pos/coupon-add-pos.component';
import { CouponListComponent } from './dialogs/coupon-list/coupon-list.component';
import { CouponViewComponent } from './dialogs/coupon-view/coupon-view.component';
import { CreateExpenditureComponent } from './dialogs/create-expenditure/create-expenditure.component';
import { DiscSelectionComponent } from './dialogs/disc-selection/disc-selection.component';
import { ExtendedFoodTypeComponent } from './dialogs/extended-food-type/extended-food-type.component';
import { FoodDiscountViewComponent } from './dialogs/food-discount-view/food-discount-view.component';
import { IngredientPriceSelectComponent } from './dialogs/ingredient-price-select/ingredient-price-select.component';
import { IngredientTakeInComponent } from './dialogs/ingredient-take-in/ingredient-take-in.component';
import { IngredientTakeOffComponent } from './dialogs/ingredient-take-off/ingredient-take-off.component';
import { ListTransactionsComponent } from './dialogs/list-transactions/list-transactions.component';
import { MemberRedimComponent } from './dialogs/member-redim/member-redim.component';
import { MembersComponent } from './dialogs/members/members.component';
import { NewpasswordComponent } from './dialogs/newpassword/newpassword.component';
import { OpenCashComponent } from './dialogs/open-cash/open-cash.component';
import { PasswordInputComponent } from './dialogs/password-input/password-input.component';
import { PaymentBanksChannelComponent } from './dialogs/payment-banks-channel/payment-banks-channel.component';
import { PaymentCashComponent } from './dialogs/payment-cash/payment-cash.component';
import { PaymentTypesComponent } from './dialogs/payment-types/payment-types.component';
import { ProductLinkComponent } from './dialogs/product-link/product-link.component';
import { ProductTakeoffComponent } from './dialogs/product-takeoff/product-takeoff.component';
import { PromotionRoleComponent } from './dialogs/promotion-role/promotion-role.component';
import { PurchaseQuantityComponent } from './dialogs/purchase-quantity/purchase-quantity.component';
import { RedimHistoryComponent } from './dialogs/redim-history/redim-history.component';
import {
  ReportDetailsByFoodGroupComponent,
} from './dialogs/report-details-by-food-group/report-details-by-food-group.component';
import { RewardRedimComponent } from './dialogs/reward-redim/reward-redim.component';
import { StaffBenefitComponent } from './dialogs/staff-benefit/staff-benefit.component';
import { StockEODAddComponent } from './dialogs/stock-eodadd/stock-eodadd.component';
import { StockhistoryComponent } from './dialogs/stockhistory/stockhistory.component';
import { SubfoodsComponent } from './dialogs/subfoods/subfoods.component';
import { TicketsComponent } from './dialogs/tickets/tickets.component';
import { TransactionsViewComponent } from './dialogs/transactions-view/transactions-view.component';
import { UnitsComponent } from './dialogs/units/units.component';
import { UserRegisterComponent } from './dialogs/user-register/user-register.component';
import { UsersComponent } from './dialogs/users/users.component';
import { VendorsComponent } from './dialogs/vendors/vendors.component';
import { ViewBilldetailsComponent } from './dialogs/view-billdetails/view-billdetails.component';
import { ViewDiscountByIdComponent } from './dialogs/view-discount-by-id/view-discount-by-id.component';
import { ViewExtendedFoodComponent } from './dialogs/view-extended-food/view-extended-food.component';
import { ViewFoodComponent } from './dialogs/view-food/view-food.component';
import { ViewIngredientHistoryComponent } from './dialogs/view-ingredient-history/view-ingredient-history.component';
import { ViewOrderDetailsComponent } from './dialogs/view-order-details/view-order-details.component';
import { ViewProductsComponent } from './dialogs/view-products/view-products.component';
import { ViewPurchaseComponent } from './dialogs/view-purchase/view-purchase.component';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ScreenLoadingComponent } from './loadings/screen-loading/screen-loading.component';
import { AddPaymentComponent } from './pages/add-payment/add-payment.component';
import { BalancesComponent } from './pages/balances/balances.component';
import { BomComponent } from './pages/bom/bom.component';
import { CashloadComponent } from './pages/cashload/cashload.component';
import { CustomerScreenComponent } from './pages/customer-screen/customer-screen.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DbconsoleComponent } from './pages/dbconsole/dbconsole.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { DynamicsPromotionsComponent } from './pages/dynamics-promotions/dynamics-promotions.component';
import { ExpendituresComponent } from './pages/expenditures/expenditures.component';
import { FoodFxComponent } from './pages/food-fx/food-fx.component';
import { FoodsComponent } from './pages/foods/foods.component';
import { IngredientPurchaseComponent } from './pages/ingredient-purchase/ingredient-purchase.component';
import { IngredientReportsComponent } from './pages/ingredient-reports/ingredient-reports.component';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { KitchenMonComponent } from './pages/kitchen-mon/kitchen-mon.component';
import { KitchenOrdersComponent } from './pages/kitchen-orders/kitchen-orders.component';
import { KitchenReportAdminComponent } from './pages/kitchen-report-admin/kitchen-report-admin.component';
import { KitchenReportsComponent } from './pages/kitchen-reports/kitchen-reports.component';
import { KitchenTransactionsComponent } from './pages/kitchen-transactions/kitchen-transactions.component';
import { LoadingscreenComponent } from './pages/loadingscreen/loadingscreen.component';
import { MemberlistsComponent } from './pages/memberlists/memberlists.component';
import { OrdersHistoryComponent } from './pages/orders-history/orders-history.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { PosComponent } from './pages/pos/pos.component';
import { ProductsComponent } from './pages/products/products.component';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { PurchaseGridComponent } from './pages/purchase-grid/purchase-grid.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { StockReviewComponent } from './pages/stock-review/stock-review.component';
import { StocksComponent } from './pages/stocks/stocks.component';
import { TestPagesComponent } from './pages/test-pages/test-pages.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { ViewMemberComponent } from './pages/view-member/view-member.component';
import { FoodCategoryPipePipe } from './pipes/food-category-pipe.pipe';
import { FoodPipePipe } from './pipes/food-pipe.pipe';
import { GroupByPipe } from './pipes/group-by.pipe';
import { MemberByPhonePipe } from './pipes/member-by-phone.pipe';
import { MemberPipePipe } from './pipes/member-pipe.pipe';
import { ProductByBarcodePipe } from './pipes/product-by-barcode.pipe';
import { ProductByIdPipe } from './pipes/product-by-id.pipe';
import { ProductCatPipePipe } from './pipes/product-cat-pipe.pipe';
import { ProductPipe } from './pipes/product.pipe';
import { PromotionsPipe } from './pipes/promotions.pipe';
import { PurchaseSearchPipe } from './pipes/purchase-search.pipe';
import { StocksPipePipe } from './pipes/stocks-pipe.pipe';
import { TakeOffByDatePipePipe } from './pipes/take-off-by-date-pipe.pipe';
import { UnitConversionsPipe } from './pipes/unit-conversions.pipe';
import { CurrenciesComponent } from './shared/currencies/currencies.component';

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
    IngredientPriceSelectComponent,
    StockReviewComponent,
    IngredientReportsComponent,
    AddIngredientFoodComponent,
    ReportDetailsByFoodGroupComponent,
    RewardRedimComponent,
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
    NgxPaginationModule,
    FilterPipeModule,
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
    IngredientPriceSelectComponent,
    AddIngredientFoodComponent,
    ReportDetailsByFoodGroupComponent,
    RewardRedimComponent,
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
