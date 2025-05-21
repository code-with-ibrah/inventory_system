import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {commonQuery} from "../../utils/query.ts";
import {Order} from "../../types/order.ts";
import { currencyFormat, formatDate, getPercentAmount} from "../../utils";
import {getAllOrderItems} from "../../state/orders/item/orderItemAction.ts";
import {Button} from "antd";
import {FiPrinter} from "react-icons/fi";
import {getAllPayments} from "../../state/orders/payments/paymentAction.ts";


const OrdersInvoice = () => {
    const paymentInfo = useAppSelector(state => state.payment.payment);
    const order: Order = useAppSelector(state => state.order.orderItem);
    const {data} = useAppSelector(state => state.orderItem.orderItem);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllOrderItems(commonQuery(`&orderId[eq]=${order?.id}`)));
        dispatch(getAllPayments(commonQuery(`&orderId[eq]=${order?.id}`)));
    }, []);

    const covidPercentage = 6;
    const vatPercentage = 15;


    return <>

        <div className="bg-gray-100 receipt-container">
            <div className="mx-auto bg-white rounded-md p-8">

                <Button
                    icon={<FiPrinter/>}
                    className={'btn btn-primary no-print mb-4'}
                    onClick={() => window.print()}>Print now
                </Button>


                {/* receipt table */}
                <div className=" mx-auto p-4 font-mono text-sm bg-white border border-gray-300 shadow-sm">

                    <div className="fle">
                        <div className="text-center mb-6">
                            <h1 className="text-xl font-semibold">Jessden Ventures</h1>
                            <p className="text-sm text-gray-600">Location: Dome Pillar 2</p>
                            <p className="text-sm text-gray-600">Digital Address: GE-325-9976</p>
                            <p className="text-sm text-gray-600">Phone: 0244411820</p>
                        </div>

                        <div className="flex justify-between mb-4 text-sm">
                            <div>
                                <span className="font-semibold">Invoice No: </span> {order?.orderNumber}
                            </div>
                            <div>
                                <span className="font-semibold">Date:</span> {formatDate(order?.date)}
                            </div>
                        </div>

                        <div className="mb-8 text-sm">
                            <div className={'my-2'}><span
                                className="font-semibold">Customer:</span> {order?.customer?.name}
                            </div>
                            <div className={'my-2 capitalize'}><span className="font-semibold">Status: </span>{order?.status}</div>
                        </div>
                    </div>

                    {/* Product Items Section */}
                    <div className="mb-4">
                        <h3 className="font-bold text-xl text-gray-800 mb-4">Items Purchased</h3>
                        <table className="min-w-full text-sm">
                            <thead>
                            <tr className={'border-b'}>
                                <th className="py-2 text-left text-gray-700">Product</th>
                                <th className="py-2 text-right text-gray-700">Unit Price</th>
                                <th className="py-2 text-right text-gray-700">Qty</th>
                                <th className="py-2 text-right text-gray-700">Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((item: any, index: number) => (
                                <tr key={index} className="border-b border-dashed border-gray-300 last:border-b-0">
                                    <td className="py-2 text-left pr-2">{item?.product?.name}</td>
                                    <td className="py-2 text-right">{item.unitPriceAtSale}</td>
                                    <td className="py-2 text-right">{item?.quantity}</td>
                                    <td className="py-2 text-right">{item?.totalCost}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="border-t border-dashed border-gray-400 my-2"></div>
                    </div>


                    {/* Totals Section */}
                    <div>
                        <table className="min-w-full text-sm">
                            <tbody>
                            <tr>
                                <td colSpan={2}></td>
                                {/* Empty cells for alignment */}
                                <td className="py-1 text-right font-semibold text-gray-800">Subtotal</td>
                                <td className="py-1 text-right font-semibold text-gray-800">{currencyFormat(+order?.amount)}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}></td>
                                <td className="py-1 text-right text-gray-700">NHIL/GetFund/Covid ({covidPercentage}%)
                                </td>
                                <td className="py-1 text-right text-gray-700">{currencyFormat(getPercentAmount(order?.amount, covidPercentage))}</td>
                            </tr>
                            <tr className={'border-b border-dashed border-gray-400 my-2'}>
                                <td colSpan={2}></td>
                                <td className="py-1 text-right text-gray-700">II VAT ({vatPercentage}%)</td>
                                <td className="py-1 text-right text-gray-700">
                                    {currencyFormat(getPercentAmount(order?.amount, vatPercentage))}
                                </td>
                            </tr>

                            <tr>
                                <td colSpan={2}></td>
                                <td className="py-2 text-right font-semibold text-gray-800">Amount Paid</td>
                                <td className="py-2 text-right font-semibold text-gray-800">
                                    {currencyFormat(+order?.totalPayments)}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}></td>
                                <td className="py-2 text-right font-semibold text-gray-800">Payment Status</td>
                                <td className="py-2 text-right font-semibold text-gray-800">
                                    {(+order?.totalPayments >= +order?.amount) ? 'Fully Paid' : 'Partial Payment'}
                                </td>
                            </tr>
                            <tr className={'border-b border-dashed border-b-gray-400'}>
                                <td colSpan={2}></td>
                                <td className="py-2 text-right font-bold text-gray-900">Remaining</td>
                                <td className="py-2 text-right font-bold text-gray-900">
                                    {(+order?.totalPayments >= +order?.amount) ? 'GHS 0.00' : currencyFormat((+order?.amount) - (+order?.totalPayments))}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>


                    {/* payment */}

                    <div
                        className="max-w-md mr-auto p-4 font-mono text-sm bg-white shadow-sm mb-6">
                        <div className="text-center mb-4">
                            <h2 className="text-xl font-bold my-2 text-gray-800 text-left">Payment History</h2>
                        </div>

                        <table className="min-w-full text-sm">
                        <thead>
                            <tr className={'border-b'}>
                                <th className="py-2 text-left font-medium text-gray-700">Date</th>
                                <th className="py-2 text-right font-medium text-gray-700">Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {paymentInfo?.data && paymentInfo.data.length > 0 ? (
                                paymentInfo.data.map((item: any, index: number) => (
                                    <tr key={index} className="border-b border-dashed border-gray-300 last:border-b-0">
                                        <td className="py-2 text-left pr-2">
                                            {formatDate(item?.date)}
                                        </td>
                                        <td className="py-2 text-right">
                                            {currencyFormat(+item?.amount)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={2} className="py-2 text-gray-500">
                                        No payment records found for this order.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>

                    </div>


                    {/* Receipt Footer (Optional - add thank you message, return policy) */}
                    <div className="text-center mt-6 pt-4 border-t border-dashed border-gray-400">
                        <p className="text-gray-700">Thank you for your purchase!</p>
                    </div>

                </div>

            </div>
        </div>

    </>
}


export default OrdersInvoice;