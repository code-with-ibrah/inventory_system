import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {getAppRoles, getChartData} from "./analyticsActions.ts";
import {AnalyticsState, AppRole} from "../../types/analytics.ts";

const initialState: AnalyticsState = {
    chartData: [],
    appFilter: {},
    appRoles: []
}

const analyticsSlice = createSlice({
    name: "analytics",
    initialState,
    reducers: {
        updateAppFilter: (state, action: PayloadAction<any>) => {
            state.appFilter = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getChartData.fulfilled, (state, action) => {
            state.chartData = action.payload
        }).addCase(getAppRoles.fulfilled, (state, action: PayloadAction<AppRole[]>) => {
            state.appRoles = action.payload
        })
    }
})

export const { updateAppFilter } = analyticsSlice.actions;

export default analyticsSlice.reducer
