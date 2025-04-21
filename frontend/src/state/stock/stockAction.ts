import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";
import {ToggleType} from "../../types/toggle-type.ts";


export const deleteStock = createAsyncThunk(
    "stock/deleteStock", async (warehouseId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/stocks/${warehouseId}`)

            return warehouseId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const createStock = createAsyncThunk(
    "stock/createStock", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().post('/stocks', data);

            return res.data.data
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const updateStock = createAsyncThunk(
    "stock/updateStock", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/stocks/${data.id}`, data.data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const toggleStock = createAsyncThunk(
    "stock/toggleStock", async (data: ToggleType, {rejectWithValue}) => {
        try {
            const res = await api().put(`/stocks-toggle/${data.column}/${data.id}`);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const getAllStocks = createAsyncThunk(
    "stock/getAllStocks", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/stocks?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

