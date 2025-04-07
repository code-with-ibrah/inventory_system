import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    createContestant,
    updateContestant,
    deleteContestant,
    getAllContestants,
    getContestantBYUniqueCode,
    contestantActivenes, getContestantResults, verifyContestant
} from "./contestantAction";
import {env} from "../../config/env";
import {Contestant, ContestantsState} from "../../types/contestant.ts";

const initialState: ContestantsState = {
    contestant: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/contestants?page=1`,
            last: `${env.API_BASE_URL}/contestants?page=1`,
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
                    url: `${env.API_BASE_URL}/contestants?page=1`,
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

    contestantItem: {
        id: 0,
        name: "",
        image: "",
        email: "",
        awardId: 0,
        uniqueCode: "",
        awardName: "",
        totalVoteCount: 0,
        categoryName: "",
        costPerVote: 0,
        categoryId: 0,
        userCode: "",
        thumbnail: "",
        totalVoteAmount: 0,
        phone: "",
        stageName: ""
    },

    votingResult: []
};


const contestantSlice = createSlice({
    name: "contestant",
    initialState,
    reducers: {
        setContestant: (state, action) => {
            state.contestantItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createContestant.fulfilled, (state, action) => {
            state.contestant.data.push(action.payload)
        }).addCase(getAllContestants.fulfilled, (state, action) => {
            state.contestant = action.payload
        }).addCase(getContestantResults.fulfilled, (state, action) => {
            state.votingResult = action.payload
        }).addCase(updateContestant.fulfilled, (state, action) => {
            state.contestant.data = state.contestant.data.map((contestant) => {
                return contestant.id === action.payload.id ? action.payload : contestant
            })
        }).addCase(contestantActivenes.fulfilled, (state, action) => {
            state.contestant.data = state.contestant.data.map((contestant) => {
                return contestant.id === action.payload.id ? action.payload : contestant
            })
        }).addCase(deleteContestant.fulfilled, (state, action: PayloadAction<number>) => {
            state.contestant.data = state.contestant.data.filter((contestant: Contestant) => contestant.id !== action.payload)
        }).addCase(verifyContestant.fulfilled, (state, action: PayloadAction<Contestant>) => {
            state.contestant.data = state.contestant.data.filter((contestant: Contestant) => contestant.id !== action.payload.id)
        }).addCase(getContestantBYUniqueCode.fulfilled, (state, action) => {
            state.contestantItem = (action.payload ? action.payload[0] : state);
        })
    }
});

export const { setContestant } = contestantSlice.actions;

export default contestantSlice.reducer