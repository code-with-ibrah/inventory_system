import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api.ts";
import {ToggleType} from "../../../types/toggle-type.ts";

export const deleteOrderItem = createAsyncThunk(
    "orderItem/deleteOrderItem", async (orderItemId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/order-items/${orderItemId}?delete=true`);

            return orderItemId;

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);
 


export const createOrderItem = createAsyncThunk(
    "orderItem/createOrderItem", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().post('/order-items', data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);

 

export const updateOrderItem = createAsyncThunk(
    "orderItem/updateOrderItem", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/order-items/${data.id}`, data.data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);

 

export const getAllOrderItems = createAsyncThunk(
    "orderItem/getAllOrderItems", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/order-items?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);


export const createBulkOrderItems = createAsyncThunk(
    "orderItem/createBulkOrderItems", async (data: any, {rejectWithValue}) => {
        try {
            const res = await  api().post('/order-items', data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);


export const toggleOrderItem = createAsyncThunk(
    "orderItem/toggleOrderItem", async (data: ToggleType, {rejectWithValue}) => {
        try {
            const res = await api().put(`/order-items-toggle/${data.column}/${data.id}`);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)