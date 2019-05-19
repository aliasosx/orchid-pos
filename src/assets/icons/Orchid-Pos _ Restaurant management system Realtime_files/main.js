(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {

/***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
/*!*************************************************!*\
  !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
  \*************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      var map = {
        "./log": "./node_modules/webpack/hot/log.js"
      };


      function webpackContext(req) {
        var id = webpackContextResolve(req);
        return __webpack_require__(id);
      }
      function webpackContextResolve(req) {
        var id = map[req];
        if (!(id + 1)) { // check for number or string
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        }
        return id;
      }
      webpackContext.keys = function webpackContextKeys() {
        return Object.keys(map);
      };
      webpackContext.resolve = webpackContextResolve;
      module.exports = webpackContext;
      webpackContext.id = "./node_modules/webpack/hot sync ^\\.\\/log$";

      /***/
}),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }
      webpackEmptyAsyncContext.keys = function () { return []; };
      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      module.exports = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

      /***/
}),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () { return AppRoutingModule; });
/* harmony import */ var _pages_pos_pos_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/pos/pos.component */ "./src/app/pages/pos/pos.component.ts");
/* harmony import */ var _pages_products_products_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/products/products.component */ "./src/app/pages/products/products.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _pages_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/dashboard/dashboard.component */ "./src/app/pages/dashboard/dashboard.component.ts");
/* harmony import */ var _pages_foods_foods_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/foods/foods.component */ "./src/app/pages/foods/foods.component.ts");
/* harmony import */ var _pages_settings_settings_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/settings/settings.component */ "./src/app/pages/settings/settings.component.ts");
      var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };







      var routes = [
        { path: '', component: _pages_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_4__["DashboardComponent"] },
        { path: 'foods', component: _pages_foods_foods_component__WEBPACK_IMPORTED_MODULE_5__["FoodsComponent"] },
        { path: 'products', component: _pages_products_products_component__WEBPACK_IMPORTED_MODULE_1__["ProductsComponent"] },
        { path: 'pos', component: _pages_pos_pos_component__WEBPACK_IMPORTED_MODULE_0__["PosComponent"] },
        { path: 'settings', component: _pages_settings_settings_component__WEBPACK_IMPORTED_MODULE_6__["SettingsComponent"] }
      ];
      var AppRoutingModule = /** @class */ (function () {
        function AppRoutingModule() {
        }
        AppRoutingModule = __decorate([
          Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]]
          })
        ], AppRoutingModule);
        return AppRoutingModule;
      }());



      /***/
}),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

      /***/
}),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "<app-navbar></app-navbar>\n<router-outlet></router-outlet>\n"

      /***/
}),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function () { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
      var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };

      var AppComponent = /** @class */ (function () {
        function AppComponent() {
          this.title = 'orchid-pos';
        }
        AppComponent = __decorate([
          Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
          })
        ], AppComponent);
        return AppComponent;
      }());



      /***/
}),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function () { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var angularfire2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angularfire2 */ "./node_modules/angularfire2/index.js");
/* harmony import */ var angularfire2__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(angularfire2__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angularfire2/firestore */ "./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(angularfire2_firestore__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var angularfire2_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! angularfire2/storage */ "./node_modules/angularfire2/storage/index.js");
/* harmony import */ var angularfire2_storage__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(angularfire2_storage__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _layouts_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./layouts/navbar/navbar.component */ "./src/app/layouts/navbar/navbar.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _pages_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./pages/dashboard/dashboard.component */ "./src/app/pages/dashboard/dashboard.component.ts");
/* harmony import */ var _pages_foods_foods_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./pages/foods/foods.component */ "./src/app/pages/foods/foods.component.ts");
/* harmony import */ var _pages_products_products_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./pages/products/products.component */ "./src/app/pages/products/products.component.ts");
/* harmony import */ var _pages_pos_pos_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./pages/pos/pos.component */ "./src/app/pages/pos/pos.component.ts");
/* harmony import */ var _pages_settings_settings_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./pages/settings/settings.component */ "./src/app/pages/settings/settings.component.ts");
/* harmony import */ var _dialogs_add_food_add_food_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./dialogs/add-food/add-food.component */ "./src/app/dialogs/add-food/add-food.component.ts");
/* harmony import */ var _dialogs_view_food_view_food_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./dialogs/view-food/view-food.component */ "./src/app/dialogs/view-food/view-food.component.ts");
/* harmony import */ var _dialogs_add_food_category_add_food_category_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./dialogs/add-food-category/add-food-category.component */ "./src/app/dialogs/add-food-category/add-food-category.component.ts");
/* harmony import */ var _dialogs_extended_food_type_extended_food_type_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./dialogs/extended-food-type/extended-food-type.component */ "./src/app/dialogs/extended-food-type/extended-food-type.component.ts");
/* harmony import */ var _dialogs_add_extended_food_add_extended_food_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./dialogs/add-extended-food/add-extended-food.component */ "./src/app/dialogs/add-extended-food/add-extended-food.component.ts");
/* harmony import */ var _dialogs_view_extended_food_view_extended_food_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./dialogs/view-extended-food/view-extended-food.component */ "./src/app/dialogs/view-extended-food/view-extended-food.component.ts");
/* harmony import */ var _dialogs_subfoods_subfoods_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./dialogs/subfoods/subfoods.component */ "./src/app/dialogs/subfoods/subfoods.component.ts");
/* harmony import */ var _dialogs_add_note_add_note_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./dialogs/add-note/add-note.component */ "./src/app/dialogs/add-note/add-note.component.ts");
/* harmony import */ var _dialogs_payment_cash_payment_cash_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./dialogs/payment-cash/payment-cash.component */ "./src/app/dialogs/payment-cash/payment-cash.component.ts");
/* harmony import */ var _dialogs_payment_banks_channel_payment_banks_channel_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./dialogs/payment-banks-channel/payment-banks-channel.component */ "./src/app/dialogs/payment-banks-channel/payment-banks-channel.component.ts");
/* harmony import */ var _dialogs_tickets_tickets_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./dialogs/tickets/tickets.component */ "./src/app/dialogs/tickets/tickets.component.ts");
/* harmony import */ var _dialogs_payment_types_payment_types_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./dialogs/payment-types/payment-types.component */ "./src/app/dialogs/payment-types/payment-types.component.ts");
/* harmony import */ var _dialogs_banking_banking_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./dialogs/banking/banking.component */ "./src/app/dialogs/banking/banking.component.ts");
      var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };






























      var AppModule = /** @class */ (function () {
        function AppModule() {
        }
        AppModule = __decorate([
          Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
              _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
              _layouts_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_9__["NavbarComponent"],
              _pages_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_12__["DashboardComponent"],
              _pages_foods_foods_component__WEBPACK_IMPORTED_MODULE_13__["FoodsComponent"],
              _pages_products_products_component__WEBPACK_IMPORTED_MODULE_14__["ProductsComponent"],
              _pages_pos_pos_component__WEBPACK_IMPORTED_MODULE_15__["PosComponent"],
              _pages_settings_settings_component__WEBPACK_IMPORTED_MODULE_16__["SettingsComponent"],
              _dialogs_add_food_add_food_component__WEBPACK_IMPORTED_MODULE_17__["AddFoodComponent"],
              _dialogs_view_food_view_food_component__WEBPACK_IMPORTED_MODULE_18__["ViewFoodComponent"],
              _dialogs_add_food_category_add_food_category_component__WEBPACK_IMPORTED_MODULE_19__["AddFoodCategoryComponent"],
              _dialogs_extended_food_type_extended_food_type_component__WEBPACK_IMPORTED_MODULE_20__["ExtendedFoodTypeComponent"],
              _dialogs_add_extended_food_add_extended_food_component__WEBPACK_IMPORTED_MODULE_21__["AddExtendedFoodComponent"],
              _dialogs_view_extended_food_view_extended_food_component__WEBPACK_IMPORTED_MODULE_22__["ViewExtendedFoodComponent"],
              _dialogs_subfoods_subfoods_component__WEBPACK_IMPORTED_MODULE_23__["SubfoodsComponent"],
              _dialogs_add_note_add_note_component__WEBPACK_IMPORTED_MODULE_24__["AddNoteComponent"],
              _dialogs_payment_cash_payment_cash_component__WEBPACK_IMPORTED_MODULE_25__["PaymentCashComponent"],
              _dialogs_payment_banks_channel_payment_banks_channel_component__WEBPACK_IMPORTED_MODULE_26__["PaymentBanksChannelComponent"],
              _dialogs_tickets_tickets_component__WEBPACK_IMPORTED_MODULE_27__["TicketsComponent"],
              _dialogs_payment_types_payment_types_component__WEBPACK_IMPORTED_MODULE_28__["PaymentTypesComponent"],
              _dialogs_banking_banking_component__WEBPACK_IMPORTED_MODULE_29__["BankingComponent"]
            ],
            imports: [
              _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
              _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
              angularfire2__WEBPACK_IMPORTED_MODULE_5__["AngularFireModule"].initializeApp(_environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].firebase),
              angularfire2_storage__WEBPACK_IMPORTED_MODULE_7__["AngularFireStorageModule"],
              angularfire2_firestore__WEBPACK_IMPORTED_MODULE_6__["AngularFirestoreModule"].enablePersistence(),
              _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["BrowserAnimationsModule"],
              _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
              _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatToolbarModule"], _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatIconModule"], _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"], _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatDialogModule"], _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatCardModule"], _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatFormFieldModule"], _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatProgressBarModule"],
              _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatSnackBarModule"], _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatStepperModule"], _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatTabsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatDividerModule"], _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatListModule"]
            ],
            entryComponents: [
              _dialogs_add_food_add_food_component__WEBPACK_IMPORTED_MODULE_17__["AddFoodComponent"],
              _dialogs_view_food_view_food_component__WEBPACK_IMPORTED_MODULE_18__["ViewFoodComponent"],
              _dialogs_add_food_category_add_food_category_component__WEBPACK_IMPORTED_MODULE_19__["AddFoodCategoryComponent"],
              _dialogs_extended_food_type_extended_food_type_component__WEBPACK_IMPORTED_MODULE_20__["ExtendedFoodTypeComponent"],
              _dialogs_add_extended_food_add_extended_food_component__WEBPACK_IMPORTED_MODULE_21__["AddExtendedFoodComponent"],
              _dialogs_view_extended_food_view_extended_food_component__WEBPACK_IMPORTED_MODULE_22__["ViewExtendedFoodComponent"],
              _dialogs_subfoods_subfoods_component__WEBPACK_IMPORTED_MODULE_23__["SubfoodsComponent"],
              _dialogs_add_note_add_note_component__WEBPACK_IMPORTED_MODULE_24__["AddNoteComponent"],
              _dialogs_payment_cash_payment_cash_component__WEBPACK_IMPORTED_MODULE_25__["PaymentCashComponent"],
              _dialogs_payment_banks_channel_payment_banks_channel_component__WEBPACK_IMPORTED_MODULE_26__["PaymentBanksChannelComponent"],
              _dialogs_tickets_tickets_component__WEBPACK_IMPORTED_MODULE_27__["TicketsComponent"],
              _dialogs_payment_types_payment_types_component__WEBPACK_IMPORTED_MODULE_28__["PaymentTypesComponent"],
              _dialogs_banking_banking_component__WEBPACK_IMPORTED_MODULE_29__["BankingComponent"],
            ],
            providers: [{ provide: angularfire2_firestore__WEBPACK_IMPORTED_MODULE_6__["FirestoreSettingsToken"], useValue: {} }],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
          })
        ], AppModule);
        return AppModule;
      }());



      /***/
}),

/***/ "./src/app/dialogs/add-extended-food/add-extended-food.component.css":
/*!***************************************************************************!*\
  !*** ./src/app/dialogs/add-extended-food/add-extended-food.component.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = ".mat-card {\n  margin-top: 10px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGlhbG9ncy9hZGQtZXh0ZW5kZWQtZm9vZC9hZGQtZXh0ZW5kZWQtZm9vZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQWlCO0NBQ2xCIiwiZmlsZSI6InNyYy9hcHAvZGlhbG9ncy9hZGQtZXh0ZW5kZWQtZm9vZC9hZGQtZXh0ZW5kZWQtZm9vZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1hdC1jYXJkIHtcbiAgbWFyZ2luLXRvcDogMTBweDtcbn1cbiJdfQ== */"

      /***/
}),

/***/ "./src/app/dialogs/add-extended-food/add-extended-food.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/dialogs/add-extended-food/add-extended-food.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "<p class=\"h4\">\n  ເພີ່ມອາຫານຍ່ອຍ\n</p>\n<form [formGroup]=\"formAddSubFood\">\n  <mat-card>\n    <mat-card-content>\n      <div class=\"form-row\">\n        <div class=\"form-group col-md-2\">\n          <label for=\"extendedFoodName\">ປະເພດອາຫານຍ່ອຍ</label>\n          <select class=\"form-control\" id=\"extendedFoodName\" formControlName=\"extendedFoodName\">\n            <option *ngFor=\"let extendedFoodType of extendedFoodTypes | async\"\n              value=\"{{ extendedFoodType.extendedFoodName_lao }}\">{{ extendedFoodType.extendedFoodName_lao }}</option>\n          </select>\n        </div>\n        <div class=\"form-group col-md-2\">\n          <label for=\"cost\">ຕົ້ນທຶນ</label>\n          <input type=\"number\" class=\"form-control text-right\" formControlName=\"cost\">\n        </div>\n        <div class=\"form-group col-md-2\">\n          <label for=\"price\">ລາຄາຂາຍ</label>\n          <input type=\"number\" class=\"form-control text-right\" formControlName=\"price\">\n        </div>\n        <div class=\"form-group col-md-4\">\n          <label for=\"notetxt\">ໝາຍເຫດ</label>\n          <input type=\"text\" class=\"form-control\" id=\"notetxt\" formControlName=\"noted\">\n        </div>\n        <div class=\"form-group col-md-2\">\n          <label for=\"addBtn\">ເພີ່ມ</label>\n          <button mat-flat-button color=\"primary\" class=\"form-control\" id=\"addBtn\"\n            (click)=\"addExtendedFood()\">Add</button>\n        </div>\n      </div>\n    </mat-card-content>\n  </mat-card>\n  <mat-card>\n    <mat-card-content>\n      <table class=\"table table-bordered table-hover\">\n        <thead class=\"thead-light\">\n          <tr>\n            <th scope=\"col\" class=\"text-center\">ອາຫານ</th>\n            <th scope=\"col\" class=\"text-center\">ຕົ້ນທຶນ</th>\n            <th scope=\"col\" class=\"text-center\">ລາຄາຂາຍ</th>\n            <th scope=\"col\" class=\"text-center\">ໝາຍເຫດ</th>\n            <th scope=\"col\" class=\"text-center\"></th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let extendedFoodList of extendedFoodLists\">\n            <td class=\"text-left\">{{ extendedFoodList.extendedFoodName }}</td>\n            <td class=\"text-right\">{{ extendedFoodList.cost |number }}</td>\n            <td class=\"text-right\">{{ extendedFoodList.price | number}}</td>\n            <td class=\"text-left\">{{ extendedFoodList.noted }}</td>\n            <td class=\"text-center\"><img src=\"../../../assets/icons/baseline-delete-24px.svg\" style=\"cursor: pointer\"\n                (click)=\"removeitem(extendedFoodList)\"></td>\n          </tr>\n        </tbody>\n        <tfoot>\n          <tr>\n            <td colspan=\"5\"></td>\n          </tr>\n        </tfoot>\n      </table>\n    </mat-card-content>\n    <mat-card-footer>\n      <div class=\"row\">\n        <div class=\"col col-md-12 text-right\">\n          <button mat-flat-button color=\"primary\" (click)=\"addExtendedFoodToMaster()\"\n            style=\"margin-bottom: 5px;margin-right: 15px;width: 110px;\">Save</button>\n        </div>\n      </div>\n    </mat-card-footer>\n  </mat-card>\n</form>\n"

      /***/
}),

/***/ "./src/app/dialogs/add-extended-food/add-extended-food.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/dialogs/add-extended-food/add-extended-food.component.ts ***!
  \**************************************************************************/
