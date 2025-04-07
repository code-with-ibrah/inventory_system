import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {
    toggleActiveness,
    createAwardBonusPackage, getAllAwardBonusPackages, updateAwardBonusPackage, deleteAwardBonusPackage
} from "./awardBonusAction.ts";
import {env} from "../../config/env";
import {AwardBonusPackage, AwardBonusPackagesState} from "../../types/award-bonus-package.ts";


const initialState: AwardBonusPackagesState = {
    awardBonusPackage: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/vote-packages?page=1`,
            last: `${env.API_BASE_URL}/vote-packages?page=1`,
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
                    url: `${env.API_BASE_URL}/vote-packages?page=1`,
                    label: "1",
                    active: true
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            path: `${env.API_BASE_URL}/vote-packages`,
            per_page: 15,
            to: null,
            total: 0
        }
    },

    awardBonusPackageItem: {
        id: 0,
        price: 0,
        totalVote: 0,
        isActive: false,
        awardId: 0,
    }
}


const awardBonusSlice = createSlice({
    name: "awardBonusPackage",
    initialState,
    reducers: {
        setAwardBonusPackage: (state, action) => {
            state.awardBonusPackageItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createAwardBonusPackage.fulfilled, (state, action: PayloadAction<AwardBonusPackage>) => {
            state.awardBonusPackage.data.push(action.payload)
        }).addCase(getAllAwardBonusPackages.fulfilled, (state, action) => {
            state.awardBonusPackage = action.payload;
        }).addCase(updateAwardBonusPackage.fulfilled, (state, action: PayloadAction<AwardBonusPackage>) => {
            state.awardBonusPackage.data = state.awardBonusPackage.data.map((awardBonus: AwardBonusPackage) => {
                return awardBonus.id === action.payload.id ? action.payload : awardBonus;
            })
        }).addCase(toggleActiveness.fulfilled, (state, action: PayloadAction<AwardBonusPackage>) => {
            state.awardBonusPackage.data = state.awardBonusPackage.data.map((awardBonus: AwardBonusPackage) => {
                return awardBonus.id === action.payload.id ? action.payload : awardBonus;
            })
        }).addCase(deleteAwardBonusPackage.fulfilled, (state, action: PayloadAction<number>) => {
            state.awardBonusPackage.data = state.awardBonusPackage.data.filter((award) => award.id !== action.payload);
        })
    }
});

export const { setAwardBonusPackage } = awardBonusSlice.actions;

export default awardBonusSlice.reducer