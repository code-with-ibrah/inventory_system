import {PaginatedData} from "./common.ts";

export type Warehouse = {
    id: number;
    name: string;
    email: string;
    code: string;
    phone: string;
    location: string;
    addressLineOne: string;
    addressLineTwo: string;
    city: string;
    country: string;
    type: string;
    capacity: string;
    description: string;
    creator: any[],
    lastEditor: any[],
    createdAt: string
}

export interface WarehouseType extends PaginatedData {
    data: Warehouse[];
    links: any
}

export interface WarehousesState {
    warehouse: WarehouseType,
    warehouseItem: Warehouse,
}
