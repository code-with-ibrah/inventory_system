import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";
import {ToggleType} from "../../types/toggle-type.ts";

export const deletePaymentMethod = createAsyncThunk(
    "installmentPlan/deletePaymentMethod", async (customerId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/payment-methods/${customerId}`);

            return customerId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);
 


export const createPaymentMethod = createAsyncThunk(
    "auth/createPaymentMethod", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().post('/payment-methods', data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);

 

export const updatePaymentMethod = createAsyncThunk(
    "auth/updatePaymentMethod", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/payment-methods/${data.id}`, data.data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);

 

export const getAllPaymentMethods = createAsyncThunk(
    "installmentPlan/getAllPaymentMethods", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/payment-methods?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);


export const togglePaymentMethod = createAsyncThunk(
    "installmentPlan/togglePaymentMethod", async (data: ToggleType, {rejectWithValue}) => {
        try {
            const res = await api().put(`/payment-methods-toggle/${data.column}/${data.id}`);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)