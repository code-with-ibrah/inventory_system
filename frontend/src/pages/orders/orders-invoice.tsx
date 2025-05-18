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
                            <span className="font-semibold">Invoice No: </span> {order?.orderNumber}
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
                            <th className="px-4 py-2">Product</th>
                            <th className="px-4 py-2">Unit Price</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item: any, index: number) => {
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

    </>
}


export default OrdersInvoice;