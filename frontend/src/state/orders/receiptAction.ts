import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";
import {ToggleType} from "../../types/toggle-type.ts";

export const deleteOrders = createAsyncThunk(
    "orders/deleteOrders", async (customerId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/orders/${customerId}`);

            return customerId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);
 


export const createOrders = createAsyncThunk(
    "orders/createOrders", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().post('/orders', data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);

 

export const updateOrders = createAsyncThunk(
    "orders/updateOrders", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/orders/${data.id}`, data.data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);


export const updateOrderStatus = createAsyncThunk(
    "orders/updateOrderStatus", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/orders/status/${data.id}`, data.data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);

 

export const getAllOrders = createAsyncThunk(
    "orders/getAllOrders", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/orders?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);


export const getOrderById = createAsyncThunk(
    "orders/getOrderById", async (id: number, {rejectWithValue}) => {
        try {
            const res = await api().get(`/orders?id[eq]=${id}`);

            return res.data[0];

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);



export const toggleOrders = createAsyncThunk(
    "orders/toggleOrders", async (data: ToggleType, {rejectWithValue}) => {
        try {
            const res = await api().put(`/orders-toggle/${data.column}/${data.id}`);

            return res.data.data
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)


export const markOrdersAsCompleted = createAsyncThunk(
    "orders/markOrdersAsCompleted", async (id: number, {rejectWithValue}) => {
        try {
            const res = await api().put(`/orders-received/${id}`);

            return res.data.data
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)