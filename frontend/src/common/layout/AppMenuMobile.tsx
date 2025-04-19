import React, {useEffect, useState} from 'react';
import {Drawer} from 'antd';
import AppMenus from "./AppMenus.tsx";
import {useLocation} from "react-router-dom";
import {useAppSelector} from "../../hooks";
import {getAppMenus} from "../../utils/menus.ts";
import {HiOutlineMenuAlt2} from "react-icons/hi";

const AppMenuMobile: React.FC = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation()
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        onClose()
    }, [location]);

    const user = useAppSelector(state => state.auth.user);
    const appMenus = getAppMenus(user?.roleName as any);

    return (
        <>
            <div className={'block md:hidden'}>
                <div className={'flex items-center gap-2'} onClick={showDrawer}>
                    <HiOutlineMenuAlt2 size={24}/>
                </div>
            </div>

            <Drawer
                className={"mobile-drawer !w-1/2"} placement={'left'}
                title={<div className={""}>Jessden Invent</div>}
                onClose={onClose} open={open}>
                <AppMenus menus={appMenus}/>
            </Drawer>
        </>
    );
};

export default AppMenuMobile;
