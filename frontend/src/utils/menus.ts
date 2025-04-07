import { MenuLinks } from "./menu-links.ts";
import { Menu } from "../types/common.ts";
import {AdminMenus} from "./app-menus/admin.menus.ts";
import {OrganisationAdminMenus} from "./app-menus/organisation.menus.ts";



const menus = {
    admin: AdminMenus,
    organisation: OrganisationAdminMenus,
}


const homeLink = {
    admin: MenuLinks.admin.dashboard,
    organisation: MenuLinks.organisation.dashboard
}


export const getAppMenus = (role: keyof typeof menus): Menu[] => menus[role] ?? []

export const getHomeLink = (role: keyof typeof homeLink): string => homeLink[role] ?? ''