/*! exports provided: AddExtendedFoodComponent */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddExtendedFoodComponent", function () { return AddExtendedFoodComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angularfire2/firestore */ "./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angularfire2_firestore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
      var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
      };
      var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
      };





      var AddExtendedFoodComponent = /** @class */ (function () {
        function AddExtendedFoodComponent(db, dialogRef, snackbarRef, data) {
          this.db = db;
          this.dialogRef = dialogRef;
          this.snackbarRef = snackbarRef;
          this.data = data;
          this.extendedFoodLists = [];
          this.extendedFoodTypesRef = db.collection('extendedFoodTypes');
          this.FoodsRef = db.collection('foods');
        }
        AddExtendedFoodComponent.prototype.ngOnInit = function () {
          console.log(this.data);
          this.formAddSubFood = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroup"]({
            'extendedFoodName': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](),
            'cost': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](0),
            'price': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](0),
            'noted': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](),
          });
          this.extendedFoodTypes = this.extendedFoodTypesRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (change) {
            return change.map(function (a) {
              var data = a.payload.doc.data();
              data['id'] = a.payload.doc.id;
              return data;
            });
          }));
        };
        AddExtendedFoodComponent.prototype.addExtendedFood = function () {
          this.extendedFoodLists.push(this.formAddSubFood.value);
        };
        // Update extended Food to master Food
        AddExtendedFoodComponent.prototype.addExtendedFoodToMaster = function () {
          var _this = this;
          if (this.extendedFoodLists) {
            var extendedFoods = {
              extendedFoods: this.extendedFoodLists
            };
            this.FoodsRef.doc(this.data.id).update(extendedFoods).then(function () {
              _this.dialogRef.close('success');
            }).catch(function (err) {
              _this.snackbarRef.open(err, 'Fail', { duration: 2000, verticalPosition: 'top' });
              return;
            });
          }
          else {
            this.snackbarRef.open('Some value required not complete', 'Fail', { duration: 2000, verticalPosition: 'top' });
            return;
          }
        };
        AddExtendedFoodComponent.prototype.removeitem = function (doc) {
          this.extendedFoodLists.forEach(function (item, index) {
            //if (item === doc) this.extendedFoodLists.splice(index, 1);
            console.log(item + ' - ' + index);
          });
        };
        AddExtendedFoodComponent = __decorate([
          Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-extended-food',
            template: __webpack_require__(/*! ./add-extended-food.component.html */ "./src/app/dialogs/add-extended-food/add-extended-food.component.html"),
            styles: [__webpack_require__(/*! ./add-extended-food.component.css */ "./src/app/dialogs/add-extended-food/add-extended-food.component.css")]
          }),
          __param(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
          __metadata("design:paramtypes", [angularfire2_firestore__WEBPACK_IMPORTED_MODULE_1__["AngularFirestore"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"], Object])
        ], AddExtendedFoodComponent);
        return AddExtendedFoodComponent;
      }());



      /***/
}),

/***/ "./src/app/dialogs/add-food-category/add-food-category.component.css":
/*!***************************************************************************!*\
  !*** ./src/app/dialogs/add-food-category/add-food-category.component.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = ".foodCatDiv {\n  max-height: 200px;\n  overflow: auto;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGlhbG9ncy9hZGQtZm9vZC1jYXRlZ29yeS9hZGQtZm9vZC1jYXRlZ29yeS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQWtCO0VBQ2xCLGVBQWU7Q0FDaEIiLCJmaWxlIjoic3JjL2FwcC9kaWFsb2dzL2FkZC1mb29kLWNhdGVnb3J5L2FkZC1mb29kLWNhdGVnb3J5LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZm9vZENhdERpdiB7XG4gIG1heC1oZWlnaHQ6IDIwMHB4O1xuICBvdmVyZmxvdzogYXV0bztcbn1cbiJdfQ== */"

      /***/
}),

/***/ "./src/app/dialogs/add-food-category/add-food-category.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/dialogs/add-food-category/add-food-category.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "<p class=\"h4\">\n  ເພີ່ມປະເພດອາຫານ\n</p>\n<form [formGroup]=\"foodCateForm\">\n  <div class=\"form-row\">\n    <div class=\"form-group col-md-6\">\n      <label for=\"foodCategoryName\">ປະເພດອາຫານ ພາສາອັງກິດ</label>\n      <input type=\"text\" class=\"form-control\" formControlName=\"foodCategoryName\" id=\"foodCategoryName\" required>\n    </div>\n    <div class=\"form-group col-md-6\">\n      <label for=\"foodCategoryNameLao\">ປະເພດອາຫານ ພາສາ ລາວ</label>\n      <input type=\"text\" class=\"form-control\" formControlName=\"foodCategoryNameLao\" id=\"foodCategoryNameLao\" required>\n    </div>\n    <div class=\"form-group col-md-12 text-right\">\n      <button mat-flat-button color=\"primary\" style=\"width: 100px; margin-right: 5px;\" (click)=\"addNewCate()\">Add\n        new</button>\n      <button mat-flat-button color=\"warn\" style=\"width: 100px;\" (click)=\"updateCat()\">Update</button>\n    </div>\n  </div>\n</form>\n<div class=\"foodCatDiv\">\n  <table class=\"table table-bordered table-hover \">\n    <thead>\n      <th class=\"text-left\">ປະເພດອາຫານ ພາສາອັງກິດ</th>\n      <th class=\"text-left\">ປະເພດອາຫານ ພາສາ ລາວ</th>\n      <th class=\"text-left\"></th>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let cat of FoodCategories | async\" (click)=\"addUpdate(cat)\">\n        <td class=\"text-left\">{{ cat.foodCategoryName }}</td>\n        <td class=\"text-left\">{{ cat.foodCategoryNameLao }}</td>\n        <td class=\"text-center\"><img src=\"../../../assets/icons/baseline-delete-24px.svg\" style=\"cursor: pointer\"\n            (click)=\"deleteCat(cat)\"></td>\n      </tr>\n    </tbody>\n    <tfoot>\n      <tr>\n        <td [colSpan]=\"3\"></td>\n      </tr>\n    </tfoot>\n  </table>\n</div>\n"

      /***/
}),

/***/ "./src/app/dialogs/add-food-category/add-food-category.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/dialogs/add-food-category/add-food-category.component.ts ***!
  \**************************************************************************/
/*! exports provided: AddFoodCategoryComponent */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddFoodCategoryComponent", function () { return AddFoodCategoryComponent; });
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angularfire2/firestore */ "./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angularfire2_firestore__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
      var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
      };





      var AddFoodCategoryComponent = /** @class */ (function () {
        function AddFoodCategoryComponent(db, snackbarRef) {
          this.db = db;
          this.snackbarRef = snackbarRef;
          this.disableSave = false;
          this.FoodCategoriesRef = db.collection('food_categories');
        }
        AddFoodCategoryComponent.prototype.ngOnInit = function () {
          this.foodCateForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            'id': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](),
            'foodCategoryName': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](),
            'foodCategoryNameLao': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](),
          });
          //this.FoodCategories = this.FoodCategoriesRef.valueChanges();
          this.FoodCategories = this.FoodCategoriesRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (change) {
            return change.map(function (a) {
              var data = a.payload.doc.data();
              data['id'] = a.payload.doc.id;
              return data;
            });
          }));
        };
        AddFoodCategoryComponent.prototype.addUpdate = function (c) {
          this.docId = c.id;
          this.foodCateForm.setValue(c);
        };
        AddFoodCategoryComponent.prototype.updateCat = function () {
          var _this = this;
          if (this.foodCateForm.valid) {
            this.FoodCategoriesRef.doc(this.docId).update(this.foodCateForm.value).then(function () {
              _this.snackbarRef.open('Updated', 'OK', { duration: 2000 });
            }).catch(function (err) {
              _this.snackbarRef.open(err, 'fail', { duration: 2000 });
            });
          }
          else {
            this.snackbarRef.open('Something wrong', 'OK', { duration: 2000 });
            return;
          }
        };
        AddFoodCategoryComponent.prototype.addNewCate = function () {
          var _this = this;
          console.log(this.foodCateForm.value);
          if (this.foodCateForm.valid) {
            this.FoodCategoriesRef.add(this.foodCateForm.value).then(function (res) {
              _this.snackbarRef.open('Added successfull', 'Ok', {
                duration: 2000,
              });
              _this.foodCateForm.reset();
            });
          }
          else {
            this.snackbarRef.open('Something wrong', 'OK', { duration: 2000 });
            return;
          }
        };
        AddFoodCategoryComponent.prototype.deleteCat = function (cat) {
          var _this = this;
          if (cat) {
            swal({
              title: "ທ່ານຕ້ອງການລຶບແທ້ບໍ?",
              text: "ຫຼັງຈາກລືບລາຍການແລ້ວບໍ່ສາມາທີ່ຈະຈກູ້ຄືນໄດ້",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then(function (res) {
              if (res) {
                _this.FoodCategoriesRef.doc(cat.id).delete();
              }
              else {
                return;
              }
            });
          }
        };
        AddFoodCategoryComponent = __decorate([
          Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-add-food-category',
            template: __webpack_require__(/*! ./add-food-category.component.html */ "./src/app/dialogs/add-food-category/add-food-category.component.html"),
            styles: [__webpack_require__(/*! ./add-food-category.component.css */ "./src/app/dialogs/add-food-category/add-food-category.component.css")]
          }),
          __metadata("design:paramtypes", [angularfire2_firestore__WEBPACK_IMPORTED_MODULE_0__["AngularFirestore"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"]])
        ], AddFoodCategoryComponent);
        return AddFoodCategoryComponent;
      }());



      /***/
}),

/***/ "./src/app/dialogs/add-food/add-food.component.css":
/*!*********************************************************!*\
  !*** ./src/app/dialogs/add-food/add-food.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = ".photoDiv {\n  position: relative;\n  max-width: 240px;\n  margin-top: 25px;\n  border-radius: 5px;\n}\n.hidden {\n  display: none;\n}\n.btnSave {\n  position: relative;\n  width: 100%;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGlhbG9ncy9hZGQtZm9vZC9hZGQtZm9vZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIsbUJBQW1CO0NBQ3BCO0FBQ0Q7RUFDRSxjQUFjO0NBQ2Y7QUFDRDtFQUNFLG1CQUFtQjtFQUNuQixZQUFZO0NBQ2IiLCJmaWxlIjoic3JjL2FwcC9kaWFsb2dzL2FkZC1mb29kL2FkZC1mb29kLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucGhvdG9EaXYge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1heC13aWR0aDogMjQwcHg7XG4gIG1hcmdpbi10b3A6IDI1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cbi5oaWRkZW4ge1xuICBkaXNwbGF5OiBub25lO1xufVxuLmJ0blNhdmUge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAxMDAlO1xufVxuIl19 */"

      /***/
}),

/***/ "./src/app/dialogs/add-food/add-food.component.html":
/*!**********************************************************!*\
  !*** ./src/app/dialogs/add-food/add-food.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "<h1 mat-dialog-title>ເພີ່ມອາຫານ</h1>\n<div class=\"alert alert-danger\" role=\"alert\" [ngClass]=\"showAlert\">\n  Please correct all detail before save\n</div>\n<form [formGroup]=\"addFoodForm\">\n  <div class=\"row\">\n    <div class=\"col col-md-4\">\n      <img [src]=\"photoSrc\" (click)=\"fileinput.click()\" class=\"photoDiv shadow p-3 mb-5 bg-white\">\n      <input type=\"file\" (change)=\"uploadPhoto($event.target.files)\" #fileinput style=\"display: none;\">\n      <mat-progress-bar color=\"primary\" mode=\"determinate\" [value]=\"progressBarValue\">\n      </mat-progress-bar>\n    </div>\n    <div class=\"col col-md-8\">\n      <div class=\"form-row\">\n        <div class=\"form-group col-md-6\">\n          <label for=\"foodId\">ລະຫັດອາຫານ</label>\n          <input type=\"text\" class=\"form-control\" id=\"foodId\" readonly formControlName=\"foodId\" required>\n        </div>\n        <div class=\"form-group col-md-6\">\n          <label for=\"food_name\">ອາຫານ</label>\n          <input type=\"text\" class=\"form-control\" id=\"food_name\" formControlName=\"food_name\" required>\n        </div>\n        <div class=\"form-group col-md-6\">\n          <label for=\"food_name_en\">ອາຫານ ພາສາອັງກິດ</label>\n          <input type=\"text\" class=\"form-control\" id=\"food_name_en\" formControlName=\"food_name_en\" required>\n        </div>\n        <div class=\"form-group col-md-6\">\n          <label for=\"food_category\">ຈັດໃນໝວດ</label>\n          <select class=\"form-control\" id=\"food_category\" required formControlName=\"food_category\">\n            <option value=\"\" disabled>-----------</option>\n            <option *ngFor=\"let c of categories |async\" value=\"{{ c.foodCategoryNameLao }}\">{{ c.foodCategoryNameLao }}\n            </option>\n          </select>\n        </div>\n        <div class=\"form-group col-md-6\">\n          <label for=\"kitchenName\">ຫ້ອງຄົວ</label>\n          <select class=\"form-control\" id=\"kitchenName\" required formControlName=\"kitchen\">\n            <option value=\"\" disabled>-----------</option>\n            <option *ngFor=\"let k of kitchens |async\" value=\"{{ k.kitchenName }}\">{{ k.kitchenName }}</option>\n          </select>\n        </div>\n        <div class=\"form-group col-md-6\">\n          <label for=\"cost\">ຕົ້ນທືນ</label>\n          <input type=\"number\" class=\"form-control\" id=\"cost\" formControlName=\"cost\" required>\n        </div>\n        <div class=\"form-group col-md-6\">\n          <label for=\"price\">ລາຄາຂາຍ</label>\n          <input type=\"number\" class=\"form-control\" id=\"price\" formControlName=\"price\" required>\n        </div>\n        <div class=\"form-group col-md-6\">\n          <label for=\"currency\">ສະກູນ</label>\n          <select class=\"form-control\" id=\"currency\" required formControlName=\"currency\">\n            <option *ngFor=\"let c of Currencies |async\" value=\"{{ c.currencyName }}\">{{ c.currencyName }}</option>\n          </select>\n        </div>\n        <div class=\"form-group col-md-6\">\n          <label for=\"parent_food\">ປະເພດ</label>\n          <select class=\"form-control\" id=\"parent_food\" required formControlName=\"parent_food\">\n            <option value=\"common\">common</option>\n            <option value=\"master\">master Food</option>\n          </select>\n        </div>\n        <div class=\"form-group col-md-6\">\n          <label for=\"noted\">ໝາຍເຫດ</label>\n          <input type=\"text\" class=\"form-control\" id=\"noted\" formControlName=\"noted\">\n        </div>\n        <div class=\"form-group col-md-12\">\n          <button mat-raised-button color=\"primary\" (click)=\"createFood()\" [disabled]=\"saveDisabled\"\n            class=\"btnSave\">Save</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</form>\n"

      /***/
}),

/***/ "./src/app/dialogs/add-food/add-food.component.ts":
/*!********************************************************!*\
  !*** ./src/app/dialogs/add-food/add-food.component.ts ***!
  \********************************************************/
/*! exports provided: AddFoodComponent */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddFoodComponent", function () { return AddFoodComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angularfire2/firestore */ "./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(angularfire2_firestore__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var angularfire2_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angularfire2/storage */ "./node_modules/angularfire2/storage/index.js");
/* harmony import */ var angularfire2_storage__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(angularfire2_storage__WEBPACK_IMPORTED_MODULE_5__);
      var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
      };






      var AddFoodComponent = /** @class */ (function () {
        function AddFoodComponent(db, storage, dialogRef) {
          this.db = db;
          this.storage = storage;
          this.dialogRef = dialogRef;
          this.showAlert = "hidden";
          this.photoSrc = "../../../assets/images/icons/search.svg";
          this.saveDisabled = false;
          this.currenciesRef = db.collection('currencies');
          this.kitchensRef = db.collection('kitchens');
          this.categoriesRef = db.collection('food_categories');
          this.foodsRef = db.collection('foods');
          this.extendedFoodTypesRef = db.collection('extendedFoodTypes');
        }
        AddFoodComponent.prototype.ngOnInit = function () {
          var uuid1 = uuid__WEBPACK_IMPORTED_MODULE_2__["v1"]();
          //console.log(uuid1);
          this.addFoodForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            foodId: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](uuid1),
            food_name: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
            food_name_en: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
            food_photo: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
            food_category: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
            cost: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](0),
            price: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](0),
            currency: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('KIP'),
            parent_food: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](false),
            extendedFoods: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
            is_childFood: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](false),
            kitchen: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
            userName: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('administrator'),
            enabled: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](true),
            noted: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
            createdAt: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](new Date()),
            updatedAt: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](new Date()),
          });
          // Load startup
          this.Currencies = this.currenciesRef.valueChanges();
          this.kitchens = this.kitchensRef.valueChanges();
          this.categories = this.categoriesRef.valueChanges();
          this.extendedFoodTypes = this.extendedFoodTypesRef.valueChanges();
        };
        AddFoodComponent.prototype.uploadPhoto = function (event) {
          var _this = this;
          var selectedFiles;
          selectedFiles = event;
          if (selectedFiles.item(0)) {
            var file = selectedFiles.item(0);
            var uniqkey = 'pic' + Math.floor(Math.random() * 1000000);
            var uploadTask = this.storage.upload('/foods/' + uniqkey, file);
            uploadTask.percentageChanges().subscribe(function (value) {
              _this.progressBarValue = value.toFixed(2);
            });
            uploadTask.then(function (snapshot) {
              snapshot.ref.getDownloadURL().then(function (url) {
                _this.photoSrc = url;
              });
            });
          }
        };
        AddFoodComponent.prototype.createFood = function () {
          var _this = this;
          if (this.addFoodForm.valid) {
            this.addFoodForm.get('food_photo').setValue(this.photoSrc);
            this.saveDisabled = true;
            this.foodsRef.add(this.addFoodForm.value).then(function (res) {
              _this.dialogRef.close('success');
            });
          }
          else {
            this.saveDisabled = false;
            return;
          }
        };
        AddFoodComponent = __decorate([
          Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-food',
            template: __webpack_require__(/*! ./add-food.component.html */ "./src/app/dialogs/add-food/add-food.component.html"),
            styles: [__webpack_require__(/*! ./add-food.component.css */ "./src/app/dialogs/add-food/add-food.component.css")]
          }),
          __metadata("design:paramtypes", [angularfire2_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"], angularfire2_storage__WEBPACK_IMPORTED_MODULE_5__["AngularFireStorage"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"]])
        ], AddFoodComponent);
        return AddFoodComponent;
      }());



      /***/
}),

