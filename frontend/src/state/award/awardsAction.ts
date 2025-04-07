import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";

export const deleteAward = createAsyncThunk(
    "award/deleteAward", async (awardId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/awards/${awardId}`)

            return awardId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const createAward = createAsyncThunk(
    "auth/createAward", async (data: any, {rejectWithValue}) => {
        try {
            const res = await  api('multipart/form-data').post('/awards', data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const updateAward = createAsyncThunk(
    "auth/updateAward", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api('multipart/form-data').post(`/awards/${data.id}`, data.data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const updateAwardBonusDate = createAsyncThunk(
    "auth/updateAwardBonusDate", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/awards-set-package-date/${data.id}`, data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const getAllAwards = createAsyncThunk("award/getAllAwards", async (params: string = "", {rejectWithValue}) => {
        try {
            const res = await api().get(`/awards?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);


export const searchAwards = createAsyncThunk("award/searchAwards", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/awards-search?keyword=${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)


export const toggleActiveness = createAsyncThunk("awards/toggleActiveness", async (id: number, {rejectWithValue}) => {
        try {
            const res = await api().put(`/awards-toggle-active/${id}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)


export const toggleAwardVisibility = createAsyncThunk("awards/toggleAwardVisibility", async (id: number, {rejectWithValue}) => {
        try {
            const res = await api().put(`/toggle-awards-visibility/${id}`);
            return res.data
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)
