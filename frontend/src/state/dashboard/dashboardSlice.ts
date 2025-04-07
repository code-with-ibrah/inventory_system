import {createSlice} from "@reduxjs/toolkit";
import { getDashboardCount } from "./dashboardAction.ts";

const initialState = {
    dashboardCounter: []
};


// @ts-ignore
const dashboardSlice = createSlice({
    name: "dashboardCounter",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getDashboardCount.fulfilled, (state, action) => {
            state.dashboardCounter = action.payload
        })
    }
});


export default dashboardSlice.reducer