import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  constructor(private _http: HttpClient) { }
  backendService = environment.backendUrl.url;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  async openCashload(cashloadInst) {
    return this._http.post(this.backendService + 'cashloads', cashloadInst, this.httpOptions);
  }
  async removeCashload(id) {
    return this._http.delete(this.backendService + 'cashloads/' + id, this.httpOptions);
  }
  async cashLoadUpdate(id, cashloadInst) {
    return this._http.put(this.backendService + 'cashloads/' + id, cashloadInst, this.httpOptions);
  }

  async getCashload() {
    return this._http.get(this.backendService + 'cashloads', this.httpOptions);
  }

  async getUsers() {
    return this._http.get(this.backendService + 'users', this.httpOptions);
  }
  async createOrder(order) {
    return this._http.post(this.backendService + 'orders', order, this.httpOptions);
  }
  async createOrderDetail(orderDetail) {
    return this._http.post(this.backendService + 'orderdetails', orderDetail, this.httpOptions);
  }
  async updateOrder(orderId, order) {
    return this._http.put(this.backendService + 'orders/' + orderId, order, this.httpOptions);
  }
  async userActivityLog(activity) {
    return this._http.post(this.backendService + 'useractivity', activity, this.httpOptions);
  }
  async getKitchens() {
    return this._http.get(this.backendService + 'kitchens', this.httpOptions);
  }
  async getRoles() {
    return this._http.get(this.backendService + 'roles', this.httpOptions);
  }
  async checkCashstat(id) {
    return this._http.get(this.backendService + 'cashload_stat/' + id, this.httpOptions);
  }
  async loadCurrentCashloadByUser(id) {
    return this._http.get(this.backendService + 'cashloadByuser/' + id, this.httpOptions);
  }
  async getIncompleteOrder(id) {
    return this._http.get(this.backendService + 'orderIncomplete/' + id, this.httpOptions);
  }
  async getEOD(id, cashloadId) {
    const data = {
      cashloadId: cashloadId
    };
    return this._http.post(this.backendService + 'orderEOD/' + id, data, this.httpOptions);
  }

  async settleOrder(cashloadId, order) {
    return this._http.put(this.backendService + 'orderBatchSettle/' + cashloadId, order, this.httpOptions);
  }
  async getFoodTypes() {
    return this._http.get(this.backendService + 'foodtypes', this.httpOptions);
  }
  async createFoodTypes(foodtype) {
    return this._http.post(this.backendService + 'foodtypes', foodtype, this.httpOptions);
  }
  async updateFoodTypes(id, foodtype) {
    return this._http.put(this.backendService + 'foodtypes/' + id, foodtype, this.httpOptions);
  }
  // subfood
  async getSubFood() {
    return this._http.get(this.backendService + 'subfoods', this.httpOptions);
  }
  async createSubFood(subfood) {
    return this._http.post(this.backendService + 'subfoods', subfood, this.httpOptions);
  }
  async updateSubFood(id, subfood) {
    return this._http.put(this.backendService + 'subfoods/' + id, subfood, this.httpOptions);
  }

  // vendor
  async getVendor() {
    return this._http.get(this.backendService + 'vendors', this.httpOptions);
  }

  async createVendor(vendors) {
    return this._http.post(this.backendService + 'vendors', vendors, this.httpOptions);
  }
  async updateVendor(id, vendors) {
    return this._http.put(this.backendService + 'vendors/' + id, vendors, this.httpOptions);
  }
  // unit
  async getUnit() {
    return this._http.get(this.backendService + 'units', this.httpOptions);
  }
  async getUnitById(id) {
    return this._http.get(this.backendService + 'units/' + id, this.httpOptions);
  }
  async createUnit(units) {
    return this._http.post(this.backendService + 'units', units, this.httpOptions);
  }
  async updateUnit(id, units) {
    return this._http.put(this.backendService + 'units/' + id, units, this.httpOptions);
  }

  // Food
  async getFoods() {
    return this._http.get(this.backendService + 'foods', this.httpOptions);
  }
  async getFoodsById(id) {
    if (id) {
      return this._http.get(this.backendService + 'foods/' + id, this.httpOptions);
    } else {
      alert('No ID');
    }

  }

  async createFood(food) {
    return this._http.post(this.backendService + 'foods', food, this.httpOptions);
  }
  async updateFood(id, food) {
    return this._http.put(this.backendService + 'foods/' + id, food, this.httpOptions);
  }
  // Display
  async getCurrencies() {
    return this._http.get(this.backendService + 'currencies', this.httpOptions);
  }
  async getSubfoods() {
    return this._http.get(this.backendService + 'subfoods', this.httpOptions);
  }
  async getFoodDisplay() {
    return this._http.get(this.backendService + 'foodsDisplay', this.httpOptions);
  }
  async getFoodDisplayById(id) {
    return this._http.get(this.backendService + 'foodsDisplayByType/' + id, this.httpOptions);
  }
  async getSubfoodById(id) {
    return this._http.get(this.backendService + 'subfoodByFoodId/' + id, this.httpOptions);
  }
  getSubfoodsById(id): any {
    return this._http.get(this.backendService + 'subfoodByFoodId/' + id, this.httpOptions);
  }
  updateFoodTranxById(id, foodTranx) {
    return this._http.put(this.backendService + 'foodtranxs/' + id, foodTranx, this.httpOptions);
  }
  getFoodTranxByFoodId(id) {
    return this._http.get(this.backendService + 'foodtranxs/' + id, this.httpOptions);
  }
  createFoodTranx(foodtranx) {
    return this._http.post(this.backendService + 'foodtranxs', foodtranx, this.httpOptions);
  }
  async getAllProducts() {
    return this._http.get(this.backendService + 'productsDisplay', this.httpOptions);
  }
  async getProducts() {
    return this._http.get(this.backendService + 'products', this.httpOptions);
  }
  async getProductById(id) {
    return this._http.get(this.backendService + 'product/' + id, this.httpOptions);
  }
  async updateProduct(product) {
    return this._http.put(this.backendService + 'product/' + product.id, product, this.httpOptions);
  }


  async deleteProduct(id) {
    return this._http.delete(this.backendService + 'product/' + id, this.httpOptions);
  }

  async getProductCategories() {
    return this._http.get(this.backendService + 'categories', this.httpOptions);
  }

  async createProduct(product) {
    return this._http.post(this.backendService + 'products', product, this.httpOptions);
  }

  // Reports
  async reportRevByDateRange(startDt, endDt) {
    const reportDt = {
      startDt,
      endDt
    };
    return this._http.post(this.backendService + 'reportsRevByDateRange', reportDt, this.httpOptions);
  }
  async reportRevByUsersByDateRange(startDt, endDt) {
    const reportDt = {
      startDt,
      endDt
    };
    return this._http.post(this.backendService + 'reportsRevByUsersByDateRange', reportDt, this.httpOptions);
  }
  async reportRevByKitchenByDateRange(startDt, endDt) {
    const reportDt = {
      startDt,
      endDt
    };
    return this._http.post(this.backendService + 'reportsRevByKitchenByDateRange', reportDt, this.httpOptions);
  }
  async reportRevByFoodTypeByDateRange(startDt, endDt) {
    const reportDt = {
      startDt,
      endDt
    };
    return this._http.post(this.backendService + 'reportsRevByFoodTypeByDateRange', reportDt, this.httpOptions);
  }
  async reportRevByPaymentByDateRange(startDt, endDt) {
    const reportDt = {
      startDt,
      endDt
    };
    return this._http.post(this.backendService + 'reportsRevByPaymentByDateRange', reportDt, this.httpOptions);
  }
  async reportsRevByFoodsByDateRange(startDt, endDt) {
    const reportDt = {
      startDt,
      endDt
    };
    return this._http.post(this.backendService + 'reportsRevByFoodsByDateRange', reportDt, this.httpOptions);
  }

  async reportsKitchenAdmin(startDt, endDt, kitchen) {
    const reportDt = {
      startDt,
      endDt
    };
    return this._http.post(this.backendService + 'kitchen-report-admin/' + kitchen, reportDt, this.httpOptions);
  }


  // Purchase
  async createPurchaseBilling(purchase) {
    return this._http.post(this.backendService + 'purchases', purchase, this.httpOptions);
  }
  async createPurchaseDetail(purchaseDetail) {
    return this._http.post(this.backendService + 'purchasedetails', purchaseDetail, this.httpOptions);
  }
  async deletePurchaseDetail(id) {
    return this._http.delete(this.backendService + 'purchasedetails/' + id, this.httpOptions);
  }

  async getPurchaseDetailById(id) {
    return this._http.get(this.backendService + 'purchasesDetailByPurchaseId/' + id, this.httpOptions);
  }
  async getPurchaseById(id) {
    return this._http.get(this.backendService + 'billingAmountCheck/' + id, this.httpOptions);
  }
  async getPurchaseShow() {
    return this._http.get(this.backendService + 'purchasesDisplay', this.httpOptions);
  }
  async deletePurchase(id) {
    return this._http.delete(this.backendService + 'purchases/' + id, this.httpOptions);
  }
  async checkOverBill(id) {
    return this._http.get(this.backendService + 'overBillingAmountCheck/' + id, this.httpOptions);
  }
  async approvePurchase(id, purchase) {
    return this._http.put(this.backendService + 'purchases/' + id, purchase, this.httpOptions);
  }
}

