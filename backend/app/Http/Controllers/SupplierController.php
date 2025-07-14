<?php

namespace App\Http\Controllers;

use App\Http\Api\query\models\SupplierQuery;
use App\Http\Api\response\ApiResponse;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Requests\supplier\SupplierRequest;
use App\Http\Resources\product_supplier\ProductSupplierResource;
use App\Http\Resources\supplier\SupplierResource;
use App\Http\Resources\supplier\SupplierResourceCollection;
use App\Models\GoodsReceipt;
use App\Models\GoodsReceiptPayments;
use App\Models\ProductSupplier;
use App\Models\Supplier;
use App\Utils\Globals;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class SupplierController extends Controller
{
    protected $cachePrefix = "supplier_";

    public function index(Request $request)
    {
        $filter = new SupplierQuery();
        $queryItems = $filter->transform($request);
        $take = $request->query("take");
        $takeIsDefinedInUrl = ($take && intval($take) && $take > 0);
        $perPage = ($takeIsDefinedInUrl ? $take : Globals::getDefaultPaginationNumber());

        $cacheKey = $this->cachePrefix . 'index:' . md5(serialize([
                $queryItems,
                $perPage,
                $request->query('page', 1),
            ]));

        return Cache::remember($cacheKey, $this->cacheTtl, function () use ($queryItems, $perPage) {
            return new SupplierResourceCollection(
                Supplier::where($queryItems)
                    ->with('products')
                    ->paginate($perPage)
                );
        });
    }

    public function store(SupplierRequest $request)
    {
        try{
            $supplier = DB::transaction(function () use ($request) {
                $payload = PrepareRequestPayload::prepare($request);
                $supplier = Supplier::create($payload);
                $supplier->products()->attach($request->productId);
                return $supplier;
            });
            $this->clearCache($this->cachePrefix, $supplier->id);
            return new SupplierResource($supplier);
        }
        catch (\Exception $e){
            return ApiResponse::badRequest($e->getMessage());
        }
    }


    public function products(int $id)
    {
        $productRecords = ProductSupplier::where("productId", $id)->get();
        if ($productRecords->isNotEmpty()) {
            $supplierList = [];
            foreach ($productRecords as $record) {
                $supplier = Supplier::find($record->supplierId);
                if ($supplier) {
                    $supplierInfo = new SupplierResource($supplier);
                    $supplierList[] = $supplierInfo;
                }
            }
            return response()->json(["data" => $supplierList]);
        }
        else {
            return response()->json(["data" => []], 200);
        }
    }



    public function show(Supplier $supplier)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $supplier->id;
        return Cache::rememberForever($cacheKey, function () use ($supplier) {
            return new SupplierResource($supplier->with('products'));
        });
    }


    public function update(SupplierRequest $request, $id)
    {
        try{
            $supplier = DB::transaction(function () use ($request, $id) {
                $supplier = Supplier::with('products')->findOrFail($id);
                $payload = PrepareRequestPayload::prepare($request);
                $supplier->update($payload);
                return $supplier;
            });
            // Clear relevant cache on update
            $this->clearCache($this->cachePrefix, $id); // Use $id here
            return new SupplierResource($supplier);
        }
        catch (\Exception $e){
            return ApiResponse::badRequest($e->getMessage());
        }
    }


    public function destroy(Supplier $supplier, Request $request)
    {
        $shouldDeletePermantely = $request->query("delete");
        if($shouldDeletePermantely){
            $supplier->delete();
        }
        else{
            $supplier->isDeleted = true;
            $supplier->save();
        }
        $this->clearCache($this->cachePrefix, $supplier->id);
        return new SupplierResource($supplier);
    }


    public function handleToggleAction($column, $id)
    {
        $supplier = Supplier::with('products')->findOrFail($id);
        if (!in_array($column, $this->toggleColumn)) {
            return ApiResponse::badRequest("The column, '$column', is not allowed for toggling.");
        }
        $supplier->{$column} = !$supplier->{$column};
        $supplier->save();
        $this->clearCache($this->cachePrefix, $id);
        return new SupplierResource($supplier);
    }

