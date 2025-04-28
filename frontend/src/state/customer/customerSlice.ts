import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {env} from "../../config/env";
import {Customer, CustomersState} from "../../types/customer.ts";

import {deleteBrand} from "../brand/brandAction.ts";
import {createCustomer, deleteCustomer, getAllCustomers, toggleCustomer, updateCustomer} from "./customerAction.ts";

const initialState: CustomersState = {
    customer: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/customers?page=1`,
            last: `${env.API_BASE_URL}/customers?page=1`,
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
                    url: `${env.API_BASE_URL}/customers?page=1`,
                    label: "1",
                    active: true
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            path: `${env.API_BASE_URL}/contestants`,
            per_page: 15,
            to: null,
            total: 0
        }
    },

    customerItem: {
        id: 0,
        name: "",
        companyName: "",
        location: "",
        phone: "",
        address: "",
        registrationDate: ""
    }
};


const customerSlice = createSlice({
    name: "contestant",
    initialState,
    reducers: {
        setCustomer: (state, action) => {
            state.customerItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createCustomer.fulfilled, (state, action) => {
            state.customer.data.push(action.payload)
        }).addCase(getAllCustomers.fulfilled, (state, action) => {
            state.customer = action.payload
        }) .addCase(updateCustomer.fulfilled, (state, action) => {
            state.customer.data = state.customer.data.map((customer) => {
                return customer.id === action.payload.id ? action.payload : customer
            })
        }) .addCase(deleteCustomer.fulfilled, (state, action: PayloadAction<any>) => {
            state.customer.data = state.customer.data.filter((customer: Customer) => customer.id !== action.payload)
        }).addCase(toggleCustomer.fulfilled, (state, action) => {
            state.customer.data = state.customer.data.map((customer: Customer) => {
                return customer.id == action.payload.id ? action.payload : customer
            })
        }).addCase(deleteBrand.fulfilled, (state, action) => {
            state.customer.data = state.customer.data.filter((customer: Customer) => customer.id !== action.payload)
        })
    }
});

export const { setCustomer } = customerSlice.actions;

export default customerSlice.reducer