import React from "react";
import {Button} from "antd";
import Column from "antd/es/table/Column";
import {useAppSelector} from "../../hooks";
import {Order} from "../../types/order.ts";
import {commonQuery} from "../../utils/query.ts";
import {MenuLinks} from "../../utils/menu-links.ts";
import TlaDelete from "../../common/tla-delete.tsx";
import {currencyFormat, formatDate} from "../../utils";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";
import TableActions from "../../common/table-actions.tsx";
import {FiEdit3, FiPlusCircle} from "react-icons/fi";
import TlaTableWrapper from "../../common/tla-table-wrapper.tsx";
import {deletePayment, getAllPayments} from "../../state/orders/payments/paymentAction.ts";
import SingleItem from "../../common/single-item.tsx";
import {TlaSuccessTag} from "../../common/tla-tag.tsx";



const OrderPayments: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.payment.payment);
    const order = useAppSelector(state => state.order.orderItem);

    
    return (
        <>
            <div className={'grid gap-3 md:grid-cols-3 sm:grid-cols-2 my-5'}>

                <div className={'bg-white rounded-xl p-5'}>
                    <SingleItem title={'Amount to pay'} value={currencyFormat(+order?.amount)}/>
                </div>

                <div className={'bg-white rounded-xl p-5'}>
                    <SingleItem title={'Amount Paid'} value={currencyFormat(+order?.totalPayments)}/>
                </div>

                <div className={'bg-white rounded-xl p-5'}>

                    <div className={''}>
                        <p className={'text-gray-500 font-medium text-md'}>Remaining Balance</p>
                        <div>
                            <p className={'font-medium'}>
                                {(+order?.amount >= +order?.totalPayments)
                                        ? <span> {currencyFormat(+order?.amount - +order?.totalPayments)} </span>
                                        : <span> {currencyFormat(0)} </span>
                                }
                            </p>
                        </div>
                    </div>


                </div>
            </div>


            <div className={'bg-white rounded-2xl p-5'}>

                <p className={'font-medium uppercase flex gap-2'}>
                    Payments Records
                    {!(+order?.amount >= +order?.totalPayments) ? <TlaSuccessTag text={'Successfully Paid'}/> : null}
                </p>

                {order?.status.toLowerCase() != "cancelled" ?
                    (+order?.amount >= +order?.totalPayments) ?
                        <TlaOpen to={MenuLinks.admin.order.details.paymentForm}>
                            <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
                        </TlaOpen> : null
                    : null
                }

                <TlaTableWrapper getData={getAllPayments} data={data} filter={commonQuery(`&orderId[eq]=${order?.id}`)}
                                 meta={meta}>
                    <Column title="Date" render={(record: Order) => <span>{formatDate(record?.date)}</span>}/>
                    <Column title="Amount" render={(record: Order) => <span>{currencyFormat(+record?.amount)}</span>}/>

                    <Column title={'Action'} render={(record) => (
                        <TableActions items={[
                            {
                                key: '1',
                                label: (
                                    <TlaOpen data={record} modal={true} to={MenuLinks.admin.order.details.paymentForm}>
                                        <FiEdit3/>
                                        Edit
                                    </TlaOpen>
                                ),
                            },
                            {
                                key: '2',
                                label: (
                                    <TlaDelete title={'order'} column={record.id} callBack={deletePayment}/>
                                ),
                            }
                        ]}/>
                    )}/>
                </TlaTableWrapper>
            </div>
        </>
    )
}

export default OrderPayments;
