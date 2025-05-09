<?php

namespace App\Http\Resources\order;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class OrderResourceCollection extends ResourceCollection
{
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }
}