/***/ "./src/app/dialogs/add-note/add-note.component.css":
/*!*********************************************************!*\
  !*** ./src/app/dialogs/add-note/add-note.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "* {\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif, 'phetsarath ot';\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGlhbG9ncy9hZGQtbm90ZS9hZGQtbm90ZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsOEVBQThFO0NBQy9FIiwiZmlsZSI6InNyYy9hcHAvZGlhbG9ncy9hZGQtbm90ZS9hZGQtbm90ZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiKiB7XG4gIGZvbnQtZmFtaWx5OiAnU2Vnb2UgVUknLCBUYWhvbWEsIEdlbmV2YSwgVmVyZGFuYSwgc2Fucy1zZXJpZiwgJ3BoZXRzYXJhdGggb3QnO1xufVxuIl19 */"

      /***/
}),

/***/ "./src/app/dialogs/add-note/add-note.component.html":
/*!**********************************************************!*\
  !*** ./src/app/dialogs/add-note/add-note.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "<h1 mat-dialog-title class=\"text-center h4\">ເພີ່ມຄຳສັ້ງ</h1>\n<form [formGroup]=\"addNoteForm\">\n  <div class=\"form-row\">\n    <div class=\"form-group col-md-12\">\n      <input type=\"text\" step=\"1\" class=\"form-control text-left\" formControlName=\"note\" required (keydown.enter)=\"addNote()\">\n    </div>\n  </div>\n</form>\n"

      /***/
}),

/***/ "./src/app/dialogs/add-note/add-note.component.ts":
/*!********************************************************!*\
  !*** ./src/app/dialogs/add-note/add-note.component.ts ***!
  \********************************************************/
/*! exports provided: AddNoteComponent */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddNoteComponent", function () { return AddNoteComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
      var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
      };



      var AddNoteComponent = /** @class */ (function () {
        function AddNoteComponent(dialogRef) {
          this.dialogRef = dialogRef;
        }
        AddNoteComponent.prototype.ngOnInit = function () {
          this.addNoteForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            note: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]()
          });
        };
        AddNoteComponent.prototype.addNote = function () {
          if (this.addNoteForm.valid) {
            this.dialogRef.close(this.addNoteForm.value);
          }
        };
        AddNoteComponent = __decorate([
          Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-note',
            template: __webpack_require__(/*! ./add-note.component.html */ "./src/app/dialogs/add-note/add-note.component.html"),
            styles: [__webpack_require__(/*! ./add-note.component.css */ "./src/app/dialogs/add-note/add-note.component.css")]
          }),
          __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"]])
        ], AddNoteComponent);
        return AddNoteComponent;
      }());



      /***/
}),

/***/ "./src/app/dialogs/banking/banking.component.css":
/*!*******************************************************!*\
  !*** ./src/app/dialogs/banking/banking.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RpYWxvZ3MvYmFua2luZy9iYW5raW5nLmNvbXBvbmVudC5jc3MifQ== */"

      /***/
}),

/***/ "./src/app/dialogs/banking/banking.component.html":
/*!********************************************************!*\
  !*** ./src/app/dialogs/banking/banking.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "<h1 mat-dialog-title>ທະນາຄານ</h1>\n<mat-dialog-content>\n  <form [formGroup]=\"bankingForm\">\n    <div class=\"form-row\">\n      <div class=\"form-group col-md-12\">\n        <label for=\"bankCode\">ລະຫັດ</label>\n        <input type=\"text\" class=\"form-control\" formControlName=\"bankCode\" id=\"bankCode\" required>\n      </div>\n      <div class=\"form-group col-md-12\">\n        <label for=\"bankName\">ຊື່ທະນາຄານ</label>\n        <input type=\"text\" class=\"form-control\" formControlName=\"bankName\" id=\"bankName\" required>\n      </div>\n      <div class=\"form-group col-md-12 text-right\">\n        <button mat-raised-button color=\"primary\" style=\"width: 100%;\" class=\"btnSave\"\n          (click)=\"addBank()\">ບັນທືກ</button>\n      </div>\n    </div>\n  </form>\n  <div class=\"row\">\n    <mat-divider></mat-divider>\n    <table class=\"table table-bordered\">\n      <thead class=\"thead-light\">\n        <tr>\n          <th scope=\"col\" class=\"text-center\">ລະຫັດ</th>\n          <th scope=\"col\" class=\"text-center\">ຊື່ທະນາຄານ</th>\n          <th scope=\"col\" class=\"text-center\">ນຳໃຊ້</th>\n          <th scope=\"col\" class=\"text-center\">ລຶບ</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let bank of banks | async\">\n          <td class=\"text-left\">{{ bank.bankCode }}</td>\n          <td class=\"text-left text-nowrap\">{{ bank.bankName }}</td>\n          <td class=\"text-center\" *ngIf=\"bank.enabled ; else disabled\">\n            <img src=\"../../../assets/icons/baseline-check_circle_outline-24px.svg\">\n          </td>\n          <ng-template #disabled><img src=\"../../../assets/icons/baseline-radio_button_unchecked-24px.svg\">\n          </ng-template>\n          <td class=\"text-center\">\n            <img src=\"../../../assets/icons/baseline-delete-24px.svg\" style=\"cursor: pointer;\"\n              (click)=\"removeBank(bank.id)\">\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</mat-dialog-content>\n"

      /***/
}),

/***/ "./src/app/dialogs/banking/banking.component.ts":
/*!******************************************************!*\
  !*** ./src/app/dialogs/banking/banking.component.ts ***!
  \******************************************************/
/*! exports provided: BankingComponent */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BankingComponent", function () { return BankingComponent; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
      var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
      };





      var BankingComponent = /** @class */ (function () {
        function BankingComponent(db, dialogRef, snackbar) {
          this.db = db;
          this.dialogRef = dialogRef;
          this.snackbar = snackbar;
          this.banksRef = db.collection('banks');
        }
        BankingComponent.prototype.ngOnInit = function () {
          this.bankingForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            bankCode: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](),
            bankName: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](),
            enabled: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](true),
          });
          this.banks = this.banksRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (change) {
            return change.map(function (a) {
              var banks = a.payload.doc.data();
              banks['id'] = a.payload.doc.id;
              return banks;
            });
          }));
        };
        BankingComponent.prototype.addBank = function () {
          var _this = this;
          if (this.bankingForm.valid) {
            this.db.collection('banks').add(this.bankingForm.value).then(function () {
              _this.snackbar.open('Bank added', 'Ok', { duration: 1000, verticalPosition: 'top' });
            });
          }
        };
        BankingComponent.prototype.removeBank = function (docId) {
          var _this = this;
          if (docId) {
            this.db.collection('banks').doc(docId).delete().then(function () {
              _this.snackbar.open('Bank deleted', 'Ok', { duration: 1000, verticalPosition: 'top' });
            });
          }
        };
        BankingComponent = __decorate([
          Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"])({
            selector: 'app-banking',
            template: __webpack_require__(/*! ./banking.component.html */ "./src/app/dialogs/banking/banking.component.html"),
            styles: [__webpack_require__(/*! ./banking.component.css */ "./src/app/dialogs/banking/banking.component.css")]
          }),
          __metadata("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"]])
        ], BankingComponent);
        return BankingComponent;
      }());



      /***/
}),

/***/ "./src/app/dialogs/extended-food-type/extended-food-type.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/dialogs/extended-food-type/extended-food-type.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RpYWxvZ3MvZXh0ZW5kZWQtZm9vZC10eXBlL2V4dGVuZGVkLWZvb2QtdHlwZS5jb21wb25lbnQuY3NzIn0= */"

      /***/
}),

/***/ "./src/app/dialogs/extended-food-type/extended-food-type.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/dialogs/extended-food-type/extended-food-type.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "<p class=\"h4\">\n  ເພີ່ມປະເພດອາຫານຍ່ອຍ\n</p>\n<form [formGroup]=\"extendedFoodTypeForm\">\n  <div class=\"form-row\">\n    <div class=\"form-group col-md-6\">\n      <label for=\"extendedFoodName\">ປະເພດອາຫານຍ່ອຍ ພາສາອັງກິດ</label>\n      <input type=\"text\" class=\"form-control\" formControlName=\"extendedFoodName\" id=\"extendedFoodName\" required>\n    </div>\n    <div class=\"form-group col-md-6\">\n      <label for=\"extendedFoodName_lao\">ປະເພດອາຫານຍ່ອຍ ພາສາ ລາວ</label>\n      <input type=\"text\" class=\"form-control\" formControlName=\"extendedFoodName_lao\" id=\"extendedFoodName_lao\" required>\n    </div>\n    <div class=\"form-group col-md-12 text-right\">\n      <button mat-flat-button color=\"primary\" style=\"width: 100px; margin-right: 5px;\" (click)=\"addNewExtendedFoodType()\">Add\n        new</button>\n      <button mat-flat-button color=\"warn\" style=\"width: 100px;\">Update</button>\n    </div>\n  </div>\n</form>\n<div>\n  <table class=\"table  table-bordered table-hover\">\n    <thead>\n      <th class=\"text-left\">ປະເພດອາຫານ ພາສາອັງກິດ</th>\n      <th class=\"text-left\">ປະເພດອາຫານ ພາສາ ລາວ</th>\n      <th class=\"text-left\"></th>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let ext of extendedFoodTypes | async\">\n        <td class=\"text-left\">{{ ext.extendedFoodName }}</td>\n        <td class=\"text-left\">{{ ext.extendedFoodName_lao }}</td>\n        <td class=\"text-center\"><img src=\"../../../assets/icons/baseline-delete-24px.svg\" style=\"cursor: pointer\"\n            (click)=\"deleteExtendedFoodType(ext)\"></td>\n      </tr>\n    </tbody>\n    <tfoot>\n      <tr>\n        <td [colSpan]=\"3\"></td>\n      </tr>\n    </tfoot>\n  </table>\n</div>\n"

      /***/
}),

/***/ "./src/app/dialogs/extended-food-type/extended-food-type.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/dialogs/extended-food-type/extended-food-type.component.ts ***!
  \****************************************************************************/
/*! exports provided: ExtendedFoodTypeComponent */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExtendedFoodTypeComponent", function () { return ExtendedFoodTypeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angularfire2/firestore */ "./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angularfire2_firestore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
      var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
      };





      var ExtendedFoodTypeComponent = /** @class */ (function () {
        function ExtendedFoodTypeComponent(db, dialogRef, snackbarRef) {
          this.db = db;
          this.dialogRef = dialogRef;
          this.snackbarRef = snackbarRef;
          this.extendedFoodTypesRef = db.collection('extendedFoodTypes');
        }
        ExtendedFoodTypeComponent.prototype.ngOnInit = function () {
          this.extendedFoodTypeForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            'extendedFoodName': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](),
            'extendedFoodName_lao': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](),
            'enabled': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](true),
            'createdAt': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](new Date()),
            'updateAt': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](new Date()),
          });
          this.extendedFoodTypes = this.extendedFoodTypesRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (change) {
            return change.map(function (a) {
              var data = a.payload.doc.data();
              data['id'] = a.payload.doc.id;
              return data;
            });
          }));
        };
        ExtendedFoodTypeComponent.prototype.addNewExtendedFoodType = function () {
          var _this = this;
          if (this.extendedFoodTypeForm.valid) {
            this.extendedFoodTypesRef.add(this.extendedFoodTypeForm.value).then(function () {
              _this.extendedFoodTypeForm.reset();
              _this.snackbarRef.open('Add new food success', 'ok', { duration: 1000 });
            });
          }
          else {
            this.snackbarRef.open('Something wrong!', 'Fail', { duration: 1000 });
            return;
          }
        };
        ExtendedFoodTypeComponent.prototype.deleteExtendedFoodType = function (ext) {
          var _this = this;
          if (ext) {
            swal({
              title: "ທ່ານຕ້ອງການລຶບແທ້ບໍ?",
              text: "ຫຼັງຈາກລືບລາຍການແລ້ວບໍ່ສາມາທີ່ຈະຈກູ້ຄືນໄດ້",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then(function (res) {
              if (res) {
                _this.extendedFoodTypesRef.doc(ext.id).delete().then(function () {
                  _this.snackbarRef.open('Delete success', 'ok', { duration: 1000 });
                });
              }
              else {
                return;
              }
            });
          }
        };
        ExtendedFoodTypeComponent = __decorate([
          Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-extended-food-type',
            template: __webpack_require__(/*! ./extended-food-type.component.html */ "./src/app/dialogs/extended-food-type/extended-food-type.component.html"),
            styles: [__webpack_require__(/*! ./extended-food-type.component.css */ "./src/app/dialogs/extended-food-type/extended-food-type.component.css")]
          }),
          __metadata("design:paramtypes", [angularfire2_firestore__WEBPACK_IMPORTED_MODULE_1__["AngularFirestore"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"]])
        ], ExtendedFoodTypeComponent);
        return ExtendedFoodTypeComponent;
      }());



      /***/
}),

/***/ "./src/app/dialogs/payment-banks-channel/payment-banks-channel.component.css":
/*!***********************************************************************************!*\
  !*** ./src/app/dialogs/payment-banks-channel/payment-banks-channel.component.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RpYWxvZ3MvcGF5bWVudC1iYW5rcy1jaGFubmVsL3BheW1lbnQtYmFua3MtY2hhbm5lbC5jb21wb25lbnQuY3NzIn0= */"

      /***/
}),

/***/ "./src/app/dialogs/payment-banks-channel/payment-banks-channel.component.html":
/*!************************************************************************************!*\
  !*** ./src/app/dialogs/payment-banks-channel/payment-banks-channel.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "<p>\n  payment-banks-channel works!\n</p>\n"

      /***/
}),

/***/ "./src/app/dialogs/payment-banks-channel/payment-banks-channel.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/dialogs/payment-banks-channel/payment-banks-channel.component.ts ***!
  \**********************************************************************************/
/*! exports provided: PaymentBanksChannelComponent */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentBanksChannelComponent", function () { return PaymentBanksChannelComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
      var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
      };

      var PaymentBanksChannelComponent = /** @class */ (function () {
        function PaymentBanksChannelComponent() {
        }
        PaymentBanksChannelComponent.prototype.ngOnInit = function () {
        };
        PaymentBanksChannelComponent = __decorate([
          Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-payment-banks-channel',
            template: __webpack_require__(/*! ./payment-banks-channel.component.html */ "./src/app/dialogs/payment-banks-channel/payment-banks-channel.component.html"),
            styles: [__webpack_require__(/*! ./payment-banks-channel.component.css */ "./src/app/dialogs/payment-banks-channel/payment-banks-channel.component.css")]
          }),
          __metadata("design:paramtypes", [])
        ], PaymentBanksChannelComponent);
        return PaymentBanksChannelComponent;
      }());



      /***/
}),

/***/ "./src/app/dialogs/payment-cash/payment-cash.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/dialogs/payment-cash/payment-cash.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "* {\n  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif,'phetsarath ot';\n}\n.payment-text {\n  color: purple;\n}\n.qrDiv {\n  margin-top: 20px;\n}\n.hidden {\n  display: none;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGlhbG9ncy9wYXltZW50LWNhc2gvcGF5bWVudC1jYXNoLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxzSEFBc0g7Q0FDdkg7QUFDRDtFQUNFLGNBQWM7Q0FDZjtBQUNEO0VBQ0UsaUJBQWlCO0NBQ2xCO0FBQ0Q7RUFDRSxjQUFjO0NBQ2YiLCJmaWxlIjoic3JjL2FwcC9kaWFsb2dzL3BheW1lbnQtY2FzaC9wYXltZW50LWNhc2guY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIioge1xuICBmb250LWZhbWlseTogJ1RyZWJ1Y2hldCBNUycsICdMdWNpZGEgU2FucyBVbmljb2RlJywgJ0x1Y2lkYSBHcmFuZGUnLCAnTHVjaWRhIFNhbnMnLCBBcmlhbCwgc2Fucy1zZXJpZiwncGhldHNhcmF0aCBvdCc7XG59XG4ucGF5bWVudC10ZXh0IHtcbiAgY29sb3I6IHB1cnBsZTtcbn1cbi5xckRpdiB7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG59XG4uaGlkZGVuIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbiJdfQ== */"

      /***/
}),

