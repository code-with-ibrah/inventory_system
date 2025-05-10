import {useAppSelector} from "../../hooks";
import {FiPlusCircle, FiPrinter} from "react-icons/fi";
import {TlaErrorTag, TlaSuccessTag, TlaYellowTag} from "../../common/tla-tag.tsx";
import {orderStatus} from "../../utils/order-status.ts";
import { Button } from "antd";
import {Link} from "react-router-dom";
import {MenuLinks} from "../../utils/menu-links.ts";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";
import React from "react";


const OrderDetail = () => {
    const order = useAppSelector(state => state.order.orderItem);

    return <>
        <div className="flex justify-between items-center">
            <h2 className={'capitalize'}>
                <span className={' text-2xl font-medium'}>Order Information</span>
                &nbsp;  &nbsp;
                <span style={{fontSize: "19px"}}>{order?.customer?.name ? " for " + order?.customer?.name : null}</span>
                <span className={'text-yellow-500 font-semibold'}
                      style={{fontSize: "19px"}}>&nbsp;( {order?.orderNumber} )</span>
            </h2>

            {/*<Link to={MenuLinks.admin.order.invoice}>*/}
            {/*    <Button icon={<FiPrinter/>} className={'btn btn-red'}>Print invoice</Button>*/}
            {/*</Link>*/}

            <TlaOpen to={MenuLinks.admin.order.invoiceForm}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>Preview Invoice</Button>
            </TlaOpen>

            </div>


        <div>
            <div className={''}>
                <div className={'flex align-items-center my-2'}>
                    <span>Status: &nbsp; </span>
                    <span className={'capitalize'}>
                        {order?.status == orderStatus.preparing ? <TlaYellowTag text={orderStatus.preparing}/> : ''}
                        {order?.status == orderStatus.delivered ? <TlaSuccessTag text={orderStatus.delivered}/> : ''}
                        {order?.status == orderStatus.cancelled ? <TlaErrorTag text={orderStatus.cancelled}/> : ''}
                    </span>
                </div>

                {/*<TlaOpen title={"Order"} data={order} modal={true} to={MenuLinks.admin.order.form}>*/}
                {/*   <span className={'mt-2 text-l flex items-center gap-x-3 cursor-pointer text-yellow-500'}>*/}
                {/*       View Order Info <FiEye/>*/}
                {/*    </span>*/}
                {/*</TlaOpen>*/}
            </div>

        </div>
    </>
}

export default OrderDetail;