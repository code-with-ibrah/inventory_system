import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { env } from "../../../config/env.ts";
import {OrderItem, OrderItemState} from "../../../types/order.ts";
import {
    createBulkOrderItems,
    createOrderItem,
    deleteOrderItem,
    getAllOrderItems,
    toggleOrderItem,
    updateOrderItem
} from "./orderItemAction";

const initialState: OrderItemState= {
    orderItem: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/order-items?page=1`,
            last: `${env.API_BASE_URL}/order-items?page=1`,
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
                    url: `${env.API_BASE_URL}/order-items?page=1`,
                    label: "1",
                    active: true
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            path: `${env.API_BASE_URL}/order-items`,
            per_page: 15,
            to: null,
            total: 0
        }
    },

    singleOrderItem: {
        id: 0,
        orderId: 0,
        productId: 0,
        customerId: 0,
        description: "",
        quantity: 0,
        unitPriceAtSale: 0,
        totalCost: 0,
        isActive: false,
        isDeleted: false
    }
};


const orderItemSlice = createSlice({
    name: "orderItem",
    initialState,
    reducers: {
        setOrderItem: (state, action) => {
            state.orderItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createOrderItem.fulfilled, (state, action) => {
            state.orderItem.data.push(action.payload)
        }).addCase(createBulkOrderItems.fulfilled, (state, action) => {
                state.orderItem.data.push(...action.payload);
        }).addCase(getAllOrderItems.fulfilled, (state, action) => {
            state.orderItem = action.payload
        }).addCase(updateOrderItem.fulfilled, (state, action) => {
            state.orderItem.data = state.orderItem.data.map((orderItem) => {
                return orderItem.id === action.payload.id ? action.payload : orderItem
            })
        }) .addCase(deleteOrderItem.fulfilled, (state, action: PayloadAction<any>) => {
            state.orderItem.data = state.orderItem.data.filter((orderItem: OrderItem) => orderItem.id !== action.payload)
        }).addCase(toggleOrderItem.fulfilled, (state, action) => {
            state.orderItem.data = state.orderItem.data.map((orderItem: OrderItem) => {
                return orderItem.id == action.payload.id ? action.payload : orderItem
            })
        })
    }
});

export const { setOrderItem } = orderItemSlice.actions;

export default orderItemSlice.reducer