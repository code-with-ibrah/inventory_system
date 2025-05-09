<?php


namespace App\Http\Api\query\models;


use App\Http\Api\query\common\IBaseDBQuery;
use App\Http\Api\query\common\QueryTransformer;
use Illuminate\Http\Request;

class OrderQuery implements IBaseDBQuery
{

    protected  $safeParams = [
        "id" => ["eq", "neq"],
        "orderNumber" => ["eq", "neq", "lk"],
        "customerId" => ["eq", "neq"],
        "installmentPlanId" => ["eq", "neq"],
        "userId" => ["eq", "neq"],
        "status" => ["eq", "neq"],
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
