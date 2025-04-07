import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {
    createRole,
    updateRole,
    deleteRole,
    toggleActiveness, getAllRoles, searchRoles
} from "./rolesAction.ts";
import {env} from "../../config/env";
import {Role, RolesState} from "../../types/role.ts";


const initialState: RolesState = {
    role: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/roles?page=1`,
            last: `${env.API_BASE_URL}/roles?page=1`,
            prev: null,
            next: null
        },
        meta: {
            current_page: 1,
            from: 0,
            last_page: 1,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false
                },
                {
                    url: `${env.API_BASE_URL}/roles?page=1`,
                    label: "1",
                    active: true
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            path: `${env.API_BASE_URL}/roles`,
            per_page: 15,
            to: null,
            total: 0
        }
    },

    roleItem: {
        id: 0,
        name: "",
        isActive: false
    }
}


const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {
        setRole: (state, action) => {
            state.roleItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createRole.fulfilled, (state, action: PayloadAction<Role>) => {
            state.role.data.push(action.payload)
        }).addCase(getAllRoles.fulfilled, (state, action) => {
            state.role = action.payload;
        }).addCase(updateRole.fulfilled, (state, action: PayloadAction<Role>) => {
            state.roleItem = action.payload;
        }).addCase(toggleActiveness.fulfilled, (state, action: PayloadAction<Role>) => {
            state.role.data = state.role.data.map((role: Role) => {
                return role.id === action.payload.id ? action.payload : role;
            })
        }).addCase(deleteRole.fulfilled, (state, action: PayloadAction<number>) => {
            state.role.data = state.role.data.filter((Role) => Role.id !== action.payload);
        }).addCase(searchRoles.fulfilled, (state, action) => {
            state.role = action.payload;
        })
    }
});

export const { setRole } = roleSlice.actions;

export default roleSlice.reducer