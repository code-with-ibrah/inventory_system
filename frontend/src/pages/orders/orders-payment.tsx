import React, {useEffect} from "react";
import {Button} from "antd";
import Column from "antd/es/table/Column";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Order} from "../../types/order.ts";
import {commonQuery} from "../../utils/query.ts";
import {MenuLinks} from "../../utils/menu-links.ts";
import {currencyFormat, formatDate} from "../../utils";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";
import {FiPlusCircle} from "react-icons/fi";
import TlaTableWrapper from "../../common/tla-table-wrapper.tsx";
import {deletePayment, getAllPayments} from "../../state/orders/payments/paymentAction.ts";
import {TlaErrorTag, TlaSuccessTag} from "../../common/tla-tag.tsx";
import {unwrapResult} from "@reduxjs/toolkit";
import {resetState, updateState} from "../../state/errorSlice.ts";
import TlaConfirm from "../../common/tla-confirm.tsx";
import {decreaseOrderPayment, setOrderItem} from "../../state/orders/orderSlice.ts";
import {orderStatus} from "../../utils/order-status.ts";
import {updateOrderStatus} from "../../state/orders/receiptAction.ts";



const OrderPayments: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.payment.payment);
    const order = useAppSelector(state => state.order.orderItem);
    const dispatch = useAppDispatch();
    const currentOrderStatus = (order?.status) ? order.status : "preparing";
    const orderHasBeenPaidInFull = +order?.amount > 0 && +order?.totalPayments >= +order?.amount;

    useEffect(() => {
        if(orderHasBeenPaidInFull && currentOrderStatus.toLowerCase() != orderStatus.delivered){
            const data = {...order};
            data.status = orderStatus.delivered;
            dispatch(updateOrderStatus({ data: data, id: data?.id}))
                .then(unwrapResult)
                .then((updatedOrder: any) => {
                    dispatch(setOrderItem(updatedOrder))
                })
        }
    }, [currentOrderStatus, order]);


    return (
        <>
            <div className={'bg-white rounded-2xl p-5'}>

                <div className="flex items-center gap-2">
                    {currentOrderStatus && currentOrderStatus.toLowerCase() != "cancelled" ?
                        (+order?.amount >= +order?.totalPayments) ?
                            <TlaOpen to={MenuLinks.admin.order.details.paymentForm}>
                                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
                            </TlaOpen> : null
                        : null
                    }
                </div>

                <TlaTableWrapper getData={getAllPayments} data={data} filter={commonQuery(`&orderId[eq]=${order?.id}`)} meta={meta}>
                    <Column title="Date" render={(record: Order) => <span>{formatDate(record?.date)}</span>}/>
                    <Column title="Amount" render={(record: Order) => <span>{currencyFormat(+record?.amount)}</span>}/>

                    <Column title={'Action'} render={(record) => <div className={'flex items-center gap-2'}>
                        {/* <TlaEdit data={record} link={MenuLinks.admin.order.details.paymentForm}/> */}

                        {order?.status != orderStatus.cancelled ?
                            <>
                                {(+order?.amount >= +order?.totalPayments) ? <TlaConfirm
                                    title={'Confirm Delete'}
                                    fullText={`Do you really want to delete this order payment ?`}
                                    callBack={() => {
                                        dispatch(deletePayment(record?.id))
                                            .then(unwrapResult)
                                            .then((res: any) => {
                                                dispatch(decreaseOrderPayment(res?.amount))

                                                dispatch(updateState({
                                                    status: "succeeded",
                                                    message: `Payment Deleted Successfully`
                                                }))
                                            })
                                            .catch((obj) => {
                                                dispatch(updateState({
                                                    status: "failed",
                                                    errors: obj.errors
                                                }))
                                            }).finally(() => dispatch(resetState()))
                                    }}>
                                    Delete
                                </TlaConfirm> : <TlaSuccessTag text={'Recorded'}/>}
                            </>

                            : <TlaErrorTag text={'Cancelled'}/>
                        }


                    </div>}/>
                </TlaTableWrapper>
            </div>
        </>
    )
}

export default OrderPayments;
