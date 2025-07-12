import {createSlice} from "@reduxjs/toolkit";
import {
    updateSupplier,
    deleteSupplier,
    createSupplier,
    toggleSupplier,
    getAllSuppliers,
    getAllGoodsReceiptPaymentStats,
    getAllSupplierStatements,
} from "./supplierAction.ts";
import {env} from "../../config/env";
import {Supplier, SuppliersState} from "../../types/supplier.ts";

const initialState: SuppliersState = {
    supplier: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/suppliers?page=1`,
            last: `${env.API_BASE_URL}/suppliers?page=1`,
            prev: null,
            next: null
        },
        meta: {
            current_page: 1,
            from: null,
            last_page: 1,
            links: [
                {
                    url: null,
                    label: "&laquo; Previous",
                    active: false
                },
                {
                    url: `${env.API_BASE_URL}/suppliers?page=1`,
                    label: "1",
                    active: true
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            path: `${env.API_BASE_URL}/suppliers`,
            per_page: 15,
            to: null,
            total: 0
        }
    },

    supplierItem: {
        id: 0,
        name: "",
        isActive: false,
        isDeleted: false,
        companyId: 0,
        phone: 0,
        companyName: "",
        registrationDate: "",
        email: "",
        addressLineOne: ""
    },

    paymentStats: {},

    statements: {}
}


const supplierSlice = createSlice({
    name: "supplier",
    initialState,
    reducers: {
        setSupplier: (state, action) => {
            state.supplierItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createSupplier.fulfilled, (state, action) => {
            state.supplier.data.push(action.payload)
        }).addCase(getAllSuppliers.fulfilled, (state, action) => {
            state.supplier = action.payload
        }).addCase(getAllGoodsReceiptPaymentStats.fulfilled, (state, action) => {
            state.paymentStats = action.payload
        }).addCase(getAllSupplierStatements.fulfilled, (state, action) => {
            state.statements = action.payload
        }).addCase(updateSupplier.fulfilled, (state, action) => {
            state.supplier.data = state.supplier.data.map((supplier: Supplier) => {
                return supplier.id == action.payload.id ? action.payload : supplier
            })
        }).addCase(toggleSupplier.fulfilled, (state, action) => {
            state.supplier.data = state.supplier.data.map((supplier: Supplier) => {
                return supplier.id == action.payload.id ? action.payload : supplier
            })
        })
        .addCase(deleteSupplier.fulfilled, (state, action) => {
            state.supplier.data = state.supplier.data.filter((supplier: Supplier) => supplier.id !== action.payload)
        })
    }
});

export const { setSupplier } = supplierSlice.actions;

export default supplierSlice.reducer