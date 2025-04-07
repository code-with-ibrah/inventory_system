import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.ts";
import { IUpdate } from "../../types/common.ts";

export const uploadUser = createAsyncThunk(
    "user/uploadUser",
    async (data: FormData) => {
        const res = await api('multipart/form-data').post('/users', data)

        return res.data
    }
)

export const deleteUser = createAsyncThunk(
    "user/deleteUser", async (userId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/users/${userId}`)

            return userId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const updateUser = createAsyncThunk(
    "auth/updateUser", async (data: IUpdate, {rejectWithValue}) => {
        try {
            const res = await api().put(`/users/${data.id}`, data.data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const createUser = createAsyncThunk(
    "auth/createUser", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().post('/register', data);

            return res.data;

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const sendInvitation = createAsyncThunk(
    "auth/sendInvitation", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().post(`/invitations`, data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const getAllUsers = createAsyncThunk(
    "user/getAllUsers", async (params: string = "", {rejectWithValue}) => {
        try {
            const res = await api().get(`/users?${params}`);

            return res.data;

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)
export const getMyAccount = createAsyncThunk(
    "user/getMyAccount",
    async (id: number, {rejectWithValue}) => {
        try {
            const res = await api().get(`/users/${id}`)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)
