import {PaginatedData} from "./common.ts";

export type StockUnit = {
    id: number;
    name: string;
    companyId: number;
    isActive: boolean;
    isDeleted: boolean;
}

export interface StockUnitType extends PaginatedData {
    data: StockUnit[];
    links: any
}

export interface StockUnitState {
    stockUnit: StockUnitType,
    stockUnitItem: StockUnit,
}
