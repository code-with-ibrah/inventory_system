import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createUser, deleteUser, getAllUsers, updateUser, uploadUser } from "./usersActions.ts";
import {UserState} from "../../types/user.ts";
import {User} from "../../types/common.ts";
import {env} from "../../config/env.ts";

// @ts-ignore
const initialState: UserState = {
    users: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/users?page=1`,
            last: `${env.API_BASE_URL}/users?page=1`,
            prev: null,
            next: null
        },
        meta: {
            current_page: 1,
            from: 0,
            last_page: 1,
            links:  [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false
                },
                {
                    url: `${env.API_BASE_URL}/users?page=1`,
                    label: "1",
                    active: true
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            path: `${env.API_BASE_URL}/users`,
            per_page: 15,
            to: null,
            total: 0
        }
    },

    userItem: {
        id: 0,
        name: "",
        passwordChanged: false,
        email: "",
        roleName: "",
        roleId: 0,
        organisation: [],
        isActive: false,
        code: "",
    }
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(uploadUser.fulfilled, (state, action) => {
            state.users.data.push(action.payload)
        }).addCase(createUser.fulfilled, (state, action) => {
            state.users.data.push(action.payload.user)
        }).addCase(getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload
        }).addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.users.data = state.users.data.map((user: User) => {
                return user.id === action.payload.id ? action.payload : user
            })
        }).addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
            state.users.data = state.users.data.filter((user: User) => user.id !== action.payload)
        })
    }
})

export default usersSlice.reducer
