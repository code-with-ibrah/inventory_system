import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";
import {ToggleType} from "../../types/toggle-type.ts";


export const deleteStockUnit = createAsyncThunk(
    "StockUnit/deleteStockUnit", async (stockUnitId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/stock-units/${stockUnitId}`)

            return stockUnitId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const createStockUnit = createAsyncThunk(
    "StockUnit/createStockUnit", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().post('/stock-units', data);

            return res.data.data
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const updateStockUnit = createAsyncThunk(
    "StockUnit/updateStockUnit", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/stock-units/${data.id}`, data.data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const toggleStockUnit = createAsyncThunk(
    "StockUnit/toggleStockUnit", async (data: ToggleType, {rejectWithValue}) => {
        try {
            const res = await api().put(`/stock-units-toggle/${data.column}/${data.id}`);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const getAllStockUnits = createAsyncThunk(
    "StockUnit/getAllStockUnits", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/stock-units?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

