import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {env} from "../../config/env";
import {
    createPaymentMethod, deletePaymentMethod,
    getAllPaymentMethods,
    togglePaymentMethod,
    updatePaymentMethod
} from "./paymentMethodAction.ts";
import {PaymentMethod, PaymentMethodsState} from "../../types/payment-method.ts";

const initialState: PaymentMethodsState = {
    paymentMethod: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/payment-methods?page=1`,
            last: `${env.API_BASE_URL}/payment-methods?page=1`,
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
                    url: `${env.API_BASE_URL}/payment-methods?page=1`,
                    label: "1",
                    active: true
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            path: `${env.API_BASE_URL}/payment-methods`,
            per_page: 15,
            to: null,
            total: 0
        }
    },

    paymentMethodItem: {
        id: 0,
        installmentPayCount: 0,
        installmentMonthCount: 0,
        interestRate: 0,
        description: "",
        companyId: 0
    }
};


const paymentMethodSlice = createSlice({
    name: "paymentMethod",
    initialState,
    reducers: {
        setPaymentMethod: (state, action) => {
            state.paymentMethodItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createPaymentMethod.fulfilled, (state, action) => {
            state.paymentMethod.data.push(action.payload)
        }).addCase(getAllPaymentMethods.fulfilled, (state, action) => {
            state.paymentMethod = action.payload
        }) .addCase(updatePaymentMethod.fulfilled, (state, action) => {
            state.paymentMethod.data = state.paymentMethod.data.map((paymentMethod: PaymentMethod) => {
                return paymentMethod.id === action.payload.id ? action.payload : paymentMethod
            })
        }) .addCase(deletePaymentMethod.fulfilled, (state, action: PayloadAction<any>) => {
            state.paymentMethod.data = state.paymentMethod.data.filter((paymentMethod: PaymentMethod) => paymentMethod.id!== action.payload)
        }).addCase(togglePaymentMethod.fulfilled, (state, action) => {
            state.paymentMethod.data = state.paymentMethod.data.map((paymentMethod: PaymentMethod) => {
                return paymentMethod.id== action.payload.id ? action.payload : paymentMethod
            })
        })
    }
});

export const { setPaymentMethod } = paymentMethodSlice.actions;

export default paymentMethodSlice.reducer