import {Empty, Spin} from "antd";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect, useState} from "react";
import SingleItem from "../../common/single-item.tsx";
import {currencyFormat, formatDate} from "../../utils";
import {commonQuery} from "../../utils/query.ts";
import {getAllOrderItems} from "../../state/orders/item/orderItemAction.ts";

const OrdersInfo = () => {
    const order: any = useAppSelector(state => state.order.orderItem);
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const {data: orderItems} = useAppSelector(state => state.orderItem.orderItem);


    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500)

        dispatch(getAllOrderItems(commonQuery(`&orderId[eq]=${order?.id}`)));

    }, [loading]);


    return (<Spin spinning={loading}>

        <p className={'font-medium text-xl mt-5 mb-2'}>Order Summery</p>
        <div className={"mb-5"}>
            <div className={'gap-2 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2'}>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Order Number"} value={order?.orderNumber}/>
                </div>

                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem className={'capitalize'} title={"Status"} value={order?.status ?? 'Preparing '}/>
                </div>

                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Date"} value={formatDate(order?.date)}/>
                </div>

                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Customer"} className={'capitalize'} value={order?.customer?.name}/>
                </div>


            </div>


            <p className={'font-medium text-xl  mt-5 mb-2'}>Order Items</p>

            <div className="max-w-4xl bg-white rounded-lg shadow-md p-6 receipt-content">

                <div className="overflow-x-auto mr-auto">
                    <table className="min-w-full table-auto text-sm">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-left text-gray-700">#</th>
                            <th className="p-2 text-left text-gray-700">Product</th>
                            <th className="p-2 text-right text-gray-700">Qty</th>
                            <th className="p-2 text-right text-gray-700">Unit Price</th>
                            <th className="p-2 text-right text-gray-700">Total Cost</th>
                        </tr>
                        </thead>

                        <tbody className="">

                        {orderItems.length ? orderItems.map((item: any, index) => (
                            <tr key={item?.id} className={'divide-y divide-gray-200'}>
                                <td className="p-2 whitespace-nowrap text-gray-700 text-left">
                                    <span className="">{++index}</span>
                                </td>
                                <td className="p-2 whitespace-nowrap text-gray-700 text-left">
                                    <span className="">{item?.product?.name}</span>
                                </td>
                                <td className="p-2 whitespace-nowrap text-gray-700 text-right">
                                    <span className="text-gray-700">{item?.quantity}</span>
                                </td>
                                <td className="p-2 whitespace-nowrap text-gray-700 text-right">
                                    <span className="text-gray-700">{item?.unitPriceAtSale}</span>
                                </td>
                                <td className="p-2 whitespace-nowrap text-gray-700 text-right">
                                    <span className="font-medium ">{currencyFormat(+item?.totalCost)}</span>
                                </td>
                            </tr>
                        )) : <Empty className={'p-5'} description={'No items were found for this order.'}/>}


                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    </Spin>);

}

export default OrdersInfo;