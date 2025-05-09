import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {env} from "../../config/env";
import {Order, OrdersState} from "../../types/order.ts";
import {
    createOrders,
    deleteOrders,
    getAllOrders, getOrderById,
    markOrdersAsCompleted,
    toggleOrders,
    updateOrders,
    updateOrderStatus
} from "./receiptAction.ts";

const initialState: OrdersState= {
    order: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/orders?page=1`,
            last: `${env.API_BASE_URL}/orders?page=1`,
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
                    url: `${env.API_BASE_URL}/orders?page=1`,
                    label: "1",
                    active: true
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            path: `${env.API_BASE_URL}/orders`,
            per_page: 15,
            to: null,
            total: 0
        }
    },

    orderItem: {
        id: 0,
        orderNumber: "",
        date: "",
        customerId: 0,
        amount: 0,
        status: "",
        installmentPlanId: 0,
        currency: 0,
        paymentMethodId: 0,
        discount: 0,
        taxAmount: 0,
        userId: 0,
        isActive: false,
        isDeleted: false,
        companyId: 0,
        customer: {},
        totalPayments: 0,
        originalPrice: 0
    },
};


const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrderItem: (state, action) => {
            state.orderItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createOrders.fulfilled, (state, action: PayloadAction<Order>) => {
            state.order.data.push(action.payload)
        }).addCase(getAllOrders.fulfilled, (state, action) => {
            state.order = action.payload
        }).addCase(updateOrders.fulfilled, (state, action: PayloadAction<Order>) => {
            state.order.data = state.order.data.map((order) => {
                return order.id === action.payload.id ? action.payload : order
            })
        }).addCase(getOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
            state.order.data = state.order.data.map((order) => {
                return order.id === action.payload.id ? action.payload : order
            })
        }).addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<Order>) => {
            state.order.data = state.order.data.map((order) => {
                return order.id === action.payload.id ? action.payload : order
            })
        }).addCase(deleteOrders.fulfilled, (state, action: PayloadAction<any>) => {
            state.order.data = state.order.data.filter((order: Order) => order.id !== action.payload)
        }).addCase(toggleOrders.fulfilled, (state, action) => {
            state.order.data = state.order.data.map((order: Order) => {
                return order.id == action.payload.id ? action.payload : order
            })
        }).addCase(markOrdersAsCompleted.fulfilled, (state, action) => {
            state.order.data = state.order.data.map((order: Order) => {
                return order.id == action.payload.id ? action.payload : order
            })
        })
    }
});

export const { setOrderItem } = orderSlice.actions;

export default orderSlice.reducer