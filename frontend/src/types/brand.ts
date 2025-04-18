import {PaginatedData} from "./common.ts";

export type Brand = {
    id: number;
    name: string;
    parentId: number;
    isActive: boolean;
    isDeleted: boolean;
    companyId: number;
}

export interface BrandType extends PaginatedData {
    data: Brand[];
    links: any
}

export interface BrandsState {
    brand: BrandType,
    brandItem: Brand,
}