/***/ "./src/app/dialogs/payment-cash/payment-cash.component.html":
/*!******************************************************************!*\
  !*** ./src/app/dialogs/payment-cash/payment-cash.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "<mat-card>\n  <mat-card-title class=\"h4 text-center\">ຊຳລະ</mat-card-title>\n  <mat-divider></mat-divider>\n  <mat-card-content style=\"margin-top: 20px;\">\n    <div class=\"row\">\n      <div class=\"col col-md-4\">\n        <mat-card>\n          <mat-card-title class=\"text-center\">ຈ່າຍດ້ວຍ QR</mat-card-title>\n          <mat-divider></mat-divider>\n          <mat-card-content>\n            <div class=\"qrDiv text-center shadow\">\n              <img [src]=\"srcQr\" style=\"width: 200px;\">\n            </div>\n          </mat-card-content>\n        </mat-card>\n      </div>\n      <div class=\"col col-md-8\">\n        <form [formGroup]=\"orderForm\">\n          <mat-card>\n            <mat-card-title class=\"text-center\">ຍອດເງິນທີ່ຕ້ອງຊຳລະ</mat-card-title>\n            <mat-divider></mat-divider>\n            <mat-card-content>\n              <div class=\"display-3 text-center payment-text\">\n                {{ data.total | number }} ກິບ\n              </div>\n              <mat-divider></mat-divider>\n              <div class=\"form-row\">\n                <div class=\"form-group col-md-12\" style=\"margin-top: 10px;\">\n                  <label for=\"ticket\">Ticket</label>\n                  <select class=\"form-control\" id=\"ticket\" required formControlName=\"ticket\"\n                    (change)=\"getTicketById($event.target.value)\">\n                    <option value=\"\" disabled>------------------------</option>\n                    <option *ngFor=\"let t of tickets | async\" value=\"{{ t.ticket }}\">{{ t.ticket }}\n                    </option>\n                  </select>\n                </div>\n                <div class=\"form-group col-md-12\">\n                  <label for=\"payBy\">Pay By</label>\n                  <select class=\"form-control\" id=\"payBy\" (change)=\"checkPaymentCash($event.target.value)\">\n                    <option value=\"\" disabled>------------------------</option>\n                    <option *ngFor=\"let p of paymentTypes | async\" value=\"{{ p.paymentCode }}\">\n                      {{ p.paymentCode }}</option>\n                  </select>\n                </div>\n                <mat-card class=\"col col-md-12\" [ngClass]=\"showPaymentCash\">\n                  <mat-card-content>\n                    <div class=\"row\">\n                      <div class=\"form-group col-md-6\">\n                        <label for=\"recieved\">ຮັບມາ</label>\n                        <input type=\"number\" class=\"form-control\" id=\"recieved\" formControlName=\"recieved\" required\n                          (keyup)=\"changeCalculation()\">\n                      </div>\n                      <div class=\"form-group col-md-6\">\n                        <label for=\"change\">ທອນ</label>\n                        <input type=\"number\" readonly class=\"form-control\" id=\"change\" formControlName=\"change\"\n                          required>\n                      </div>\n                    </div>\n                  </mat-card-content>\n                </mat-card>\n                <div class=\"form-group col-md-12\" style=\"margin-top: 10px;\">\n                  <button mat-flat-button color=\"warn\" style=\"width: 100%; height: 50px;\" (click)=\"paymentProcess()\"\n                    [disabled]=\"paymentBtnDisabled\">ຈ່າຍ</button>\n                </div>\n              </div>\n            </mat-card-content>\n          </mat-card>\n        </form>\n      </div>\n    </div>\n  </mat-card-content>\n</mat-card>\n"

      /***/
}),

/***/ "./src/app/dialogs/payment-cash/payment-cash.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/dialogs/payment-cash/payment-cash.component.ts ***!
  \****************************************************************/
/*! exports provided: PaymentCashComponent */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentCashComponent", function () { return PaymentCashComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angularfire2/firestore */ "./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angularfire2_firestore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
      var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
      };
      var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
      };
      var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                if (t[2]) _.ops.pop();
                _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
      };







      var PaymentCashComponent = /** @class */ (function () {
        function PaymentCashComponent(db, dialogRef, data) {
          var _this = this;
          this.db = db;
          this.dialogRef = dialogRef;
          this.data = data;
          this.username = 'administrator';
          this.paymentBtnDisabled = false;
          this.foodList = [];
          this.showPaymentCash = 'hidden';
          this.qRCodeUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].qrcodeUrl.url;
          this.srcQr = '../../../assets/icons/qr-code.svg';
          this.cartRef = db.collection('carts', function (ref) {
            return ref.where('username', '==', _this.username);
          });
          this.ticketsRef = db.collection('tickets', function (ref) {
            return ref.where('used', '==', false).orderBy('ticket', 'asc');
          });
          this.paymentTypesRef = db.collection('paymentTypes', function (ref) {
            return ref.where('enabled', '==', true).orderBy('paymentCode', 'asc');
          });
        }
        PaymentCashComponent.prototype.ngOnInit = function () {
          var _this = this;
          var uuid1 = uuid__WEBPACK_IMPORTED_MODULE_5__["v1"]();
          var refno = this.padding(Math.floor(Math.random() * 6000) + 1, 12);
          this.orderForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroup"]({
            orderId: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](uuid1),
            refno: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](refno),
            ticket: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](),
            food: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](),
            grandtotal: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](this.data.total),
            recieved: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](this.data.total),
            change: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](0),
            paymentType: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](),
            invoiceno: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](),
            orderDateTime: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](new Date()),
            orderFinishTime: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](),
            settled: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](false),
            completed: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](false),
            username: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](this.username),
          });
          //this.generateQRDate();
          this.orderForm.get('paymentType').setValue('CASH');
          this.carts = this.cartRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (change) {
            return change.map(function (a) {
              var cart = a.payload.doc.data();
              cart['id'] = a.payload.doc.id;
              _this.cartId = a.payload.doc.id;
              return cart;
            });
          }));
          this.carts.subscribe(function (doc) {
            doc.forEach(function (element) {
              element['done'] = false;
              _this.foodList.push(element);
            });
          });
          this.paymentTypes = this.paymentTypesRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (change) {
            return change.map(function (a) {
              var data = a.payload.doc.data();
              data['id'] = a.payload.doc.id;
              return data;
            });
          }));
          this.orderForm.get('food').setValue(this.foodList);
          this.tickets = this.ticketsRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (change) {
            return change.map(function (a) {
              var tickets = a.payload.doc.data();
              tickets['id'] = a.payload.doc.id;
              return tickets;
            });
          }));
          this.generateQRDate();
        };
        PaymentCashComponent.prototype.paymentProcess = function () {
          var _this = this;
          this.paymentBtnDisabled = true;
          if (this.orderForm.valid) {
            this.db.collection('orders').add(this.orderForm.value).then(function (res) {
              _this.ticketSelectedId.used = true;
              _this.ticketsRef.doc(_this.ticketSelectedId.id).update(_this.ticketSelectedId).then(function () {
                console.log(_this.cartId);
                _this.cartRef.doc(_this.cartId).delete().then(function () {
                  _this.dialogRef.close('success');
                });
              });
            });
          }
          else {
            this.paymentBtnDisabled = false;
            return;
          }
        };
        PaymentCashComponent.prototype.checkPaymentCash = function (payment) {
          console.log(payment);
          if (payment == 'CASH') {
            this.showPaymentCash = '';
          }
          else {
            this.showPaymentCash = 'hidden';
          }
        };
        PaymentCashComponent.prototype.changeCalculation = function () {
          this.orderForm.get('change').setValue(this.orderForm.get('recieved').value - this.data.total);
        };
        PaymentCashComponent.prototype.padding = function (num, size) {
          var s = num + "";
          while (s.length < size)
            s = "0" + s;
          return s;
        };
        PaymentCashComponent.prototype.getTicketById = function (ticket) {
          return __awaiter(this, void 0, void 0, function () {
            var doc;
            var _this = this;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0: return [4 /*yield*/, this.db.collection('tickets', function (ref) {
                  return ref.where('ticket', '==', parseInt(ticket));
                }).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (change) {
                  return change.map(function (a) {
                    var data = a.payload.doc.data();
                    data['id'] = a.payload.doc.id;
                    return data;
                  });
                })).subscribe(function (t) {
                  t.forEach(function (_ticket) {
                    _this.ticketSelectedId = _ticket;
                  });
                })];
                case 1:
                  doc = _a.sent();
                  return [2 /*return*/];
              }
            });
          });
        };
        PaymentCashComponent.prototype.generateQRDate = function () {
          return __awaiter(this, void 0, void 0, function () {
            var _uuid1, _terminalId, _amount, _invoiceNumber, _description, urlFormat;
            return __generator(this, function (_a) {
              _uuid1 = uuid__WEBPACK_IMPORTED_MODULE_5__["v1"]();
              _terminalId = '000001';
              _amount = this.data.total;
              _invoiceNumber = this.padding(Math.floor(Math.random() * 10000000000) + 1, 12);
              _description = 'letterp-POS-transctions';
              this.orderForm.get('invoiceno').setValue(_invoiceNumber);
              urlFormat = '/?uuid=' + _uuid1 + '&tid=' + _terminalId + '&amount=' + _amount + '&invoiceId=' + _invoiceNumber + '&description=' + _description;
              return [2 /*return*/];
            });
          });
        };
        PaymentCashComponent = __decorate([
          Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-payment-cash',
            template: __webpack_require__(/*! ./payment-cash.component.html */ "./src/app/dialogs/payment-cash/payment-cash.component.html"),
            styles: [__webpack_require__(/*! ./payment-cash.component.css */ "./src/app/dialogs/payment-cash/payment-cash.component.css")]
          }),
          __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
          __metadata("design:paramtypes", [angularfire2_firestore__WEBPACK_IMPORTED_MODULE_1__["AngularFirestore"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
        ], PaymentCashComponent);
        return PaymentCashComponent;
      }());



      /***/
}),

/***/ "./src/app/dialogs/payment-types/payment-types.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/dialogs/payment-types/payment-types.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RpYWxvZ3MvcGF5bWVudC10eXBlcy9wYXltZW50LXR5cGVzLmNvbXBvbmVudC5jc3MifQ== */"

      /***/
}),

/***/ "./src/app/dialogs/payment-types/payment-types.component.html":
/*!********************************************************************!*\
  !*** ./src/app/dialogs/payment-types/payment-types.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "<h1 mat-dialog-title>ຊ່ອງທາງການຈ່າຍເງິນ</h1>\n<mat-dialog-content>\n  <form [formGroup]=\"paymentTypesForm\">\n    <div class=\"form-row\">\n      <div class=\"form-group col-md-6\">\n        <label for=\"paymentCode\">ລະຫັດ</label>\n        <input type=\"text\" class=\"form-control\" formControlName=\"paymentCode\" id=\"paymentCode\" required>\n      </div>\n      <div class=\"form-group col-md-6\">\n        <label for=\"paymentName\">ຊື່</label>\n        <input type=\"text\" class=\"form-control\" formControlName=\"paymentName\" id=\"paymentName\" required>\n      </div>\n      <div class=\"form-group col-md-6\">\n        <label for=\"paymentDescription\">ໝາຍເຫດ</label>\n        <input type=\"text\" class=\"form-control\" formControlName=\"paymentDescription\" id=\"paymentDescription\" required>\n      </div>\n      <div class=\"form-group col-md-6\">\n        <label for=\"bankAcquirer\">ທະນາຄານ</label>\n        <select id=\"bankAcquirer\" class=\"form-control\" formControlName=\"bankAcquirer\" required>\n          <option value=\"-1\" disabled>----------------</option>\n          <option *ngFor=\"let bank of banks | async\" value=\"{{ bank.bankCode }}\">{{ bank.bankName }}</option>\n        </select>\n      </div>\n      <div class=\"form-group col-md-6\">\n        <button mat-raised-button color=\"primary\" style=\"width: 100%;\" (click)=\"addPaymentType()\"\n          [disabled]=\"saveBtnDisabled\" class=\"btnSave\">ບັນທືກ</button>\n      </div>\n      <div class=\"form-group col-md-6\">\n        <button mat-raised-button color=\"warn\" style=\"width: 100%;\" (click)=\"updateItem()\"\n          [disabled]=\"updateBtnDisabled\" class=\"btnSave\">update</button>\n      </div>\n    </div>\n    <div class=\"row\">\n      <mat-divider></mat-divider>\n      <table class=\"table table-bordered\">\n        <thead class=\"thead-light\">\n          <tr>\n            <th scope=\"col\" class=\"text-center\">ລະຫັດ</th>\n            <th scope=\"col\" class=\"text-center\">ຊື່</th>\n            <th scope=\"col\" class=\"text-center\">ທະນາຄານ</th>\n            <th scope=\"col\" class=\"text-center\">ນຳໃຊ້</th>\n            <th scope=\"col\" class=\"text-center\">ລຶບ</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let paymentType of paymentTypes | async\">\n            <td class=\"text-left\" (click)=\"loadFormClick(paymentType)\">{{ paymentType.paymentCode }}</td>\n            <td class=\"text-left text-nowrap\" (click)=\"loadFormClick(paymentType)\">{{ paymentType.paymentName }}</td>\n            <td class=\"text-left text-nowrap\" (click)=\"loadFormClick(paymentType)\">{{ paymentType.bankAcquirer }}</td>\n            <td class=\"text-center\" *ngIf=\"paymentType.enabled ; else disabled\">\n              <img src=\"../../../assets/icons/baseline-check_circle_outline-24px.svg\" style=\"cursor: pointer;\">\n            </td>\n            <ng-template #disabled><img src=\"../../../assets/icons/baseline-radio_button_unchecked-24px.svg\"\n                style=\"cursor: pointer;\">\n            </ng-template>\n            <td class=\"text-center\">\n              <img src=\"../../../assets/icons/baseline-delete-24px.svg\" style=\"cursor: pointer;\"\n                (click)=\"removeItem(paymentType)\">\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </form>\n</mat-dialog-content>\n"

      /***/
}),

/***/ "./src/app/dialogs/payment-types/payment-types.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/dialogs/payment-types/payment-types.component.ts ***!
  \******************************************************************/
/*! exports provided: PaymentTypesComponent */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentTypesComponent", function () { return PaymentTypesComponent; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angularfire2/firestore */ "./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angularfire2_firestore__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
      var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
      };





      var PaymentTypesComponent = /** @class */ (function () {
        function PaymentTypesComponent(db, dialogRef, snackbar) {
          this.db = db;
          this.dialogRef = dialogRef;
          this.snackbar = snackbar;
          this.saveBtnDisabled = false;
          this.updateBtnDisabled = false;
          this.banksRef = db.collection('banks', function (ref) {
            return ref.where('enabled', '==', true);
          });
          this.paymentTypesRef = db.collection('paymentTypes');
        }
        PaymentTypesComponent.prototype.ngOnInit = function () {
          this.paymentTypesForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            id: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](),
            paymentCode: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](),
            paymentName: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](),
            paymentDescription: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](),
            bankAcquirer: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](),
            bank: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](),
            enabled: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](true),
          });
          this.banks = this.banksRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (change) {
            return change.map(function (a) {
              var banks = a.payload.doc.data();
              banks['id'] = a.payload.doc.id;
              return banks;
            });
          }));
          this.paymentTypes = this.paymentTypesRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (change) {
            return change.map(function (a) {
              var paymentTypes = a.payload.doc.data();
              paymentTypes['id'] = a.payload.doc.id;
              return paymentTypes;
            });
          }));
          this.updateBtnDisabled = true;
        };
        PaymentTypesComponent.prototype.addPaymentType = function () {
          var _this = this;
          //console.log(this.paymentTypesForm.value);
          var c = this.db.collection('banks', function (ref) {
            return ref.where('bankCode', '==', _this.paymentTypesForm.get('bankAcquirer').value);
          }).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (change) {
            return change.map(function (a) {
              var b = a.payload.doc.data();
              b['id'] = a.payload.doc.id;
              return b;
            });
          })).subscribe(function (bank) {
            bank.forEach(function (b) {
              _this.paymentTypesForm.get('bank').setValue(b);
            });
            if (_this.paymentTypesForm.valid && _this.paymentTypesForm.get('bank').value) {
              _this.db.collection('paymentTypes').add(_this.paymentTypesForm.value).then(function () {
                _this.snackbar.open('Payment added', 'Ok', { duration: 1000, verticalPosition: 'top' });
                _this.paymentTypesForm.reset();
              }).catch(function (err) {
                _this.snackbar.open(err, 'Ok', { duration: 1000, verticalPosition: 'top' });
              });
            }
            else {
              _this.snackbar.open('Form invalid', 'Ok', { duration: 1000, verticalPosition: 'top' });
            }
          });
        };
        PaymentTypesComponent.prototype.removeItem = function (paymentType) {
          var _this = this;
          if (paymentType) {
            this.paymentTypesRef.doc(paymentType.id).delete().then(function () {
              _this.snackbar.open('Deleted success', 'Ok', { duration: 1000, verticalPosition: 'top' });
            });
          }
        };
        PaymentTypesComponent.prototype.updateItem = function () {
          var _this = this;
          if (this.paymentTypesForm.valid) {
            this.paymentTypesRef.doc(this.paymentTypesForm.get('id').value).update(this.paymentTypesForm.value).then(function () {
              _this.snackbar.open('Update success', 'Ok', { duration: 1000, verticalPosition: 'top' });
              _this.paymentTypesForm.reset();
              _this.updateBtnDisabled = true;
              _this.saveBtnDisabled = false;
            });
          }
        };
        PaymentTypesComponent.prototype.loadFormClick = function (paymentType) {
          this.paymentTypesForm.setValue(paymentType);
          this.saveBtnDisabled = true;
          this.updateBtnDisabled = false;
        };
        PaymentTypesComponent = __decorate([
          Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"])({
            selector: 'app-payment-types',
            template: __webpack_require__(/*! ./payment-types.component.html */ "./src/app/dialogs/payment-types/payment-types.component.html"),
            styles: [__webpack_require__(/*! ./payment-types.component.css */ "./src/app/dialogs/payment-types/payment-types.component.css")]
          }),
          __metadata("design:paramtypes", [angularfire2_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"]])
        ], PaymentTypesComponent);
        return PaymentTypesComponent;
      }());



      /***/
}),

