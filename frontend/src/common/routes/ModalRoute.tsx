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
import StockForm from "../../pages/stock/stock-form.tsx";
import StockAdjustmentForm from "../../pages/stock-adjustment/stock-adjustment-form.tsx";
import GoodsReceiptItemForm from "../../pages/goods-receipt/items/goods-receipt-item-form.tsx";
import SingleGoodsReceiptItemForm from "../../pages/goods-receipt/items/single-goods-receipt-item-form.tsx";
import CustomerForm from "../../pages/customer/customer-form.tsx";
import InstallmentPlanForm from "../../pages/config/installment-plan/installment-plan-form.tsx";
import PaymentMethodForm from "../../pages/config/payment-method/payment-method-form.tsx";
import RoleForm from "../../pages/config/roles/role-form.tsx";
import GoodsReceiptForm from "../../pages/goods-receipt/goods-receipt-form.tsx";
import SingleStockAdjustmentItemForm from "../../pages/stock-adjustment/items/single-stock-adjustment-item-form.tsx";
import StockAdjustmentItemForm from "../../pages/stock-adjustment/items/stock-adjustment-item-form.tsx";


export const ModalRoute = () => {
    return (
        <Routes>
            <Route path={MenuLinks.admin.product.form} element={<ProductForm/>}/>
            <Route path={MenuLinks.admin.productSettings.categoryForm} element={<CategoryForm/>}/>
            <Route path={MenuLinks.admin.productSettings.brandForm} element={<BrandForm/>}/>
            <Route path={MenuLinks.admin.productSettings.stockUnitForm} element={<StockUnitsForm/>}/>
            <Route path={MenuLinks.admin.supplier.form} element={<SupplierForm/>}/>
            <Route path={MenuLinks.admin.supplier.details.supplierProductForm} element={<SupplierProductForm/>}/>
            <Route path={MenuLinks.admin.product.details.productSuppliersForm} element={<ProductSupplierForm/>}/>
            <Route path={MenuLinks.admin.warehouse.form} element={<WarehouseForm/>}/>
            <Route path={MenuLinks.admin.stock.form} element={<StockForm/>}/>

            <Route path={MenuLinks.admin.stockAdjustment.form} element={<StockAdjustmentForm/>}/>
            <Route path={MenuLinks.admin.stockAdjustment.itemsForm} element={<StockAdjustmentItemForm/>}/>
            <Route path={MenuLinks.admin.stockAdjustment.singleItemForm} element={<SingleStockAdjustmentItemForm/>}/>

            <Route path={MenuLinks.admin.customers.form} element={<CustomerForm/>}/>
            <Route path={MenuLinks.admin.config.userForm} element={<InstallmentPlanForm/>}/>
            <Route path={MenuLinks.admin.config.roleForm} element={<RoleForm/>}/>
            <Route path={MenuLinks.admin.config.paymentMethodForm} element={<PaymentMethodForm/>}/>
            <Route path={MenuLinks.admin.config.installmentPlanForm} element={<InstallmentPlanForm/>}/>

            <Route path={MenuLinks.admin.goodsReceipt.form} element={<GoodsReceiptForm/>}/>
            <Route path={MenuLinks.admin.goodsReceipt.itemForm} element={<GoodsReceiptItemForm/>} />
            <Route path={MenuLinks.admin.goodsReceipt.singleItemForm} element={<SingleGoodsReceiptItemForm/>} />

        </Routes>
    )
}
