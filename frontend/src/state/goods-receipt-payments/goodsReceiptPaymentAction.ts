import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";
import {ToggleType} from "../../types/toggle-type.ts";


export const deleteGoodsReceiptPayment = createAsyncThunk(
    "goodsReceiptPayment/deleteGoodsReceiptPayment", async (id: number, {rejectWithValue}) => {
        try {
            await api().delete(`/goods-receipt-payments/${id}`)

            return id

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const createGoodsReceiptPayment = createAsyncThunk(
    "goodsReceiptPayment/createGoodsReceiptPayment", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().post('/goods-receipt-payments', data);

            return res.data.data
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const updateGoodsReceiptPayment = createAsyncThunk(
    "goodsReceiptPayment/updateGoodsReceiptPayment", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/goods-receipt-payments/${data.id}`, data.data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const toggleGoodsReceiptPayment = createAsyncThunk(
    "goodsReceiptPayment/toggleGoodsReceiptPayment", async (data: ToggleType, {rejectWithValue}) => {
        try {
            const res = await api().put(`/goods-receipt-payments-toggle/${data.column}/${data.id}`);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const getAllGoodsReceiptPayments = createAsyncThunk(
    "goodsReceiptPayment/getAllGoodsReceiptPayments", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/goods-receipt-payments?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

