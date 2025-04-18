import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";
import {ToggleType} from "../../types/toggle-type.ts";


export const deleteBrand = createAsyncThunk(
    "Brand/deleteBrand", async (brandId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/brands/${brandId}`)

            return brandId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const createBrand = createAsyncThunk(
    "brand/createBrand", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().post('/brands', data);

            return res.data.data
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const updateBrand = createAsyncThunk(
    "Brand/updateBrand", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/brands/${data.id}`, data.data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const toggleBrand = createAsyncThunk(
    "Brand/toggleBrand", async (data: ToggleType, {rejectWithValue}) => {
        try {
            const res = await api().put(`/brands-toggle/${data.column}/${data.id}`);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const getAllBrands = createAsyncThunk(
    "Brand/getAllbrands", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/brands?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

