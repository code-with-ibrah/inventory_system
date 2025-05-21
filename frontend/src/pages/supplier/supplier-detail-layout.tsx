import React from 'react';
import {Outlet} from "react-router-dom";
import {Menu} from "../../types/common.ts";
import {MenuLinks} from "../../utils/menu-links.ts";
import {appIconLabels} from "../../common/app-icons.tsx";
import AppMenu1 from "../../common/layout/app-menu-1.tsx";
import SupplierDetail from "./supplier-detail.tsx";


interface Props {
    menus?: Menu[];
}


const SupplierDetailLayoutMenu: Menu[] = [
    {
        label: 'Info',
        link: MenuLinks.admin.supplier.details.index,
        icon: appIconLabels.user,
    },
    {
        label: 'Products',
        link: MenuLinks.admin.supplier.details.product,
        icon: appIconLabels.products,
    },
    {
        label: 'Goods Receipts',
        link: MenuLinks.admin.supplier.details.receipt.index,
        icon: appIconLabels.receipt,
    },

]



const SupplierDetailLayout: React.FC<Props> = () => {
    return (
        <div>
            <div className={'bg-white p-3 rounded-lg inner-header mb-2'}>
                <SupplierDetail/>
                <div className={'flex flex-wrap items-center gap-3 my-3'}>
                    <AppMenu1 menus={SupplierDetailLayoutMenu}/>
                </div>
            </div>
            <div className={'rounded-2xl'}>
                <Outlet/>
            </div>
        </div>
    )
};

export default SupplierDetailLayout;