/***/ "./src/app/dialogs/subfoods/subfoods.component.css":
/*!*********************************************************!*\
  !*** ./src/app/dialogs/subfoods/subfoods.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "* {\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif, 'phetsarath ot';\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGlhbG9ncy9zdWJmb29kcy9zdWJmb29kcy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsOEVBQThFO0NBQy9FIiwiZmlsZSI6InNyYy9hcHAvZGlhbG9ncy9zdWJmb29kcy9zdWJmb29kcy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiKiB7XG4gIGZvbnQtZmFtaWx5OiAnU2Vnb2UgVUknLCBUYWhvbWEsIEdlbmV2YSwgVmVyZGFuYSwgc2Fucy1zZXJpZiwgJ3BoZXRzYXJhdGggb3QnO1xufVxuIl19 */"

      /***/
}),

/***/ "./src/app/dialogs/subfoods/subfoods.component.html":
/*!**********************************************************!*\
  !*** ./src/app/dialogs/subfoods/subfoods.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "<h1 mat-dialog-title class=\"text-center\">ເລືອກອາຫານ</h1>\n\n<form [formGroup]=\"subFoodsForm\">\n  <mat-card>\n    <mat-card-content>\n      <div class=\"form-row\">\n        <div class=\"form-group col-md-6\">\n          <label for=\"subFood\">ປະເພດອາຫານຍ່ອຍ</label>\n          <select class=\"form-control\" id=\"subFood\" formControlName=\"subFood\" (change)=\"selectedFood($event.target.value)\"\n            required>\n            <option *ngFor=\"let subFood of extendedFoodList\" value=\"{{ subFood.extendedFoodName }}\">{{\n              subFood.extendedFoodName }}</option>\n          </select>\n        </div>\n        <div class=\"form-group col-md-6\">\n          <label for=\"quantity\">ຈຳນວນ</label>\n          <input type=\"number\" step=\"1\" class=\"form-control text-right\" formControlName=\"quantity\" required>\n        </div>\n\n      </div>\n    </mat-card-content>\n    <mat-card-footer>\n      <div class=\"form-group col-md-12\">\n        <button mat-flat-button color=\"primary\" style=\"width: 100%;\" (click)=\"addFood()\" [disabled]=\"btnDisable\">ເລືອກ</button>\n      </div>\n    </mat-card-footer>\n  </mat-card>\n\n</form>\n"

      /***/
}),

/***/ "./src/app/dialogs/subfoods/subfoods.component.ts":
/*!********************************************************!*\
  !*** ./src/app/dialogs/subfoods/subfoods.component.ts ***!
  \********************************************************/
/*! exports provided: SubfoodsComponent */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubfoodsComponent", function () { return SubfoodsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angularfire2/firestore */ "./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angularfire2_firestore__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
      var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
      };
      var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
      };




      var SubfoodsComponent = /** @class */ (function () {
        function SubfoodsComponent(db, dialogRef, data, snackbar) {
          this.db = db;
          this.dialogRef = dialogRef;
          this.data = data;
          this.snackbar = snackbar;
          this.btnDisable = false;
          this.username = 'administrator';
          this.foodsRef = db.collection('foods', function (ref) {
            return ref.where('id', '==', data.id);
          });
        }
        SubfoodsComponent.prototype.ngOnInit = function () {
          // load food data
          /*
          this.foods = this.foodsRef.snapshotChanges().pipe(map(change => {
            return change.map(a => {
              const data = a.payload.doc.data();
              data['id'] = a.payload.doc.id;
              return data;
            });
          }));
          */
          console.log(this.data);
          this.subFoodsForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            'id': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](this.data.id),
            'food': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](this.data.food_name),
            'subFood': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](),
            'price': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](0),
            'quantity': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](1),
            'total': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](0),
            'username': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](this.username),
          });
          this.extendedFoodList = this.data.extendedFoods;
        };
        SubfoodsComponent.prototype.selectedFood = function (event) {
          var _this = this;
          this.extendedFoodList.forEach(function (element) {
            if (element.extendedFoodName == event) {
              _this.subFoodsForm.get('subFood').setValue(element.extendedFoodName);
              _this.subFoodsForm.get('price').setValue(element.price);
            }
          });
        };
        SubfoodsComponent.prototype.addFood = function () {
          if (this.subFoodsForm.valid) {
            this.btnDisable = true;
            this.subFoodsForm.get('total').setValue(this.subFoodsForm.get('price').value * this.subFoodsForm.get('quantity').value);
            this.dialogRef.close(this.subFoodsForm.value);
          }
          else {
            this.snackbar.open('Data incomplete please check!', 'Fails', { duration: 1000, verticalPosition: 'top' });
          }
        };
        SubfoodsComponent = __decorate([
          Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-subfoods',
            template: __webpack_require__(/*! ./subfoods.component.html */ "./src/app/dialogs/subfoods/subfoods.component.html"),
            styles: [__webpack_require__(/*! ./subfoods.component.css */ "./src/app/dialogs/subfoods/subfoods.component.css")]
          }),
          __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
          __metadata("design:paramtypes", [angularfire2_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object, _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"]])
        ], SubfoodsComponent);
        return SubfoodsComponent;
      }());



      /***/
}),

/***/ "./src/app/dialogs/tickets/tickets.component.css":
/*!*******************************************************!*\
  !*** ./src/app/dialogs/tickets/tickets.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = ".listDiv {\n  max-height: 200px;\n  overflow: auto;\n}\ntbody {\n  height: 200px;\n  overflow-y: auto;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGlhbG9ncy90aWNrZXRzL3RpY2tldHMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFrQjtFQUNsQixlQUFlO0NBQ2hCO0FBQ0Q7RUFDRSxjQUFjO0VBQ2QsaUJBQWlCO0NBQ2xCIiwiZmlsZSI6InNyYy9hcHAvZGlhbG9ncy90aWNrZXRzL3RpY2tldHMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5saXN0RGl2IHtcbiAgbWF4LWhlaWdodDogMjAwcHg7XG4gIG92ZXJmbG93OiBhdXRvO1xufVxudGJvZHkge1xuICBoZWlnaHQ6IDIwMHB4O1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuIl19 */"

      /***/
}),

/***/ "./src/app/dialogs/tickets/tickets.component.html":
/*!********************************************************!*\
  !*** ./src/app/dialogs/tickets/tickets.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "<p>\n  All Tickets\n</p>\n<form [formGroup]=\"ticketForm\">\n  <div class=\"form-row\">\n    <div class=\"form-group col-md-10\">\n      <label for=\"subFood\">Ticket</label>\n      <input type=\"number\" class=\"form-control\" required formControlName=\"ticket\">\n    </div>\n    <div class=\"form-group col-md-2\">\n      <label for=\"subFood\">Ticket</label>\n      <button mat-flat-button color=\"primary\" style=\"width: 100%;\" (click)=\"addNewTicket()\">ເລືອກ</button>\n    </div>\n  </div>\n</form>\n<mat-card>\n  <mat-card-content>\n    <mat-divider></mat-divider>\n    <div class=\"table-responsive\" style=\"max-height: 200px;\">\n      <table class=\"table table-bordered\">\n        <thead class=\"thead-light\">\n          <tr>\n            <th scope=\"col\" class=\"text-center\">Ticket</th>\n            <th scope=\"col\" class=\"text-center\">Enabled</th>\n            <th scope=\"col\" class=\"text-center\">Remove</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let ticket of tickets |async\">\n            <td class=\"text-left\">{{ ticket.ticket }}</td>\n            <td class=\"text-center\" *ngIf=\"ticket.used == false ; else usedTicket\">\n              <img src=\"../../../assets/icons/baseline-check_circle_outline-24px.svg\" style=\"cursor: pointer;\">\n            </td>\n            <ng-template #usedTicket>\n              <td class=\"text-center\">\n                <img src=\"../../../assets/icons/256-256-ec140ce32ea8619e2b1dce4fad3b0d48-cross.png\"\n                  style=\"width: 25px;cursor: pointer;\">\n              </td>\n\n            </ng-template>\n            <td class=\"text-center\">\n              <img src=\"../../../assets/icons/baseline-delete-24px.svg\" style=\"width: 25px;cursor: pointer;\">\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n  </mat-card-content>\n</mat-card>\n"

      /***/
}),

/***/ "./src/app/dialogs/tickets/tickets.component.ts":
/*!******************************************************!*\
  !*** ./src/app/dialogs/tickets/tickets.component.ts ***!
  \******************************************************/
/*! exports provided: TicketsComponent */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TicketsComponent", function () { return TicketsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angularfire2/firestore */ "./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angularfire2_firestore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
      var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
      };





      var TicketsComponent = /** @class */ (function () {
        function TicketsComponent(db, dialogRef) {
          this.db = db;
          this.dialogRef = dialogRef;
          this.ticketsRef = db.collection('tickets', function (ref) {
            return ref.orderBy('ticket', 'asc');
          });
        }
        TicketsComponent.prototype.ngOnInit = function () {
          this.ticketForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroup"]({
            'ticket': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](),
            'used': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](false),
          });
          this.tickets = this.ticketsRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (change) {
            return change.map(function (a) {
              var tickets = a.payload.doc.data();
              tickets['id'] = a.payload.doc.id;
              return tickets;
            });
          }));
        };
        TicketsComponent.prototype.addNewTicket = function () {
          if (this.ticketForm.valid) {
            this.db.collection('tickets').add(this.ticketForm.value).then(function () {
            });
          }
        };
        TicketsComponent = __decorate([
          Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tickets',
            template: __webpack_require__(/*! ./tickets.component.html */ "./src/app/dialogs/tickets/tickets.component.html"),
            styles: [__webpack_require__(/*! ./tickets.component.css */ "./src/app/dialogs/tickets/tickets.component.css")]
          }),
          __metadata("design:paramtypes", [angularfire2_firestore__WEBPACK_IMPORTED_MODULE_1__["AngularFirestore"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"]])
        ], TicketsComponent);
        return TicketsComponent;
      }());



      /***/
}),

/***/ "./src/app/dialogs/view-extended-food/view-extended-food.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/dialogs/view-extended-food/view-extended-food.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RpYWxvZ3Mvdmlldy1leHRlbmRlZC1mb29kL3ZpZXctZXh0ZW5kZWQtZm9vZC5jb21wb25lbnQuY3NzIn0= */"

      /***/
}),

/***/ "./src/app/dialogs/view-extended-food/view-extended-food.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/dialogs/view-extended-food/view-extended-food.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "<p class=\"h4\">\n  ເພີ່ມອາຫານ {{ data.food_name }}\n</p>\n<form [formGroup]=\"formAddSubFood\">\n  <mat-card>\n    <mat-card-content>\n      <div class=\"form-row\">\n        <div class=\"form-group col-md-2\">\n          <label for=\"extendedFoodName\">ປະເພດອາຫານຍ່ອຍ</label>\n          <select class=\"form-control\" id=\"extendedFoodName\" formControlName=\"extendedFoodName\">\n            <option *ngFor=\"let extendedFoodType of extendedFoodTypes | async\"\n              value=\"{{ extendedFoodType.extendedFoodName_lao }}\">{{ extendedFoodType.extendedFoodName_lao }}</option>\n          </select>\n        </div>\n        <div class=\"form-group col-md-2\">\n          <label for=\"cost\">ຕົ້ນທຶນ</label>\n          <input type=\"number\" class=\"form-control text-right\" formControlName=\"cost\">\n        </div>\n        <div class=\"form-group col-md-2\">\n          <label for=\"price\">ລາຄາຂາຍ</label>\n          <input type=\"number\" class=\"form-control text-right\" formControlName=\"price\">\n        </div>\n        <div class=\"form-group col-md-4\">\n          <label for=\"notetxt\">ໝາຍເຫດ</label>\n          <input type=\"text\" class=\"form-control\" id=\"notetxt\" formControlName=\"noted\">\n        </div>\n        <div class=\"form-group col-md-2\">\n          <label for=\"addBtn\">ເພີ່ມ</label>\n          <button mat-flat-button color=\"primary\" class=\"form-control\" id=\"addBtn\"\n            (click)=\"addExtendedFoodToMaster()\">Add</button>\n        </div>\n      </div>\n    </mat-card-content>\n  </mat-card>\n  <mat-card>\n    <mat-card-content>\n      <table class=\"table table-bordered table-hover\">\n        <thead class=\"thead-light\">\n          <tr>\n            <th scope=\"col\" class=\"text-center\">ອາຫານ</th>\n            <th scope=\"col\" class=\"text-center\">ຕົ້ນທຶນ</th>\n            <th scope=\"col\" class=\"text-center\">ລາຄາຂາຍ</th>\n            <th scope=\"col\" class=\"text-center\">ໝາຍເຫດ</th>\n            <th scope=\"col\" class=\"text-center\"></th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let extendedFoodList of extendedFoodLists\">\n            <td class=\"text-left\" (click)=\"updateFood(extendedFoodList)\">{{ extendedFoodList.extendedFoodName }}</td>\n            <td class=\"text-right\">{{ extendedFoodList.cost |number }}</td>\n            <td class=\"text-right\">{{ extendedFoodList.price | number}}</td>\n            <td class=\"text-left\">{{ extendedFoodList.noted }}</td>\n            <td class=\"text-center\"><img src=\"../../../assets/icons/baseline-delete-24px.svg\" style=\"cursor: pointer\"\n                (click)=\"removeitem(extendedFoodList)\"></td>\n          </tr>\n        </tbody>\n        <tfoot>\n          <tr>\n            <td colspan=\"5\"></td>\n          </tr>\n        </tfoot>\n      </table>\n    </mat-card-content>\n    <mat-card-footer>\n    </mat-card-footer>\n  </mat-card>\n</form>\n"

      /***/
}),

/***/ "./src/app/dialogs/view-extended-food/view-extended-food.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/dialogs/view-extended-food/view-extended-food.component.ts ***!
  \****************************************************************************/
/*! exports provided: ViewExtendedFoodComponent */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewExtendedFoodComponent", function () { return ViewExtendedFoodComponent; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angularfire2/firestore */ "./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angularfire2_firestore__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
      var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
      };
      var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
      };





      var ViewExtendedFoodComponent = /** @class */ (function () {
        function ViewExtendedFoodComponent(db, dialogRef, snackbarRef, data) {
          this.db = db;
          this.dialogRef = dialogRef;
          this.snackbarRef = snackbarRef;
          this.data = data;
          this.extendedFoodLists = [];
          this.extendedFoodTypesRef = db.collection('extendedFoodTypes');
          this.FoodsRef = db.collection('foods');
        }
        ViewExtendedFoodComponent.prototype.ngOnInit = function () {
          console.log(this.data);
          this.formAddSubFood = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            'extendedFoodName': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
            'cost': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](0),
            'price': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](0),
            'noted': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
          });
          this.extendedFoodTypes = this.extendedFoodTypesRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (change) {
            return change.map(function (a) {
              var data = a.payload.doc.data();
              data['id'] = a.payload.doc.id;
              return data;
            });
          }));
          this.extendedFoodLists = this.data.extendedFoods;
        };
        ViewExtendedFoodComponent.prototype.updateFood = function (food) {
          this.formAddSubFood.setValue(food);
        };
        ViewExtendedFoodComponent.prototype.removeExtenedFoodList = function (extendedFoodList) {
        };
        ViewExtendedFoodComponent.prototype.addExtendedFoodToMaster = function () {
          var _this = this;
          this.extendedFoodLists.push(this.formAddSubFood.value);
          if (this.extendedFoodLists) {
            var extendedFoods = {
              extendedFoods: this.extendedFoodLists
            };
            this.FoodsRef.doc(this.data.id).update(extendedFoods).then(function () {
              //this.dialogRef.close('success');
              _this.snackbarRef.open('added complete', 'Ok', { duration: 1000 });
            }).catch(function (err) {
              _this.snackbarRef.open(err, 'Fail', { duration: 1000 });
              return;
            });
          }
          else {
            this.snackbarRef.open('Some value required not complete', 'Fail', { duration: 1000 });
            return;
          }
        };
        ViewExtendedFoodComponent.prototype.addExtendedFood = function () {
          this.extendedFoodLists.push(this.formAddSubFood.value);
        };
        ViewExtendedFoodComponent.prototype.removeitem = function (doc) {
          var _this = this;
          this.extendedFoodLists.forEach(function (item, index) {
            if (item.extendedFoodName === doc.extendedFoodName) {
              _this.extendedFoodLists.splice(index, 1);
            }
          });
          var extendedFoods = {
            extendedFoods: this.extendedFoodLists
          };
          this.FoodsRef.doc(this.data.id).update(extendedFoods).then(function () {
            //this.dialogRef.close('success');
            _this.snackbarRef.open('removed complete', 'Ok', { duration: 1000 });
          }).catch(function (err) {
            _this.snackbarRef.open(err, 'Fail', { duration: 1000 });
            return;
          });
        };
        ViewExtendedFoodComponent = __decorate([
          Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-view-extended-food',
            template: __webpack_require__(/*! ./view-extended-food.component.html */ "./src/app/dialogs/view-extended-food/view-extended-food.component.html"),
            styles: [__webpack_require__(/*! ./view-extended-food.component.css */ "./src/app/dialogs/view-extended-food/view-extended-food.component.css")]
          }),
          __param(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"])),
          __metadata("design:paramtypes", [angularfire2_firestore__WEBPACK_IMPORTED_MODULE_3__["AngularFirestore"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSnackBar"], Object])
        ], ViewExtendedFoodComponent);
        return ViewExtendedFoodComponent;
      }());



      /***/
}),

