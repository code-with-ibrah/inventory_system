import {Menu} from "../../types/common.ts";
import {MenuLinks} from "../menu-links.ts";
import {appIconLabels} from "../../common/app-icons.tsx";

export const OrganisationAdminMenus: Menu[] = [
    {
        label: 'Dashboard',
        link: MenuLinks.organisation.dashboard,
        icon: appIconLabels.graph,
    },
    {
        label: 'Awards',
        link: MenuLinks.organisation.award.index,
        icon: appIconLabels.circuits
    },
    {
        label: 'Nominations',
        link: MenuLinks.organisation.nomination,
        icon: appIconLabels.nomination
    },
    {
        label: 'Manage Users',
        link: MenuLinks.organisation.users,
        icon: appIconLabels.user
    },
    {
        label: 'Profile',
        link: MenuLinks.organisation.profile.index,
        icon: appIconLabels.user
    },
    {
        label: 'Home Page',
        link: MenuLinks.home.index,
        icon: appIconLabels.home
    }
]