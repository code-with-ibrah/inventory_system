import React from "react";
import Column from "antd/es/table/Column";
import {Button} from "antd";
import {FiEdit3, FiPlusCircle} from "react-icons/fi";
import TlaTableWrapper from "../../common/tla-table-wrapper.tsx";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";
import {commonQuery} from "../../utils/query.ts";
import {currencyFormat, formatDate} from "../../utils";
import {MenuLinks} from "../../utils/menu-links.ts";
import TlaDelete from "../../common/tla-delete.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks";
import TableActions from "../../common/table-actions.tsx";
import {useNavigate} from "react-router-dom";
import {deleteOrders, getAllOrders} from "../../state/orders/receiptAction.ts";
import {Order} from "../../types/order.ts";
import {setOrderItem} from "../../state/orders/orderSlice.ts";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import SearchInput from "../../common/search-input.tsx";



const Orders: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.order.order);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const goToDetails = (record: any) => {
        dispatch(setOrderItem(record));
        navigate(MenuLinks.admin.order.details.index);
    };


    return (
        <>
            <div className={'bg-white rounded-2xl p-5'}>
                <TlaOpen to={MenuLinks.admin.order.form}>
                    <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
                </TlaOpen>

                <div className={'flex-1 my-5'}>
                    <SearchInput placeholderColumn={'order number'} getData={getAllOrders} columns={["orderNumber"]}/>
                </div>

                <TlaTableWrapper getData={getAllOrders} data={data} filter={commonQuery()} meta={meta}>
                    <Column
                        title="Order Number"
                        render={(record: Order) => (
                            <span className={'cursor-pointer underline'} onClick={() => goToDetails(record)}>
                            {record?.orderNumber ?? "view details"}
                        </span>
                        )}/>

                    <Column title="Date" render={(record: Order) => <span>{formatDate(record?.date)}</span>}/>
                    <Column title="Customer" render={(record: Order) => <span>{record?.customer?.name}</span>}/>
                    <Column title="Discount Percentage" render={(record: Order) => <span>{record?.discount}%</span>}/>
                    <Column title="Discount Amount"
                            render={(record: Order) => <span>{currencyFormat(+record?.amount)}</span>}/>
                    <Column title="Status" className={'capitalize'} dataIndex={"status"}/>
                    <Column title="Total Paid Amount"
                            render={(record: Order) => <span>{currencyFormat(+record?.totalPayments)}</span>}/>
                    {/*<Column title="Payment Status" render={(record: Order) => <span>*/}
                    {/*    {(+record?.totalPayments >= +record?.amount) ? 'Fully Paid' : 'Partial Payments'}*/}
                    {/*</span>}/>*/}

                    <Column title={'Action'} render={(record) => (
                        <TableActions items={[
                            {
                                key: '1',
                                label: (
                                    <TlaOpen data={record} modal={true} to={MenuLinks.admin.order.form}>
                                        <FiEdit3/>
                                        Edit
                                    </TlaOpen>
                                ),
                            },
                            {
                                key: '2',
                                label: (
                                    <TlaOpen data={record} modal={true} to={MenuLinks.admin.order.details.statusForm}>
                                        <MdOutlineSystemUpdateAlt/>
                                        Update Status
                                    </TlaOpen>
                                ),
                            },
                            {
                                key: '3',
                                label: (
                                    <TlaDelete title={'order'} column={record.id} callBack={deleteOrders}/>
                                ),
                            }
                        ]}/>
                    )}/>
                </TlaTableWrapper>
            </div>
        </>
    )
}

export default Orders;
