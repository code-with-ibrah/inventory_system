import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
    changePassword,
    login,
    register,
    requestPasswordReset,
    updateMyProfile,
    verifyPasswordReset
} from "./authActions.ts";
import { AuthState, User } from "../../types/common.ts";
import { getMyAccount } from "../users/usersActions.ts";

const initialState: AuthState = {
    authenticated: false,
    status: 'idle',
    token: "",
    error: undefined,
    user: {
        id: 0,
        name: "",
        email: "",
        roleId: 0,
        roleName: "",
        passwordChanged: false,
        company: [],
        isActive: false,
        companyId: 0
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateToken: (state, action) => {
            state.token = action.payload.accessToken
        },
        logout: (state, _action) => {
            state.token = ""
            state.authenticated = false
        },

    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action: PayloadAction<{ user: User, token: string; }>) => {
            state.authenticated = true
            state.token = action.payload.token
            state.user = action.payload.user
            state.error = null
        }).addCase(getMyAccount.fulfilled, (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.error = null
        }).addCase(changePassword.fulfilled, (state, action: PayloadAction<User>) => {
            state.authenticated = true
            state.user = action.payload
            state.error = null
        }).addCase(login.rejected, (state) => {
            state.authenticated = false
            state.status = 'failed'
            state.token = ""
        }).addCase(updateMyProfile.fulfilled, (state, action: PayloadAction<User>) => {
            state.user = action.payload
        }).addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
            state.user = action.payload.user;
            state.token = action.payload.token
        }).addCase(verifyPasswordReset.fulfilled, (state, action: PayloadAction<any>) => {
            state.user.email = action.payload.email;
        }).addCase(requestPasswordReset.fulfilled, (state, action: PayloadAction<any>) => {
            state.user.email = action.payload?.email ?? "";
        })
    }
})

export const { updateToken, logout } = authSlice.actions;

export default authSlice.reducer
