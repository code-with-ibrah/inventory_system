<?php


namespace App\Http\Api\query\models;


use App\Http\Api\query\common\IBaseDBQuery;
use App\Http\Api\query\common\QueryTransformer;
use Illuminate\Http\Request;

class OrderItemQuery implements IBaseDBQuery
{

    protected  $safeParams = [
        "id" => ["eq", "neq"],
        "orderId" => ["eq", "neq", "lk"],
        "productId" => ["eq", "neq"],
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
