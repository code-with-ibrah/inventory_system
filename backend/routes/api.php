<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\CustomerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::group(['prefix' => ''], function()
{
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



});
