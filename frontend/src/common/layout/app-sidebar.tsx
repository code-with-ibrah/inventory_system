import AppMenus from "./AppMenus.tsx";
import { FiChevronLeft, FiChevronRight, FiLogOut } from "react-icons/fi";
import { getAppMenus } from "../../utils/menus.ts";
import Logout from "./logout.tsx";
import { SideUserInfo } from "./side-user-info.tsx";
import { useAppSelector } from "../../hooks";
import { AppName } from "./app-name.tsx";
import { GoDotFill } from "react-icons/go";

interface AppSidebarProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

export const AppSidebar = ({collapsed, setCollapsed}: AppSidebarProps) => {
    const user = useAppSelector(state => state.auth.user);
    const appMenus = getAppMenus(user?.roleName as any);

    return (
        <div style={{height: 'calc(100vh - 0px)'}}
             className={`bg-white shadow-lg no-print relative transition-all duration-300 ${collapsed ? 'w-20' : 'w-[230px] relative'}`}>
            <button onClick={() => setCollapsed(!collapsed)} className="toggle-side-button">
                {collapsed ? <FiChevronRight size={20}/> : <FiChevronLeft size={20}/>}
            </button>

            <div className={`flex items-center justify-center text-center ${collapsed ? 'p-2' : 'py-5'} border-b`}>
                {collapsed ?
                    <div className={'text-midnight-blue text-xs font-bold'}>
                        <GoDotFill size={40} className={'text-yellow-500 w-fit mx-auto'}/>
                        <p>Jessden<span className={'font-extralight'}> Inventory</span></p>
                    </div>
                    : (<AppName/>)}
            </div>
            <SideUserInfo user={user} collapsed={collapsed}/>
            <div className={"flex flex-col gap-1 px-5 overflow-auto"} style={{height: 'calc(100vh - 200px)'}}>
                <AppMenus menus={appMenus} collapsed={collapsed}/>
            </div>
            <div className={'bottom-0 absolute text-center border-t border-red-500 inset-x-0'}>
                <Logout
                    className={'cursor-pointer flex items-center gap-x-3 justify-center hover:bg-app-red hover:text-white py-2'}>
                    <FiLogOut/>
                    {!collapsed && ('Logout')}
                </Logout>
            </div>
        </div>
    )
}
