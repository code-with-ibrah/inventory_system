import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";
import {ToggleType} from "../../types/toggle-type.ts";


export const deleteCategory = createAsyncThunk(
    "category/deleteCategory", async (categoryId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/categories/${categoryId}`)

            return categoryId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const createCategory = createAsyncThunk(
    "category/createCategory", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().post('/categories', data);

            return res.data.data
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const updateCategory = createAsyncThunk(
    "category/updateCategory", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/categories/${data.id}`, data.data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const toggleCategory = createAsyncThunk(
    "category/toggleCategory", async (data: ToggleType, {rejectWithValue}) => {
        try {
            const res = await api().put(`/categories-toggle/${data.column}/${data.id}`);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const getAllCategories = createAsyncThunk(
    "category/getAllCategories", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/categories?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

