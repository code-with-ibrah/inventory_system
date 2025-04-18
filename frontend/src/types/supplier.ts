import {PaginatedData} from "./common.ts";

export type Supplier = {
    id: number;
    name: string;
    phone: number;
    companyName: string;
    registrationDate: string;
    email: string;
    addressLineOne: string;
    addressLineTwo?: string;
    isActive: boolean;
    isDeleted: boolean;
    companyId: number;
}

export interface SupplierType extends PaginatedData {
    data: Supplier[];
    links: any
}

export interface SuppliersState {
    supplier: SupplierType,
    supplierItem: Supplier,
}
