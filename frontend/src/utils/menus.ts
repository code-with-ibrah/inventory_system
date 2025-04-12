import { MenuLinks } from "./menu-links";
import { Menu } from "../types/common";
import {AdminMenus} from "./app-menus/admin.menus";
import {CompanyAdminMenus} from "./app-menus/company.menus";


const menus = {
    admin: AdminMenus,
    company: CompanyAdminMenus,
};


const homeLink = {
    admin: MenuLinks.admin.dashboard,
    company: MenuLinks.company.dashboard
};


export const getAppMenus = (role: keyof typeof menus): Menu[] => menus[role] ?? [];

export const getHomeLink = (role: keyof typeof homeLink): string => homeLink[role] ?? '';
