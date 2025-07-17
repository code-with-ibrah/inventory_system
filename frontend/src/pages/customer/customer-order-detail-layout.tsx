import React from 'react';
import {Outlet} from "react-router-dom";
import {Menu} from "../../types/common.ts";
import {MenuLinks} from "../../utils/menu-links.ts";
import {appIconLabels} from "../../common/app-icons.tsx";
import AppMenu1 from "../../common/layout/app-menu-1.tsx";
import OrderDetail from "../orders/order-detail.tsx";


interface Props {
    menus?: Menu[];
}


const OrderDetailLayoutMenu: Menu[] = [
    {
        label: 'Info',
        link: MenuLinks.admin.customers.details.orderDetails,
        icon: appIconLabels.order,
    },
    {
        label: 'Products',
        link: MenuLinks.admin.customers.details.orderDetailProducts,
        icon: appIconLabels.order,
    }
]



const CustomerOrderDetailLayout: React.FC<Props> = () => {
    return (
        <div>
            <div className={'bg-white p-3 rounded-lg inner-header mb-2'}>
                <OrderDetail/>
                <div className={'flex flex-wrap items-center gap-3 my-3'}>
                    <AppMenu1 menus={OrderDetailLayoutMenu}/>
                </div>
            </div>
            <div className={'rounded-2xl'}>
                <Outlet/>
            </div>
        </div>
    )
};

export default CustomerOrderDetailLayout;
