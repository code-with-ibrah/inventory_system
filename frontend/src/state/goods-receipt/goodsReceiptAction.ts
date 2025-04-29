import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";
import {ToggleType} from "../../types/toggle-type.ts";

export const deleteGoodsReceipt = createAsyncThunk(
    "goodsReceipt/deleteGoodsReceipt", async (customerId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/goods-receipts/${customerId}`);

            return customerId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);
 


export const createGoodsReceipt = createAsyncThunk(
    "goodsReceipt/createGoodsReceipt", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().post('/goods-receipts', data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);

 

export const updateGoodsReceipt = createAsyncThunk(
    "goodsReceipt/updateGoodsReceipt", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/goods-receipts/${data.id}`, data.data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);

 

export const getAllGoodsReceipts = createAsyncThunk(
    "goodsReceipt/getAllGoodsReceipts", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/goods-receipts?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);


export const toggleGoodsReceipt = createAsyncThunk(
    "goodsReceipt/toggleGoodsReceipt", async (data: ToggleType, {rejectWithValue}) => {
        try {
            const res = await api().put(`/goods-receipts-toggle/${data.column}/${data.id}`);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)