import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {env} from "../../../config/env.ts";
import {Payment, PaymentsState} from "../../../types/payment.ts";
import {createPayment, deletePayment, getAllPayments, updatePayment} from "./paymentAction.ts";

const initialState: PaymentsState = {
    payment: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/payments?page=1`,
            last: `${env.API_BASE_URL}/payments?page=1`,
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
                    url: `${env.API_BASE_URL}/payments?page=1`,
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


const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setPaymentItem: (state, action) => {
            state.paymentItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createPayment.fulfilled, (state, action) => {
            state.payment.data.push(action.payload)
        }).addCase(getAllPayments.fulfilled, (state, action) => {
            state.payment = action.payload
        }).addCase(updatePayment.fulfilled, (state, action) => {
            state.payment.data = state.payment.data.map((payment: Payment) => {
                return payment.id === action.payload.id ? action.payload : payment
            })
        }) .addCase(deletePayment.fulfilled, (state, action: PayloadAction<any>) => {
            state.payment.data = state.payment.data.filter((payment: Payment) => payment.id !== action.payload)
        })
    }
});

export const { setPaymentItem } = paymentSlice.actions;

export default paymentSlice.reducer