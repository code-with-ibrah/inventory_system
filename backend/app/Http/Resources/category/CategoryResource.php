<?php

namespace App\Http\Resources\category;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $children = $this->children;
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
            ],
            "children" => $children ? $children->map(function ($child) {
                return [
                    "id" => $child->id,
                    "name" => $child->name,
                ];
            }) : null,
            "_count" => [
                "children" => count($children)
            ]
        ];
    }
}
