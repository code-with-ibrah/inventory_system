import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {Product, ProductsState} from "../../types/product";
import {createProductSupplier, deleteProductSupplier} from "./productSupplierAction.ts";


const initialState: ProductsState = {

}


const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProduct: (state, action) => {
            state.productItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createProductSupplier.fulfilled, (state, action: PayloadAction<Product>) => {
            state.product.data.push(action.payload)
        }).addCase(deleteProductSupplier.fulfilled, (state, action) => {
            state.product = action.payload;
        }).addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
            state.productItem = action.payload;
        }) .addCase(toggleProduct.fulfilled, (state, action: PayloadAction<Product>) => {
            state.product.data = state.product.data.map((product: Product) => {
                return product.id === action.payload.id ? action.payload : product;
            })
        }).addCase(getAllProductSuppliers.fulfilled, (state, action: PayloadAction<any>) => {
            state.productSuppliers.data = action.payload;
        }).addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
            state.product.data = state.product.data.filter((award) => award.id !== action.payload);
        })
    }
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer