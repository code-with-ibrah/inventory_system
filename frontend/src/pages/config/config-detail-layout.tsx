import React from 'react';
import {Outlet} from "react-router-dom";
import {Menu} from "../../types/common.ts";
import {MenuLinks} from "../../utils/menu-links.ts";
import {appIconLabels} from "../../common/app-icons.tsx";
import AppMenu1 from "../../common/layout/app-menu-1.tsx";
interface Props {
    menus?: Menu[];
}


const ConfigDetailLayoutMenu: Menu[] = [
    {
        label: 'Users',
        link: MenuLinks.admin.config.users,
        icon: appIconLabels.user,
    },
    // {
    //     label: 'Roles',
    //     link: MenuLinks.admin.config.roles,
    //     icon: appIconLabels.role,
    // },
    // {
    //     label: 'Installment Plan',
    //     link: MenuLinks.admin.config.installmentPlan,
    //     icon: appIconLabels.stockUnit,
    // },
    // {
    //     label: 'Payment Methods',
    //     link: MenuLinks.admin.config.paymentMethod,
    //     icon: appIconLabels.payment,
    // },
]



const ConfigDetailLayout: React.FC<Props> = () => {
    return (
        <div>
            <div className={'bg-white p-3 rounded-lg inner-header mb-2'}>
                <div className={'flex flex-wrap items-center gap-3 my-3'}>
                    <AppMenu1 menus={ConfigDetailLayoutMenu}/>
                </div>
            </div>
            <div className={'rounded-2xl'}>
                <Outlet/>
            </div>
        </div>
    )
};

export default ConfigDetailLayout;
