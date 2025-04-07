import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.ts";
import { IUpdate } from "../../types/common.ts";

export const login = createAsyncThunk(
    "auth/login",
    async (values: any, { rejectWithValue}) => {
          try {
            const res = await api().post('/login', values);
            return res.data.data;

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const generateNewToken = createAsyncThunk(
    "auth/generateNewToken",
    async (data: any, { rejectWithValue}) => {
          try {
            const res = await api().post('/auth/refresh-token', data)
            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const register = createAsyncThunk(
    "auth/register",
    async (values: any, { rejectWithValue}) => {
          try {
            const res = await api().post('/register', values)
            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const resendOtp = createAsyncThunk(
    "auth/resendOtp",
    async (values: any, { rejectWithValue}) => {
          try {
            const res = await api().post('/invitations/resend', values)
            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const verifyOtp = createAsyncThunk(
    "auth/verifyOtp",
    async (values: any, { rejectWithValue}) => {
          try {
            const res = await api().post('/invitations/verify-otp', values)
            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const changePassword = createAsyncThunk(
    "auth/changePassword",
    async (values: any, { rejectWithValue}) => {
          try {
            const res = await api().post('/change-password', values);
            return res.data.user
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)


export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue}) => {
          try {
              localStorage.removeItem('persist:root')
            // const res = await api().post('/auth/change-password', values)
            // return res.data
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const updateMyProfile = createAsyncThunk(
    "auth/updateMyProfile", async (data: IUpdate, {rejectWithValue}) => {
        try {
            const res = await api().patch(`/accounts/${data.id}`, data.data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)


export const requestPasswordReset = createAsyncThunk(
    "auth/requestPasswordReset", async (email: string, {rejectWithValue}) => {
        try {
            const res = await api().post(`/request-password-reset/${email}`);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const verifyPasswordReset = createAsyncThunk(
    "auth/verifyPasswordReset", async (params: string = "", {rejectWithValue}) => {
        try {
            const res = await api().get(`/verify-password-reset?${params}`);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data);
        }
    }
)


export const passwordVerificationComplete = createAsyncThunk(
    "auth/passwordVerificationComplete", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().post(`/password-verification-complete`, data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data);
        }
    }
)


export const resetPassword = createAsyncThunk(
    "auth/resetPassword", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().post(`/reset-password`, data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)












