import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BomService {

  constructor(private _http: HttpClient) { }

  backendService = environment.backendUrl.url;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  async createBom(bom) {
    return this._http.post(this.backendService + 'bom', bom, this.httpOptions);
  }
  async getProductsForBom() {
    return this._http.get(this.backendService + 'productBoms', this.httpOptions);
  }
  async getBoms() {
    return this._http.get(this.backendService + 'boms', this.httpOptions);
  }
  async updateBoms(id, bom) {
    return this._http.put(this.backendService + 'bom/' + id, bom, this.httpOptions);
  }
  async createBomDetail(bomDetail) {
    return this._http.post(this.backendService + 'bomdetail', bomDetail, this.httpOptions);
  }
  async bomDetailByBomId(bomId) {
    return this._http.get(this.backendService + 'bomDetailByBomId/' + bomId, this.httpOptions);
  }
  async deleteBomDetail(id) {
    return this._http.delete(this.backendService + 'deleteBomDetailById/' + id, this.httpOptions);
  }
  // duplicateItemAdd
  async duplicateItemAdd(info) {
    return this._http.post(this.backendService + 'duplicateItemAdd', info, this.httpOptions);
  }
  async getIngredientsShow() {
    return this._http.get(this.backendService + 'ingredientsShow', this.httpOptions);
  }
  async getIngredients() {
    return this._http.get(this.backendService + 'ingredients', this.httpOptions);
  }
  async getIngredientTypes() {
    return this._http.get(this.backendService + 'ingredientTypes', this.httpOptions);
  }
  async createIngredient(ingredient) {
    return this._http.post(this.backendService + 'ingredient', ingredient, this.httpOptions);
  }
  async createIngredientType(ingredientType) {
    return this._http.post(this.backendService + 'ingredientType', ingredientType, this.httpOptions);
  }
  async getIngredientById(id) {
    return this._http.get(this.backendService + 'ingredientById/' + id, this.httpOptions);
  }
  async updateIngredient(id, data) {
    return this._http.put(this.backendService + 'ingredient/' + id, data, this.httpOptions);
  }
  async createRecipe(recipe) {
    return this._http.post(this.backendService + 'createRecipe', recipe, this.httpOptions);
  }
  async createRecipeMaster(recipe) {
    return this._http.post(this.backendService + 'createRecipeMaster', recipe, this.httpOptions);
  }
  // Stock
  async getIngredientStockDisplay() {
    return this._http.get(this.backendService + 'ingredientStocksDisplay', this.httpOptions);
  }
  async getIngredientStockChangeDisplay() {
    return this._http.get(this.backendService + 'ingredientStocksChangeDisplay', this.httpOptions);
  }
  async getIngredientStockChangeTypes() {
    return this._http.get(this.backendService + 'ingredientStockChangeTypes', this.httpOptions);
  }
  async createIngredientChangeHistory(data) {
    return this._http.post(this.backendService + 'ingredientStockChangeHistory', data, this.httpOptions);
  }
  async getIngredientStockChangeById(id) {
    return this._http.get(this.backendService + 'ingredientStocksChangeById/' + id, this.httpOptions);
  }
  async getIngredientPurchasegrid() {
    return this._http.get(this.backendService + 'ingredientGrid', this.httpOptions);
  }
  async getIngredientPackUnit() {
    return this._http.get(this.backendService + 'packUnit', this.httpOptions);
  }
  async getRecipesMasters() {
    return this._http.get(this.backendService + 'recipeMasters', this.httpOptions);
  }
  async getRecipeByRecipesMasters(id) {
    return this._http.get(this.backendService + 'recipesByRecipeMasterId/' + id, this.httpOptions);
  }
  // Reports
  async getReports(dt) {
    return this._http.post(this.backendService + 'ingredientReports', dt, this.httpOptions);
  }
}