/***/ "./src/app/dialogs/view-food/view-food.component.css":
/*!***********************************************************!*\
  !*** ./src/app/dialogs/view-food/view-food.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = ".photoDiv {\n  position: relative;\n  max-width: 240px;\n  margin-top: 25px;\n  border-radius: 5px;\n}\n.hidden {\n  display: none;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGlhbG9ncy92aWV3LWZvb2Qvdmlldy1mb29kLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLGlCQUFpQjtFQUNqQixtQkFBbUI7Q0FDcEI7QUFDRDtFQUNFLGNBQWM7Q0FDZiIsImZpbGUiOiJzcmMvYXBwL2RpYWxvZ3Mvdmlldy1mb29kL3ZpZXctZm9vZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnBob3RvRGl2IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXgtd2lkdGg6IDI0MHB4O1xuICBtYXJnaW4tdG9wOiAyNXB4O1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG4uaGlkZGVuIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbiJdfQ== */"

      /***/
}),

/***/ "./src/app/dialogs/view-food/view-food.component.html":
/*!************************************************************!*\
  !*** ./src/app/dialogs/view-food/view-food.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "<h1 mat-dialog-title>ອາຫານ</h1>\n<form [formGroup]=\"addFoodForm\">\n  <div class=\"row\">\n    <div class=\"col col-md-4\">\n      <img [src]=\"photoSrc\" (click)=\"fileinput.click()\" class=\"photoDiv shadow p-3 mb-5 bg-white\">\n      <input type=\"file\" (change)=\"uploadPhoto($event.target.files)\" #fileinput style=\"display: none;\">\n      <mat-progress-bar color=\"primary\" mode=\"determinate\" [value]=\"progressBarValue\">\n      </mat-progress-bar>\n    </div>\n    <div class=\"col col-md-8\">\n      <div class=\"form-row\">\n        <div class=\"form-group col-md-6\">\n          <label for=\"foodId\">ລະຫັດອາຫານ</label>\n          <input type=\"text\" class=\"form-control\" id=\"foodId\" readonly formControlName=\"foodId\" required>\n        </div>\n        <div class=\"form-group col-md-6\">\n          <label for=\"food_name\">ອາຫານ</label>\n          <input type=\"text\" class=\"form-control\" id=\"food_name\" formControlName=\"food_name\" required>\n        </div>\n        <div class=\"form-group col-md-6\">\n          <label for=\"food_name_en\">ອາຫານ ພາສາອັງກິດ</label>\n          <input type=\"text\" class=\"form-control\" id=\"food_name_en\" formControlName=\"food_name_en\" required>\n        </div>\n        <div class=\"form-group col-md-6\">\n          <label for=\"food_category\">ຈັດໃນໝວດ</label>\n          <select class=\"form-control\" id=\"food_category\" required formControlName=\"food_category\">\n            <option value=\"\" disabled>-----------</option>\n            <option *ngFor=\"let c of categories |async\" value=\"{{ c.foodCategoryNameLao }}\">{{ c.foodCategoryNameLao }}\n            </option>\n          </select>\n        </div>\n        <div class=\"form-group col-md-6\">\n          <label for=\"kitchenName\">ຫ້ອງຄົວ</label>\n          <select class=\"form-control\" id=\"kitchenName\" required formControlName=\"kitchen\">\n            <option value=\"\" disabled>-----------</option>\n            <option *ngFor=\"let k of kitchens |async\" value=\"{{ k.kitchenName }}\">{{ k.kitchenName }}</option>\n          </select>\n        </div>\n        <div class=\"form-group col-md-6\">\n          <label for=\"cost\">ຕົ້ນທືນ</label>\n          <input type=\"number\" class=\"form-control\" id=\"cost\" formControlName=\"cost\" required>\n        </div>\n        <div class=\"form-group col-md-6\">\n          <label for=\"price\">ລາຄາຂາຍ</label>\n          <input type=\"number\" class=\"form-control\" id=\"price\" formControlName=\"price\" required>\n        </div>\n        <div class=\"form-group col-md-6\">\n          <label for=\"currency\">ສະກູນ</label>\n          <select class=\"form-control\" id=\"currency\" required formControlName=\"currency\">\n            <option *ngFor=\"let c of Currencies |async\" value=\"{{ c.currencyName }}\">{{ c.currencyName }}</option>\n          </select>\n        </div>\n        <div class=\"form-group col-md-6\">\n          <label for=\"parent_food\">ປະເພດ</label>\n          <select class=\"form-control\" id=\"parent_food\" required formControlName=\"parent_food\">\n            <option value=\"common\">common</option>\n            <option value=\"master\">master</option>\n          </select>\n        </div>\n        <div class=\"form-group col-md-6\">\n          <label for=\"noted\">ໝາຍເຫດ</label>\n          <input type=\"text\" class=\"form-control\" id=\"noted\" formControlName=\"noted\">\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col col-md-12\">\n          <button mat-raised-button color=\"primary\" (click)=\"updateFood()\" [disabled]=\"saveDisabled\"\n            style=\"width: 100%;\">Update</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</form>\n"

      /***/
}),

/***/ "./src/app/dialogs/view-food/view-food.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/dialogs/view-food/view-food.component.ts ***!
  \**********************************************************/
/*! exports provided: ViewFoodComponent */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewFoodComponent", function () { return ViewFoodComponent; });
/* harmony import */ var angularfire2_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angularfire2/storage */ "./node_modules/angularfire2/storage/index.js");
/* harmony import */ var angularfire2_storage__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angularfire2_storage__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angularfire2/firestore */ "./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angularfire2_firestore__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
      var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
      };
      var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
      };





      var ViewFoodComponent = /** @class */ (function () {
        function ViewFoodComponent(db, dialogRef, storage, data) {
          this.db = db;
          this.dialogRef = dialogRef;
          this.storage = storage;
          this.data = data;
          this.photoSrc = "../../../assets/images/icons/search.svg";
          this.saveDisabled = false;
          this.currenciesRef = db.collection('currencies');
          this.kitchensRef = db.collection('kitchens');
          this.categoriesRef = db.collection('food_categories');
          this.foodsRef = db.collection('foods');
        }
        ViewFoodComponent.prototype.ngOnInit = function () {
          this.addFoodForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            id: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
            foodId: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
            food_name: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
            food_name_en: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
            food_photo: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
            food_category: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
            cost: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](0),
            price: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](0),
            currency: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('KIP'),
            parent_food: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](false),
            is_childFood: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](false),
            kitchen: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
            userName: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('administrator'),
            enabled: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](true),
            createdAt: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](new Date()),
            updatedAt: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](new Date()),
            extendedFoods: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
            noted: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](),
          });
          // Load startup
          this.Currencies = this.currenciesRef.valueChanges();
          this.kitchens = this.kitchensRef.valueChanges();
          this.categories = this.categoriesRef.valueChanges();
          this.photoSrc = this.data.food_photo;
          this.addFoodForm.setValue(this.data);
        };
        ViewFoodComponent.prototype.uploadPhoto = function (event) {
          var _this = this;
          var selectedFiles;
          selectedFiles = event;
          if (selectedFiles.item(0)) {
            var file = selectedFiles.item(0);
            var uniqkey = 'pic' + Math.floor(Math.random() * 1000000);
            var uploadTask = this.storage.upload('/foods/' + uniqkey, file);
            uploadTask.percentageChanges().subscribe(function (value) {
              _this.progressBarValue = value.toFixed(2);
            });
            uploadTask.then(function (snapshot) {
              snapshot.ref.getDownloadURL().then(function (url) {
                _this.photoSrc = url; // Image url
                //console.log(url);
              });
            });
          }
        };
        ViewFoodComponent.prototype.updateFood = function () {
          this.saveDisabled = true;
          if (this.addFoodForm.valid) {
            this.addFoodForm.get('food_photo').setValue(this.photoSrc);
            this.db.collection('foods').doc(this.data.id).update(this.addFoodForm.value);
            this.dialogRef.close('success');
          }
          else {
            this.saveDisabled = false;
            return;
          }
        };
        ViewFoodComponent = __decorate([
          Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"])({
            selector: 'app-view-food',
            template: __webpack_require__(/*! ./view-food.component.html */ "./src/app/dialogs/view-food/view-food.component.html"),
            styles: [__webpack_require__(/*! ./view-food.component.css */ "./src/app/dialogs/view-food/view-food.component.css")]
          }),
          __param(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
          __metadata("design:paramtypes", [angularfire2_firestore__WEBPACK_IMPORTED_MODULE_3__["AngularFirestore"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], angularfire2_storage__WEBPACK_IMPORTED_MODULE_0__["AngularFireStorage"], Object])
        ], ViewFoodComponent);
        return ViewFoodComponent;
      }());



      /***/
}),

/***/ "./src/app/layouts/navbar/navbar.component.css":
/*!*****************************************************!*\
  !*** ./src/app/layouts/navbar/navbar.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = ".example-icon {\n  padding: 0 14px;\n}\n\n.example-spacer {\n  flex: 1 1 auto;\n}\n\n.matbtn {\n  margin-left: 5px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0cy9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBZ0I7Q0FDakI7O0FBRUQ7RUFDRSxlQUFlO0NBQ2hCOztBQUNEO0VBQ0UsaUJBQWlCO0NBQ2xCIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0cy9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZXhhbXBsZS1pY29uIHtcbiAgcGFkZGluZzogMCAxNHB4O1xufVxuXG4uZXhhbXBsZS1zcGFjZXIge1xuICBmbGV4OiAxIDEgYXV0bztcbn1cbi5tYXRidG4ge1xuICBtYXJnaW4tbGVmdDogNXB4O1xufVxuIl19 */"

      /***/
}),

/***/ "./src/app/layouts/navbar/navbar.component.html":
/*!******************************************************!*\
  !*** ./src/app/layouts/navbar/navbar.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "<div class=\"topbar-Container\">\n  <mat-toolbar color=\"primary\">\n    <mat-toolbar-row>\n      <span *ngFor=\"let RestaurantInfo of RestaurantInfos | async\">{{ RestaurantInfo.restaurantName }} {{\n      RestaurantInfo.slogan }} </span>\n      <span class=\"example-spacer\"></span>\n      <button mat-flat-button color=\"primary\" class=\"matbtn\" *ngFor=\"let menu of menus |async\"\n        routerLink=\"{{ menu.menuLink }}\">{{\n      menu.menuName }}</button>\n    </mat-toolbar-row>\n  </mat-toolbar>\n</div>\n"

      /***/
}),

/***/ "./src/app/layouts/navbar/navbar.component.ts":
/*!****************************************************!*\
  !*** ./src/app/layouts/navbar/navbar.component.ts ***!
  \****************************************************/
/*! exports provided: NavbarComponent */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function () { return NavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
      var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
      };


      var NavbarComponent = /** @class */ (function () {
        function NavbarComponent(db) {
          this.db = db;
          this.title = "Letter'P restaurant";
          this.menusRef = db.collection('webmenus', function (ref) {
            return ref.orderBy('menuId', 'asc');
          });
          this.restaurantInfoRef = db.collection('restaurant_info');
        }
        NavbarComponent.prototype.ngOnInit = function () {
          this.menus = this.menusRef.valueChanges();
          this.RestaurantInfos = this.restaurantInfoRef.valueChanges();
        };
        NavbarComponent = __decorate([
          Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/layouts/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.css */ "./src/app/layouts/navbar/navbar.component.css")]
          }),
          __metadata("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_1__["AngularFirestore"]])
        ], NavbarComponent);
        return NavbarComponent;
      }());



      /***/
}),

/***/ "./src/app/pages/dashboard/dashboard.component.css":
/*!*********************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = ".example-header-image {\n  background-image: url('baseline-dashboard-24px.svg');\n  background-size: cover;\n}\n.card-status {\n  width: 300px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UscURBQTJFO0VBQzNFLHVCQUF1QjtDQUN4QjtBQUNEO0VBQ0UsYUFBYTtDQUNkIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmV4YW1wbGUtaGVhZGVyLWltYWdlIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuLi8uLi8uLi9hc3NldHMvaWNvbnMvYmFzZWxpbmUtZGFzaGJvYXJkLTI0cHguc3ZnJyk7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG59XG4uY2FyZC1zdGF0dXMge1xuICB3aWR0aDogMzAwcHg7XG59XG4iXX0= */"

      /***/
}),

/***/ "./src/app/pages/dashboard/dashboard.component.html":
/*!**********************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "<mat-card>\n  <mat-card-header>\n    <div mat-card-avatar class=\"example-header-image\"></div>\n    <mat-card-title>Dashboard</mat-card-title>\n    <mat-card-subtitle>Summary all Status</mat-card-subtitle>\n  </mat-card-header>\n  <mat-card-content>\n\n  </mat-card-content>\n</mat-card>\n"

      /***/
}),

/***/ "./src/app/pages/dashboard/dashboard.component.ts":
/*!********************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.component.ts ***!
  \********************************************************/
/*! exports provided: DashboardComponent */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function () { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
      var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
      };

      var DashboardComponent = /** @class */ (function () {
        function DashboardComponent() {
        }
        DashboardComponent.prototype.ngOnInit = function () {
        };
        DashboardComponent = __decorate([
          Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/pages/dashboard/dashboard.component.html"),
            styles: [__webpack_require__(/*! ./dashboard.component.css */ "./src/app/pages/dashboard/dashboard.component.css")]
          }),
          __metadata("design:paramtypes", [])
        ], DashboardComponent);
        return DashboardComponent;
      }());



      /***/
}),

/***/ "./src/app/pages/foods/foods.component.css":
/*!*************************************************!*\
  !*** ./src/app/pages/foods/foods.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = ".example-header-image {\n\n  background-image: url('baseline-fastfood-24px.svg');\n  background-size: cover;\n}\n.spaceDiv {\n  margin-left: 5px;\n}\n.table {\n  border-radius: 2px;\n}\n.product_detail {\n  margin-top: 10px;\n}\n.foodPhoto {\n  margin: 0;\n  border-radius: 5px;\n  max-width: 100px;\n}\n.topDiv {\nmargin-top: 50px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvZm9vZHMvZm9vZHMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7RUFFRSxvREFBMEU7RUFDMUUsdUJBQXVCO0NBQ3hCO0FBQ0Q7RUFDRSxpQkFBaUI7Q0FDbEI7QUFDRDtFQUNFLG1CQUFtQjtDQUNwQjtBQUNEO0VBQ0UsaUJBQWlCO0NBQ2xCO0FBQ0Q7RUFDRSxVQUFVO0VBQ1YsbUJBQW1CO0VBQ25CLGlCQUFpQjtDQUNsQjtBQUNEO0FBQ0EsaUJBQWlCO0NBQ2hCIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvZm9vZHMvZm9vZHMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5leGFtcGxlLWhlYWRlci1pbWFnZSB7XG5cbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuLi8uLi8uLi9hc3NldHMvaWNvbnMvYmFzZWxpbmUtZmFzdGZvb2QtMjRweC5zdmcnKTtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3Zlcjtcbn1cbi5zcGFjZURpdiB7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG59XG4udGFibGUge1xuICBib3JkZXItcmFkaXVzOiAycHg7XG59XG4ucHJvZHVjdF9kZXRhaWwge1xuICBtYXJnaW4tdG9wOiAxMHB4O1xufVxuLmZvb2RQaG90byB7XG4gIG1hcmdpbjogMDtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBtYXgtd2lkdGg6IDEwMHB4O1xufVxuLnRvcERpdiB7XG5tYXJnaW4tdG9wOiA1MHB4O1xufVxuIl19 */"

      /***/
}),

