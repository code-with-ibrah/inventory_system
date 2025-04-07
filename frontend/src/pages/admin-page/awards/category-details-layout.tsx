import React from 'react';
import {Outlet} from "react-router-dom";
import {Menu} from "../../../types/common.ts";
import AppMenu1 from "../../../common/layout/app-menu-1.tsx";
import CategoryDetails from "./category-details.tsx";
import {MenuLinks} from "../../../utils/menu-links.ts";
import {appIconLabels} from "../../../common/app-icons.tsx";


interface Props {
    menus?: Menu[];
}


const categoryDetailMenus: Menu[] = [
    {
        label: 'Contestants',
        link: MenuLinks.admin.category.details.contestants,
        icon: appIconLabels.user,
    },
    {
        label: 'Results',
        link: MenuLinks.admin.category.details.results,
        icon: appIconLabels.graph,
    }
]



const CategoryDetailLayout: React.FC<Props> = () => {
    return (
        <div>
            <div className={'bg-white p-3 rounded-lg inner-header mb-2'}>
                <CategoryDetails/>
                <div className={'flex flex-wrap items-center gap-3 my-3'}>
                    <AppMenu1 menus={categoryDetailMenus}/>
                </div>
            </div>
            <div className={'rounded-2xl'}>
                <Outlet/>
            </div>
        </div>
    )
};

export default CategoryDetailLayout;
