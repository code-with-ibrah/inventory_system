import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {env} from "../../config/env";
import {StockAdjustment, StockAdjustmentsState} from "../../types/stock-adjustment.ts";
import {
    createStockAdjustment, deleteStockAdjustment,
    getAllStockAdjustment,
    toggleStockAdjustment,
    updateStockAdjustment
} from "./stockAdjustmentAction.ts";

const initialState: StockAdjustmentsState = {
    stockAdjustment: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/stock-adjustments?page=1`,
            last: `${env.API_BASE_URL}/stock-adjustments?page=1`,
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
                    url: `${env.API_BASE_URL}/stock-adjustments?page=1`,
                    label: "1",
                    active: true
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            path: `${env.API_BASE_URL}/products`,
            per_page: 15,
            to: null,
            total: 0
        }
    },
    stockAdjustmentItem: {
        id: 0,
        date: "",
        userId: "",
        reason: "",
        companyId: "",
        isActive: false
    }
}


const stockAdjustmentSlice = createSlice({
    name: "stockAdjustment",
    initialState,
    reducers: {
        setStockAdjustment: (state, action) => {
            state.stockAdjustmentItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createStockAdjustment.fulfilled, (state, action: PayloadAction<StockAdjustment>) => {
            state.stockAdjustment.data.push(action.payload)
        }).addCase(getAllStockAdjustment.fulfilled, (state, action) => {
            state.stockAdjustment = action.payload;
        }).addCase(updateStockAdjustment.fulfilled, (state, action: PayloadAction<any>) => {
            state.stockAdjustment.data = state.stockAdjustment.data.map((stockAdjustment) => {
                return stockAdjustment.id == action.payload.id ? action.payload : stockAdjustment
            })
        }) .addCase(toggleStockAdjustment.fulfilled, (state, action: PayloadAction<StockAdjustment>) => {
            state.stockAdjustment.data = state.stockAdjustment.data.map((stockAdjustment: StockAdjustment) => {
                return stockAdjustment.id === action.payload.id ? action.payload : stockAdjustment;
            })
        }).addCase(deleteStockAdjustment.fulfilled, (state, action: PayloadAction<number>) => {
            state.stockAdjustment.data = state.stockAdjustment.data.filter((stockAdjustment) => stockAdjustment.id !== action.payload);
        })
    }
});

export const { setStockAdjustment } = stockAdjustmentSlice.actions;

export default stockAdjustmentSlice.reducer