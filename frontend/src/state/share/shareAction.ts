import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";

export const deletePercentageShare = createAsyncThunk(
    "PercentageShare/deletePercentageShare", async (percentageShareId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/percentages/${percentageShareId}`)

            return percentageShareId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data);
        }
    }
)

export const createPercentageShare = createAsyncThunk(
    "PercentageShare/createPercentageShare", async (data: any, {rejectWithValue}) => {
        try {
            const res = await  api().post('/percentages', data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const updatePercentageShare = createAsyncThunk(
    "PercentageShare/updatePercentageShare", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/percentages/${data.id}`, data.data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const getAllPercentages = createAsyncThunk("PercentageShare/getAllPercentages", async (params: string = "", {rejectWithValue}) => {
        try {
            const res = await api().get(`/percentages?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);





export const togglePercentageShareActiveness = createAsyncThunk("PercentageShare/toggleActiveness", async (id: number, {rejectWithValue}) => {
        try {
            const res = await api().put(`/percentages-toggle-active/${id}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)
