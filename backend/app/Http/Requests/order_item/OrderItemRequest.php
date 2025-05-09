<?php

namespace App\Http\Requests\order_item;

use Illuminate\Foundation\Http\FormRequest;

class OrderItemRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "*.orderId" => ["required", "exists:orders,id"],
            "*.productId" => ["required", "exists:products,id"],
            "*.quantity" => ["required", "numeric"],
//            "*.unitPriceAtSale" => ["required", "numeric"],
        ];
    }
}
