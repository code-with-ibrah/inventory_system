import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";


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
            const res = await api('multipart/form-data').post('/categories', data);

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
            const res = await api('multipart/form-data').post(`/categories/${data.id}`, data.data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const categoryActiveness = createAsyncThunk(
    "category/toggleCategoryActivess", async (id: number, {rejectWithValue}) => {
        try {
            const res = await api().put(`/categories-toggle-active/${id}`)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)


export const categoryVisibilityToggler = createAsyncThunk(
    "category/categoryVisibilityToggler", async (id: number, {rejectWithValue}) => {
        try {
            const res = await api().put(`/toggle-categories-visibility/${id}`)

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


export const getAllCategoriesWithContestant = createAsyncThunk(
    "category/getAllCategoriesWithContestant", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/categories-contestants?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)


export const getAllCategoryWithoutPagination = createAsyncThunk(
    "category/getAllCategoryWithoutPagination", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/categories-all?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const searchCategories = createAsyncThunk(
    "category/searchCategories", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/categories-search?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);
