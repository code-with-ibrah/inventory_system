import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";
import {ToggleType} from "../../types/toggle-type.ts";

export const deleteStockAdjustment = createAsyncThunk(
    "stockAdjustment/deleteStockAdjustment", async (productId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/stock-adjustments/${productId}`);

            return productId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);



export const createStockAdjustment = createAsyncThunk(
    "stockAdjustment/createStockAdjustment", async (data: any, {rejectWithValue}) => {
        try {
            const res = await  api().post('/stock-adjustments', data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);



export const updateStockAdjustment = createAsyncThunk(
    "stockAdjustment/updateStockAdjustment", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/stock-adjustments/${data.id}`, data.data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);



export const getAllStockAdjustment = createAsyncThunk("stockAdjustment/getAllStockAdjustment", async (params: string = "", {rejectWithValue}) => {
        try {
            const res = await api().get(`/stock-adjustments?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);






export const toggleStockAdjustment = createAsyncThunk("StockAdjustment/toggleStockAdjustment", async (toggleType: ToggleType, {rejectWithValue}) => {
        try {
            const res = await api().put(`/stock-adjustments-toggle/${toggleType.column}/${toggleType.id}`);
            return res.data
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);
