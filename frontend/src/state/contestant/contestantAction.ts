import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";

export const deleteContestant = createAsyncThunk(
    "contestant/deleteContestant", async (contestantId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/contestants/${contestantId}`);

            return contestantId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);


export const permentlyDeleteContestant = createAsyncThunk(
    "contestant/deleteContestant", async (contestantId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/remove-contestant/${contestantId}`);

            return contestantId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);


export const createContestant = createAsyncThunk(
    "auth/createContestant", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api('multipart/form-data').post('/contestants', data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);

export const nominateContestant = createAsyncThunk(
    "auth/createContestant", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api('multipart/form-data').post('/nominate-contestants', data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);

export const updateContestant = createAsyncThunk(
    "auth/updateContestant", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api('multipart/form-data').post(`/contestants/${data.id}`, data.data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);

export const adjustContestantVote = createAsyncThunk(
    "auth/updateContestant", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/contestants-vote-adjust/${data.id}`, data.data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);

export const getAllContestants = createAsyncThunk(
    "contestant/getAllContestants", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/contestants?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);

export const getContestantBYUniqueCode = createAsyncThunk(
    "contestant/getContestantBYUniqueCode", async (uniqueCode: any, {rejectWithValue}) => {
        try{
            const res = await api().get(`/contestants?uniqueCode[eq]=${uniqueCode}`);

            return res.data.data;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }

    }
);


export const castContestantVote = createAsyncThunk(
    "contestant/castContestantVote", async (data: any, {rejectWithValue}) => {
        try{
            const res = await api().post(`/payments`, data);

            return res.data.data;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);


export const verifyContestantPayment = createAsyncThunk(
    "contestant/verifyContestantPayment", async (referenceCode: string | null = "", {rejectWithValue}) => {
        try{
            const res = await api().get(`/payments-verify?reference=${referenceCode}`);

            return res.data.data;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);


export const contestantActivenes = createAsyncThunk(
    "contestant/toggleContestantActives", async (id: number, {rejectWithValue}) => {
        try {
            const res = await api().put(`/contestants-toggle-active/${id}`)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)


export const verifyContestant = createAsyncThunk(
    "contestant/verifyContestant", async (id: number, {rejectWithValue}) => {
        try {
            const res = await api().put(`/contestants-toggle-verification/${id}`);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)


export const getContestantResults = createAsyncThunk(
    "contestant/getContestantResults", async (params: string, {rejectWithValue}) => {
        try {
            const res = await api().get(`/contestants-results?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);