import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";
import {ToggleType} from "../../types/toggle-type.ts";

export const deleteCustomer = createAsyncThunk(
    "customer/deleteCustomer", async (customerId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/customers/${customerId}`);

            return customerId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);
 


export const createCustomer = createAsyncThunk(
    "auth/createCustomer", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().post('/customers', data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);

 

export const updateCustomer = createAsyncThunk(
    "auth/updateCustomer", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/customers/${data.id}`, data.data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);

 

export const getAllCustomers = createAsyncThunk(
    "customer/getAllCustomers", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/customers?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);


export const toggleCustomer = createAsyncThunk(
    "customer/toggleCustomer", async (data: ToggleType, {rejectWithValue}) => {
        try {
            const res = await api().put(`/customers-toggle/${data.column}/${data.id}`);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)