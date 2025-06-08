import React from 'react';
import {Outlet} from "react-router-dom";
import {Menu} from "../../types/common.ts";
import {MenuLinks} from "../../utils/menu-links.ts";
import {appIconLabels} from "../../common/app-icons.tsx";
import AppMenu1 from "../../common/layout/app-menu-1.tsx";

interface Props {
    menus?: Menu[];
}


const StatementLayoutMenu: Menu[] = [
    {
        label: 'Customers',
        link: MenuLinks.admin.statement.index,
        icon: appIconLabels.user,
    },
    {
        label: 'Suppliers',
        link: MenuLinks.admin.statement.supplier,
        icon: appIconLabels.supplier,
    }
]



const StatementLayout: React.FC<Props> = () => {
    return (
        <div>
            <div className={'bg-white p-3 rounded-lg inner-header mb-2 no-print'}>
                {/*<OrderCategory/>*/}
                <h2 className={'capitalize'}>
                    <span className={' text-2xl font-medium'}>Available Statements</span>
                </h2>
                <div className={'flex flex-wrap items-center gap-3 my-3'}>
                    <AppMenu1 menus={StatementLayoutMenu}/>
                </div>
            </div>
            <div className={'rounded-2xl'}>
                <Outlet/>
            </div>
        </div>
    )
};

export default StatementLayout;
