<?php

namespace App\Http\Requests\common;

use Illuminate\Foundation\Http\FormRequest;

class PrepareRequestPayload extends FormRequest
{
    public static function prepare($request): array {
        $payload = $request->all();
        return $payload;
    }

}
