import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../../utils/api.ts";

export const deletePayment = createAsyncThunk(
    "orders/deletePayment", async (customerId: number, {rejectWithValue}) => {
        try {
            const res = await api().delete(`/payments/${customerId}?delete=true`);

            return res.data.data;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);
 


export const createPayment = createAsyncThunk(
    "orders/createPayment", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().post('/payments', data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);

 

export const updatePayment = createAsyncThunk(
    "orders/updatePayment", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/payments/${data.id}`, data.data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);

 

export const getAllPayments = createAsyncThunk(
    "orders/getAllPayments", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/payments?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);


 

 