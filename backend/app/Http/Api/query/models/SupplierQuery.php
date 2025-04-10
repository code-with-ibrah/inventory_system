<?php


namespace App\Http\Api\query\models;


use App\Http\Api\query\common\QueryTransformer;
use Illuminate\Http\Request;

class SupplierQuery
{

    protected  $safeParams = [
        "id" => ["eq", "neq", "gte"],
        "name" => ["eq", "neq", "lk"],
        "companyName" => ["eq", "neq", "lk"],
        "registrationName" => ["eq", "neq", "lk"],
        "companyId" => ["eq", "neq"],
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
