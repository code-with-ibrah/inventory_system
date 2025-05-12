<?php

namespace App\Http\Requests\user;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "name" => ["required"],
//            "email" => ["required", "unique:users,email"],
            "roleId" => ["required", "exists:roles,id"],
            "companyId" => ["required", "exists:companies,id"]
        ];
    }
}
