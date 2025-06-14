import AppMenus from "./AppMenus.tsx";
import { FiChevronLeft, FiChevronRight, FiLogOut } from "react-icons/fi";
import { getAppMenus } from "../../utils/menus.ts";
import Logout from "./logout.tsx";
import { SideUserInfo } from "./side-user-info.tsx";
import { useAppSelector } from "../../hooks";
import { AppName } from "./app-name.tsx";
import { GoDotFill } from "react-icons/go";
import {useEffect, useState} from "react";

interface AppSidebarProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

// export const AppSidebar = ({collapsed, setCollapsed}: AppSidebarProps) => {
//     const user = useAppSelector(state => state.auth.user);
//     const appMenus = getAppMenus(user?.roleName as any);
//
//     return (
//         <div style={{height: 'calc(100vh - 0px)'}}
//              className={`bg-white shadow-lg no-print relative transition-all duration-300 ${collapsed ? 'w-20' : 'w-[230px] relative'}`}>
//             <button onClick={() => setCollapsed(!collapsed)} className="toggle-side-button">
//                 {collapsed ? <FiChevronRight size={20}/> : <FiChevronLeft size={20}/>}
//             </button>
//
//             <div className={`flex items-center justify-center text-center ${collapsed ? 'p-2' : 'py-5'} border-b`}>
//                 {collapsed ?
//                     <div className={'text-midnight-blue text-xs font-bold'}>
//                         <GoDotFill size={40} className={'text-yellow-500 w-fit mx-auto'}/>
//                         <p>Jessden<span className={'font-extralight'}> Inventory</span></p>
//                     </div>
//                     : (<AppName/>)}
//             </div>
//             <SideUserInfo user={user} collapsed={collapsed}/>
//             <div className={"flex flex-col gap-1 px-5 overflow-auto"} style={{height: 'calc(100vh - 200px)'}}>
//                 <AppMenus menus={appMenus} collapsed={collapsed}/>
//             </div>
//             <div className={'bottom-0 absolute text-center border-t border-red-500 inset-x-0'}>
//                 <Logout
//                     className={'cursor-pointer flex items-center gap-x-3 justify-center hover:bg-app-red hover:text-white py-2'}>
//                     <FiLogOut/>
//                     {!collapsed && ('Logout')}
//                 </Logout>
//             </div>
//         </div>
//     )
// }





export const AppSidebar = ({ collapsed, setCollapsed }: AppSidebarProps) => {
    // Moved state management for mobile responsiveness inside AppSidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Tailwind's 'md' breakpoint is 768px by default

    // Effect hook to update `isMobile` state on window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Effect hook to manage sidebar state when switching between mobile/desktop views
    useEffect(() => {
        if (!isMobile) {
            // If we switch to desktop view, ensure the mobile sidebar is closed
            setIsSidebarOpen(false);
        }
    }, [isMobile]);

    const user = useAppSelector(state => state.auth.user);
    const appMenus = getAppMenus(user?.roleName as any);

    // Determine the 'effectiveCollapsed' state for rendering content inside the sidebar.
    // On mobile, if the sidebar is open, it should behave as if it's not collapsed.
    // On desktop, it simply uses the 'collapsed' state.
    const effectiveCollapsed = isMobile ? !isSidebarOpen : collapsed;

    return (
        <>
            {/* Mobile Menu Toggle Button (visible only on mobile) */}
            {isMobile && (
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className={`
                        fixed top-4 left-4 z-[100] // High z-index to be on top of other content
                        p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none
                        md:hidden // Hidden on medium screens and up
                    `}
                >
                    {isSidebarOpen ? 'opened' : 'menu icon'}
                </button>
            )}

            {/* Main Sidebar Container */}
            <div
                className={`
                    bg-white shadow-lg no-print
                    transition-all duration-300 z-50
                    flex flex-col h-screen // Full height, flex column layout for internal content

                    // Mobile styles (default)
                    ${isMobile
                    ? `fixed top-0 left-0 ${isSidebarOpen ? 'w-full' : 'w-0 overflow-hidden'}
                           ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} // Slide effect
                           `
                    // Desktop styles (applied from 'md' breakpoint and up)
                    : `relative md:left-0 ${collapsed ? 'md:w-20' : 'md:w-[230px]'}`
                }
                `}
            >
                {/* Desktop Toggle Button (visible only on desktop) */}
                {!isMobile && (
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className={`
                            absolute top-4
                            ${collapsed ? '-right-8' : 'right-4'} // Position adjusted for desktop
                            p-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none z-50
                            hidden md:block // Hidden on mobile, visible on desktop
                        `}
                    >
                        {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
                    </button>
                )}

                {/* Sidebar Content - Only rendered if sidebar is open on mobile OR it's a desktop view */}
                {(isSidebarOpen || !isMobile) && (
                    <>
                        {/* App Logo/Name Section */}
                        <div className={`flex items-center justify-center text-center ${effectiveCollapsed ? 'p-2' : 'py-5'} border-b flex-shrink-0`}>
                            {effectiveCollapsed ?
                                <div className={'text-midnight-blue text-xs font-bold'}>
                                    <GoDotFill className={'text-yellow-500 w-fit mx-auto'}/>
                                    <p>Jessden<span className={'font-extralight'}> Inventory</span></p>
                                </div>
                                : (<AppName/>)}
                        </div>

                        {/* User Information Section */}
                        <SideUserInfo user={user} collapsed={effectiveCollapsed}/>

                        {/* Menu Navigation Section - This is the scrollable area */}
                        {/* Removed fixed height and used flex-grow with overflow-y-auto */}
                        <div className={"flex flex-col gap-1 px-5 overflow-y-auto flex-grow"}>
                            <AppMenus menus={appMenus} collapsed={effectiveCollapsed}/>
                        </div>

                        {/* Logout Section */}
                        {/* Positioned at bottom using flex-shrink-0 in the flex column */}
                        <div className={'text-center border-t border-red-500 flex-shrink-0'}>
                            <Logout
                                className={'cursor-pointer flex items-center gap-x-3 justify-center hover:bg-app-red hover:text-white py-2'}>
                                <FiLogOut />
                                {!effectiveCollapsed && ('Logout')}
                            </Logout>
                        </div>
                    </>
                )}
            </div>

            {/* Backdrop for mobile overlay (visible when sidebar is open on mobile) */}
            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsSidebarOpen(false)} // Close sidebar when backdrop is clicked
                ></div>
            )}
        </>
    );
};




