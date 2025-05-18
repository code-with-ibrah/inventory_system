import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";


export const getDashboardCount = createAsyncThunk("analytics/getDashboardCount", async (params: string = "", {rejectWithValue}) => {
        try {
            const res = await api().get(`/home/dashboard-count?${params}`)

            return res.data;

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const getDashboardCountByPeriod = createAsyncThunk("analytics/getDashboardCountByPeriod", async (filterType: string = "today", {rejectWithValue}) => {
        try {
            const res = await api().get(`/home/dashboard-count-period?filterType=${filterType}`);

            return res.data;

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)
