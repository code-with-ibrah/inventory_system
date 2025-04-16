import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {env} from "../../config/env";
import {Product, ProductsState} from "../../types/product";
import {createProduct, deleteProduct, getAllProducts, toggleProduct, updateProduct} from "./productAction";

const initialState: ProductsState = {
    product: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/products?page=1`,
            last: `${env.API_BASE_URL}/products?page=1`,
            prev: null,
            next: null
        },
        meta: {
            current_page: 1,
            from: 0,
            last_page: 1,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false
                },
                {
                    url: `${env.API_BASE_URL}/products?page=1`,
                    label: "1",
                    active: true
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            path: `${env.API_BASE_URL}/products`,
            per_page: 15,
            to: null,
            total: 0
        }
    },
    productItem: {
        id: 0,
        name: "",
        sku: "",
        costPrice: 0,
        quantity: 0,
        stockAlertLevel: 0,
        companyId: 0,
        categoryId: 0,
        brandId: 0,
        barcode: "",
        isDeleted: false,
        isActive: true,
        image: "",
        unitPrice: "0.00",
        stockUnitId: 0,
        expirationDate: "",
        taxRate: 0,
        serialNumber: "",
        batchNumber: "",
        longDescription: "",
        shortDescription: "",
    }

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
        builder.addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
            state.product.data.push(action.payload)
        }).addCase(getAllProducts.fulfilled, (state, action) => {
            state.product = action.payload;
        }).addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
            state.productItem = action.payload;
        }) .addCase(toggleProduct.fulfilled, (state, action: PayloadAction<Product>) => {
            state.product.data = state.product.data.map((product: Product) => {
                return product.id === action.payload.id ? action.payload : product;
            })
        }).addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
            state.product.data = state.product.data.filter((award) => award.id !== action.payload);
        })
    }
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer