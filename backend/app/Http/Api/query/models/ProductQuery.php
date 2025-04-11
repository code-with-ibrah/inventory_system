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
        "price" => ["eq", "neq", "lk"],
        "quantity" => ["eq", "neq", "gte", "lte"],
        "stockAlertLevel" => ["eq", "neq", "gte", "lte"],
        "companyId" => ["eq", "neq"],
        "categoryId" => ["eq", "neq"],
        "brandId" => ["eq", "neq"],
        "isActive" => ["eq", "neq"],
        "isDeleted" => ["eq", "neq"]
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
