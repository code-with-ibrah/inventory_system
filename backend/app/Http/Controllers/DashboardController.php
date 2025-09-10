<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\GoodsReceipt;
use App\Models\Order;
use App\Models\Product;
use App\Models\Stock;
use App\Models\Supplier;
use App\Utils\Globals;
use Carbon\Carbon;
use Illuminate\Http\Request;


class DashboardController extends Controller
{

    public function statistics(Request $request){
        $fromDate = $request->query("fromDate");
        $toDate = $request->query("toDate");
        $willFilter = $request->query("filter");


        $productCount = Product::where("isDeleted", 0)
            ->where("isActive", 1)
            ->when($willFilter, function ($query) use ($fromDate, $toDate) {
                return $query->whereBetween('created_at', [$fromDate, $toDate]);
            })
            ->count();

        $orderCount = Order::where("isDeleted", 0)
            ->where("isActive", 1)
            ->when($willFilter, function ($query) use ($fromDate, $toDate) {
                return $query->whereBetween('date', [$fromDate, $toDate]);
            })
            ->count();

        $supplierCount = Supplier::where("isDeleted", 0)
            ->where("isActive", 1)
            ->when($willFilter, function ($query) use ($fromDate, $toDate) {
                return $query->whereBetween('created_at', [$fromDate, $toDate]);
            })
            ->count();

        $customerCount = Customer::where("isDeleted", 0)
            ->where("isActive", 1)
            ->when($willFilter, function ($query) use ($fromDate, $toDate) {
                return $query->whereBetween('created_at', [$fromDate, $toDate]);
            })
            ->count();

        $lowStocksCount = Stock::where("isDeleted", 0)
            ->where("isActive", 1)
            ->whereColumn("quantityOnHand", "<=", "stockAlertLevel")
            ->when($willFilter, function ($query) use ($fromDate, $toDate) {
                return $query->whereBetween('created_at', [$fromDate, $toDate]);
            })
            ->count();


//        $totalExpenses = GoodsReceipt::where("isDeleted", 0)
//            ->where("isActive", 1)
//            ->where("isRecorded", 1)
//            ->when($willFilter, function ($query) use ($fromDate, $toDate) {
//                return $query->whereBetween('date', [$fromDate, $toDate]);
//            })->sum("totalAmount");

//        $totalRevenue = Order::where("isDeleted", 0)
//            ->where("isActive", 1)
//            ->where("status", "delivered")
//            ->when($willFilter, function ($query) use ($fromDate, $toDate) {
//                return $query->whereBetween('date', [$fromDate, $toDate]);
//            })->sum("amount");

        $vatPercentage = Globals::VAT_PERCENTAGE;

        $totalRevenue = Order::where("isDeleted", 0)
            ->where("isActive", 1)
            ->where("status", "delivered")
            ->when($willFilter, function ($query) use ($fromDate, $toDate) {
                return $query->whereBetween('date', [$fromDate, $toDate]);
            })
            ->selectRaw("SUM(amount + (amount * $vatPercentage)) as amount")
            ->value('amount');

        $totalExpenses = GoodsReceipt::where("isDeleted", 0)
            ->where("isActive", 1)
            ->where("isRecorded", 1)
            ->when($willFilter, function ($query) use ($fromDate, $toDate) {
                return $query->whereBetween('date', [$fromDate, $toDate]);
            })
            ->selectRaw("SUM(totalAmount + (totalAmount * $vatPercentage)) as amount")
            ->value('amount');


        $pendingOrdersCount = Order::where("isDeleted", 0)
            ->where("isActive", 1)
            ->where("status", "preparing")
            ->when($willFilter, function ($query) use ($fromDate, $toDate) {
                return $query->whereBetween('date', [$fromDate, $toDate]);
            })
            ->count();

        $unrecordedReceiptCount = GoodsReceipt::where("isDeleted", 0)
            ->where("isActive", 1)
            ->where("isRecorded", 0)
            ->when($willFilter, function ($query) use ($fromDate, $toDate) {
                return $query->whereBetween('date', [$fromDate, $toDate]);
            })
            ->count();


        $profit = doubleval($totalRevenue) -  doubleval($totalExpenses);

        $response = [
            'productCount' => $productCount,
            'orderCount' => $orderCount,
            'supplierCount' => $supplierCount,
            'customerCount' => $customerCount,
            'lowStocksCount' => $lowStocksCount,
            'totalExpenses' => $totalExpenses,
            'totalRevenue' => $totalRevenue,
            'pendingOrdersCount' => $pendingOrdersCount,
            'unrecordedReceipt' => $unrecordedReceiptCount,
            'profit' => $profit,
        ];

        return response()->json(["data" => $response]);
    }




