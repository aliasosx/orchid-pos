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

const routes: Routes = [
  { path: '', component: DashboardComponent },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
