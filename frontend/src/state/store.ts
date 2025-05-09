import {combineReducers, configureStore} from '@reduxjs/toolkit'
import authSlice from "./auth/authSlice.ts"
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,} from "redux-persist"
import storage from 'redux-persist/lib/storage'
import errorSlice from "./errorSlice.ts";
import usersSlice from "./users/usersSlice.ts";
import analyticsSlice from "./analytics/analyticsSlice.ts";
import classesSlice from "./classes/classesSlice";
import eventSlice from "./events/eventSlice.ts";
import awardSlice from "./award/awardSlice.ts";
import categorySlice from "./category/categorySlice.ts";
import commonSlice from "./common/commonSlice.ts";
import contestantSlice from "./contestant/contestantSlice.ts";
import organisationSlice from "./organisations/organisationSlice.ts";
import awardBonusSlice from "./award-bonus/awardBonusSlice.ts";
import shareSlice from "./share/shareSlice.ts";
import roleSlice from "./role/roleSlice.ts";
import dashboardSlice from "./dashboard/dashboardSlice.ts";
import productSlice from "./product/productSlice.ts";
import brandSlice from "./brand/brandSlice.ts";
import stockUnitSlice from "./stock-unit/stockUnitSlice.ts";
import supplierSlice from "./supplier/supplierSlice.ts";
import productSupplierSlice from "./product-supplier/productSupplierSlice.ts";
import warehouseSlice from "./warehouse/warehouseSlice.ts";
import stockSlice from "./stock/stockSlice.ts";
import stockAdjustmentSlice from "./stock-adjustment/stockAdjustmentSlice.ts";
import stockAdjustmentItemSlice from "./stock-adjustment-item/stockAdjustmentItemSlice.ts";
import customerSlice from "./customer/customerSlice.ts";
import installmentPlanSlice from "./installment-plan/installmentPlanSlice.ts";
import paymentMethodSlice from "./payment-method/paymentMethodSlice.ts";
import goodsReceiptSlice from "./goods-receipt/goodsReceiptSlice.ts";
import goodsReceiptItemSlice from "./goods-receipt/items/goodsReceiptItemSlice.ts";
import orderSlice from "./orders/orderSlice.ts";
import paymentSlice from "./orders/payments/paymentSlice.ts";
import orderItemSlice from "./orders/item/orderItemSlice";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ['errors']
}

const rootReducers = combineReducers({
    errors: errorSlice,
    analytics: analyticsSlice,
    classes: classesSlice,
    events: eventSlice,

    // new ones
    auth: authSlice,
    users: usersSlice,
    award: awardSlice,
    loader: commonSlice,
    contestant: contestantSlice,
    organisation: organisationSlice,
    awardBonusPackage: awardBonusSlice,
    percentageShare: shareSlice,
    role: roleSlice,
    dashboardCounter: dashboardSlice,

    // inventory
    product: productSlice,
    category: categorySlice,
    brand: brandSlice,
    stockUnit: stockUnitSlice,
    supplier: supplierSlice,
    productSupplier: productSupplierSlice,
    warehouse: warehouseSlice,
    stock: stockSlice,
    stockAdjustment: stockAdjustmentSlice,
    stockAdjustmentItem: stockAdjustmentItemSlice,
    customer: customerSlice,
    installmentPlan: installmentPlanSlice,
    paymentMethod: paymentMethodSlice,
    goodsReceipt: goodsReceiptSlice,
    goodsReceiptItem: goodsReceiptItemSlice,
    order: orderSlice,
    payment: paymentSlice,
    orderItem: orderItemSlice,

})

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // serializableCheck: false
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            },
        }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
