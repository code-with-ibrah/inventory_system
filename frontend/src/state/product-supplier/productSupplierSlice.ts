import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {Product} from "../../types/product";
import {ProductSupplierState} from "../../types/product-supplier.ts";
import {
    addProductToSupplier,
    addSupplierToProduct,
    getAllProductBySuppliers, getAllSupplierByProduct,
    removeProductFromSupplier,
    removeSupplierFromProduct,
} from "./productSupplierAction.ts";


const initialState: ProductSupplierState = {
    supplierList: {
        data: []
    },
    productList: {
        data: []
    }
}


const productSupplierSlice = createSlice({
    name: "productSupplier",
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(addProductToSupplier.fulfilled, (state, action: PayloadAction<Product>) => {
            state.productList.data.push(action.payload);
        }).addCase(addSupplierToProduct.fulfilled, (state, action: PayloadAction<Product>) => {
            state.supplierList.data.push(action.payload);
        }).addCase(removeProductFromSupplier.fulfilled, (state, action: PayloadAction<any>) => {
            state.productList.data = state.productList.data.filter((product) => product.id !== action.payload);
            state.productList.data = state.productList.data.filter((product) => product.id != action.payload?.productId);
        }).addCase(removeSupplierFromProduct.fulfilled, (state, action: PayloadAction<any>) => {
            state.supplierList.data = state.supplierList.data.filter((supplier) => supplier.id !== action.payload);
            state.supplierList.data = state.supplierList.data.filter((supplier) => supplier.id != action.payload?.supplierId);
        }).addCase(getAllProductBySuppliers.fulfilled, (state, action) => {
            state.productList = action.payload;
        }).addCase(getAllSupplierByProduct.fulfilled, (state, action) => {
            state.supplierList = action.payload;
        })
    }
});


export default productSupplierSlice.reducer