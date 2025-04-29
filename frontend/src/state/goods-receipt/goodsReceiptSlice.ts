import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {env} from "../../config/env";
import {
    createGoodsReceipt,
    deleteGoodsReceipt, getAllGoodsReceipts,
    toggleGoodsReceipt,
    updateGoodsReceipt
} from "./goodsReceiptAction.ts";
import {GoodsReceiptsState} from "../../types/goods-receipt.ts";

const initialState: GoodsReceiptsState= {
    goodsReceipt: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/goods-receipts?page=1`,
            last: `${env.API_BASE_URL}/goods-receipts?page=1`,
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
                    url: `${env.API_BASE_URL}/goods-receipts?page=1`,
                    label: "1",
                    active: true
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            path: `${env.API_BASE_URL}/goods-receipts`,
            per_page: 15,
            to: null,
            total: 0
        }
    },

    goodsReceiptItem: {
        id: 0
    }
};


const goodsReceiptSlice = createSlice({
    name: "goodsReceipt",
    initialState,
    reducers: {
        setGoodsReceipt: (state, action) => {
            state.goodsReceiptItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createGoodsReceipt.fulfilled, (state, action) => {
            state.goodsReceipt.data.push(action.payload)
        }).addCase(getAllGoodsReceipts.fulfilled, (state, action) => {
            state.goodsReceipt = action.payload
        }) .addCase(updateGoodsReceipt.fulfilled, (state, action) => {
            state.goodsReceipt.data = state.goodsReceipt.data.map((goodsReceipt) => {
                return goodsReceipt.id === action.payload.id ? action.payload : goodsReceipt
            })
        }) .addCase(deleteGoodsReceipt.fulfilled, (state, action: PayloadAction<any>) => {
            state.goodsReceipt.data = state.goodsReceipt.data.filter((goodsReceipt: GoodsReceipt) => goodsReceipt.id !== action.payload)
        }).addCase(toggleGoodsReceipt.fulfilled, (state, action) => {
            state.goodsReceipt.data = state.goodsReceipt.data.map((goodsReceipt: GoodsReceipt) => {
                return goodsReceipt.id == action.payload.id ? action.payload : goodsReceipt
            })
        })
    }
});

export const { setGoodsReceipt } = goodsReceiptSlice.actions;

export default goodsReceiptSlice.reducer