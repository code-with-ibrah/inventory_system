import {createSlice} from "@reduxjs/toolkit";
import {
    updateBrand,
    deleteBrand, createBrand, toggleBrand, getAllBrands,
} from "./brandAction.ts";
import {env} from "../../config/env";
import {Brand, BrandsState} from "../../types/brand.ts";

const initialState: BrandsState = {
    brand: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/brands?page=1`,
            last: `${env.API_BASE_URL}/brands?page=1`,
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
                    url: `${env.API_BASE_URL}/brands?page=1`,
                    label: "1",
                    active: true
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            path: `${env.API_BASE_URL}/brands`,
            per_page: 15,
            to: null,
            total: 0
        }
    },

    brandItem: {
        id: 0,
        name: "",
        parentId: 0,
        isActive: false,
        isDeleted: false,
        companyId: 0
    }
}


const brandSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {
        setBrand: (state, action) => {
            state.brandItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createBrand.fulfilled, (state, action) => {
            state.brand.data.push(action.payload)
        }).addCase(getAllBrands.fulfilled, (state, action) => {
            state.brand = action.payload
        }).addCase(updateBrand.fulfilled, (state, action) => {
            state.brand.data = state.brand.data.map((brand: Brand) => {
                return brand.id == action.payload.id ? action.payload : brand
            })
        }).addCase(toggleBrand.fulfilled, (state, action) => {
            state.brand.data = state.brand.data.map((brand: Brand) => {
                return brand.id == action.payload.id ? action.payload : brand
            })
        })
        .addCase(deleteBrand.fulfilled, (state, action) => {
            state.brand.data = state.brand.data.filter((brand: Brand) => brand.id !== action.payload)
        })
    }
});

export const { setBrand } = brandSlice.actions;

export default brandSlice.reducer