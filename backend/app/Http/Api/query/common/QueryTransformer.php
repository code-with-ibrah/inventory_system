<?php


namespace App\Http\Api\query\common;

use Illuminate\Http\Request;

class QueryTransformer
{
    public static function transform(Request $request, $safeParams, $columnMap){
        $eloQuery = [];

        $operatorMap = QueryOperator::get();

        foreach ($safeParams as $param => $operators){
            $query = $request->query($param);

            if(!isset($query)){
                continue;
            }

            $columns = $columnMap[$param] ?? $param;

            foreach($operators as $operator){
                if(isset($query[$operator])){
                    $eloQuery[] = [$columns, $operatorMap[$operator], $query[$operator]];
                    // Log::error($eloQuery);
                }
            }
        }

        return $eloQuery;
    }
}