/***/ "./src/app/pages/foods/foods.component.html":
/*!**************************************************!*\
  !*** ./src/app/pages/foods/foods.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "<mat-card>\n  <mat-card-header>\n    <div mat-card-avatar class=\"example-header-image\"></div>\n    <mat-card-title>ລາຍການອາຫານທັງໝົດ</mat-card-title>\n    <mat-card-subtitle>ຈັດຕາມປະເພດ</mat-card-subtitle>\n  </mat-card-header>\n  <mat-card-content>\n    <div class=\"form-group row\">\n      <div class=\"col col-sm-12 col-md-10\">\n        <input type=\"text\" class=\"form-control\" placeholder=\"ຄົ້ນຫາ...\">\n      </div>\n      <div class=\"col col-sm-12 col-md-2\">\n        <button mat-raised-button color=\"primary\" style=\"width: 100%;\" (click)=\"openAddFood()\">Add new</button>\n      </div>\n    </div>\n    <div>\n      <table class=\"table table-bordered table-hover\">\n        <thead class=\"thead-light\">\n          <tr>\n            <th scope=\"col\" class=\"text-center\">ຮູບ</th>\n            <th scope=\"col\" class=\"text-center\">ອາຫານ</th>\n            <th scope=\"col\" class=\"text-center\">ອາຫານ ພາສາອັງກິດ</th>\n            <th scope=\"col\" class=\"text-center\">ຕົ້ນທືນ</th>\n            <th scope=\"col\" class=\"text-center\">ລາຄາຂາຍ</th>\n            <th scope=\"col\" class=\"text-center\">ສະກຸນ</th>\n            <th scope=\"col\" class=\"text-center\">ໝວດ</th>\n            <th scope=\"col\" class=\"text-center\">ປະເພດ</th>\n            <th scope=\"col\" class=\"text-center\">ຫ້ອງຄົວ</th>\n            <th scope=\"col\" class=\"text-center\">ອາຫານຍ່ອຍ</th>\n            <th scope=\"col\" class=\"text-center\">ແກ້ໄຂ</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let food of foods |async\">\n            <td class=\"text-center align-middle\"><img src=\"{{ food.food_photo }}\" class=\"foodPhoto shadow\"\n                (click)=\"openViewFood(food)\" style=\"cursor: pointer; width: 300px;\"></td>\n            <td class=\"text-left align-middle\">{{ food.food_name }}</td>\n            <td class=\"text-left align-middle\">{{ food.food_name_en }}</td>\n            <td class=\"text-center align-middle\">{{ food.cost |number }}</td>\n            <td class=\"text-center align-middle\">{{ food.price |number }}</td>\n            <td class=\"text-center align-middle\">{{ food.currency }}</td>\n            <td class=\"text-center align-middle\">{{ food.food_category }}</td>\n            <td class=\"text-center align-middle\" *ngIf=\"food.parent_food == 'master'; else normalFood\"><img\n                src=\"../../../assets/icons/baseline-add_circle_outline-24px.svg\" style=\"cursor: pointer;\"\n                (click)=\"openAddExtendedFood(food)\">\n            </td>\n            <ng-template #normalFood>\n              <td class=\"text-center align-middle\">{{ food.parent_food }}</td>\n            </ng-template>\n            <td class=\"text-center align-middle\">{{ food.kitchen }}</td>\n            <td class=\"text-center align-middle\" *ngIf=\"food.parent_food == 'master'; else childFood\"\n              (click)=\"openViewExtendedFood(food)\">\n              <table class=\"table table-bordered\" style=\"width: 100%;margin: 0;\">\n                <thead class=\"thead-light\">\n            <th class=\"text-center align-middle\">ອາຫານ</th>\n            <th class=\"text-center align-middle\">ຕົ້ນທືນ</th>\n            <th class=\"text-center align-middle\">ລາຄາຂາຍ</th>\n            </thead>\n        <tbody>\n          <tr *ngFor=\"let extFood of food.extendedFoods\">\n            <td class=\"text-left align-left\">{{ extFood.extendedFoodName }}</td>\n            <td class=\"text-right align-middle\">{{ extFood.cost |number}}</td>\n            <td class=\"text-right align-middle\">{{ extFood.price |number}}</td>\n          </tr>\n        </tbody>\n      </table>\n      </td>\n      <ng-template #childFood>\n        <td></td>\n      </ng-template>\n      <td class=\"text-center align-middle\">\n        <div class=\"row\">\n          <div class=\"col col-md-6 text-center\"><button mat-flat-button color=\"primary\" style=\"width: 100%;\"\n              (click)=\"openViewFood(food)\">ແກ້ໄຂ</button></div>\n          <div class=\"col col-md-6 text-center\"><button mat-flat-button color=\"warn\" style=\"width: 100%;\"\n              (click)=\"deleteFood(food)\">\n              ລຶບ</button></div>\n        </div>\n      </td>\n      </tr>\n      </tbody>\n      </table>\n    </div>\n  </mat-card-content>\n</mat-card>\n"

      /***/
}),

/***/ "./src/app/pages/foods/foods.component.ts":
/*!************************************************!*\
  !*** ./src/app/pages/foods/foods.component.ts ***!
  \************************************************/
/*! exports provided: FoodsComponent */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FoodsComponent", function () { return FoodsComponent; });
/* harmony import */ var _dialogs_view_extended_food_view_extended_food_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../dialogs/view-extended-food/view-extended-food.component */ "./src/app/dialogs/view-extended-food/view-extended-food.component.ts");
/* harmony import */ var _dialogs_view_food_view_food_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../dialogs/view-food/view-food.component */ "./src/app/dialogs/view-food/view-food.component.ts");
/* harmony import */ var _dialogs_add_food_add_food_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../dialogs/add-food/add-food.component */ "./src/app/dialogs/add-food/add-food.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_dialogs_add_extended_food_add_extended_food_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dialogs/add-extended-food/add-extended-food.component */ "./src/app/dialogs/add-extended-food/add-extended-food.component.ts");
      var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
      };








      var FoodsComponent = /** @class */ (function () {
        function FoodsComponent(db, dialog, snackbarRef) {
          this.db = db;
          this.dialog = dialog;
          this.snackbarRef = snackbarRef;
          this.foodsRef = db.collection('foods');
        }
        FoodsComponent.prototype.ngOnInit = function () {
          this.foods = this.db.collection('foods', function (ref) {
            return ref.orderBy('food_name', 'asc');
          }).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (changes) {
            return changes.map(function (a) {
              var data = a.payload.doc.data();
              data['id'] = a.payload.doc.id;
              return data;
            });
          }));
        };
        FoodsComponent.prototype.openAddFood = function () {
          var dialogRef = this.dialog.open(_dialogs_add_food_add_food_component__WEBPACK_IMPORTED_MODULE_2__["AddFoodComponent"], { width: '900px' });
        };
        FoodsComponent.prototype.openViewFood = function (food) {
          var dialogRef = this.dialog.open(_dialogs_view_food_view_food_component__WEBPACK_IMPORTED_MODULE_1__["ViewFoodComponent"], { width: '900px', data: food });
        };
        FoodsComponent.prototype.deleteFood = function (food) {
          var _this = this;
          swal({
            title: "ທ່ານຕ້ອງການລຶບແທ້ບໍ?",
            text: "ຫຼັງຈາກລືບລາຍການແລ້ວບໍ່ສາມາທີ່ຈະຈກູ້ຄືນໄດ້",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then(function (res) {
            if (res) {
              _this.foodsRef.doc(food.id).delete();
            }
            else {
              return;
            }
          });
        };
        FoodsComponent.prototype.openAddExtendedFood = function (food) {
          console.log(food.extendedFoods);
          try {
            if (food.extendedFoods.length == 0) {
              var dialogRef = this.dialog.open(src_app_dialogs_add_extended_food_add_extended_food_component__WEBPACK_IMPORTED_MODULE_7__["AddExtendedFoodComponent"], { width: '800px', data: food });
            }
            else if (food.extendedFoods == null) {
              var dialogRef = this.dialog.open(src_app_dialogs_add_extended_food_add_extended_food_component__WEBPACK_IMPORTED_MODULE_7__["AddExtendedFoodComponent"], { width: '800px', data: food });
            }
            else {
              this.snackbarRef.open('Already have member, please use Other', 'Ok', { duration: 2000, verticalPosition: 'top' });
              return;
            }
          }
          catch (err) {
            var dialogRef = this.dialog.open(src_app_dialogs_add_extended_food_add_extended_food_component__WEBPACK_IMPORTED_MODULE_7__["AddExtendedFoodComponent"], { width: '800px', data: food });
          }
        };
        FoodsComponent.prototype.openViewExtendedFood = function (food) {
          var dialogRef = this.dialog.open(_dialogs_view_extended_food_view_extended_food_component__WEBPACK_IMPORTED_MODULE_0__["ViewExtendedFoodComponent"], { width: '800px', data: food });
        };
        FoodsComponent = __decorate([
          Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-foods',
            template: __webpack_require__(/*! ./foods.component.html */ "./src/app/pages/foods/foods.component.html"),
            styles: [__webpack_require__(/*! ./foods.component.css */ "./src/app/pages/foods/foods.component.css")]
          }),
          __metadata("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"]])
        ], FoodsComponent);
        return FoodsComponent;
      }());



      /***/
}),

/***/ "./src/app/pages/pos/pos.component.css":
/*!*********************************************!*\
  !*** ./src/app/pages/pos/pos.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = ".item {\n  margin-left: 5px;\n  margin-top: 10px;\n  max-width: 200px;\n  min-width: 100px;\n  min-height: 200px;\n  max-height: 100px;\n  overflow: hidden;\n  cursor: pointer;\n  align-items: center;\n  border-radius: 5px;\n}\n.title {\n  position: absolute;\n  bottom: 10px;\n  border-radius: 3px;\n  left: 3px;\n  opacity: 0.8;\n  width: 90%;\n  text-align: center;\n  height: 30px;\n  vertical-align: middle;\n  background-color: rgb(228, 241, 247);\n  color: rgb(53, 48, 48);\n  opacity: 0.7;\n}\n.pricetag {\n  position: absolute;\n  top: 5px;\n  right: 10px;\n  background-color: rgb(247, 242, 242);\n  color: rgb(9, 120, 247);\n  border-radius: 3px;\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif, 'phetsarath ot';\n  opacity: 0.9;\n  width: 100px;\n  height: 30px;\n  text-align: center;\n}\n.pricetagOption {\n  position: absolute;\n  top: 5px;\n  right: 10px;\n  background-color: rgb(247, 119, 34);\n  color: white;\n  border-radius: 3px;\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif, 'phetsarath ot';\n  opacity: 0.7;\n  width: 100px;\n  height: 30px;\n  text-align: center;\n}\n.main-container {\n  height: 100%;\n  overflow: auto;\n  width: 100%;\n}\n.mat-tabBody {\n  max-height: 800px;\n}\n.paymentCard {\n  position: absolute;\n  bottom: 10px;\n  width: 97%;\n}\n.listDiv {\n  max-height: 500px;\n  overflow:auto;\n}\n.mainPaymentDiv {\n  min-height: 550px;\n}\n\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvcG9zL3Bvcy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQWlCO0VBQ2pCLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixvQkFBb0I7RUFDcEIsbUJBQW1CO0NBQ3BCO0FBQ0Q7RUFDRSxtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixVQUFVO0VBQ1YsYUFBYTtFQUNiLFdBQVc7RUFDWCxtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixxQ0FBcUM7RUFDckMsdUJBQXVCO0VBQ3ZCLGFBQWE7Q0FDZDtBQUNEO0VBQ0UsbUJBQW1CO0VBQ25CLFNBQVM7RUFDVCxZQUFZO0VBQ1oscUNBQXFDO0VBQ3JDLHdCQUF3QjtFQUN4QixtQkFBbUI7RUFDbkIsOEVBQThFO0VBQzlFLGFBQWE7RUFDYixhQUFhO0VBQ2IsYUFBYTtFQUNiLG1CQUFtQjtDQUNwQjtBQUVEO0VBQ0UsbUJBQW1CO0VBQ25CLFNBQVM7RUFDVCxZQUFZO0VBQ1osb0NBQW9DO0VBQ3BDLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsOEVBQThFO0VBQzlFLGFBQWE7RUFDYixhQUFhO0VBQ2IsYUFBYTtFQUNiLG1CQUFtQjtDQUNwQjtBQUNEO0VBQ0UsYUFBYTtFQUNiLGVBQWU7RUFDZixZQUFZO0NBQ2I7QUFDRDtFQUNFLGtCQUFrQjtDQUNuQjtBQUNEO0VBQ0UsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixXQUFXO0NBQ1o7QUFDRDtFQUNFLGtCQUFrQjtFQUNsQixjQUFjO0NBQ2Y7QUFDRDtFQUNFLGtCQUFrQjtDQUNuQiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3Bvcy9wb3MuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pdGVtIHtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgbWF4LXdpZHRoOiAyMDBweDtcbiAgbWluLXdpZHRoOiAxMDBweDtcbiAgbWluLWhlaWdodDogMjAwcHg7XG4gIG1heC1oZWlnaHQ6IDEwMHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cbi50aXRsZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAxMHB4O1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIGxlZnQ6IDNweDtcbiAgb3BhY2l0eTogMC44O1xuICB3aWR0aDogOTAlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGhlaWdodDogMzBweDtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyOCwgMjQxLCAyNDcpO1xuICBjb2xvcjogcmdiKDUzLCA0OCwgNDgpO1xuICBvcGFjaXR5OiAwLjc7XG59XG4ucHJpY2V0YWcge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNXB4O1xuICByaWdodDogMTBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0NywgMjQyLCAyNDIpO1xuICBjb2xvcjogcmdiKDksIDEyMCwgMjQ3KTtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBmb250LWZhbWlseTogJ1NlZ29lIFVJJywgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWYsICdwaGV0c2FyYXRoIG90JztcbiAgb3BhY2l0eTogMC45O1xuICB3aWR0aDogMTAwcHg7XG4gIGhlaWdodDogMzBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ucHJpY2V0YWdPcHRpb24ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNXB4O1xuICByaWdodDogMTBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0NywgMTE5LCAzNCk7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBmb250LWZhbWlseTogJ1NlZ29lIFVJJywgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWYsICdwaGV0c2FyYXRoIG90JztcbiAgb3BhY2l0eTogMC43O1xuICB3aWR0aDogMTAwcHg7XG4gIGhlaWdodDogMzBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLm1haW4tY29udGFpbmVyIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvdmVyZmxvdzogYXV0bztcbiAgd2lkdGg6IDEwMCU7XG59XG4ubWF0LXRhYkJvZHkge1xuICBtYXgtaGVpZ2h0OiA4MDBweDtcbn1cbi5wYXltZW50Q2FyZCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAxMHB4O1xuICB3aWR0aDogOTclO1xufVxuLmxpc3REaXYge1xuICBtYXgtaGVpZ2h0OiA1MDBweDtcbiAgb3ZlcmZsb3c6YXV0bztcbn1cbi5tYWluUGF5bWVudERpdiB7XG4gIG1pbi1oZWlnaHQ6IDU1MHB4O1xufVxuXG4iXX0= */"

      /***/
}),

/***/ "./src/app/pages/pos/pos.component.html":
/*!**********************************************!*\
  !*** ./src/app/pages/pos/pos.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "<div>\n  <mat-card class=\"col col-md-12\">\n    <mat-card-content>\n      <div class=\"row\">\n        <div class=\"col col-md-7\">\n          <mat-tab-group class=\"mat-tabBody\" (selectedTabChange)=\"loadFoodPage($event)\">\n            <mat-tab label=\"ທັງໝົດ\">\n              <div class=\"row main-container\">\n                <div class=\"col col-sm-12 col-md-3 shadow item text-center\" *ngFor=\"let food of foods | async\">\n                  <div class=\"pricetag\">\n                    <span class=\"h5\" *ngIf=\"food.price != 0; else choosePrice\">{{ food.price | number}}</span>\n                    <ng-template #choosePrice>\n                      <span class=\"h4\" style=\"color: orange;\">ເລືອກ</span>\n                    </ng-template>\n                  </div>\n                  <img src=\"{{ food.food_photo }}\" alt=\"{{ food.food_name }}\" class=\"img-thumbnail\"\n                    (click)=\"foodChoosed(food)\">\n                  <div class=\"title align-middle\">\n                    <span class=\"h6 font-weight-light\">{{ food.food_name }}</span>\n                  </div>\n                </div>\n              </div>\n            </mat-tab>\n            <mat-tab *ngFor=\"let foodCategory of FoodCategories |async\" label=\"{{ foodCategory.foodCategoryNameLao }}\">\n              <div class=\"row main-container\">\n                <div class=\"col col-sm-12 col-md-3 shadow item text-center\" *ngFor=\"let food of foods | async\">\n                  <div class=\"pricetag\">\n                    <span class=\"h5\" *ngIf=\"food.price != 0; else choosePrice\">{{ food.price | number}}</span>\n                    <ng-template #choosePrice>\n                      <span class=\"h4\" style=\"color: orange;\">ເລືອກ</span>\n                    </ng-template>\n                  </div>\n                  <img src=\"{{ food.food_photo }}\" alt=\"{{ food.food_name }}\" class=\"img-thumbnail\"\n                    (click)=\"foodChoosed(food)\">\n                  <div class=\"title align-middle\">\n                    <span class=\"h6 font-weight-light\">{{ food.food_name }}</span>\n                  </div>\n                </div>\n              </div>\n            </mat-tab>\n          </mat-tab-group>\n        </div>\n        <div class=\"col col-md-5\">\n          <mat-card class=\"mainPaymentDiv\">\n            <mat-card-title>ອາຫານທີ່ເລຶອກໄວ້ </mat-card-title>\n            <mat-divider></mat-divider>\n            <mat-card-content>\n              <mat-list>\n                <mat-list-item>\n                  <div class=\"row\" style=\"width: 100%;\">\n                    <div class=\"col col-md-3 text-left font-weight-bold\">ອາຫານ</div>\n                    <div class=\"col col-md-2 text-right font-weight-bold\">ຈຳນວນ</div>\n                    <div class=\"col col-md-2 text-right font-weight-bold\">ລາຄາ</div>\n                    <div class=\"col col-md-2 text-right font-weight-bold\">ລວມ</div>\n                    <div class=\"col col-md-2 text-center font-weight-bold\">ຂໍ້ຄວາມ</div>\n                    <div class=\"col col-md-1 text-right font-weight-bold\">ຈັດການ</div>\n                  </div>\n                </mat-list-item>\n                <mat-divider></mat-divider>\n                <div class=\"listDiv\">\n                  <mat-list-item *ngFor=\"let cart of carts | async\">\n                    <div class=\"row\" style=\"width: 100%;\">\n                      <div class=\"col col-md-3 text-left text-nowrap\">{{ cart.food }} {{ cart.subFood }}</div>\n                      <div class=\"col col-md-2 text-right\">{{ cart.quantity | number }}</div>\n                      <div class=\"col col-md-2 text-right\">{{ cart.price | number }}</div>\n                      <div class=\"col col-md-2 text-right\"> {{ cart.total | number }}</div>\n                      <div class=\"col col-md-2 text-left\">{{ cart.note }}</div>\n                      <div class=\"col col-md-1 text-center\">\n                        <img src=\"../../../assets/icons/baseline-note-24px.svg\"\n                          style=\"position: absolute; right:30px; cursor: pointer;\" (click)=\"addnote(cart)\">\n                        <img src=\"../../../assets/icons/baseline-delete-24px.svg\"\n                          style=\"position: absolute; right:1px; cursor: pointer;\" (click)=\"removeFromlist(cart)\">\n                      </div>\n                    </div>\n                  </mat-list-item>\n                </div>\n                <mat-divider></mat-divider>\n                <mat-list-item>\n                  <div class=\"row\">\n                    <div class=\"col col-md-9 text-right h5\" style=\"position: absolute; right:150px;\">ຍອດລວມ\n                    </div>\n                    <div class=\"\n                      col col-md-3 text-right h5\" style=\"position: absolute; right:18px;\">{{ total | number }}</div>\n                  </div>\n                </mat-list-item>\n              </mat-list>\n            </mat-card-content>\n          </mat-card>\n          <mat-card class=\"paymentCard\">\n            <mat-card-title>Payment</mat-card-title>\n            <mat-card-content>\n              <div class=\"row\">\n                <div class=\"col col-md-12\">\n                  <button mat-flat-button color=\"primary\" style=\"width: 100%; height: 50px;\"\n                    [disabled]=\"disablePaymentBtn\" (click)=\"openPaymentCash()\">Cash</button>\n                </div>\n              </div>\n            </mat-card-content>\n          </mat-card>\n        </div>\n      </div>\n    </mat-card-content>\n  </mat-card>\n"

      /***/
}),

