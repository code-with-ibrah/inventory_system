import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";
import { commonQuery } from "../../utils/query.ts";
import { Order } from "../../types/order.ts";
import { currencyFormat, formatDate, getPercentAmount } from "../../utils";
import { getAllOrderItems } from "../../state/orders/item/orderItemAction.ts";
import { Button } from "antd";
import { FiPrinter } from "react-icons/fi";
import { getAllPayments } from "../../state/orders/payments/paymentAction.ts";


const OrdersInvoice = () => {
    const order: Order = useAppSelector(state => state.order.orderItem);
    const { data } = useAppSelector(state => state.orderItem.orderItem);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllOrderItems(commonQuery(`&orderId[eq]=${order?.id}`)));
        dispatch(getAllPayments(commonQuery(`&orderId[eq]=${order?.id}`)));
    }, []);

    const vatPercentage = 3;
    const vatAmount = getPercentAmount(order?.amount, vatPercentage);

    return <>

        <div className="bg-gray-100 receipt-container">
            <div className="mx-auto bg-white rounded-md p-8">

                <Button
                    icon={<FiPrinter />}
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
                        </div>
                    </div>

                    {/* Product Items Section */}
                    <div className="mb-4">
                        <h3 className="font-bold text-xl text-gray-800 mb-4">Items Purchased</h3>
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-300">
                                <tr className={'border-b'}>
                                    <th className="py-2 text-left text-gray-700">Product</th>
                                    <th className="py-2 text-right text-gray-700">Unit Price</th>
                                    <th className="py-2 text-right text-gray-700">Qty</th>
                                    <th className="py-2 text-right text-gray-700">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item: any, index: number) => (
                                    <tr key={index} className="border-b border-gray-300 last:border-b-0">
                                        <td className="py-2 text-left pr-2">{item?.product?.name}</td>
                                        <td className="py-2 text-right">{item.unitPriceAtSale}</td>
                                        <td className="py-2 text-right">{item?.quantity}</td>
                                        <td className="py-2 text-right">{item?.totalCost}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="border-t border-gray-400 my-2"></div>
                    </div>


                    {/* Totals Section */}
                    <div>
                        <table className="min-w-full text-sm">
                            <tbody>
                                <tr>
                                    <td colSpan={6}></td>
                                    <td className="border px-4 py-2 font-semibold">II VAT ({vatPercentage}%)</td>
                                    <td className="border px-4 py-2 font-semibold">
                                        {currencyFormat(+vatAmount)}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={6}></td>
                                    <td className="border px-4 py-2 font-semibold">Subtotal</td>
                                    <td className="border px-4 py-2 font-semibold">{currencyFormat(+order?.amount)}</td>
                                </tr>
                                 <tr>
                                    <td colSpan={6}></td>
                                    <td className="border px-4 py-2 font-semibold">Grand Total</td>
                                    <td className="border px-4 py-2 font-semibold">{currencyFormat(+order?.amount + +order?.amount)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Receipt Footer (Optional - add thank you message, return policy) */}
                    <div className="text-center mt-6 pt-4 border-gray-400">
                        <p className="text-gray-700">Thank you for your purchase!</p>
                    </div>

                </div>

            </div>
        </div>

    </>
}


export default OrdersInvoice;