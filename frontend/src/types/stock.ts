import {PaginatedData} from "./common.ts";

export type Stock = {
    id: number;
    productName: string;
    quantityOnHand: number;
    StockId: number;
    productId: number;
    stockAlertLevel: number;
    lastStockCheckDate: string;
    isActive: boolean;
    isDeleted: boolean;
    companyId: number;
    warehouse: string;
    wareHouseId: number;
    locationInWarehouse: string;
    product: any[]
}

export interface StockType extends PaginatedData {
    data: Stock[];
    links: any
}

export interface StocksState {
    stock: StockType,
    stockItem: Stock,
}
