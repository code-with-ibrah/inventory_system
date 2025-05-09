import React from 'react';
import {Outlet} from "react-router-dom";
import {Menu} from "../../types/common.ts";
import {MenuLinks} from "../../utils/menu-links.ts";
import {appIconLabels} from "../../common/app-icons.tsx";
import AppMenu1 from "../../common/layout/app-menu-1.tsx";


interface Props {
    menus?: Menu[];
}


const OrderCategoryLayoutMenu: Menu[] = [
    {
        label: 'All',
        link: MenuLinks.admin.order.index,
        icon: appIconLabels.order,
    },
    {
        label: 'Delivered',
        link: MenuLinks.admin.order.delivered,
        icon: appIconLabels.completed,
    },
    {
        label: 'Cancelled',
        link: MenuLinks.admin.order.cancelled,
        icon: appIconLabels.cancelled,
    }
]



const OrderCategoryLayout: React.FC<Props> = () => {
    return (
        <div>
            <div className={'bg-white p-3 rounded-lg inner-header mb-2'}>
                {/*<OrderCategory/>*/}
                <h2 className={'capitalize'}>
                    <span className={' text-2xl font-medium'}>Detailed Order Information</span>
                </h2>
                <div className={'flex flex-wrap items-center gap-3 my-3'}>
                    <AppMenu1 menus={OrderCategoryLayoutMenu}/>
                </div>
            </div>
            <div className={'rounded-2xl'}>
                <Outlet/>
            </div>
        </div>
    )
};

export default OrderCategoryLayout;
