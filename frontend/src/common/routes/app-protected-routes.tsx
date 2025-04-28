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
import SupplierProductList from "../../pages/supplier/supplier-product-list.tsx";
import ProductDetailLayout from "../../pages/product/product-detail-layout.tsx";
import ProductInfo from "../../pages/product/product-info.tsx";
import ProductSupplier from "../../pages/product/product-supplier-list.tsx";
import Analytics from "../../pages/dashboard";
import Warehouses from "../../pages/warehouse";
import WarehouseDetails from "../../pages/warehouse/warehouse-details.tsx";
import Stocks from "../../pages/stock";
import StockDetails from "../../pages/stock/stock-details.tsx";
import StockAdjustments from "../../pages/stock-adjustment";
import StockAdjustmentDetails from "../../pages/stock-adjustment/stock-adjustment-details.tsx";
import Customers from "../../pages/customer";
import ConfigDetailLayout from "../../pages/config/config-detail-layout.tsx";
import Users from "../../pages/config/users";
import Roles from "../../pages/config/roles";
import InstallmentPlans from "../../pages/config/installment-plan";
import PaymentMethods from "../../pages/config/payment-method";


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
                        <Route path={MenuLinks.admin.supplier.details.product} element={<SupplierProductList/>}/>
                    </Route>

                    {/* warehouse */}
                    <Route path={MenuLinks.admin.warehouse.index} element={<Warehouses/>} />
                    <Route path={MenuLinks.admin.warehouse.details} element={<WarehouseDetails/>} />

                    {/* stocks */}
                    <Route path={MenuLinks.admin.stock.index} element={<Stocks/>} />
                    <Route path={MenuLinks.admin.stock.details} element={<StockDetails/>} />

                    {/* stocks adjustment */}
                    <Route path={MenuLinks.admin.stockAdjustment.index} element={<StockAdjustments/>}/>
                    <Route path={MenuLinks.admin.stockAdjustment.details} element={<StockAdjustmentDetails/>}/>

                    {/* customers */}
                    <Route path={MenuLinks.admin.customers.index} element={<Customers/>}/>

                    {/* config */}
                    <Route path={MenuLinks.admin.config.index} element={<ConfigDetailLayout/>}>
                        <Route index element={<Users/>} />
                        <Route path={MenuLinks.admin.config.users} element={<Users/>} />
                        <Route path={MenuLinks.admin.config.roles} element={<Roles/>} />
                        <Route path={MenuLinks.admin.config.installmentPlan} element={<InstallmentPlans/>}/>
                        <Route path={MenuLinks.admin.config.paymentMethod} element={<PaymentMethods/>}/>
                    </Route>


                    <Route path={'*'} element={<AdminNotFound/>}/>
                </Route>

                <Route path={'*'} element={<Login/>} />
            </Routes>

            {background && (<><ModalRoute/> <Outlet/></>)}
        </div>
    )
};
