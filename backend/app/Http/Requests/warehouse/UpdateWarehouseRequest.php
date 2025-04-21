<?php

namespace App\Http\Requests\warehouse;

use Illuminate\Foundation\Http\FormRequest;

class UpdateWarehouseRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "name" => ["required", "min:3", "unique:warehouses,name"],
            "location" => ["required"],
            "creatorId" => ["required", "exists:users,id"],
            "companyId" => ["required", "exists:companies,id"]
        ];
    }
}
