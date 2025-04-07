import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {env} from "../../config/env";
import {PercentageShare, PercentageSharesState} from "../../types/percentage-share.ts";
import {
    createPercentageShare,
    deletePercentageShare,
    getAllPercentages,
    togglePercentageShareActiveness,
    updatePercentageShare
} from "./shareAction.ts";


const initialState: PercentageSharesState = {
    percentageShare: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/percentages?page=1`,
            last: `${env.API_BASE_URL}/percentages?page=1`,
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
                    url: `${env.API_BASE_URL}/percentages?page=1`,
                    label: "1",
                    active: true
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            path: `${env.API_BASE_URL}/percentages`,
            per_page: 15,
            to: null,
            total: 0
        }
    },

    percentageShareItem: {
        id: 0,
        price: 0,
        totalVote: 0,
        isActive: false,
        awardId: 0,
    }
}


const PercentageShareSlice = createSlice({
    name: "percentageShare",
    initialState,
    reducers: {
        setPercentageShare: (state, action) => {
            state.percentageShare = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createPercentageShare.fulfilled, (state, action: PayloadAction<PercentageShare>) => {
            state.percentageShare.data.push(action.payload)
        }).addCase(getAllPercentages.fulfilled, (state, action) => {
            state.percentageShare = action.payload;
        }).addCase(updatePercentageShare.fulfilled, (state, action: PayloadAction<PercentageShare>) => {
            state.percentageShare.data = state.percentageShare.data.map((percentage: PercentageShare) => {
                return percentage.id === action.payload.id ? action.payload : percentage;
            })
        }).addCase(togglePercentageShareActiveness.fulfilled, (state, action: PayloadAction<PercentageShare>) => {
            state.percentageShare.data = state.percentageShare.data.map((percentage: PercentageShare) => {
                return percentage.id === action.payload.id ? action.payload : percentage;
            })
        }).addCase(deletePercentageShare.fulfilled, (state, action: PayloadAction<number>) => {
            state.percentageShare.data = state.percentageShare.data.filter((award) => award.id !== action.payload);
        })
    }
});

export const { setPercentageShare } = PercentageShareSlice.actions;

export default PercentageShareSlice.reducer