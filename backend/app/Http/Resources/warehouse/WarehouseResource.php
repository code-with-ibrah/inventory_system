<?php

namespace App\Http\Resources\warehouse;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WarehouseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "code" => $this->code,
            "name" => $this->name,
            "capacity" => $this->capacity,
            "location" => $this->location,
            "addressLineOne" => $this->addressLineOne,
            "addressLineTwo" => $this->addressLineTwo,
            "city" => $this->city,
            "country" => $this->country,
            "phone" => $this->phone,
            "email" => $this->email,
            "type" => $this->type,
            "description" => $this->description,
            "creator" => $this->creator ? [
                "id" => $this->creator->id,
                "name" => $this->creator->name
            ] : null,
            "lastEditor" => $this->lastEditor ? [
                    "id" => $this->lastEditor->id,
                    "name" => $this->lastEditor->name
            ]: null,
            "createdAt" => $this->created_at
        ];
    }
}
