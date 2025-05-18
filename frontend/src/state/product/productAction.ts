import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";
import {ToggleType} from "../../types/toggle-type.ts";

export const deleteProduct = createAsyncThunk(
    "award/deleteProduct", async (productId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/products/${productId}`);

            return productId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);



export const createProduct = createAsyncThunk(
    "auth/createProduct", async (data: any, {rejectWithValue}) => {
        try {
            const res = await  api('multipart/form-data').post('/products', data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);



export const updateProduct = createAsyncThunk(
    "auth/updateProduct", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/products/${data.id}`, data.data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);



export const getAllProducts = createAsyncThunk("award/getAllProducts", async (params: string = "", {rejectWithValue}) => {
        try {
            const res = await api().get(`/products?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);






export const toggleProduct = createAsyncThunk("products/toggleProduct", async (toggleType: ToggleType, {rejectWithValue}) => {
        try {
            const res = await api().put(`/products-toggle/${toggleType.column}/${toggleType.id}`);
            return res.data
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);
