import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ErrorState } from "../types/common.ts";

const initialState: ErrorState = {
    status: "idle",
    errors: undefined,
    message: "Something went wrong"
}

const errorSlice = createSlice({
    name: "errors",
    initialState,
    reducers: {
        resetState: (state) => {
            state.status = "idle"
            state.errors = undefined
            state.message = ""
        },
        updateState: (state, action: PayloadAction<ErrorState>) => {
            state.status = action.payload.status
            state.errors = action.payload.errors
            state.message = action.payload.message
        }
    },
})

export const {resetState, updateState} = errorSlice.actions

export default errorSlice.reducer