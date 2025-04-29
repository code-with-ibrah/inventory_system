import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    createBulkGoodsReceiptItems,
    createGoodsReceiptItem,
    deleteGoodsReceiptItem, getAllGoodsReceiptItems,
    toggleGoodsReceiptItem,
    updateGoodsReceiptItem
} from "./goodsReceiptItemAction.ts";
import {env} from "../../../config/env.ts";
import {GoodsReceiptItem, GoodsReceiptItemState} from "../../../types/goods-receipt.ts";

const initialState: GoodsReceiptItemState= {
    goodsReceiptItem: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/goods-receipt-items?page=1`,
            last: `${env.API_BASE_URL}/goods-receipt-items?page=1`,
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
                    url: `${env.API_BASE_URL}/goods-receipt-items?page=1`,
                    label: "1",
                    active: true
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            path: `${env.API_BASE_URL}/goods-receipt-items`,
            per_page: 15,
            to: null,
            total: 0
        }
    },

    singleGoodsReceiptItem: {
        id: 0,
        goodsReceiptId: 0,
        productId: 0,
        quantityReceived: 0,
        unitPriceAtReceipt: 0,
        companyId: 0
    }
};


const goodsReceiptItemSlice = createSlice({
    name: "goodsReceiptItem",
    initialState,
    reducers: {
        setGoodsReceiptItem: (state, action) => {
            state.goodsReceiptItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createGoodsReceiptItem.fulfilled, (state, action) => {
            state.goodsReceiptItem.data.push(action.payload)
        }).addCase(createBulkGoodsReceiptItems.fulfilled, (state, action) => {
            state.goodsReceiptItem.data.push(...action.payload);
        }).addCase(getAllGoodsReceiptItems.fulfilled, (state, action) => {
            state.goodsReceiptItem = action.payload
        }) .addCase(updateGoodsReceiptItem.fulfilled, (state, action) => {
            state.goodsReceiptItem.data = state.goodsReceiptItem.data.map((goodsReceiptItem) => {
                return goodsReceiptItem.id === action.payload.id ? action.payload : goodsReceiptItem
            })
        }) .addCase(deleteGoodsReceiptItem.fulfilled, (state, action: PayloadAction<any>) => {
            state.goodsReceiptItem.data = state.goodsReceiptItem.data.filter((goodsReceiptItem: GoodsReceiptItem) => goodsReceiptItem.id !== action.payload)
        }).addCase(toggleGoodsReceiptItem.fulfilled, (state, action) => {
            state.goodsReceiptItem.data = state.goodsReceiptItem.data.map((goodsReceiptItem: GoodsReceiptItem) => {
                return goodsReceiptItem.id == action.payload.id ? action.payload : goodsReceiptItem
            })
        })
    }
});

export const { setGoodsReceiptItem } = goodsReceiptItemSlice.actions;

export default goodsReceiptItemSlice.reducer