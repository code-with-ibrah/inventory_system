<?php

namespace App\Http\Resources\customer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "companyName" => $this->companyName,
            "location" => $this->location,
            "email" => $this->email,
            "phone" => $this->phone,
            "address" => $this->address,
            "registrationDate" => $this->registrationDate,
            "companyId" => $this->companyId
        ];
    }
}
