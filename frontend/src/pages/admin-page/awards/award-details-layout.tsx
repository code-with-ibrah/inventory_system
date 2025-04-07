import React from 'react';
import {Outlet} from "react-router-dom";
import {Menu} from "../../../types/common.ts";
import AppMenu1 from "../../../common/layout/app-menu-1.tsx";
import AwardDetails from "./award-details.tsx";
import {MenuLinks} from "../../../utils/menu-links.ts";
import {appIconLabels} from "../../../common/app-icons.tsx";

interface Props {
    menus?: Menu[];
}



const awardDetailMenus: Menu[] = [
    {
        label: 'Categories',
        link: MenuLinks.admin.award.details.index,
        icon: appIconLabels.category,
    },
    {
        label: 'Contestants',
        link: MenuLinks.admin.award.details.contestants,
        icon: appIconLabels.user,
    },
    {
        label: 'Bonus',
        link: MenuLinks.admin.award.details.bonus,
        icon: appIconLabels.funds,
    },
    {
        label: 'Stats',
        link: MenuLinks.admin.award.details.stats,
        icon: appIconLabels.graph,
    },
    {
        label: 'Payment History',
        link: MenuLinks.admin.award.details.history,
        icon: appIconLabels.history,
    }
]



const AwardDetailLayout: React.FC<Props> = () => {
    return (
        <div>
            <div className={'bg-white p-3 rounded-lg inner-header mb-2'}>
                <AwardDetails/>
                <div className={'flex flex-wrap items-center gap-3 my-3'}>
                    <AppMenu1 menus={awardDetailMenus}/>
                </div>
            </div>
            <div className={'rounded-2xl'}>
                <Outlet/>
            </div>
        </div>
    )
};

export default AwardDetailLayout;
