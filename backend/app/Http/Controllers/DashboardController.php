<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\Supplier;

class DashboardController extends Controller
{

    public function statistics(){
        $productCount = Product::where("isDeleted", 0)
            ->where("isActive", 1)
            ->count();

        $orderCount = Order::where("isDeleted", 0)
            ->where("isActive", 1)
            ->count();

        $supplierCount = Supplier::where("isDeleted", 0)
            ->where("isActive", 1)
            ->count();





    }


}
