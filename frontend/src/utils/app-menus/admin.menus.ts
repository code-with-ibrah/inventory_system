import {Menu} from "../../types/common.ts";
import {MenuLinks} from "../menu-links.ts";
import {appIconLabels} from "../../common/app-icons.tsx";

export const AdminMenus: Menu[] = [
    {
        label: 'Dashboard',
        link: MenuLinks.admin.dashboard,
        icon: appIconLabels.home,
    },
    {
        label: 'Awards',
        link: MenuLinks.admin.award.index,
        create: MenuLinks.admin.award.form,
        icon: appIconLabels.diocese
    },
    {
        label: 'Organisations',
        link: MenuLinks.admin.organisation.index,
        create: MenuLinks.admin.organisation.form ,
        icon: appIconLabels.circuits
    },
    {
        label: 'Nominations',
        link: MenuLinks.admin.nomination,
        icon: appIconLabels.nomination
    },
    {
        label: 'Verify USSD',
        link: MenuLinks.admin.ussdVerification,
        icon: appIconLabels.ussd
    },
    {
        label: 'Config',
        link: MenuLinks.admin.config.details.index,
        icon: appIconLabels.config
    },
    {
        label: 'Home Page',
        link: MenuLinks.home.index,
        icon: appIconLabels.home
    }
];
