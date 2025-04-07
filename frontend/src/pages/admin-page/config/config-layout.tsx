import React from 'react';
import {Outlet} from "react-router-dom";
import AppMenu1 from "../../../common/layout/app-menu-1.tsx";
import {Menu} from "../../../types/common.ts";
import {MenuLinks} from "../../../utils/menu-links.ts";
import {appIconLabels} from "../../../common/app-icons.tsx";



const configMenus: Menu[] = [
    {
        label: 'Users',
        link: MenuLinks.admin.config.details.users,
        create: MenuLinks.admin.config.details.userForm,
        icon: appIconLabels.user
    },
    {
        label: 'Roles',
        link: MenuLinks.admin.config.details.roles,
        create: MenuLinks.admin.config.details.roleForm,
        icon: appIconLabels.analytics,
    }
]



const ConfigLayout: React.FC = () => {
    return(
        <div>
            <div className={'bg-white p-3 rounded-lg inner-header mb-2'}>
                <div className={'flex flex-wrap items-center gap-3 my-3'}>
                    <AppMenu1 menus={configMenus}/>
                </div>
            </div>
            <div className={'rounded-2xl'}>
                <Outlet/>
            </div>
        </div>
    )
};

export default ConfigLayout;
