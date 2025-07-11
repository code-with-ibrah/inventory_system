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
import {unwrapResult} from "@reduxjs/toolkit";
import {resetState, updateState} from "../../state/errorSlice.ts";
import TlaConfirm from "../../common/tla-confirm.tsx";
import {TlaSuccessTag} from "../../common/tla-tag.tsx";
import SingleItem from "../../common/single-item.tsx";
import {getAllCustomerPaymentStats} from "../../state/customer/customerAction.ts";



const CustomerPayments: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.payment.payment);
    const customer = useAppSelector(state => state.customer.customerItem);
    const customerOrderPayment = useAppSelector(state => state.customer.customerOrderStats?.data);
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(getAllCustomerPaymentStats(customer?.id))
            .then(unwrapResult);
    }, []);


    return (
        <>
            <div className={'grid gap-3 md:grid-cols-3 sm:grid-cols-2 my-5'}>
                <div className={'bg-white rounded-xl p-5'}>
                    <SingleItem title={'Total Cost'} value={currencyFormat(+customerOrderPayment?.totalOrders) ?? '0'}/>
                </div>

                <div className="bg-white rounded-xl p-5">
                    <SingleItem title={'Amount Paid'} value={currencyFormat(Math.abs(+customerOrderPayment?.totalPayment)) ?? '0'}/>
                </div>

                {customerOrderPayment?.hasPaidMore ?
                    <div className="bg-white rounded-xl p-5">
                        <SingleItem title={'Balance'} value={currencyFormat(Math.abs(+customerOrderPayment?.remaining)) ?? '0'}/>
                    </div>
                    :
                    <div className="bg-white rounded-xl p-5">
                        <SingleItem title={'Remaining'} value={currencyFormat(+customerOrderPayment?.remaining) ?? '0'}/>
                    </div>}

            </div>


            <div className={'bg-white rounded-2xl p-5'}>
                <TlaOpen to={MenuLinks.admin.customers.details.paymentForm}>
                    <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
                </TlaOpen>

                <TlaTableWrapper getData={getAllPayments} data={data} filter={commonQuery(`&customerId[eq]=${customer?.id}`)} meta={meta}>
                    <Column title="Date" render={(record: Order) => <span>{formatDate(record?.date)}</span>}/>
                    <Column title="Amount" render={(record: Order) => <span>{currencyFormat(+record?.amount)}</span>}/>

                    <Column title={'Action'} render={(record) => <div className={'flex items-center gap-2'}>
                        {/* <TlaEdit data={record} link={MenuLinks.admin.order.details.paymentForm}/> */}


                            <>
                                <TlaConfirm
                                    title={'Confirm Delete'}
                                    fullText={`Do you really want to delete this order payment ?`}
                                    callBack={() => {
                                        dispatch(deletePayment(record?.id))
                                            .then(unwrapResult)
                                            .then((_: any) => {
                                                dispatch(getAllCustomerPaymentStats(customer?.id))
                                                    .then(unwrapResult);

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
                                </TlaConfirm>  <TlaSuccessTag text={'Recorded'}/>
                            </>

                    </div>}/>
                </TlaTableWrapper>
            </div>
        </>
    )
}

export default CustomerPayments;
