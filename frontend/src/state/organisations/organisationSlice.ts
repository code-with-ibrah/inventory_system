import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {env} from "../../config/env";
import {Organisation} from "../../types/organisation.ts";
import {OrganisationsState} from "../../types/organisation.ts";
import {
    createOrganisation,
    deleteOrganisation,
    getAllOrganisations, searchOrganisations, toggleActiveness,
    updateOrganisation
} from "./organisationsAction.ts";


const initialState: OrganisationsState = {
    organisation: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/organisations?page=1`,
            last: `${env.API_BASE_URL}/organisations?page=1`,
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
                    url: `${env.API_BASE_URL}/organisations?page=1`,
                    label: "1",
                    active: true
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            path: `${env.API_BASE_URL}/organisations`,
            per_page: 15,
            to: null,
            total: 0
        }
    },

    organisationItem: {
        id: 0,
        name: "",
        organisationUserCode: "",
        image: "",
        thumbnail: ""
    }
}


const organisationSlice = createSlice({
    name: "organisation",
    initialState,
    reducers: {
        setOrganisation: (state, action) => {
            state.organisationItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createOrganisation.fulfilled, (state, action: PayloadAction<Organisation>) => {
            state.organisation.data.push(action.payload)
        }).addCase(getAllOrganisations.fulfilled, (state, action) => {
            state.organisation = action.payload;
        }).addCase(updateOrganisation.fulfilled, (state, action: PayloadAction<Organisation>) => {
            state.organisation.data = state.organisation.data.map((organisation: Organisation) => {
                return organisation.id === action.payload.id ? action.payload : organisation;
            })
        })
            .addCase(toggleActiveness.fulfilled, (state, action: PayloadAction<Organisation>) => {
                state.organisation.data = state.organisation.data.map((organisation: Organisation) => {
                    return organisation.id === action.payload.id ? action.payload : organisation;
                })
            })
            .addCase(deleteOrganisation.fulfilled, (state, action: PayloadAction<number>) => {
            state.organisation.data = state.organisation.data.filter((organisation) => organisation.id !== action.payload);
        }).addCase(searchOrganisations.fulfilled, (state, action) => {
            state.organisation = action.payload;
        })
    }
});

export const { setOrganisation } = organisationSlice.actions;

export default organisationSlice.reducer