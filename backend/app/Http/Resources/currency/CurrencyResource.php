<?php

namespace App\Http\Resources\currency;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CurrencyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "companyId" => $this->companyId,
            "isActive" => $this->isActive,
            "isDeleted" => $this->isDeleted
        ];
    }
}
