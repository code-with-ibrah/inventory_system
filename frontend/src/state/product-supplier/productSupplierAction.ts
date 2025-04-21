import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";


export const addProductToSupplier = createAsyncThunk(
    "productSuppliers/addProductToSupplier", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().post('/add-product-to-supplier', data);

            return res.data.data
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)



export const addSupplierToProduct = createAsyncThunk(
    "productSuppliers/addSupplierToProduct", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().post('/add-supplier-to-product', data);

            return res.data.data
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)



export const removeSupplierFromProduct = createAsyncThunk(
    "productSupplier/removeSupplierFromProduct", async (query: string, {rejectWithValue}) => {
        try {
            const res = await api().delete(`/product-suppliers?${query}`);
            return res.data;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);



export const removeProductFromSupplier = createAsyncThunk(
    "productSupplier/removeProductFromSupplier", async (query: string, {rejectWithValue}) => {
        try {
            const res = await api().delete(`/product-suppliers?${query}`);
            return res.data;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);



export const getAllProductBySuppliers = createAsyncThunk("award/getAllProductBySuppliers",
    async (supplierId: number, {rejectWithValue}) => {
        try {
            const res = await api().get(`/products-by-supplier/${supplierId}`);

            return res.data;

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);



export const getAllSupplierByProduct = createAsyncThunk(
    "supplier/getAllSupplierByProduct", async (productId: number, {rejectWithValue}) => {
        try {
            const res = await api().get(`/suppliers-by-product/${productId}`);

            return res.data
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);