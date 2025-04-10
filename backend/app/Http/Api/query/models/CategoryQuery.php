<?php


namespace App\Http\Api\query\models;


use App\Http\Api\query\common\QueryTransformer;
use Illuminate\Http\Request;

class CategoryQuery
{
    protected  $safeParams = [
        "id" => ["eq", "neq"],
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