/***/ "./src/app/pages/pos/pos.component.ts":
/*!********************************************!*\
  !*** ./src/app/pages/pos/pos.component.ts ***!
  \********************************************/
/*! exports provided: PosComponent */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PosComponent", function () { return PosComponent; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angularfire2/firestore */ "./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angularfire2_firestore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_dialogs_subfoods_subfoods_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dialogs/subfoods/subfoods.component */ "./src/app/dialogs/subfoods/subfoods.component.ts");
/* harmony import */ var src_app_dialogs_add_note_add_note_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dialogs/add-note/add-note.component */ "./src/app/dialogs/add-note/add-note.component.ts");
/* harmony import */ var src_app_dialogs_payment_cash_payment_cash_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dialogs/payment-cash/payment-cash.component */ "./src/app/dialogs/payment-cash/payment-cash.component.ts");
/* harmony import */ var src_app_dialogs_payment_banks_channel_payment_banks_channel_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dialogs/payment-banks-channel/payment-banks-channel.component */ "./src/app/dialogs/payment-banks-channel/payment-banks-channel.component.ts");
      var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
      };








      var PosComponent = /** @class */ (function () {
        function PosComponent(db, dialog, snackbar) {
          var _this = this;
          this.db = db;
          this.dialog = dialog;
          this.snackbar = snackbar;
          this.username = 'administrator';
          this.foodCartList = [];
          this.itemSelected = [];
          this.total = 0;
          this.disablePaymentBtn = false;
          this.foodCategoriesRef = db.collection('food_categories', function (ref) {
            return ref.orderBy('foodCategoryNameLao', 'desc');
          });
          this.foodsRef = db.collection('foods');
          this.cartsRef = db.collection('carts', function (ref) {
            return ref.where('username', '==', _this.username);
          });
        }
        PosComponent.prototype.ngOnInit = function () {
          this.FoodCategories = this.foodCategoriesRef.valueChanges();
          this.carts = this.cartsRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (change) {
            return change.map(function (a) {
              var data = a.payload.doc.data();
              data['id'] = a.payload.doc.id;
              return data;
            });
          }));
          this.loadFoodPage({ index: 0 });
          this.totalCalculation();
        };
        PosComponent.prototype.loadFoodPage = function (page) {
          if (page.index == 0) {
            this.foods = this.db.collection('foods').snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (change) {
              return change.map(function (a) {
                var foods = a.payload.doc.data();
                foods['id'] = a.payload.doc.id;
                return foods;
              });
            }));
          }
          else {
            this.foods = this.db.collection('foods', function (ref) {
              return ref.where('food_category', '==', page.tab.textLabel);
            }).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (change) {
              return change.map(function (a) {
                var foods = a.payload.doc.data();
                foods['id'] = a.payload.doc.id;
                return foods;
              });
            }));
          }
        };
        PosComponent.prototype.openSubFood = function (food) {
          var _this = this;
          var dialogRef = this.dialog.open(src_app_dialogs_subfoods_subfoods_component__WEBPACK_IMPORTED_MODULE_4__["SubfoodsComponent"], {
            width: '400px',
            data: food
          });
          dialogRef.afterClosed().subscribe(function (feedBack) {
            if (feedBack) {
              _this.foodCartList.push(feedBack);
              _this.addCartsToDb(feedBack);
            }
            else {
              return;
            }
          });
        };
        PosComponent.prototype.foodChoosed = function (food) {
          if (food.price == 0) {
            this.openSubFood(food);
          }
          else {
            var item = {
              'id': food.id,
              'food': food.food_name,
              'price': food.price,
              'quantity': 1,
              'total': food.price * 1,
              'username': 'administrator'
            };
            this.addCartsToDb(item);
          }
        };
        PosComponent.prototype.removeFromlist = function (food) {
          if (food) {
            this.cartsRef.doc(food.id).delete().then(function () {
            });
          }
          this.totalCalculation();
        };
        PosComponent.prototype.totalCalculation = function () {
          var _this = this;
          this.total = 0;
          this.db.collection('carts').get().subscribe(function (f) {
            f.forEach(function (item) {
              _this.total += item.data().total;
            });
          });
        };
        PosComponent.prototype.addCartsToDb = function (food) {
          var _this = this;
          if (food) {
            this.db.collection('carts', function (ref) {
              return ref.where('food', '==', food.food);
            }).get().subscribe(function (item) {
              if (!item.empty) {
                item.docs.forEach(function (doc) {
                  var cart = doc.data();
                  cart['quantity'] = doc.data().quantity + 1;
                  cart['total'] = doc.data().price * cart.quantity;
                  _this.db.collection('carts').doc(doc.id).update(cart).then(function () {
                    _this.totalCalculation();
                  });
                });
              }
              else {
                // add new item
                if (food) {
                  _this.cartsRef.add(food).then(function () {
                  });
                  _this.totalCalculation();
                }
              }
            });
          }
        };
        PosComponent.prototype.addnote = function (cart) {
          var _this = this;
          var dialogRef = this.dialog.open(src_app_dialogs_add_note_add_note_component__WEBPACK_IMPORTED_MODULE_5__["AddNoteComponent"], {
            width: '600px'
          });
          dialogRef.afterClosed().subscribe(function (note) {
            if (note) {
              if (cart) {
                cart['note'] = note.note;
                _this.cartsRef.doc(cart.id).update(cart).then(function () {
                });
              }
              else {
                return;
              }
            }
            else {
              return;
            }
          });
        };
        PosComponent.prototype.openPaymentCash = function () {
          if (this.total > 0) {
            var dialogCashRef = this.dialog.open(src_app_dialogs_payment_cash_payment_cash_component__WEBPACK_IMPORTED_MODULE_6__["PaymentCashComponent"], {
              width: '800px',
              data: {
                total: this.total
              }
            });
          }
        };
        PosComponent.prototype.opentBanksChannel = function (total) {
          var dialogCashRef = this.dialog.open(src_app_dialogs_payment_banks_channel_payment_banks_channel_component__WEBPACK_IMPORTED_MODULE_7__["PaymentBanksChannelComponent"], {
            width: '800px',
            data: {
              total: this.total
            }
          });
        };
        PosComponent = __decorate([
          Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-pos',
            template: __webpack_require__(/*! ./pos.component.html */ "./src/app/pages/pos/pos.component.html"),
            styles: [__webpack_require__(/*! ./pos.component.css */ "./src/app/pages/pos/pos.component.css")]
          }),
          __metadata("design:paramtypes", [angularfire2_firestore__WEBPACK_IMPORTED_MODULE_1__["AngularFirestore"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"]])
        ], PosComponent);
        return PosComponent;
      }());



      /***/
}),

/***/ "./src/app/pages/products/products.component.css":
/*!*******************************************************!*\
  !*** ./src/app/pages/products/products.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3Byb2R1Y3RzL3Byb2R1Y3RzLmNvbXBvbmVudC5jc3MifQ== */"

      /***/
}),

/***/ "./src/app/pages/products/products.component.html":
/*!********************************************************!*\
  !*** ./src/app/pages/products/products.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "<p>\n  products works!\n</p>\n"

      /***/
}),

/***/ "./src/app/pages/products/products.component.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/products/products.component.ts ***!
  \******************************************************/
/*! exports provided: ProductsComponent */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsComponent", function () { return ProductsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
      var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
      };

      var ProductsComponent = /** @class */ (function () {
        function ProductsComponent() {
        }
        ProductsComponent.prototype.ngOnInit = function () {
        };
        ProductsComponent = __decorate([
          Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-products',
            template: __webpack_require__(/*! ./products.component.html */ "./src/app/pages/products/products.component.html"),
            styles: [__webpack_require__(/*! ./products.component.css */ "./src/app/pages/products/products.component.css")]
          }),
          __metadata("design:paramtypes", [])
        ], ProductsComponent);
        return ProductsComponent;
      }());



      /***/
}),

/***/ "./src/app/pages/settings/settings.component.css":
/*!*******************************************************!*\
  !*** ./src/app/pages/settings/settings.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = ".gridImg{\n  max-width: 150px;\n  cursor: pointer;\n}\n.mainrow {\n  align-content: center;\n  text-align: center;\n}\n.textTitle{\n  position: relative;\n  margin-top: 10px;\n  border-radius: 5px;\n}\n.item-grid {\n  max-width: 450px;\n  margin-left: 20px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvc2V0dGluZ3Mvc2V0dGluZ3MuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlCQUFpQjtFQUNqQixnQkFBZ0I7Q0FDakI7QUFDRDtFQUNFLHNCQUFzQjtFQUN0QixtQkFBbUI7Q0FDcEI7QUFDRDtFQUNFLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsbUJBQW1CO0NBQ3BCO0FBQ0Q7RUFDRSxpQkFBaUI7RUFDakIsa0JBQWtCO0NBQ25CIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvc2V0dGluZ3Mvc2V0dGluZ3MuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ncmlkSW1ne1xuICBtYXgtd2lkdGg6IDE1MHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4ubWFpbnJvdyB7XG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLnRleHRUaXRsZXtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG4uaXRlbS1ncmlkIHtcbiAgbWF4LXdpZHRoOiA0NTBweDtcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XG59XG4iXX0= */"

      /***/
}),

/***/ "./src/app/pages/settings/settings.component.html":
/*!********************************************************!*\
  !*** ./src/app/pages/settings/settings.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

      module.exports = "<mat-card>\n  <mat-card-header>\n    <mat-icon class=\"icon-header\">settings</mat-icon>\n    <h1 mat-dialog-title>Settings</h1>\n    <p>\n\n    </p>\n  </mat-card-header>\n  <mat-card-content>\n    <div class=\"row mainrow\">\n      <div class=\"col col-md-3 shadow p-3 mb-5 bg-white rounded item-grid\">\n        <img src=\"../../../assets/images/icons/1162499.svg\" class=\"gridImg\" (click)=\"openAddFoodCat()\">\n        <div class=\"textTitle h5\">ປະເພດອາຫານ</div>\n      </div>\n      <div class=\"col col-md-3 shadow p-3 mb-5 bg-white rounded item-grid\">\n        <img src=\"../../../assets/images/icons/delivery.svg\" class=\"gridImg\" (click)=\"openExtendedFoodType()\">\n        <div class=\"textTitle h5\">ອາຫານຍ່ອຍ</div>\n      </div>\n      <div class=\"col col-md-3 shadow p-3 mb-5 bg-white rounded item-grid\">\n        <img src=\"../../../assets/images/icons/1162455.svg\" class=\"gridImg\" (click)=\"openTicketMainternance()\">\n        <div class=\"textTitle h5\">Ticket</div>\n      </div>\n      <div class=\"col col-md-3 shadow p-3 mb-5 bg-white rounded item-grid\">\n        <img src=\"../../../assets/icons/payment-method.svg\" class=\"gridImg\" (click)=\"openPaymentType()\">\n        <div class=\"textTitle h5\">Payment Types</div>\n      </div>\n      <div class=\"col col-md-3 shadow p-3 mb-5 bg-white rounded item-grid\">\n        <img src=\"../../../assets/icons/bank.svg\" class=\"gridImg\" (click)=\"openBanking()\">\n        <div class=\"textTitle h5\">ທະນາຄານ</div>\n      </div>\n      <div class=\"col col-md-3 shadow p-3 mb-5 bg-white rounded item-grid\">\n        <img src=\"../../../assets/images/icons/265667.svg\" class=\"gridImg\">\n        <div class=\"textTitle h5\">ຜູ້ໃຊ້</div>\n      </div>\n    </div>\n  </mat-card-content>\n</mat-card>\n"

      /***/
}),

/***/ "./src/app/pages/settings/settings.component.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/settings/settings.component.ts ***!
  \******************************************************/
/*! exports provided: SettingsComponent */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsComponent", function () { return SettingsComponent; });
/* harmony import */ var _dialogs_banking_banking_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../dialogs/banking/banking.component */ "./src/app/dialogs/banking/banking.component.ts");
/* harmony import */ var _dialogs_add_food_category_add_food_category_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../dialogs/add-food-category/add-food-category.component */ "./src/app/dialogs/add-food-category/add-food-category.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_dialogs_extended_food_type_extended_food_type_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dialogs/extended-food-type/extended-food-type.component */ "./src/app/dialogs/extended-food-type/extended-food-type.component.ts");
/* harmony import */ var src_app_dialogs_tickets_tickets_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dialogs/tickets/tickets.component */ "./src/app/dialogs/tickets/tickets.component.ts");
/* harmony import */ var src_app_dialogs_payment_types_payment_types_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dialogs/payment-types/payment-types.component */ "./src/app/dialogs/payment-types/payment-types.component.ts");
      var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
      };







      var SettingsComponent = /** @class */ (function () {
        function SettingsComponent(dialog) {
          this.dialog = dialog;
        }
        SettingsComponent.prototype.ngOnInit = function () {
        };
        SettingsComponent.prototype.openAddFoodCat = function () {
          var dialogRef = this.dialog.open(_dialogs_add_food_category_add_food_category_component__WEBPACK_IMPORTED_MODULE_1__["AddFoodCategoryComponent"], { width: '600px' });
        };
        SettingsComponent.prototype.openExtendedFoodType = function () {
          var dialogRef = this.dialog.open(src_app_dialogs_extended_food_type_extended_food_type_component__WEBPACK_IMPORTED_MODULE_4__["ExtendedFoodTypeComponent"], { width: '600px' });
        };
        SettingsComponent.prototype.openTicketMainternance = function () {
          var dialogRef = this.dialog.open(src_app_dialogs_tickets_tickets_component__WEBPACK_IMPORTED_MODULE_5__["TicketsComponent"], { width: '400px' });
        };
        SettingsComponent.prototype.openPaymentType = function () {
          var dialogRef = this.dialog.open(src_app_dialogs_payment_types_payment_types_component__WEBPACK_IMPORTED_MODULE_6__["PaymentTypesComponent"], { width: '600px' });
        };
        SettingsComponent.prototype.openBanking = function () {
          var dialogRef = this.dialog.open(_dialogs_banking_banking_component__WEBPACK_IMPORTED_MODULE_0__["BankingComponent"], { width: '600px' });
        };
        SettingsComponent = __decorate([
          Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-settings',
            template: __webpack_require__(/*! ./settings.component.html */ "./src/app/pages/settings/settings.component.html"),
            styles: [__webpack_require__(/*! ./settings.component.css */ "./src/app/pages/settings/settings.component.css")]
          }),
          __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
        ], SettingsComponent);
        return SettingsComponent;
      }());



      /***/
}),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function () { return environment; });
      // This file can be replaced during build by using the `fileReplacements` array.
      // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
      // The list of file replacements can be found in `angular.json`.
      var environment = {
        production: false,
        firebase: {
          apiKey: "AIzaSyBiYjJTtFxtMsgCIQXJuUbDRB2WATLsN3o",
          authDomain: "orchid-pos.firebaseapp.com",
          databaseURL: "https://orchid-pos.firebaseio.com",
          projectId: "orchid-pos",
          storageBucket: "orchid-pos.appspot.com",
          messagingSenderId: "322682959300"
        },
        qrcodeUrl: {
          url: 'https://letterp.000webhostapp.com/letterp.php',
        }
      };
      /*
       * For easier debugging in development mode, you can import the following file
       * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
       *
       * This import should be commented out in production mode because it will have a negative impact
       * on performance if an error is thrown.
       */
      // import 'zone.js/dist/zone-error';  // Included with Angular CLI.


      /***/
}),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




      if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
      }
      Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
        .catch(function (err) { return console.error(err); });


      /***/
}),

/***/ 0:
/*!************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://0.0.0.0:0 ./src/main.ts ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

      __webpack_require__(/*! /Users/soulisacksayyalinh/letter-p/frontend/orchid-pos/node_modules/webpack-dev-server/client/index.js?http://0.0.0.0:0 */"./node_modules/webpack-dev-server/client/index.js?http://0.0.0.0:0");
      module.exports = __webpack_require__(/*! /Users/soulisacksayyalinh/letter-p/frontend/orchid-pos/src/main.ts */"./src/main.ts");


      /***/
})

}, [[0, "runtime", "vendor"]]]);
//# sourceMappingURL=main.js.map
