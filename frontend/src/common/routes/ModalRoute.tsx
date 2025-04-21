import { Route, Routes } from "react-router-dom";
import { MenuLinks } from "../../utils/menu-links";
import ProductForm from "../../pages/product/product-form.tsx";
import CategoryForm from "../../pages/product-config/category/category-form.tsx";
import BrandForm from "../../pages/product-config/brand/brand-form.tsx";
import StockUnitsForm from "../../pages/product-config/stock-unit/stock-unit-form.tsx";
import SupplierForm from "../../pages/supplier/supplier-form.tsx";
import SupplierProductForm from "../../pages/supplier/supplier-product-form.tsx";
import ProductSupplierForm from "../../pages/product/product-supplier-form.tsx";
import WarehouseForm from "../../pages/warehouse/warehouse-form.tsx";


export const ModalRoute = () => {
    return (
        <Routes>
            {/*<Route path={MenuLinks.admin.config.details.userForm} element={<UserForm/>}/>*/}
            {/*<Route path={MenuLinks.admin.config.details.roleForm} element={<RoleForm/>}/>*/}
            {/*<Route path={MenuLinks.organisation.profile.changePasswordForm} element={<ChangePasswordForm/>}/>*/}
            {/*<Route path={MenuLinks.organisation.profile.editForm} element={<OrganisationEditProfileForm/>} />*/}
            {/*<Route path={MenuLinks.organisation.userForm} element={<OrganisationUserForm/>}/>*/}

            <Route path={MenuLinks.admin.product.form} element={<ProductForm/>}/>
            <Route path={MenuLinks.admin.productSettings.categoryForm} element={<CategoryForm/>}/>
            <Route path={MenuLinks.admin.productSettings.brandForm} element={<BrandForm/>}/>
            <Route path={MenuLinks.admin.productSettings.stockUnitForm} element={<StockUnitsForm/>}/>
            <Route path={MenuLinks.admin.supplier.form} element={<SupplierForm/>}/>
            <Route path={MenuLinks.admin.supplier.details.supplierProductForm} element={<SupplierProductForm/>}/>
            <Route path={MenuLinks.admin.product.details.productSuppliersForm} element={<ProductSupplierForm/>}/>
            <Route path={MenuLinks.admin.warehouse.form} element={<WarehouseForm/>}/>

        </Routes>
    )
}