    public function statisticsByPeriod(Request $request){
        $filterType = $request->query("filterType");
        $willFilter = true;
        $now = Carbon::now('Africa/Accra');
        $fromDate = $toDate = "";

        switch ($filterType) {
            case 'today':
                $fromDate = $now->copy()->startOfDay()->toDateString();
                $toDate = $now->copy()->endOfDay()->toDateString();
                break;
            case 'yesterday':
                $fromDate = $now->copy()->subDay()->startOfDay()->toDateString();
                $toDate = $now->copy()->subDay()->endOfDay()->toDateString();
                break;
            case 'last_2_days':
                $fromDate = $now->copy()->subDays(2)->startOfDay()->toDateString();
                $toDate = $now->copy()->endOfDay()->toDateString();
                break;
            case 'last_3_days':
                $fromDate = $now->copy()->subDays(3)->startOfDay()->toDateString();
                $toDate = $now->copy()->endOfDay()->toDateString();
                break;
            case 'last_4_days':
                $fromDate = $now->copy()->subDays(4)->startOfDay()->toDateString();
                $toDate = $now->copy()->endOfDay()->toDateString();
                break;
            case 'week':
                $fromDate = $now->copy()->startOfWeek()->toDateString();
                $toDate = $now->copy()->endOfWeek()->toDateString();
                break;
            case 'month':
                $fromDate = $now->copy()->startOfMonth()->toDateString();
                $toDate = $now->copy()->endOfMonth()->toDateString();
                break;
            case 'last_month':
                $fromDate = $now->copy()->subMonth()->startOfMonth()->toDateString();
                $toDate = $now->copy()->subMonth()->endOfMonth()->toDateString();
                break;
            case 'year':
                $fromDate = $now->copy()->startOfYear()->toDateString();
                $toDate = $now->copy()->endOfYear()->toDateString();
                break;
        }


        $productCount = Product::where("isDeleted", 0)
            ->where("isActive", 1)
            ->when($willFilter, function ($query) use ($fromDate, $toDate) {
                return $query->whereBetween('created_at', [$fromDate, $toDate]);
            })
            ->count();

        $orderCount = Order::where("isDeleted", 0)
            ->where("isActive", 1)
            ->when($willFilter, function ($query) use ($fromDate, $toDate) {
                return $query->whereBetween('date', [$fromDate, $toDate]);
            })
            ->count();

        $supplierCount = Supplier::where("isDeleted", 0)
            ->where("isActive", 1)
            ->when($willFilter, function ($query) use ($fromDate, $toDate) {
                return $query->whereBetween('created_at', [$fromDate, $toDate]);
            })
            ->count();

        $customerCount = Customer::where("isDeleted", 0)
            ->where("isActive", 1)
            ->when($willFilter, function ($query) use ($fromDate, $toDate) {
                return $query->whereBetween('created_at', [$fromDate, $toDate]);
            })
            ->count();

        $lowStocksCount = Stock::where("isDeleted", 0)
            ->where("isActive", 1)
            ->where("quantityOnHand", "<=", "stockAlertLevel")
            ->when($willFilter, function ($query) use ($fromDate, $toDate) {
                return $query->whereBetween('created_at', [$fromDate, $toDate]);
            })
            ->count();


        $totalExpenses = GoodsReceipt::where("isDeleted", 0)
            ->where("isActive", 1)
            ->where("isRecorded", 1)
            ->when($willFilter, function ($query) use ($fromDate, $toDate) {
                return $query->whereBetween('date', [$fromDate, $toDate]);
            })
            ->sum("totalAmount");

        $totalRevenue = Order::where("isDeleted", 0)
            ->where("isActive", 1)
            ->where("status", "delivered")
            ->when($willFilter, function ($query) use ($fromDate, $toDate) {
                return $query->whereBetween('date', [$fromDate, $toDate]);
            })
            ->sum("amount");

        $salesAmountCount = Order::where("isDeleted", 0)
            ->where("isActive", 1)
            ->where("status", "delivered")
            ->when($willFilter, function ($query) use ($fromDate, $toDate) {
                return $query->whereBetween('date', [$fromDate, $toDate]);
            })
            ->sum("amount");


        $pendingOrdersCount = Order::where("isDeleted", 0)
            ->where("isActive", 1)
            ->where("status", "preparing")
            ->when($willFilter, function ($query) use ($fromDate, $toDate) {
                return $query->whereBetween('date', [$fromDate, $toDate]);
            })
            ->count();

        $unrecordedReceiptCount = GoodsReceipt::where("isDeleted", 0)
            ->where("isActive", 1)
            ->where("isRecorded", 0)
            ->when($willFilter, function ($query) use ($fromDate, $toDate) {
                return $query->whereBetween('date', [$fromDate, $toDate]);
            })
            ->count();


        $profit = doubleval($totalRevenue) -  doubleval($totalExpenses);

        $response = [
            'productCount' => $productCount,
            'orderCount' => $orderCount,
            'supplierCount' => $supplierCount,
            'customerCount' => $customerCount,
            'lowStocksCount' => $lowStocksCount,
            'totalExpenses' => $totalExpenses,
            'totalRevenue' => $totalRevenue,
            'pendingOrdersCount' => $pendingOrdersCount,
            'unrecordedReceipt' => $unrecordedReceiptCount,
            'profit' => $profit,
        ];

        return response()->json(["data" => $response]);
    }


}
