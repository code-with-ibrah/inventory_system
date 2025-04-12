<?php

namespace App\Http\Resources\user;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $company = $this->company;
        $role = $this->role;

        return [
            "id" => $this->id,
            "name" => $this->name,
            "email" => $this->email,
            "lastTimeLogin" => $this->lastTimeLogin,
            "password" => $this->password,
            "passwordChanged" => $this->passwordChanged,
            "companyId" => $this->companyId,
            "company" => $company ? [
                "id" => $company->id,
                "name" => $company->name
            ] : null,
            "roleId" => $this->roleId,
            "roleName" => $role ? $role->name : null,
            "isDeleted" => $this->isDeleted,
            "isActive" => $this->isActive
        ];
    }
}
