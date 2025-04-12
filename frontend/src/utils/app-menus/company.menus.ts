import {Menu} from "../../types/common.ts";
import {MenuLinks} from "../menu-links.ts";
import {appIconLabels} from "../../common/app-icons.tsx";

export const CompanyAdminMenus: Menu[] = [
    {
        label: 'Dashboard',
        link: MenuLinks.company.dashboard,
        icon: appIconLabels.graph,
    },
    {
        label: 'Awards',
        link: "",
        icon: appIconLabels.circuits
    },
    {
        label: 'Nominations',
        link: "",
        icon: appIconLabels.nomination
    }
];