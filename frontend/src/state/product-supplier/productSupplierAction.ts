import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";

export const createProductSupplier = createAsyncThunk(
    "productSuppliers/createProductSupplier", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().post('/product-suppliers', data);

            return res.data.data
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)


export const deleteProductSupplier = createAsyncThunk(
    "productSupplier/deleteProductSupplier", async (query: string, {rejectWithValue}) => {
        try {
            await api().delete(`/product-suppliers?${query}`);


        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);



export const getAllProductBySuppliers = createAsyncThunk("award/getAllProductSuppliers",
    async (supplierId: number, {rejectWithValue}) => {
        try {
            const res = await api().get(`/products-supplier/${supplierId}`);

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
    "supplier/getAllSupplierProduct", async (productId: number, {rejectWithValue}) => {
        try {
            const res = await api().get(`/suppliers-product/${productId}`);

            return res.data
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);