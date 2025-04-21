<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductSupplierController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StockUnitController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::group(['prefix' => ''], function()
{
    // auth endpoint
    Route::post("/login", [AuthController::class, "login"]);
    Route::post("/register", [AuthController::class, "register"]);
    Route::post("/change-password", [AuthController::class, "changePassword"]);
    Route::post("/verify-password-reset", [AuthController::class, "verifyPasswordReset"]);
    Route::post("/request-password-reset", [AuthController::class, "requestPasswordReset"]);


    // user endpoint
    Route::apiResource("users", UserController::class);
    Route::put("users-toggle/{column}/{id}", [UserController::class, "handleToggleAction"]);


    // dashboard endpoints
    Route::prefix("home")->group(function(){
       Route::get("/dashboard-count", function (){ return []; });
       Route::get("/chart-data", function (){ return []; });
    });


    // role endpoint
    Route::apiResource("roles", RoleController::class);
    Route::put("roles-toggle/{column}/{id}", [RoleController::class]);


    // company endpoint
    Route::apiResource("companies", CompanyController::class);
    Route::post("companies/{id}", [CompanyController::class, "update"]);
    Route::put("companies-toggle/{column}/{id}", [CompanyController::class, "handleToggleAction"]);


    // brand endpoint
    Route::apiResource("brands", BrandController::class);
    Route::post("brands/{id}", [BrandController::class, "update"]);
    Route::put("brands-toggle/{column}/{id}", [BrandController::class, "handleToggleAction"]);


    // category endpoint
    Route::apiResource("categories", CategoryController::class);
    Route::put("categories-toggle/{column}/{id}", [CategoryController::class, "handleToggleAction"]);


    // currency endpoints
    Route::apiResource("currencies", CurrencyController::class);
    Route::put("currencies-toggle/{column}/{id}", [CurrencyController::class, "handleToggleAction"]);


    // customer endpoints
    Route::apiResource("customers", CustomerController::class);
    Route::put("customers-toggle/{column}/{id}", [CustomerController::class, "handleToggleAction"]);


    // suppliers endpoints
    Route::apiResource("suppliers", SupplierController::class);
    Route::get("suppliers-product/{productId}", [SupplierController::class, "products"]);
    Route::put("suppliers-toggle/{column}/{id}", [SupplierController::class, "handleToggleAction"]);


    // products endpoints
    Route::apiResource("products", ProductController::class);
    Route::post("companies/{id}", [ProductController::class, "update"]);
    Route::get("products-supplier/{supplierId}", [ProductController::class, "suppliers"]);
    Route::put("products-toggle/{column}/{id}", [ProductController::class, "handleToggleAction"]);


    // product - suppliers endpoints
    Route::apiResource("product-suppliers", ProductSupplierController::class);
    Route::delete("product-suppliers", [ProductSupplierController::class, "destroy"]);


    // stock units endpoints
    Route::apiResource("stock-units", StockUnitController::class);
    Route::put("stock-units-toggle/{column}/{id}", [StockUnitController::class, "handleToggleAction"]);


});
