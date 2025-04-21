import {createSlice} from "@reduxjs/toolkit";
import {env} from "../../config/env";
import {
    createStock, deleteStock, getAllStocks, toggleStock, updateStock,
} from "./stockAction.ts";
import {StocksState} from "../../types/stock.ts";

const initialState: StocksState = {
    stock: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/stocks?page=1`,
            last: `${env.API_BASE_URL}/stocks?page=1`,
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
                    url: `${env.API_BASE_URL}/stocks?page=1`,
                    label: "1",
                    active: true
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            path: `${env.API_BASE_URL}/categories`,
            per_page: 15,
            to: null,
            total: 0
        }
    },

    stockItem: {
        id: 0,
        productName: "",
        quantityOnHand: 0,
        StockId: 0,
        productId: 0,
        stockAlertLevel: 0,
        lastStockCheckDate: "",
        isActive: false,
        isDeleted: false,
        companyId: 0,
        warehouse: "",
        wareHouseId: 0,
        locationInWarehouse: "",
        product: [],
        standardPackageQty: 0
    }
}


const stockSlice = createSlice({
    name: "stock",
    initialState,
    reducers: {
        setStock: (state, action) => {
            state.stockItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createStock.fulfilled, (state, action) => {
            state.stock.data.push(action.payload)
        }).addCase(getAllStocks.fulfilled, (state, action) => {
            state.stock = action.payload
        }).addCase(updateStock.fulfilled, (state, action) => {
            state.stock.data = state.stock.data.map((stock) => {
                return stock.id == action.payload.id ? action.payload : stock
            })
        }).addCase(toggleStock.fulfilled, (state, action) => {
            state.stock.data = state.stock.data.map((stock) => {
                return stock.id == action.payload.id ? action.payload : stock
            })
        })
        .addCase(deleteStock.fulfilled, (state, action) => {
            state.stock.data = state.stock.data.filter((stock) => stock.id !== action.payload)
        })
    }
});

export const { setStock } = stockSlice.actions;

export default stockSlice.reducer