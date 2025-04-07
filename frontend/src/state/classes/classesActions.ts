import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.ts";
import { IUpdate } from "../../types/common.ts";

export const deleteClass = createAsyncThunk(
    "class/deleteClass", async (fundId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/classes/${fundId}`)

            return fundId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const createClass = createAsyncThunk(
    "class/createClass", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().post('/classes', data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const updateClass = createAsyncThunk(
    "class/updateClass", async (data: IUpdate, {rejectWithValue}) => {
        try {
            const res = await api().patch(`/classes/${data.id}`, data.data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const getAllClasses = createAsyncThunk("class/getAllClasses", async (params: URLSearchParams, {rejectWithValue}) => {
        try {
            const res = await api().get(`/classes?${params}`);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const getSingleClass = createAsyncThunk("class/getSingleClass", async (classId: number, {rejectWithValue}) => {
        try {
            const res = await api().get(`/classes/${classId}`);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)
