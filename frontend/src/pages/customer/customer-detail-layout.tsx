import React from 'react';
import {Outlet} from "react-router-dom";
import {Menu} from "../../types/common.ts";
import {MenuLinks} from "../../utils/menu-links.ts";
import {appIconLabels} from "../../common/app-icons.tsx";
import AppMenu1 from "../../common/layout/app-menu-1.tsx";
import CustomerDetail from "./customer-detail.tsx";


interface Props {
    menus?: Menu[];
}


const CustomerDetailLayoutMenu: Menu[] = [
    {
        label: 'Info',
        link: MenuLinks.admin.customers.details.index,
        icon: appIconLabels.user,
    },
    {
        label: 'Orders',
        link: MenuLinks.admin.customers.details.orders,
        icon: appIconLabels.products,
    },
    {
        label: 'Payments',
        link: MenuLinks.admin.customers.details.payments,
        icon: appIconLabels.receipt,
    },
    {
        label: 'Statements',
        link: MenuLinks.admin.customers.details.statements,
        icon: appIconLabels.receipt,
    },

]



const customersDetailLayout: React.FC<Props> = () => {
    return (
        <div>
            <div className={'bg-white p-3 rounded-lg inner-header mb-2 no-print'}>
                <CustomerDetail/>
                <div className={'flex flex-wrap items-center gap-3 my-3'}>
                    <AppMenu1 menus={CustomerDetailLayoutMenu}/>
                </div>
            </div>
            <div className={'rounded-2xl'}>
                <Outlet/>
            </div>
        </div>
    )
};

export default customersDetailLayout;
