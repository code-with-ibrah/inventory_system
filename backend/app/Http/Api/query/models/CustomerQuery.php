<?php


namespace App\Http\Api\query\models;


use App\Http\Api\query\common\QueryTransformer;
use Illuminate\Http\Request;

class CustomerQuery
{

    protected  $safeParams = [
        "id" => ["eq", "neq", "gte"],
        "name" => ["eq", "neq", "lk"],
        "companyName" => ["eq", "neq"],
        "location" => ["eq", "neq", "lk"],
        "phone" => ["eq", "neq", "lk"],
        "address" => ["eq", "neq", "lk"],
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
