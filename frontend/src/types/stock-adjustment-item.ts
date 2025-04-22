import {PaginatedData} from "./common.ts";

export type StockAdjustmentItem = {
    id: number,
    adjustmentId: number,
    productId: number,
    previousQuantity: number,
    adjustedQuantity: number,
    newQuantity: number,
    unitCostAtAdjustment: number,
    companyId: string,
    isActive: boolean,
}

export interface StockAdjustmentItemType extends PaginatedData {
    data: StockAdjustmentItem[];
    links: any
}

export interface StockAdjustmentItemsState {
    stockAdjustmentItem: StockAdjustmentItemType,
    singleStockAdjustmentItem: StockAdjustmentItem
}
