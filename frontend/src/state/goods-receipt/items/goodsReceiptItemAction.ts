import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api.ts";
import {ToggleType} from "../../../types/toggle-type.ts";

export const deleteGoodsReceiptItem = createAsyncThunk(
    "goodsReceiptItem/deleteGoodsReceiptItem", async (customerId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/goods-receipt-items/${customerId}`);

            return customerId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);
 


export const createGoodsReceiptItem = createAsyncThunk(
    "goodsReceiptItem/createGoodsReceiptItem", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().post('/goods-receipt-items', data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);

 

export const updateGoodsReceiptItem = createAsyncThunk(
    "goodsReceiptItem/updateGoodsReceiptItem", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/goods-receipt-items/${data.id}`, data.data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);

 

export const getAllGoodsReceiptItems = createAsyncThunk(
    "goodsReceiptItem/getAllGoodsReceiptItems", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/goods-receipt-items?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);


export const createBulkGoodsReceiptItems = createAsyncThunk(
    "goodsReceiptItem/createBulkGoodsReceiptItems", async (data: any, {rejectWithValue}) => {
        try {
            const res = await  api().post('/goods-receipt-items', data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);


export const toggleGoodsReceiptItem = createAsyncThunk(
    "goodsReceiptItem/toggleGoodsReceiptItem", async (data: ToggleType, {rejectWithValue}) => {
        try {
            const res = await api().put(`/goods-receipt-items-toggle/${data.column}/${data.id}`);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)