import {createSlice} from "@reduxjs/toolkit";
import {
    getAllCategories,
    updateCategory,
    deleteCategory, createCategory, toggleCategory,
} from "./categoryAction.js";
import {env} from "../../config/env";
import {CategorysState} from "../../types/category.ts";

const initialState: CategorysState = {
    category: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/categories?page=1`,
            last: `${env.API_BASE_URL}/categories?page=1`,
            prev: null,
            next: null
        },
        meta: {
            current_page: 1,
            from: null,
            last_page: 1,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false
                },
                {
                    url: `${env.API_BASE_URL}/categories?page=1`,
                    label: "1",
                    active: true
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            path: `${env.API_BASE_URL}/categories`,
            per_page: 15,
            to: null,
            total: 0
        }
    },

    categoryItem: {
        id: 0,
        name: "",
        parentId: 0,
        isActive: false,
        isDeleted: false,
        companyId: 0
    }
}


const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.categoryItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.category.data.push(action.payload)
        }).addCase(getAllCategories.fulfilled, (state, action) => {
            state.category = action.payload
        }).addCase(updateCategory.fulfilled, (state, action) => {
            state.category.data = state.category.data.map((category) => {
                return category.id == action.payload.id ? action.payload : category
            })
        }).addCase(toggleCategory.fulfilled, (state, action) => {
            state.category.data = state.category.data.map((category) => {
                return category.id == action.payload.id ? action.payload : category
            })
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
            state.category.data = state.category.data.filter((category) => category.id !== action.payload)
        })
    }
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer