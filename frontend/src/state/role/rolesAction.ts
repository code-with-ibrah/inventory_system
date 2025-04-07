import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";

export const deleteRole = createAsyncThunk(
    "Role/deleteRole", async (roleId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/roles/${roleId}`)

            return roleId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const createRole = createAsyncThunk(
    "auth/createRole", async (data: any, {rejectWithValue}) => {
        try {
            const res = await  api().post('/roles', data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const updateRole = createAsyncThunk(
    "auth/updateRole", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/roles/${data.id}`, data.data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)



export const getAllRoles = createAsyncThunk("Role/getAllRoles", async (params: string = "", {rejectWithValue}) => {
        try {
            const res = await api().get(`/roles?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);


export const searchRoles = createAsyncThunk("Role/searchRoles", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/roles-search?keyword=${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)


export const toggleActiveness = createAsyncThunk("Roles/toggleActiveness", async (id: number, {rejectWithValue}) => {
        try {
            const res = await api().put(`/roles-toggle-active/${id}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)
