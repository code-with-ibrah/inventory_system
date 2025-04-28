import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {env} from "../../config/env";
import {
    createBulkStockAdjustmentItems,
    createStockAdjustmentItem, deleteStockAdjustmentItem, getAllStockAdjustmentItems,
    toggleStockAdjustmentItem,
    updateStockAdjustmentItem
} from "./stockAdjustmentItemAction.ts";
import {StockAdjustmentItem, StockAdjustmentItemsState} from "../../types/stock-adjustment-item.ts";

const initialState: StockAdjustmentItemsState = {
    stockAdjustmentItem: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/stock-adjustment-items?page=1`,
            last: `${env.API_BASE_URL}/stock-adjustment-items?page=1`,
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
                    url: `${env.API_BASE_URL}/stock-adjustment-items?page=1`,
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
    singleStockAdjustmentItem: {
        id: 0,
        adjustmentId: 0,
        productId: 0,
        previousQuantity: 0,
        adjustedQuantity: 0,
        newQuantity: 0,
        unitCostAtAdjustment: 0,
        companyId: "",
        isActive: false
    }
}


const stockAdjustmentItemSlice = createSlice({
    name: "stockAdjustmentItem",
    initialState,
    reducers: {  },
    extraReducers: (builder) => {
        builder.addCase(createStockAdjustmentItem.fulfilled, (state, action: PayloadAction<StockAdjustmentItem>) => {
            state.stockAdjustmentItem.data.push(action.payload)
        }).addCase(createBulkStockAdjustmentItems.fulfilled, (state, action: PayloadAction<[]>) => {
            // state.stockAdjustmentItem.data.push(action.payload)
            state.stockAdjustmentItem.data.push(...action.payload);
        }).addCase(getAllStockAdjustmentItems.fulfilled, (state, action) => {
            state.stockAdjustmentItem = action.payload;
        }).addCase(updateStockAdjustmentItem.fulfilled, (state, action: PayloadAction<any>) => {
            state.stockAdjustmentItem.data = state.stockAdjustmentItem.data.map((stockAdjustment) => {
                return stockAdjustment.id == action.payload.id ? action.payload : stockAdjustment
            })
        }) .addCase(toggleStockAdjustmentItem.fulfilled, (state, action: PayloadAction<StockAdjustmentItem>) => {
            state.stockAdjustmentItem.data = state.stockAdjustmentItem.data.map((stockAdjustmentItem: StockAdjustmentItem) => {
                return stockAdjustmentItem.id === action.payload.id ? action.payload : stockAdjustmentItem;
            })
        }).addCase(deleteStockAdjustmentItem.fulfilled, (state, action: PayloadAction<number>) => {
            state.stockAdjustmentItem.data = state.stockAdjustmentItem.data.filter((stockAdjustmentItem) => stockAdjustmentItem.id !== action.payload);
        })
    }
});


export default stockAdjustmentItemSlice.reducer