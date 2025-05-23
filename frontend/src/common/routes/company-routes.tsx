import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { MenuLinks } from "../../utils/menu-links";
import {AppLayout} from "../layout/AppLayout";
import {ModalRoute} from "./ModalRoute";
import AdminNotFound from "../../pages/common/admin-not-found.tsx";
import Analytics from "../../pages/dashboard";


export const CompanyRoutes = () => {
    const location = useLocation();
    const background = location.state && location.state.background;

    // TRY THIS LATER ON

    return (
        <div>
            <Routes location={background || location}>
                <Route path={MenuLinks.company.dashboard} element={<AppLayout/>}>
                    <Route index element={<Analytics/>}/>

                    <Route path={'*'} element={<AdminNotFound/>}/>
                </Route>
            </Routes>

            {background && (<><ModalRoute/> <Outlet/></>)}
        </div>
    )
};
