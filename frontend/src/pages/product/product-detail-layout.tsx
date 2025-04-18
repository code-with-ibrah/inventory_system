import React from 'react';
import {Outlet} from "react-router-dom";
import {Menu} from "../../types/common.ts";
import {MenuLinks} from "../../utils/menu-links.ts";
import {appIconLabels} from "../../common/app-icons.tsx";
import AppMenu1 from "../../common/layout/app-menu-1.tsx";
import ProductDetail from "./product-detail.tsx";


interface Props {
    menus?: Menu[];
}


const ProductDetailLayoutMenu: Menu[] = [
    {
        label: 'Info',
        link: MenuLinks.admin.product.details.index,
        icon: appIconLabels.products,
    },
    {
        label: 'Suppliers',
        link: MenuLinks.admin.product.details.suppliers,
        icon: appIconLabels.supplier,
    }
]



const ProductDetailLayout: React.FC<Props> = () => {
    return (
        <div>
            <div className={'bg-white p-3 rounded-lg inner-header mb-2'}>
                <ProductDetail/>
                <div className={'flex flex-wrap items-center gap-3 my-3'}>
                    <AppMenu1 menus={ProductDetailLayoutMenu}/>
                </div>
            </div>
            <div className={'rounded-2xl'}>
                <Outlet/>
            </div>
        </div>
    )
};

export default ProductDetailLayout;
