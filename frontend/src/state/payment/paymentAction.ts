import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";

export const deletePayment = createAsyncThunk(
    "payment/deletePayment", async (paymentId: number, {rejectWithValue}) => {
        try {
            await api().delete(`/payments/${paymentId}`)

            return paymentId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data);
        }
    }
)

export const createPayment = createAsyncThunk(
    "payment/createPayment", async (data: any, {rejectWithValue}) => {
        try {
            // const res = await api().post('/payments', data);
            const res = await  api().post('/payments', data);

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const updatePayment = createAsyncThunk(
    "payment/updatePayment", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api().put(`/payments/${data.id}`, data.data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const getAllPayments = createAsyncThunk("Payment/getAllPayments", async (params: string = "", {rejectWithValue}) => {
        try {
            const res = await api().get(`/payments?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);


export const getPaymentStats = createAsyncThunk("Payment/getPaymentsStats?awardId", async (params: string = "", {rejectWithValue}) => {
        try {
            const res = await api().get(`/payments-stats?${params}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);



export const getUssdTransactionStatus = createAsyncThunk("Payment/getUssdTransactionStatus/clientReference", async (clientReference: string = "", {rejectWithValue}) => {
        try {
            const res = await api().get(`/check-ussd-transaction-status/${clientReference}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
);




export const togglePaymentActiveness = createAsyncThunk("Payment/toggleActiveness", async (id: number, {rejectWithValue}) => {
        try {
            const res = await api().put(`/payments-toggle-active/${id}`);

            return res.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)
