import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {commonQuery} from "../../utils/query.ts";
import {Order} from "../../types/order.ts";
import { currencyFormat, formatDate, getPercentAmount} from "../../utils";
import {getAllOrderItems} from "../../state/orders/item/orderItemAction.ts";
import {Button} from "antd";
import {FiPrinter} from "react-icons/fi";


const OrdersInvoice = () => {
    const order: Order = useAppSelector(state => state.order.orderItem);
    const {data} = useAppSelector(state => state.orderItem.orderItem);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllOrderItems(commonQuery(`&orderId[eq]=${order?.id}`)));
    }, []);

    const covidPercentage = 6;
    const vatPercentage = 15;


    return <>

        <div className="bg-gray-100 receipt-container">
            <div className="mx-auto bg-white rounded-md p-8">

                <Button
                    icon={<FiPrinter/>}
                    className={'btn btn-primary no-print'}
                    onClick={() => window.print()}>Print now
                </Button>

                <div className="fle">
                    <div className="text-center mb-6">
                        <h1 className="text-xl font-semibold">Jessden Ventures</h1>
                        <p className="text-sm text-gray-600">Location: Dome Pillar 2</p>
                        <p className="text-sm text-gray-600">Digital Address: GE-325-9976</p>
                        <p className="text-sm text-gray-600">Phone: 0244411820</p>
                    </div>

                    <div className="flex justify-between mb-4 text-sm">
                        <div>
                            <span className="font-semibold">Invoice No.:</span> {order?.orderNumber}
                        </div>
                        <div>
                            <span className="font-semibold">Date:</span> {formatDate(order?.date)}
                        </div>
                    </div>

                    <div className="mb-8 text-sm">
                        <div className={'my-2'}><span className="font-semibold">Customer:</span> {order?.customer?.name}</div>
                        <div className={'my-2'}><span className="font-semibold">Payable To:</span> Jessden Ventres</div>
                        <div className={'my-2'}><span className="font-semibold">Description:</span> Purchase of goods</div>
                        <div className={'my-2 capitalize'}><span className="font-semibold">Status: </span>{ order?.status }</div>
                    </div>
                </div>

                <div className="overflow-x-auto mb-4">
                    <table className="min-w-full table-auto text-left text-sm font-mono">
                        <thead className="bg-gray-300">
                        <tr>
                            <th className="px-4 py-2">Deliverables</th>
                            <th className="px-4 py-2">Unit Price</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item: any, index: number) => {
                            // subTotal += ((item.unitPriceAtSale) * (item.quantity));

                            return <tr key={index}>
                                <td className="border px-4 py-2">{item?.product?.name}</td>
                                <td className="border px-4 py-2 font-medium">{item.unitPriceAtSale}</td>
                                <td className="border px-4 py-2">{item?.quantity}</td>
                                    <td className="border px-4 py-2">{item?.totalCost}</td>
                                </tr>
                            })}
                        </tbody>


                        <br/>
                        <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td className="border px-4 py-2 font-semibold">Subtotal</td>
                            <td className="border px-4 py-2">{currencyFormat(+order?.amount)}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td className="border px-4 py-2 font-semibold">NHIL/GetFund/Covid ({covidPercentage}%)</td>
                            <td className="border px-4 py-2">{currencyFormat(getPercentAmount(order?.amount, covidPercentage))}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td className="border px-4 py-2 font-semibold">II VAT ({vatPercentage}%)</td>
                            <td className="border px-4 py-2">
                                {currencyFormat(getPercentAmount(order?.amount, vatPercentage))}
                            </td>
                        </tr>

                        <tr>
                            <td></td>
                            <td></td>
                            <td className="border px-4 py-2 font-semibold">Amount Paid</td>
                            <td className="border px-4 py-2">
                                {(+order?.totalPayments >= +order?.amount) ? 'Fully Paid' : currencyFormat(order?.totalPayments) }
                            </td>
                        </tr>

                        <tr>
                            <td></td>
                            <td></td>
                            <td className="border px-4 py-2 font-semibold">Remaining</td>
                            <td className="border px-4 py-2">
                                {(+order?.totalPayments >= +order?.amount) ? 'GHS 0.00' : currencyFormat((+order?.amount) - (+order?.totalPayments)) }
                            </td>
                        </tr>


                        </tfoot>
                    </table>
                </div>


                <div className="mb-4 text-xs text-gray-700 text-center my-20">
                    <h2 className="font-semibold mb-1">Terms:</h2>
                    <p>100% 30 days deferred Payment after complete installation Production Leadtime is 3 days</p>
                </div>

                <div className="text-center text-sm text-gray-600 mt-6">
                    <p>Thank you for your business!</p>
                </div>
            </div>
        </div>








        {/*<div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 receipt-content">*/}
        {/*    <div className="text-center mb-4">*/}
        {/*        <h1 className="dancing-script text-3xl font-bold text-gray-800">Receipt</h1>*/}
        {/*        <div className="text-sm text-gray-600">*/}
        {/*            <p>123 Main Street</p>*/}
        {/*            <p>Accra, Ghana</p>*/}
        {/*            <p>Tel: 05XXXXXXXX</p>*/}
        {/*        </div>*/}
        {/*    </div>*/}

        {/*    <div className="flex justify-between text-sm text-gray-700 mb-2">*/}
        {/*        <div>Date: 2024-08-03</div>*/}
        {/*        <div>Time: 14:35</div>*/}
        {/*    </div>*/}

        {/*    <div className="overflow-x-auto">*/}
        {/*        <table className="min-w-full table-auto text-sm">*/}
        {/*            <thead className="bg-gray-100">*/}
        {/*            <tr>*/}
        {/*                <th className="px-2 py-1 text-left text-gray-700">Product</th>*/}
        {/*                <th className="px-2 py-1 text-right text-gray-700">Qty</th>*/}
        {/*                <th className="px-2 py-1 text-right text-gray-700">Unit Price</th>*/}
        {/*                <th className="px-2 py-1 text-right text-gray-700">Total Cost</th>*/}
        {/*            </tr>*/}
        {/*            </thead>*/}
        {/*            <tbody className="divide-y divide-gray-200">*/}
        {/*            <tr className="border-bottom-dotted">*/}
        {/*                <td className="px-2 py-1 text-gray-700">Item 1</td>*/}
        {/*                <td className="px-2 py-1 text-right text-gray-600">2</td>*/}
        {/*                <td className="px-2 py-1 text-right text-gray-600">10.00</td>*/}
        {/*                <td className="px-2 py-1 text-right text-gray-800 font-semibold">20.00</td>*/}
        {/*            </tr>*/}
        {/*            <tr className="border-bottom-dotted">*/}
        {/*                <td className="px-2 py-1 text-gray-700">Item 2</td>*/}
        {/*                <td className="px-2 py-1 text-right text-gray-600">1</td>*/}
        {/*                <td className="px-2 py-1 text-right text-gray-600">25.00</td>*/}
        {/*                <td className="px-2 py-1 text-right text-gray-800 font-semibold">25.00</td>*/}
        {/*            </tr>*/}
        {/*            <tr className="border-bottom-dotted">*/}
        {/*                <td className="px-2 py-1 text-gray-700">Item 3</td>*/}
        {/*                <td className="px-2 py-1 text-right text-gray-600">3</td>*/}
        {/*                <td className="px-2 py-1 text-right text-gray-600">15.50</td>*/}
        {/*                <td className="px-2 py-1 text-right text-gray-800 font-semibold">46.50</td>*/}
        {/*            </tr>*/}
        {/*            </tbody>*/}
        {/*        </table>*/}
        {/*    </div>*/}

        {/*    <div className="border-t border-dashed border-gray-300 my-2"></div>*/}

        {/*    <div className="flex justify-between items-center py-2">*/}
        {/*        <div className="text-lg font-bold text-gray-800">AMOUNT</div>*/}
        {/*        <div className="text-lg font-bold text-gray-800">91.50</div>*/}
        {/*    </div>*/}

        {/*    <div className="pt-2">*/}
        {/*        <div className="flex justify-between text-sm text-gray-700">*/}
        {/*            <div>Sub-total</div>*/}
        {/*            <div>91.50</div>*/}
        {/*        </div>*/}
        {/*        <div className="flex justify-between text-sm text-gray-700">*/}
        {/*            <div>Sales Tax</div>*/}
        {/*            <div>0.00</div>*/}
        {/*        </div>*/}
        {/*        <div className="flex justify-between text-sm text-gray-700">*/}
        {/*            <div>Balance</div>*/}
        {/*            <div>91.50</div>*/}
        {/*        </div>*/}
        {/*    </div>*/}

        {/*    <div className="text-center mt-4">*/}
        {/*        <div className="w-48 h-12 bg-gray-300 mx-auto rounded-md flex items-center justify-center">*/}
        {/*            <span className="text-xs text-gray-700">Barcode Here</span>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*    <div className="mt-4 pt-4 border-t border-gray-200 text-center text-xs text-gray-500 no-print">*/}
        {/*        Thank you for your purchase.*/}
        {/*    </div>*/}
        {/*</div>*/}






    </>
}


export default OrdersInvoice;