<?php


namespace App\Http\Api\query\models;


use App\Http\Api\query\common\IBaseDBQuery;
use App\Http\Api\query\common\QueryTransformer;
use Illuminate\Http\Request;

class PaymentQuery implements IBaseDBQuery
{

    protected  $safeParams = [
        "id" => ["eq", "neq"],
        "customerId" => ["eq", "neq"],
        "orderId" => ["eq", "neq"],
        "amount" => ["eq", "neq", "gte", "lte", "lt", "gt"],
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
