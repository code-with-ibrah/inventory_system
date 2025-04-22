import {PaginatedData} from "./common.ts";

export type StockAdjustment = {
    id: number,
    date: string,
    userId: string,
    reason: string,
    companyId: string,
    isActive: boolean,
}

export interface StockAdjustmentType extends PaginatedData {
    data: StockAdjustment[];
    links: any
}

export interface StockAdjustmentsState {
    stockAdjustment: StockAdjustmentType,
    stockAdjustmentItem: StockAdjustment
}
