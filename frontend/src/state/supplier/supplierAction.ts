import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";
import {ToggleType} from "../../types/toggle-type.ts";


export const deleteSupplier = createAsyncThunk(
    "supplier/deleteSupplier", async (supplierId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/suppliers/${supplierId}`)

            return supplierId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const createSupplier = createAsyncThunk(
    "supplier/createSupplier", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().post('/suppliers', data);

            return res.data.data
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const updateSupplier = createAsyncThunk(
    "supplier/updateSupplier", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/suppliers/${data.id}`, data.data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const toggleSupplier = createAsyncThunk(
    "supplier/toggleSupplier", async (data: ToggleType, {rejectWithValue}) => {
        try {
            const res = await api().put(`/suppliers-toggle/${data.column}/${data.id}`);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const getAllSuppliers = createAsyncThunk(
    "supplier/getAllSuppliers", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/suppliers?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

