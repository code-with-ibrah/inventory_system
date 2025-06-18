import AppHeader from "./AppHeader.tsx";
import { AppSidebar } from "./app-sidebar";
import {useEffect, useState} from 'react';
import {Affix} from "antd";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getAppRoles} from "../../state/analytics/analyticsActions";
import {Outlet} from "react-router-dom";

export const AppLayout = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const appRoles = useAppSelector(state => state.analytics.appRoles);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (appRoles.length === 0) {
            dispatch(getAppRoles())
        }
    }, []);

    return (
        <div>
            <div className={'flex max-w-screen-2xl mx-auto'}>
                <div className="hidden md:block">
                    <div className={'fixed z-50 transition-all duration-300'}>
                        <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
                    </div>
                </div>
                <div
                    className={`flex-grow transition-all duration-300  ${collapsed ? 'ml-0 md:ml-20' : 'ml-0 md:ml-60'} px-2 max-w-full overflow-x-auto`}>
                    <Affix offsetTop={0}>
                        <AppHeader/>
                    </Affix>
                    <div className={'rounded-lg'}>
                        {/*<PageCrumbs/>*/}
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
};
