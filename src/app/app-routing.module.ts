import { BalancesComponent } from './pages/balances/balances.component';
import { KitchenReportsComponent } from './pages/kitchen-reports/kitchen-reports.component';
import { PosComponent } from './pages/pos/pos.component';
import { ProductsComponent } from './pages/products/products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FoodsComponent } from './pages/foods/foods.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { LoginComponent } from './authentication/login/login.component';
import { BomComponent } from './pages/bom/bom.component';
import { KitchenOrdersComponent } from './pages/kitchen-orders/kitchen-orders.component';
import { DbconsoleComponent } from './pages/dbconsole/dbconsole.component';
import { StocksComponent } from './pages/stocks/stocks.component';
import { CashloadComponent } from './pages/cashload/cashload.component';
import { KitchenTransactionsComponent } from './pages/kitchen-transactions/kitchen-transactions.component';
import { KitchenReportAdminComponent } from './pages/kitchen-report-admin/kitchen-report-admin.component';
import { OrdersHistoryComponent } from './pages/orders-history/orders-history.component';
import { TestPagesComponent } from './pages/test-pages/test-pages.component';
import { ExpendituresComponent } from './pages/expenditures/expenditures.component';
import { CustomerScreenComponent } from './pages/customer-screen/customer-screen.component';
import { FoodFxComponent } from './pages/food-fx/food-fx.component';
import { PurchaseGridComponent } from './pages/purchase-grid/purchase-grid.component';
import { PromotionsComponent } from './pages/promotions/promotions.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboards', component: DashboardComponent },
  { path: 'foods', component: FoodsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'pos', component: PosComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'purchases', component: PurchaseComponent },
  { path: 'login', component: LoginComponent },
  { path: 'bom', component: BomComponent },
  { path: 'kitchenorders', component: KitchenOrdersComponent },
  { path: 'console', component: DbconsoleComponent },
  { path: 'stocks', component: StocksComponent },
  { path: 'cashloads', component: CashloadComponent },
  { path: 'kitchenreport', component: KitchenTransactionsComponent },
  { path: 'kitchenadminreport', component: KitchenReportAdminComponent },
  { path: 'ordershistory', component: OrdersHistoryComponent },
  { path: 'testpage', component: TestPagesComponent },
  { path: 'diaryExpenditure', component: ExpendituresComponent },
  { path: 'reportbykitchen', component: KitchenReportsComponent },
  { path: 'customerScreen', component: CustomerScreenComponent },
  { path: 'foodFx', component: FoodFxComponent },
  { path: 'purchaseGrid', component: PurchaseGridComponent },
  { path: 'balances', component: BalancesComponent },
  { path: 'promotions', component: PromotionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
