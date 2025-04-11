<?php


namespace App\Http\Api\query\models;


use App\Http\Api\query\common\QueryTransformer;
use Illuminate\Http\Request;

class CompanyQuery
{

    protected  $safeParams = [
        "id" => ["eq", "neq", "gte"],
        "name" => ["eq", "neq", "lk"],
        "location" => ["eq", "neq", "lk"],
        "phone" => ["eq", "neq", "lk"],
        "address" => ["eq", "neq", "lk"],
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
