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
import GoodsReceipt from "../../pages/goods-receipt";
import GoodsReceiptItems from "../../pages/goods-receipt/items";
import GoodsReceiptInvoice from "../../pages/goods-receipt/goods-receipt-invoice.tsx";
import Orders from "../../pages/orders";
import OrderDetailLayout from "../../pages/orders/order-detail-layout.tsx";
import OrdersInfo from "../../pages/orders/orders-info.tsx";
import OrdersPayment from "../../pages/orders/orders-payment.tsx";
import OrderCategoryLayout from "../../pages/orders/order-category-layout.tsx";
import DeliveredOrders from "../../pages/orders/delivered-orders.tsx";
import CancelledOrders from "../../pages/orders/cancelled-orders.tsx";
import OrderItems from "../../pages/orders/item";
import PreparingOrders from "../../pages/orders/preparing-orders.tsx";
import OrdersInvoice from "../../pages/orders/orders-invoice.tsx";
import StatementLayout from "../../pages/statements/statement-layout.tsx";
import CustomerStatementIndex from "../../pages/statements/customer-statment-index.tsx";
import CustomerStatements from "../../pages/statements/customer-statement.tsx";
import SupplierStatementIndex from "../../pages/statements/supplier-statment-index.tsx";
import SupplierStatements from "../../pages/statements/supplier-statement.tsx";
import CustomerDetailLayout from "../../pages/customer/customer-detail-layout.tsx";
import CustomerInfo from "../../pages/customer/customer-info.tsx";
import CustomerPayments from "../../pages/customer/customer-payment.tsx";
import CustomerStatementNex from "../../pages/customer/customer-statement-nex.tsx";
import SupplierPayments from "../../pages/supplier/supplier-payment.tsx";
import SupplierStatementNex from "../../pages/supplier/supplier-statement-nex.tsx";
import CustomerOrders from "../../pages/customer/customer-orders.tsx";
import CustomerOrderDetailLayout from "../../pages/customer/customer-order-detail-layout.tsx";


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
                        <Route path={MenuLinks.admin.supplier.details.receipt.index} element={<GoodsReceipt/>}/>
                        <Route path={MenuLinks.admin.supplier.details.payments} element={<SupplierPayments/>}/>
                        <Route path={MenuLinks.admin.supplier.details.statement} element={<SupplierStatementNex/>}/>
                        <Route path={MenuLinks.admin.supplier.details.receipt.items} element={<GoodsReceiptItems/>}/>
                        <Route path={MenuLinks.admin.supplier.details.receipt.invoice} element={<GoodsReceiptInvoice/>}/>
                    </Route>

                    {/* warehouse */}
                    <Route path={MenuLinks.admin.warehouse.index} element={<Warehouses/>} />
                    <Route path={MenuLinks.admin.warehouse.details} element={<WarehouseDetails/>} />

                    {/* stocks */}
                    <Route path={MenuLinks.admin.stock.index} element={<Stocks/>} />
                    <Route path={MenuLinks.admin.stock.details} element={<StockDetails/>} />
                    <Route path={MenuLinks.admin.stock.supplier} element={<ProductSupplier/>} />

                    {/* stocks adjustment */}
                    <Route path={MenuLinks.admin.stockAdjustment.index} element={<StockAdjustments/>}/>
                    <Route path={MenuLinks.admin.stockAdjustment.details} element={<StockAdjustmentDetails/>}/>

                    {/* customers */}
                    <Route path={MenuLinks.admin.customers.index} element={<Customers/>}/>
                    <Route path={MenuLinks.admin.customers.details.index} element={<CustomerDetailLayout/>}>
                        <Route index element={<CustomerInfo/>}/>
                        <Route path={MenuLinks.admin.customers.details.orders} element={<CustomerOrders/>}/>
                        <Route path={MenuLinks.admin.customers.details.payments} element={<CustomerPayments/>}/>
                        <Route path={MenuLinks.admin.customers.details.statements} element={<CustomerStatementNex/>}/>
                    </Route>

                    <Route path={MenuLinks.admin.customers.details.orderDetails} element={<CustomerOrderDetailLayout/>}>
                        <Route index element={<OrdersInfo/>}/>
                        <Route path={MenuLinks.admin.customers.details.orderDetailProducts} element={<OrderItems/>}/>
                    </Route>



                    {/* config */}
                    <Route path={MenuLinks.admin.config.index} element={<ConfigDetailLayout/>}>
                        <Route index element={<Users/>} />
                        <Route path={MenuLinks.admin.config.users} element={<Users/>} />
                        <Route path={MenuLinks.admin.config.roles} element={<Roles/>} />
                        <Route path={MenuLinks.admin.config.installmentPlan} element={<InstallmentPlans/>}/>
                        <Route path={MenuLinks.admin.config.paymentMethod} element={<PaymentMethods/>}/>
                    </Route>

                    {/* goods receipt */}
                    <Route path={MenuLinks.admin.goodsReceipt.index} element={<GoodsReceipt/>}/>
                    <Route path={MenuLinks.admin.goodsReceipt.itemIndex} element={<GoodsReceiptItems/>}/>
                    <Route path={MenuLinks.admin.goodsReceipt.invoice} element={<GoodsReceiptInvoice/>}/>

                    {/* orders */}
                    <Route path={MenuLinks.admin.order.index} element={<OrderCategoryLayout/>} >
                        <Route index element={<Orders/>} />
                        <Route path={MenuLinks.admin.order.preparing} element={<PreparingOrders/>} />
                        <Route path={MenuLinks.admin.order.cancelled} element={<CancelledOrders/>} />
                        <Route path={MenuLinks.admin.order.delivered} element={<DeliveredOrders/>} />
                    </Route>
                    <Route path={MenuLinks.admin.order.details.index} element={<OrderDetailLayout/>}>
                        <Route index element={<OrdersInfo/>}/>
                        <Route path={MenuLinks.admin.order.details.products} element={<OrderItems/>}/>
                        <Route path={MenuLinks.admin.order.details.payment} element={<OrdersPayment/>} />
                    </Route>
                    <Route path={MenuLinks.admin.order.invoice} element={<OrdersInvoice/>}/>


                    {/* statements */}
                    <Route path={MenuLinks.admin.statement.index} element={<StatementLayout/>}>
                        <Route index element={<CustomerStatementIndex/>} />
                        <Route path={MenuLinks.admin.statement.index} element={<CustomerStatementIndex/>} />
                        <Route path={MenuLinks.admin.statement.customers} element={<CustomerStatementIndex/>}/>
                        <Route path={MenuLinks.admin.statement.customerStatements} element={<CustomerStatements/>} />
                        <Route path={MenuLinks.admin.statement.supplier} element={<SupplierStatementIndex/>} />
                        <Route path={MenuLinks.admin.statement.supplierStatements} element={<SupplierStatements/>} />
                    </Route>



                    <Route path={'*'} element={<AdminNotFound/>}/>
                </Route>

                <Route path={'*'} element={<Login/>} />
            </Routes>

            {background && (<><ModalRoute/> <Outlet/></>)}
        </div>
    )
};
