<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\GoodsReceiptController;
use App\Http\Controllers\GoodsReceiptItemController;
use App\Http\Controllers\InstallmentPlanController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductSupplierController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StockAdjustmentController;
use App\Http\Controllers\StockAdjustmentItemController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\StockUnitController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WarehouseController;
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
    Route::get("suppliers-by-product/{productId}", [SupplierController::class, "products"]);
    Route::put("suppliers-toggle/{column}/{id}", [SupplierController::class, "handleToggleAction"]);


    // products endpoints
    Route::apiResource("products", ProductController::class);
    Route::post("companies/{id}", [ProductController::class, "update"]);
    Route::get("products-by-supplier/{supplierId}", [ProductController::class, "suppliers"]);
    Route::put("products-toggle/{column}/{id}", [ProductController::class, "handleToggleAction"]);


    // product - suppliers endpoints
    Route::apiResource("product-suppliers", ProductSupplierController::class);
    Route::post("add-product-to-supplier", [ProductSupplierController::class, "addProductToSupplier"]);
    Route::post("add-supplier-to-product", [ProductSupplierController::class, "addSupplierToProduct"]);
    Route::delete("product-suppliers", [ProductSupplierController::class, "destroy"]);


    // stock units endpoints
    Route::apiResource("stock-units", StockUnitController::class);
    Route::put("stock-units-toggle/{column}/{id}", [StockUnitController::class, "handleToggleAction"]);


    // warehouse endpoints
    Route::apiResource("warehouses", WarehouseController::class);
    Route::put("warehouses-toggle/{column}/{id}", [WarehouseController::class, "handleToggleAction"]);


    // installment plan endpoints
    Route::apiResource("installment-plans", InstallmentPlanController::class);
    Route::put("installment-plans-toggle/{column}/{id}", [InstallmentPlanController::class, "handleToggleAction"]);


    // payment method endpoints
    Route::apiResource("payment-methods", PaymentMethodController::class);
    Route::put("payment-methods-toggle/{column}/{id}", [PaymentMethodController::class, "handleToggleAction"]);


    // goods receipt endpoints
    Route::apiResource("goods-receipts", GoodsReceiptController::class);
    Route::put("goods-receipts-toggle/{column}/{id}", [GoodsReceiptController::class, "handleToggleAction"]);
    Route::put("goods-receipts-received/{goodsReceiptId}", [GoodsReceiptController::class, "markGoodsReceiptAsCompleted"]);


    // goods receipt item endpoints
    Route::apiResource("goods-receipt-items", GoodsReceiptItemController::class);
    Route::put("goods-receipt-items-toggle/{column}/{id}", [GoodsReceiptItemController::class, "handleToggleAction"]);


    // stocks endpoints
    Route::apiResource("stocks", StockController::class);
    Route::put("stocks-toggle/{column}/{id}", [StockController::class, "handleToggleAction"]);


    // stock-adjustment endpoints
    Route::apiResource("stock-adjustments", StockAdjustmentController::class);
    Route::put("stock-adjustments-toggle/{column}/{id}", [StockAdjustmentController::class, "handleToggleAction"]);


    // stock-adjustment-item endpoints
    Route::apiResource("stock-adjustment-items", StockAdjustmentItemController::class);
    Route::put("stock-adjustment-items-toggle/{column}/{id}", [StockAdjustmentItemController::class, "handleToggleAction"]);


    // orders endpoint
    Route::apiResource("orders", OrderController::class);


    // order items endpoints

});
