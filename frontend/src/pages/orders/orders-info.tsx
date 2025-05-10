import {Spin} from "antd";
import {useAppSelector} from "../../hooks";
import {useEffect, useState} from "react";
import SingleItem from "../../common/single-item.tsx";
import {currencyFormat, formatDate} from "../../utils";

const OrdersInfo = () => {
    const order: any = useAppSelector(state => state.order.orderItem);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500)
    }, [loading]);

    return (<Spin spinning={loading}>
        <div className={"mb-5"}>
            <div className={'gap-2 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2'}>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem className={'capitalize'} title={"Status"} value={order?.status}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Order Number"} value={order?.orderNumber}/>
                </div>

                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Date"} value={formatDate(order?.date)}/>
                </div>

                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Customer"} className={'capitalize'} value={order?.customer?.name}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Amount Paid"} value={currencyFormat(Math.abs(+order?.totalPayments))}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Discount Percentage"} value={order?.discount + '%'}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Original Amount"} value={currencyFormat(+order?.originalPrice)}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Discount Amount"} value={currencyFormat(+order?.amount)}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Creator"} value={order?.user?.name}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Payment Status"}
                                value={(+order?.totalPayments >= +order?.amount) ? 'Fully Paid' : 'Partial Payment'}/>
                </div>

            </div>
        </div>
    </Spin>);

}

export default OrdersInfo;