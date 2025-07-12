import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {env} from "../../config/env.ts";
import {Payment} from "../../types/payment.ts";
import {
    createGoodsReceiptPayment, deleteGoodsReceiptPayment,
    getAllGoodsReceiptPayments,
    updateGoodsReceiptPayment
} from "./goodsReceiptPaymentAction.ts";

const initialState = {
    goodsReceiptPayment: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/goods-receipt-payments?page=1`,
            last: `${env.API_BASE_URL}/goods-receipt-payments?page=1`,
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
                    url: `${env.API_BASE_URL}/goods-receipt-payments?page=1`,
                    label: "1",
                    active: true
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            path: `${env.API_BASE_URL}/payments`,
            per_page: 15,
            to: null,
            total: 0
        }
    },

    paymentItem: {
        id: 0,
        amount: 0,
        customerId: 0,
        comanyId: 0,
        orderId: 0
    }
};


const goodsReceiptPaymentSlice = createSlice({
    name: "goodsReceiptPayment",
    initialState,
    reducers: {
        setGoodsReceiptPaymentItem: (state, action) => {
            state.paymentItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createGoodsReceiptPayment.fulfilled, (state, action: any) => {
            // @ts-ignore
            state.goodsReceiptPayment.data.push(action.payload);
            state.paymentItem = action.payload;
        }).addCase(getAllGoodsReceiptPayments.fulfilled, (state, action) => {
            state.goodsReceiptPayment = action.payload;
        }).addCase(updateGoodsReceiptPayment.fulfilled, (state, action) => {
            // @ts-ignore
            state.goodsReceiptPayment.data = state.goodsReceiptPayment.data.map((payment: Payment) => {
                return payment.id === action.payload.id ? action.payload : payment
            })
        }) .addCase(deleteGoodsReceiptPayment.fulfilled, (state, action: PayloadAction<any>) => {
            state.goodsReceiptPayment.data = state.goodsReceiptPayment.data.filter((payment: Payment) => payment.id !== action.payload.id)
        })
    }
});

export const { setGoodsReceiptPaymentItem } = goodsReceiptPaymentSlice.actions;

export default goodsReceiptPaymentSlice.reducer