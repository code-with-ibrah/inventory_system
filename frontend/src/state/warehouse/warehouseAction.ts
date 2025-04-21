import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";
import {ToggleType} from "../../types/toggle-type.ts";


export const deleteWarehouse = createAsyncThunk(
    "warehouse/deleteWarehouse", async (warehouseId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/warehouses/${warehouseId}`)

            return warehouseId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const createWarehouse = createAsyncThunk(
    "warehouse/createWarehouse", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().post('/warehouses', data);

            return res.data.data
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const updateWarehouse = createAsyncThunk(
    "warehouse/updateWarehouse", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/warehouses/${data.id}`, data.data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const toggleWarehouse = createAsyncThunk(
    "warehouse/toggleWarehouse", async (data: ToggleType, {rejectWithValue}) => {
        try {
            const res = await api().put(`/warehouses-toggle/${data.column}/${data.id}`);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const getAllWarehouses = createAsyncThunk(
    "warehouse/getAllCategories", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/warehouses?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

