import React from 'react';
import {Outlet} from "react-router-dom";
import {Menu} from "../../types/common.ts";
import {MenuLinks} from "../../utils/menu-links.ts";
import {appIconLabels} from "../../common/app-icons.tsx";
import ProductSettingsDetails from "./product-settings-details.tsx";
import AppMenu1 from "../../common/layout/app-menu-1.tsx";
interface Props {
    menus?: Menu[];
}


const ProductSettingsDetailsLayoutMenu: Menu[] = [
    {
        label: 'Categories',
        link: MenuLinks.admin.productSettings.category,
        icon: appIconLabels.category,
    },
    {
        label: 'Brands',
        link: MenuLinks.admin.productSettings.brand,
        icon: appIconLabels.brand,
    },
    {
        label: 'Stock Units',
        link: MenuLinks.admin.productSettings.stockUnit,
        icon: appIconLabels.stockUnit,
    },
]



const ProductSettingsDetailsLayout: React.FC<Props> = () => {
    return (
        <div>
            <div className={'bg-white p-3 rounded-lg inner-header mb-2'}>
                <ProductSettingsDetails/>
                <div className={'flex flex-wrap items-center gap-3 my-3'}>
                    <AppMenu1 menus={ProductSettingsDetailsLayoutMenu}/>
                </div>
            </div>
            <div className={'rounded-2xl'}>
                <Outlet/>
            </div>
        </div>
    )
};

export default ProductSettingsDetailsLayout;
