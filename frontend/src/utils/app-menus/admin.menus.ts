import {Menu} from "../../types/common";
import {MenuLinks} from "../menu-links";
import {appIconLabels} from "../../common/app-icons";

export const AdminMenus: Menu[] = [
    {
        label: 'Dashboard',
        link: MenuLinks.admin.dashboard,
        icon: appIconLabels.home,
    },
    {
        label: 'Product',
        link: MenuLinks.admin.product.index,
        create: "",
        icon: appIconLabels.stocks
    },
];
