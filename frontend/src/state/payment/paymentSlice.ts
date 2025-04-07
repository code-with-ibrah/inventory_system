import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {
    createPayment,
    getAllPayments,
    updatePayment,
    deletePayment,
    togglePaymentActiveness,
    getPaymentStats,
    getUssdTransactionStatus
} from "./paymentAction.ts";
import {env} from "../../config/env";
import {Payment, PaymentsState, PaymentStats} from "../../types/payment.ts";


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
        voteCount: 0,
        voteType: "",
        awardId: 0,
    },

    stats: {
        ussdVoteCount: 0,
        ussdVoteAmount: 0,
        webVoteCount: 0,
        webVoteAmount: 0,
        totalVoteCount: 0,
        totalVoteAmount: 0,
    },

    ussdVerificationStatus: null
}


const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setPayment: (state, action) => {
            state.paymentItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createPayment.fulfilled, (state, action: PayloadAction<Payment>) => {
            state.payment.data.push(action.payload)
        }).addCase(getUssdTransactionStatus.fulfilled, (state, action) => {
            state.ussdVerificationStatus = action.payload;
        }).addCase(getAllPayments.fulfilled, (state, action) => {
            state.payment = action.payload;
        }).addCase(updatePayment.fulfilled, (state, action: PayloadAction<Payment>) => {
            state.payment.data = state.payment.data.map((payment: Payment) => {
                return payment.id === action.payload.id ? action.payload : payment;
            })
        }).addCase(getPaymentStats.fulfilled, (state, action: PayloadAction<PaymentStats>) => {
            state.stats = action.payload
        }).addCase(togglePaymentActiveness.fulfilled, (state, action: PayloadAction<Payment>) => {
            state.payment.data = state.payment.data.map((payment: Payment) => {
                return payment.id === action.payload.id ? action.payload : payment;
            })
        }).addCase(deletePayment.fulfilled, (state, action: PayloadAction<number>) => {
            state.payment.data = state.payment.data.filter((award) => award.id !== action.payload);
        })
    }
});

export const { setPayment } = paymentSlice.actions;

export default paymentSlice.reducer