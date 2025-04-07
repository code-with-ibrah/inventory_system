import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";

export const deleteOrganisation = createAsyncThunk(
    "organisation/deleteOrganisation", async (organisationId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/organisations/${organisationId}`)

            return organisationId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const createOrganisation = createAsyncThunk(
    "organisation/createOrganisation", async (data: any, {rejectWithValue}) => {
        try {
            const res = await  api('multipart/form-data').post('/organisations', data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data);
        }
    }
)

export const updateOrganisation = createAsyncThunk(
    "organisation/updateOrganisation", async (data: any, {rejectWithValue}) => {
        try {

            const res = await api('multipart/form-data').post(`/organisations/${data.id}`, data.data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const getAllOrganisations = createAsyncThunk("organisation/getAllOrganisations",
    async (params: string = "", {rejectWithValue}) => {
        try {
            const res = await api().get(`/organisations?${params}`);

            return res.data;

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data);
        }
    }
);


export const searchOrganisations = createAsyncThunk("organisation/searchOrganisations", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/organisations-search?keyword=${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)


export const toggleActiveness = createAsyncThunk("organisation/toggleActiveness", async (id: number, {rejectWithValue}) => {
        try {
            const res = await api().put(`/organisations-toggle-active/${id}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)
