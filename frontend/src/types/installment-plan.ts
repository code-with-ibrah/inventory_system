import {PaginatedData} from "./common.ts";

export type InstallmentPlan = {
    id: number,
    plan: string,
    installmentPayCount: number,
    installmentMonthCount: number,
    interestRate: number,
    description: string,
    companyId: number
}

export interface InstallmentPlanType extends PaginatedData {
    data: InstallmentPlan[];
    links: any
}

export interface InstallmentPlansState {
    installmentPlan: InstallmentPlanType,
    installmentPlanItem: InstallmentPlan,
}
