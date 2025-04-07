import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";

export const deleteAwardBonusPackage = createAsyncThunk(
    "AwardBonusPackage/deleteAwardBonusPackage", async (awardBonusPackageId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/vote-packages/${awardBonusPackageId}`)

            return awardBonusPackageId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const createAwardBonusPackage = createAsyncThunk(
    "auth/createAwardBonusPackage", async (data: any, {rejectWithValue}) => {
        try {
            // const res = await api().post('/vote-packages', data);
            const res = await  api().post('/vote-packages', data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const updateAwardBonusPackage = createAsyncThunk(
    "auth/updateAwardBonusPackage", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/vote-packages/${data.id}`, data.data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const getAllAwardBonusPackages = createAsyncThunk("awardBonusPackage/getAllAwardBonusPackages", async (params: string = "", {rejectWithValue}) => {
        try {
            const res = await api().get(`/vote-packages?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);


export const searchVotePackages = createAsyncThunk("awardBonusPackage/searchVotePackages", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/vote-packages-search?keyword=${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)


export const toggleActiveness = createAsyncThunk("awardBonusPackage/toggleActiveness", async (id: number, {rejectWithValue}) => {
        try {
            const res = await api().put(`/vote-packages-toggle-active/${id}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)