//
//    public function supplierStatements(Request $request)
//    {
//        $supplierId = $request->query("id");
//        $fromDate = $request->query("fromDate");
//        $toDate = $request->query("toDate");
//
//        // Set default date range if not provided
//        if (!$fromDate || !$toDate) {
//            $year = now()->year;
//            $fromDate = $fromDate ?: Carbon::create($year)->startOfYear()->toDateString();
//            $toDate = $toDate ?: Carbon::create($year)->endOfYear()->toDateString();
//        }
//
//        // Fetch goods receipts
//        $receipts = GoodsReceipt::where('supplierId', $supplierId)
//            ->whereBetween('date', [$fromDate, $toDate])
//            ->get()
//            ->map(fn($receipt) => (object) [
//                'date' => $receipt->date,
//                'debit' => (float) $receipt->totalAmount,
//                'credit' => null,
//                'raw_date' => $receipt->created_at,
//            ]);
//
//        // Fetch supplier payments
//        $payments = GoodsReceiptPayments::where('supplierId', $supplierId)
//            ->whereBetween('date', [$fromDate, $toDate])
//            ->get()
//            ->map(fn($payment) => (object) [
//                'date' => $payment->date,
//                'debit' => null,
//                'credit' => (float) $payment->amount,
//                'raw_date' => $payment->created_at,
//            ]);
//
//        // Merge and sort transactions
//        $transactions = $receipts->concat($payments)
//            ->sortBy('date')
//            ->values();
//
//        // Compute running balance
//        $balance = 0;
//        $transactionsWithBalance = $transactions->map(function ($item) use (&$balance) {
//            $debit = $item->debit ?? 0;
//            $credit = $item->credit ?? 0;
//            $balance += ($debit - $credit);
//
//            return [
//                'date' => $item->date,
//                'debit' => $item->debit !== null ? $debit : '',
//                'credit' => $item->credit !== null ? $credit : '',
//                'balance' => $balance,
//            ];
//        });
//
//        return response()->json($transactionsWithBalance);
//    }


    public function supplierStatements(Request $request)
    {
        $supplierId = $request->query("id");
        $fromDate = $request->query("fromDate");
        $toDate = $request->query("toDate");

        // Set default date range if not provided
        if (!$fromDate || !$toDate) {
            $year = now()->year;
            $fromDate = $fromDate ?: Carbon::create($year)->startOfYear()->toDateString();
            $toDate = $toDate ?: Carbon::create($year)->endOfYear()->toDateString();
        }

        // Fetch goods receipts
        $receipts = GoodsReceipt::where('supplierId', $supplierId)
            ->whereBetween('date', [$fromDate, $toDate])
            ->where("isRecorded", 1)
            ->get()
            ->map(fn($receipt) => (object) [
                'date' => $receipt->date,
                'debit' => (float) $receipt->totalAmount,
                'credit' => null,
                'raw_date' => $receipt->created_at,
                'paymentNumber' => $receipt->receiptNumber, // ✅ map receiptNumber to paymentNumber
            ]);

        // Fetch supplier payments
        $payments = GoodsReceiptPayments::where('supplierId', $supplierId)
            ->whereBetween('date', [$fromDate, $toDate])
            ->get()
            ->map(fn($payment) => (object) [
                'date' => $payment->date,
                'debit' => null,
                'credit' => (float) $payment->amount,
                'raw_date' => $payment->created_at,
                'paymentNumber' => $payment->paymentNumber, // ✅ use paymentNumber directly
            ]);

        // Merge and sort transactions
        $transactions = $receipts->concat($payments)
            ->sortBy('date')
            ->values();

        // Compute running balance
        $balance = 0;
        $transactionsWithBalance = $transactions->map(function ($item) use (&$balance) {
            $debit = $item->debit ?? 0;
            $credit = $item->credit ?? 0;
            $balance += ($debit - $credit);

            return [
                'date' => $item->date,
                'debit' => $item->debit !== null ? $debit : '',
                'credit' => $item->credit !== null ? $credit : '',
                'balance' => $balance,
                'paymentNumber' => $item->paymentNumber, // ✅ unified key
            ];
        });

        return response()->json($transactionsWithBalance);
    }









}
