import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.ts";

export const getChartData = createAsyncThunk(
    "analytics/getChartData",
    async (_, {rejectWithValue}) => {
        try {
            const res = await api().get('/home/chart-data')

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const getAppRoles = createAsyncThunk(
    "analytics/getAppRoles",
    async (_, {rejectWithValue}) => {
        try {
            const res = await api().get('/roles')

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const getDashboardCount = createAsyncThunk("analytics/getDashboardCount", async (params: URLSearchParams, {rejectWithValue}) => {
        try {
            const res = await api().get(`/home/dashboard-count?${params}`)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)
