<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use App\Utils\Globals;
use Illuminate\Http\Request;
use Carbon\Carbon;


class PaymentOrderTotalsController extends Controller
{
    public function index($customerId){
        $totalPayments = Payment::where("customerId", $customerId)->sum("amount");
        $totalOrders = Order::where("customerId", $customerId)->sum("amount");

        return response()->json([
            "data" => [
                "totalPayment" => $totalPayments,
                "totalOrders" => $totalOrders,
                "remaining" => doubleval($totalOrders) - doubleval($totalPayments),
                "hasPaidMore" => ($totalPayments >= $totalOrders)
            ]
        ]);
    }



        public function customerStatements(Request $request)
        {
            $fromDate = $request->query("fromDate");
            $toDate = $request->query("toDate");
            $customerId = $request->query("id");

            if (!$fromDate || !$toDate) {
                $year = 1500;
                $fromDate = $fromDate ?: Carbon::create($year)->startOfYear()->toDateString();
                $toDate = $toDate ?: Carbon::create(now()->year)->endOfYear()->toDateString();
            }

            $orders = Order::where('customerId', $customerId)
                ->whereBetween('date', [$fromDate, $toDate])
                ->where("status", "!=", "cancelled")
                ->get()
                ->map(function ($order) {
                    $amount = floatval($order->amount);
                    $vat = $amount * Globals::VAT_PERCENTAGE;
                    $grandTotal = $amount + $vat;

                    return [
                        'date' => $order->date,
//                        'debit' => $amount,
                        'credit' => null,
                        'raw_date' => $order->created_at,
                        'paymentNumber' => $order->orderNumber,
                        'debit' => round($grandTotal, 2),
                    ];
                });



            $payments = Payment::where('customerId', $customerId)
                ->whereBetween('date', [$fromDate, $toDate])
                ->get()
                ->map(function ($payment) {
                    return [
                        'date' => $payment->date,
                        'debit' => null,
                        'credit' => floatval($payment->amount),
                        'raw_date' => $payment->created_at,
                        'paymentNumber' => $payment->paymentNumber,
                    ];
                });

            // Combine and sort all transactions
            $transactions = $orders->merge($payments)->sortBy('date')->values();

            // Add running balance
            $balance = 0;
            $transactionsWithBalance = $transactions->map(function ($item) use (&$balance) {
                $debit = $item['debit'] ?? 0;
                $credit = $item['credit'] ?? 0;
                $balance += ($debit - $credit);

                return [
                    'date' => $item['date'],
                    'debit' => $item['debit'] !== null ? $debit : '',
                    'credit' => $item['credit'] !== null ? $credit : '',
                    'balance' => $balance,
                    'paymentNumber' => $item['paymentNumber'],
                ];
            });

            return $transactionsWithBalance;
        }





}
