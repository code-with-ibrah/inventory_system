import {createSlice} from "@reduxjs/toolkit";
import {
    updateStockUnit,
    deleteStockUnit, createStockUnit, toggleStockUnit, getAllStockUnits,
} from "./stockUnitAction.ts";
import {env} from "../../config/env";
import {StockUnit, StockUnitState} from "../../types/stock-unit.ts";

const initialState: StockUnitState = {
    stockUnit: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/stock-units?page=1`,
            last: `${env.API_BASE_URL}/stock-units?page=1`,
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
                    url: `${env.API_BASE_URL}/stock-units?page=1`,
                    label: "1",
                    active: true
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            path: `${env.API_BASE_URL}/stock-units`,
            per_page: 15,
            to: null,
            total: 0
        }
    },

    stockUnitItem: {
        id: 0,
        name: "",
        isActive: false,
        isDeleted: false,
        companyId: 0
    }
}


const stockUnitSlice = createSlice({
    name: "stockUnit",
    initialState,
    reducers: {
        setStockUnit: (state, action) => {
            state.stockUnitItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createStockUnit.fulfilled, (state, action) => {
            state.stockUnit.data.push(action.payload)
        }).addCase(getAllStockUnits.fulfilled, (state, action) => {
            state.stockUnit = action.payload
        }).addCase(updateStockUnit.fulfilled, (state, action) => {
            state.stockUnit.data = state.stockUnit.data.map((stockUnit: StockUnit) => {
                return stockUnit.id == action.payload.id ? action.payload : stockUnit
            })
        }).addCase(toggleStockUnit.fulfilled, (state, action) => {
            state.stockUnit.data = state.stockUnit.data.map((stockUnit: StockUnit) => {
                return stockUnit.id == action.payload.id ? action.payload : stockUnit
            })
        })
        .addCase(deleteStockUnit.fulfilled, (state, action) => {
            state.stockUnit.data = state.stockUnit.data.filter((stockUnit: StockUnit) => stockUnit.id !== action.payload)
        })
    }
});

export const { setStockUnit } = stockUnitSlice.actions;

// @ts-ignore
export default stockUnitSlice.reducer