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
        label: 'Products',
        link: MenuLinks.admin.product.index,
        create: MenuLinks.admin.product.form,
        icon: appIconLabels.products
    },
    {
        label: 'Stocks',
        link: MenuLinks.admin.stock.index,
        create: MenuLinks.admin.stock.form,
        icon: appIconLabels.stocks
    },
    // {
    //     label: 'Goods Receipt',
    //     link: MenuLinks.admin.goodsReceipt.index,
    //     icon: appIconLabels.receipt
    // },
    {
        label: 'Orders',
        link: MenuLinks.admin.order.index,
        icon: appIconLabels.order
    },
    {
        label: 'Stock Adjustment',
        link: MenuLinks.admin.stockAdjustment.index,
        create: MenuLinks.admin.stockAdjustment.form,
        icon: appIconLabels.adjustment
    },
    {
        label: 'Suppliers',
        link: MenuLinks.admin.supplier.index,
        create: MenuLinks.admin.supplier.form,
        icon: appIconLabels.supplier
    },
    {
        label: 'Customers',
        link: MenuLinks.admin.customers.index,
        create: MenuLinks.admin.customers.form,
        icon: appIconLabels.user
    },
    {
        label: 'Warehouse',
        link: MenuLinks.admin.warehouse.index,
        icon: appIconLabels.warehouse
    },
    {
        label: 'Product Config',
        link: MenuLinks.admin.productSettings.index,
        icon: appIconLabels.config
    },
    // {
    //     label: 'Config',
    //     link: MenuLinks.admin.config.index,
    //     icon: appIconLabels.config
    // }
];