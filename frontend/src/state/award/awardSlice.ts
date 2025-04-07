import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {
    createAward,
    updateAward,
    deleteAward,
    getAllAwards,
    searchAwards,
    toggleActiveness, toggleAwardVisibility
} from "./awardsAction.ts";
import {env} from "../../config/env";
import {Award, AwardsState} from "../../types/award.ts";


const initialState: AwardsState = {
    award: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/awards?page=1`,
            last: `${env.API_BASE_URL}/awards?page=1`,
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
                    url: `${env.API_BASE_URL}/awards?page=1`,
                    label: "1",
                    active: true
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            path: `${env.API_BASE_URL}/awards`,
            per_page: 15,
            to: null,
            total: 0
        }
    },

    awardItem: {
        id: 0,
        name: "",
        code: "",
        image: "",
        systemPercentage: 0,
        packageStartDate: "",
        packageEndDate: "",
        endDate: "",
        _count: [],
        userCode: "",
        organisation: [],
        costPerVote: 0,
        isVisible: false
    }
}


const awardSlice = createSlice({
    name: "award",
    initialState,
    reducers: {
        setAward: (state, action) => {
            state.awardItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createAward.fulfilled, (state, action: PayloadAction<Award>) => {
            state.award.data.push(action.payload)
        }).addCase(getAllAwards.fulfilled, (state, action) => {
            state.award = action.payload;
        }).addCase(updateAward.fulfilled, (state, action: PayloadAction<Award>) => {
            state.awardItem = action.payload;
        }).addCase(toggleActiveness.fulfilled, (state, action: PayloadAction<Award>) => {
            state.award.data = state.award.data.map((award: Award) => {
                return award.id === action.payload.id ? action.payload : award;
            })
        }).addCase(toggleAwardVisibility.fulfilled, (state, action: PayloadAction<Award>) => {
            state.award.data = state.award.data.map((award: Award) => {
                return award.id === action.payload.id ? action.payload : award;
            })
        }).addCase(deleteAward.fulfilled, (state, action: PayloadAction<number>) => {
            state.award.data = state.award.data.filter((award) => award.id !== action.payload);
        }).addCase(searchAwards.fulfilled, (state, action) => {
            state.award = action.payload;
        })
    }
});

export const { setAward } = awardSlice.actions;

export default awardSlice.reducer