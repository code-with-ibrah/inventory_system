<?php


namespace App\Http\Api\query\models;


use App\Http\Api\query\common\QueryTransformer;
use Illuminate\Http\Request;

class ProductQuery
{

    protected  $safeParams = [
        "id" => ["eq", "neq", "gte"],
        "name" => ["eq", "neq", "lk"],
        "sku" => ["eq", "neq", "lk"],
        "costPrice" => ["eq", "neq", "lk"],
        "batchNumber" => ["eq", "neq", "lk"],
        "serialNumber" => ["eq", "neq", "lk"],
        "taxRate" => ["eq", "neq"],
        "unitPrice" => ["eq", "neq", "lk"],
        "quantity" => ["eq", "neq", "gte", "lte"],
        "stockAlertLevel" => ["eq", "neq", "gte", "lte"],
        "companyId" => ["eq", "neq"],
        "categoryId" => ["eq", "neq"],
        "brandId" => ["eq", "neq"],
        "isActive" => ["eq", "neq"],
        "isDeleted" => ["eq", "neq"],
        "stockUnitId" => ["eq", "neq"]
    ];


    protected $columnMap = [
    ];


    public function transform(Request $request){
        return QueryTransformer::transform(
            $request,
            $this->safeParams,
            $this->columnMap
        );
    }
}
