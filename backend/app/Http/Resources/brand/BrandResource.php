<?php

namespace App\Http\Resources\brand;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use function Carbon\this;

class BrandResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "logo" => $this->logo,
            "isActive" => $this->isActive,
            "isDeleted" => $this->isDeleted,
            "parent" => $this->parent ? [
                "id" =>  $this->parent->id,
                "name" =>  $this->parent->name
            ] : null,
            "company" => [
                "id" => $this->company->id,
                "name" => $this->company->name
            ]
        ];
    }
}
