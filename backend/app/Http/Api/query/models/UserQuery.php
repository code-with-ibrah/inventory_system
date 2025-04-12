<?php


namespace App\Http\Api\query\models;


use App\Http\Api\query\common\QueryTransformer;
use Illuminate\Http\Request;


class UserQuery
{
    protected  $safeParams = [
        "id" => ["eq", "neq", "gte"],
        "name" => ["eq", "neq", "lk"],
        "roleId" => ["eq", "neq"],
        "email" => ["eq", "neq", "lk"],
        "companyId" => ["eq", "neq"],
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
