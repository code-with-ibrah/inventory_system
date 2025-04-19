import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";
import { ModalRoute } from "./ModalRoute";
import {MenuLinks} from "../../utils/menu-links";
import AdminNotFound from "../../pages/common/admin-not-found.tsx";
import ProductFormPage from "../../pages/product/product-form-page.tsx";
import Product from "../../pages/product";
import Login from "../../pages/auth/login.tsx";
import ProductSettingsDetailsLayout from "../../pages/product-config/product-settings-details-layout.tsx";
import Category from "../../pages/product-config/category";
import Brands from "../../pages/product-config/brand";
import StockUnits from "../../pages/product-config/stock-unit";
import Suppliers from "../../pages/supplier";
import SupplierDetailLayout from "../../pages/supplier/supplier-detail-layout.tsx";
import SupplierInfo from "../../pages/supplier/supplier-info.tsx";
import SupplierProduct from "../../pages/supplier/supplier-product.tsx";
import ProductDetailLayout from "../../pages/product/product-detail-layout.tsx";
import ProductInfo from "../../pages/product/product-info.tsx";
import ProductSupplier from "../../pages/product/product-suppliers.tsx";
import Analytics from "../../pages/dashboard";


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
                    <Route path={MenuLinks.admin.product.details.index} element={<ProductDetailLayout/>}>
                        <Route index element={<ProductInfo/>} />
                        <Route path={MenuLinks.admin.product.details.suppliers} element={<ProductSupplier/>}/>
                    </Route>
                    <Route path={MenuLinks.admin.product.formPage} element={<ProductFormPage/>}/>


                    <Route path={MenuLinks.admin.supplier.index} element={<Suppliers/>}/>

                    {/* product settings */}
                    <Route path={MenuLinks.admin.productSettings.index} element={<ProductSettingsDetailsLayout/>}>
                        <Route index element={<Category/>} />
                        <Route index path={MenuLinks.admin.productSettings.category} element={<Category/>} />
                        <Route path={MenuLinks.admin.productSettings.brand} element={<Brands/>}/>
                        <Route path={MenuLinks.admin.productSettings.stockUnit} element={<StockUnits/>}/>
                    </Route>

                    {/* supplier */}
                    <Route path={MenuLinks.admin.supplier.details.index} element={<SupplierDetailLayout/>}>
                        <Route index element={<SupplierInfo/>} />
                        <Route path={MenuLinks.admin.supplier.details.product} element={<SupplierProduct/>}/>
                    </Route>

                    <Route path={'*'} element={<AdminNotFound/>}/>
                </Route>

                <Route path={'*'} element={<Login/>} />
            </Routes>

            {background && (<><ModalRoute/> <Outlet/></>)}
        </div>
    )
};
