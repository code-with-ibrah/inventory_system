import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {env} from "../../config/env";
import {
    createInstallmentPlan,
    deleteInstallmentPlan,
    getAllInstallmentPlans,
    toggleInstallmentPlan,
    updateInstallmentPlan
} from "./installmentPlanAction.ts";
import {InstallmentPlan, InstallmentPlansState} from "../../types/installment-plan.ts";

const initialState: InstallmentPlansState = {
    installmentPlan: {
        data: [],
        links: {
            first: `${env.API_BASE_URL}/installment-plans?page=1`,
            last: `${env.API_BASE_URL}/installment-plans?page=1`,
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
                    url: `${env.API_BASE_URL}/installment-plans?page=1`,
                    label: "1",
                    active: true
                },
                {
                    url: null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            path: `${env.API_BASE_URL}/installment-plans`,
            per_page: 15,
            to: null,
            total: 0
        }
    },

    installmentPlanItem: {
        id: 0,
        plan: "",
        installmentPayCount: 0,
        installmentMonthCount: 0,
        interestRate: 0,
        description: "",
        companyId: 0
    }
};


const installmentPlanSlice = createSlice({
    name: "installmentPlan",
    initialState,
    reducers: {
        setInstallmentPlan: (state, action) => {
            state.installmentPlanItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createInstallmentPlan.fulfilled, (state, action) => {
            state.installmentPlan.data.push(action.payload)
        }).addCase(getAllInstallmentPlans.fulfilled, (state, action) => {
            state.installmentPlan = action.payload
        }) .addCase(updateInstallmentPlan.fulfilled, (state, action) => {
            state.installmentPlan.data = state.installmentPlan.data.map((installmentPlan) => {
                return installmentPlan.id=== action.payload.id ? action.payload : installmentPlan
            })
        }) .addCase(deleteInstallmentPlan.fulfilled, (state, action: PayloadAction<any>) => {
            state.installmentPlan.data = state.installmentPlan.data.filter((installmentPlan: InstallmentPlan) => installmentPlan.id!== action.payload)
        }).addCase(toggleInstallmentPlan.fulfilled, (state, action) => {
            state.installmentPlan.data = state.installmentPlan.data.map((installmentPlan: InstallmentPlan) => {
                return installmentPlan.id== action.payload.id ? action.payload : installmentPlan
            })
        })
    }
});

export const { setInstallmentPlan } = installmentPlanSlice.actions;

export default installmentPlanSlice.reducer