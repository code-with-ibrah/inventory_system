import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";
import { ModalRoute } from "./ModalRoute";
import {MenuLinks} from "../../utils/menu-links";
import Analytics from "../../pages/admin-page/dashboard/index.tsx";
import AdminNotFound from "../../pages/common/admin-not-found.tsx";
import ProductFormPage from "../../pages/product/product-form-page.tsx";
import Product from "../../pages/product";


export const AppProtectedRoutes = () => {
    const location = useLocation();
    const background = location.state && location.state.background;

    return (
        <div>
            <Routes location={background || location}>
                <Route path={MenuLinks.admin.dashboard}  element={<AppLayout/>}>
                     <Route index element={<Analytics/>}/>

                    {/* new one here */}
                    <Route path={MenuLinks.admin.product.index} element={<Product/>}/>
                    <Route path={MenuLinks.admin.product.formPage} element={<ProductFormPage/>}/>



                    <Route path={'*'} element={<AdminNotFound/>}/>
                </Route>
            </Routes>

            {background && (<><ModalRoute/> <Outlet/></>)}
        </div>
    )
};
