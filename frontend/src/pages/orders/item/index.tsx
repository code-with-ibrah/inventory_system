import React from "react";
import Column from "antd/es/table/Column";
import { MenuLinks } from "../../../utils/menu-links.ts";
import TlaTableWrapper from "../../../common/tla-table-wrapper.tsx";
import {commonQuery} from "../../../utils/query.ts";
import {Product} from "../../../types/product.ts";
import TlaEdit from "../../../common/tla-edit.tsx";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {deleteOrderItem, getAllOrderItems} from "../../../state/orders/item/orderItemAction.ts";
import TlaOpen from "../../../common/pop-ups/TlaOpen.tsx";
import {Button} from "antd";
import {FiPlusCircle} from "react-icons/fi";
import { currencyFormat } from "../../../utils/index.ts";
import { OrderItem } from "../../../types/order.ts";
import {orderStatus} from "../../../utils/order-status.ts";
import {setProduct} from "../../../state/product/productSlice.ts";
import {useNavigate} from "react-router-dom";
import {setOrderItem} from "../../../state/orders/orderSlice.ts";
import {unwrapResult} from "@reduxjs/toolkit";
import {resetState, updateState} from "../../../state/errorSlice.ts";
import TlaConfirm from "../../../common/tla-confirm.tsx";


const OrderItems: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.orderItem.orderItem);
    const order = useAppSelector(state => state.order.orderItem);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const goToDetails = (record: any) => {
        dispatch(setProduct(record?.product));
        navigate(MenuLinks.admin.product.details.index);
    }


    return (
        <>
            <div className={'bg-white rounded-2xl p-5'}>
                {order?.status == orderStatus.preparing ? <TlaOpen to={MenuLinks.admin.order.details.manyProductForm}>
                    <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New Products</Button>
                </TlaOpen> : null }

                <TlaTableWrapper getData={getAllOrderItems} data={data} filter={commonQuery(`&orderId[eq]=${order?.id}`)} meta={meta}>
                    <Column
                        title="Product"
                        render={(record: Product) => (
                            <span className={'cursor-pointer underline'} onClick={() => goToDetails(record)}>
                                {
                                    // @ts-ignore
                                    record?.product?.name
                                }
                            </span>
                        )}/>
                    <Column title="Unit Price" render={(record: OrderItem) => <span>{ currencyFormat(+record?.unitPriceAtSale)}</span>}/>
                    <Column title="Quantity" dataIndex="quantity"/>
                    <Column title="Total Cost" render={(record: OrderItem) => <span className={'font-semibold'}>{ currencyFormat(+record?.totalCost) }</span>}/>
                    {
                        order?.status == orderStatus.preparing ? <Column
                            title={'Action'}
                            render={((record) => (
                                    <div className={'flex items-center gap-2'}>
                                        <TlaEdit data={record} link={MenuLinks.admin.order.details.singleProductForm}/>
                                        <TlaConfirm
                                            title={'Confirm Delete'}
                                            fullText={`Do you really want to delete this order item ?`}
                                            callBack={() => {
                                                dispatch(deleteOrderItem(record?.id))
                                                    .then(unwrapResult)
                                                    .then((result: any) => {
                                                        const currentOrder = (result);
                                                        currentOrder.totalPayments = order.totalPayments;
                                                        dispatch(setOrderItem(currentOrder));
                                                        dispatch(getAllOrderItems(commonQuery(`&orderId[eq]=${order?.id}`)))
                                                    })
                                                    .catch((obj: any) => {
                                                        dispatch(updateState({
                                                            status: "failed",
                                                            errors: obj.errors
                                                        }))
                                                    }).finally(() => dispatch(resetState()))
                                            }}>
                                            Delete
                                        </TlaConfirm>
                                    </div>
                                )
                            )}/>
                            :null
                    }

                </TlaTableWrapper>
            </div>
        </>

    )
}

export default OrderItems;
