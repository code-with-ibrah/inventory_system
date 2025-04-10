<?php


namespace App\Http\Api\query\models;


use App\Http\Api\query\common\QueryTransformer;
use Illuminate\Http\Request;

class CurrencyQuery
{

    protected  $safeParams = [
        "id" => ["eq", "neq", "gte"],
        "name" => ["eq", "neq", "lk"],
        "companyId" => ["eq", "neq"],
        "isActive" => ["eq", "neq"],
        "isVisible" => ["eq", "neq"]
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
