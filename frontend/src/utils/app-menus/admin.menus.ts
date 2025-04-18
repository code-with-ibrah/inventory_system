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
        label: 'Suppliers',
        link: MenuLinks.admin.supplier.index,
        create: MenuLinks.admin.supplier.form,
        icon: appIconLabels.supplier
    },
    {
        label: 'Products',
        link: MenuLinks.admin.product.index,
        create: MenuLinks.admin.product.form,
        icon: appIconLabels.products
    },
    {
        label: 'Product Settings',
        link: MenuLinks.admin.productSettings.index,
        icon: appIconLabels.config
    },
];
