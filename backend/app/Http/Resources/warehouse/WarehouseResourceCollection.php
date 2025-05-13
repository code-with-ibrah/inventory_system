<?php

namespace App\Http\Resources\warehouse;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class WarehouseResourceCollection extends ResourceCollection
{

    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }
}
