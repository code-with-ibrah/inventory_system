import React from 'react';
import {Outlet} from "react-router-dom";
import {Menu} from "../../../types/common.ts";
import AppMenu1 from "../../../common/layout/app-menu-1.tsx";
import ContestantDetails from "./contestant-details.tsx";
import {MenuLinks} from "../../../utils/menu-links.ts";
import {appIconLabels} from "../../../common/app-icons.tsx";


interface Props {
    menus?: Menu[];
}


const contestantDetailMenus: Menu[] = [
    {
        label: 'view info',
        link: MenuLinks.admin.contestant.details.index,
        icon: appIconLabels.user,
    },
    {
        label: 'manage',
        link: MenuLinks.admin.contestant.details.manage,
        icon: appIconLabels.config,
    },
    {
        label: 'vote Records',
        link: MenuLinks.admin.contestant.details.voteRecords,
        icon: appIconLabels.payment
    }
]


const CategoryDetailLayout: React.FC<Props> = () => {
    return (
        <div>
            <div className={'bg-white p-3 rounded-lg inner-header mb-2'}>
                <ContestantDetails/>
                <div className={'flex flex-wrap items-center gap-3 my-3'}>
                    <AppMenu1 menus={contestantDetailMenus} />
                </div>
            </div>
            <div className={'rounded-2xl'}>
                <Outlet/>
            </div>
        </div>
    )
};

export default CategoryDetailLayout;
