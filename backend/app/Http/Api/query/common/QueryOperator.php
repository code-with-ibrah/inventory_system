<?php


namespace App\Http\Api\query\common;


class QueryOperator
{
    public static function get(){
        return [
            "eq" => "=",
            "lt" => "<",
            "gt" => ">",
            "lte" => "<=",
            "gte" => ">=",
            "neq" => "!=",
            "lk" => "like"
        ];
    }
}
