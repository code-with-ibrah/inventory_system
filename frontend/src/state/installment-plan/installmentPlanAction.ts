import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";
import {ToggleType} from "../../types/toggle-type.ts";

export const deleteInstallmentPlan = createAsyncThunk(
    "installmentPlan/deleteInstallmentPlan", async (customerId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/installment-plans/${customerId}`);

            return customerId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);
 


export const createInstallmentPlan = createAsyncThunk(
    "auth/createInstallmentPlan", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().post('/installment-plans', data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);

 

export const updateInstallmentPlan = createAsyncThunk(
    "auth/updateInstallmentPlan", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/installment-plans/${data.id}`, data.data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);

 

export const getAllInstallmentPlans = createAsyncThunk(
    "installmentPlan/getAllInstallmentPlans", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/installment-plans?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);


export const toggleInstallmentPlan = createAsyncThunk(
    "installmentPlan/toggleInstallmentPlan", async (data: ToggleType, {rejectWithValue}) => {
        try {
            const res = await api().put(`/installment-plans-toggle/${data.column}/${data.id}`);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)