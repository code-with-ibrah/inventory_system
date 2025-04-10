<?php

namespace App\Http\Resources\customer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
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
            "companyName" => $this->companyName,
            "location" => $this->location,
            "phone" => $this->phone,
            "address" => $this->address,
            "registrationDate" => $this->registrationDate
        ];
    }
}
