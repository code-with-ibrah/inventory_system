import React from "react";
import Column from "antd/es/table/Column";
import {Button} from "antd";
import {FiPlusCircle} from "react-icons/fi";
import TlaTableWrapper from "../../common/tla-table-wrapper.tsx";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";
import {commonQuery} from "../../utils/query.ts";
import {formatDate} from "../../utils";
import {MenuLinks} from "../../utils/menu-links.ts";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useNavigate} from "react-router-dom";
import {getAllOrders} from "../../state/orders/receiptAction.ts";
import {Order} from "../../types/order.ts";
import {setOrderItem} from "../../state/orders/orderSlice.ts";
import {orderStatus} from "../../utils/order-status.ts";
import {TlaErrorTag, TlaInfoTag, TlaSuccessTag} from "../../common/tla-tag.tsx";



const PreparingOrders: React.FC = () => {
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

                <TlaTableWrapper getData={getAllOrders} data={data} filter={commonQuery(`&status[eq]=${orderStatus.preparing}`)} meta={meta}>
                    <Column
                        title="Order Number"
                        render={(record: Order) => (
                            <span className={'cursor-pointer underline'} onClick={() => goToDetails(record)}>
                            {record?.orderNumber ?? "view details"}
                        </span>
                        )}/>

                    <Column title="Date" render={(record: Order) => <span>{formatDate(record?.date)}</span>}/>
                    <Column title="Customer" render={(record: Order) => <span>{record?.customer?.name}</span>}/>
                    <Column title="Order Status" className={'capitalize'} render={(record: any) => <span>
                        {record?.status == orderStatus.preparing ? <TlaInfoTag text={orderStatus.preparing}/> : ''}
                        {record?.status == orderStatus.delivered ? <TlaSuccessTag text={orderStatus.delivered}/> : ''}
                        {record?.status == orderStatus.cancelled ? <TlaErrorTag text={orderStatus.cancelled}/> : ''}
                    </span>}/>
                </TlaTableWrapper>
            </div>
        </>
    )
}

export default PreparingOrders;
