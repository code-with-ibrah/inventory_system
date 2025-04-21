import {createSlice} from "@reduxjs/toolkit";
import {env} from "../../config/env";
import {WarehousesState} from "../../types/warehouse.ts";
import {
    createWarehouse,
    deleteWarehouse,
    getAllWarehouses,
    toggleWarehouse,
    updateWarehouse
} from "./warehouseAction.ts";

const initialState: WarehousesState = {
    warehouse: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/warehouse?page=1`,
            last: `${env.API_BASE_URL}/warehouse?page=1`,
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
                    url: `${env.API_BASE_URL}/warehouse?page=1`,
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

    warehouseItem: {
        id: 0,
        name: "",
        email: "",
        code: "",
        phone: "",
        location: "",
        addressLineOne: "",
        addressLineTwo: "",
        city: "",
        country: "",
        type: "",
        capacity: "",
        description: "",
        creator: [],
        lastEditor: [],
        createdAt: ""
    }
}


const warehouseSlice = createSlice({
    name: "warehouse",
    initialState,
    reducers: {
        setWarehouse: (state, action) => {
            state.warehouseItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createWarehouse.fulfilled, (state, action) => {
            state.warehouse.data.push(action.payload)
        }).addCase(getAllWarehouses.fulfilled, (state, action) => {
            state.warehouse = action.payload
        }).addCase(updateWarehouse.fulfilled, (state, action) => {
            state.warehouse.data = state.warehouse.data.map((warehouse) => {
                return warehouse.id == action.payload.id ? action.payload : warehouse
            })
        }).addCase(toggleWarehouse.fulfilled, (state, action) => {
            state.warehouse.data = state.warehouse.data.map((warehouse) => {
                return warehouse.id == action.payload.id ? action.payload : warehouse
            })
        })
        .addCase(deleteWarehouse.fulfilled, (state, action) => {
            state.warehouse.data = state.warehouse.data.filter((warehouse) => warehouse.id !== action.payload)
        })
    }
});

export const { setWarehouse } = warehouseSlice.actions;

export default warehouseSlice.reducer