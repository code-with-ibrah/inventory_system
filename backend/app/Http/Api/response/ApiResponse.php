<?php


namespace App\Http\Api\response;


class ApiResponse
{
    public static function notFound($message){
        return response()->json([
            "message" => $message,
            "code" => StatusCode::NOT_FOUND
        ], StatusCode::NOT_FOUND);
    }

    public static function duplicate($message){
        return response()->json([
            "message" => $message,
            "code" => StatusCode::CONFLICT
        ], StatusCode::CONFLICT);
    }

    public static function badRequest($message){
        return response()->json([
            "message" => $message,
            "code" => StatusCode::BAD_REQUEST
        ], StatusCode::BAD_REQUEST);
    }

    public static function general($message, $code){
        return response()->json([
            "message" => $message,
            "code" => $code
        ], $code);
    }

}
