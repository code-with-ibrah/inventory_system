import React from 'react';
import {Outlet} from "react-router-dom";
import {Menu} from "../../../types/common.ts";
import AppMenu1 from "../../../common/layout/app-menu-1.tsx";
import OrganisationAwardDetails from "./organisation-award-details.tsx";
import {MenuLinks} from "../../../utils/menu-links.ts";
import {appIconLabels} from "../../../common/app-icons.tsx";

interface Props {
    menus?: Menu[];
}



const awardDetailMenus: Menu[] = [
    {
        label: 'Categories',
        link: MenuLinks.organisation.award.details.category.index,
        icon: appIconLabels.category,
    },
    {
        label: 'Contestants',
        link: MenuLinks.organisation.award.details.contestants.index,
        icon: appIconLabels.user,
    },
    {
        label: 'Bonus Package',
        link: MenuLinks.organisation.award.details.bonus.index,
        icon: appIconLabels.funds,
    },
    {
        label: 'Stats',
        link: MenuLinks.organisation.award.details.stats.index,
        icon: appIconLabels.graph,
    }
    // {
    //     label: 'Payment History',
    //     link: MenuLinks.organisation.award.details.payment.index,
    //     icon: appIconLabels.history,
    // }
]



const OrgansiationAwardDetailLayout: React.FC<Props> = () => {
    return (
        <div>
            <div className={'bg-white p-3 rounded-lg inner-header mb-2'}>
                <OrganisationAwardDetails/>
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

export default OrgansiationAwardDetailLayout;
