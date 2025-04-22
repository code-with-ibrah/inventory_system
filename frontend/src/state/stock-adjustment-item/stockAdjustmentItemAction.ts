import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";
import {ToggleType} from "../../types/toggle-type.ts";

export const deleteStockAdjustmentItem = createAsyncThunk(
    "stockAdjustmentItem/deleteStockAdjustmentItem", async (productId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/stock-adjustment-items/${productId}`);

            return productId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);



export const createStockAdjustmentItem = createAsyncThunk(
    "stockAdjustmentItem/createStockAdjustmentItem", async (data: any, {rejectWithValue}) => {
        try {
            const res = await  api().post('/stock-adjustment-items', data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);



export const updateStockAdjustmentItem = createAsyncThunk(
    "stockAdjustmentItem/updateStockAdjustmentItem", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/stock-adjustment-items/${data.id}`, data.data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);



export const getAllStockAdjustmentItems = createAsyncThunk("stockAdjustmentItem/getAllStockAdjustmentItems", async (params: string = "", {rejectWithValue}) => {
        try {
            const res = await api().get(`/stock-adjustment-items?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);






export const toggleStockAdjustmentItem = createAsyncThunk("stockAdjustmentItem/toggleStockAdjustmentItem", async (toggleType: ToggleType, {rejectWithValue}) => {
        try {
            const res = await api().put(`/stock-adjustment-items-toggle/${toggleType.column}/${toggleType.id}`);
            return res.data
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);
