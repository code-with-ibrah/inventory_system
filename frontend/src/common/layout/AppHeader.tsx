import NavProfile from "./NavProfile.tsx";
import {IoIosNotificationsOutline} from "react-icons/io";
import {useAppContext} from "../../hooks";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import AppMenuMobile from "./AppMenuMobile.tsx";
import HeaderTitle from "../header-title.tsx";

const AppHeader = () => {
    const { headerItem, setFilters } = useAppContext();
    const { pathname } = useLocation();

    useEffect(() => {
        setFilters && setFilters([])
    }, [pathname])

    return (
        <div className={'sticky top-0 bg-[#e4f0f3] no-print'}>
            <div className={'py-3.5 px-5 flex justify-between items-center'}>
                <div className={'w-[60%] items-center gap-5'}>
                    <HeaderTitle>{headerItem}</HeaderTitle>

                    {/*<AppToggle/>*/}
                    <AppMenuMobile/>
                </div>
                <div className={'flex items-center justify-center gap-5'}>
                    {/*<CreateNew/>*/}
                    <IoIosNotificationsOutline size={20}/>
                    <NavProfile/>
                </div>
            </div>
        </div>
    )
}

export default AppHeader
