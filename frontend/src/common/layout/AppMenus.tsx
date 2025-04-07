import {Link, useLocation} from "react-router-dom";
import {FiChevronDown, FiChevronRight} from "react-icons/fi";
import {Tooltip} from "antd";
import {Menu} from "../../types/common.ts";
import {appIcons} from "../app-icons.tsx";
import {useState} from "react";

interface AppMenusProps {
    collapsed?: boolean;
    menus: Menu[];
}

const AppMenus = ({collapsed = false, menus}: AppMenusProps) => {
    const {pathname} = useLocation();
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const toggleMenu = (label: string) => {
        setOpenMenu((prev) => (prev === label ? null : label));
    };

    return (
        menus.map((menu) => (
            <div key={menu.label} className="nav-item-container no-print">
                <div className={`${pathname === menu.link ? 'active-nav-item' : ''} nav-item`}>
                    {
                        (!collapsed && menu.children && menu.children.length > 0) ?
                            <div onClick={() => toggleMenu(menu.label)}
                                 className={`w-full flex items-center ${collapsed ? 'justify-center' : 'gap-x-2'}`}>
                                <Tooltip title={menu.label} placement={'right'}>
                                    <span>{menu.icon && appIcons[menu.icon]}</span>
                                </Tooltip>
                                {!collapsed && menu.label}
                                <span className={'ml-auto'}>
                                    {openMenu === menu.label ? <FiChevronDown /> : <FiChevronRight />}
                                </span>
                            </div> :
                            <Link to={menu.link} className={'w-full'}>
                                <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-x-2'}`}>
                                    <Tooltip title={menu.label} placement={'right'}>
                                        <span>{menu.icon && appIcons[menu.icon]}</span>
                                    </Tooltip>
                                    {!collapsed && menu.label}
                                </div>
                            </Link>
                    }
                </div>
                {
                    openMenu === menu.label && menu.children && (
                        <div className="dropdown-content pl-4">
                            {menu.children.map((child) => (
                                <div key={child.label}
                                     className={`${pathname === child.link ? 'underline' : ''} nav-item my-1`}>
                                    <Link to={child.link} className={'w-full'}>
                                        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-x-2'}`}>
                                            <Tooltip title={child.label} placement={'right'}>
                                                <span>{child.icon && appIcons[child.icon]}</span>
                                            </Tooltip>
                                            {!collapsed && child.label}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>
        ))
    );
};

export default AppMenus;