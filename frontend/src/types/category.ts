import {PaginatedData} from "./common.ts";

export type Category = {
    id: number;
    name: string;
    parentId: number;
    isActive: boolean;
    isDeleted: boolean;
    companyId: number;
}

export interface CategoryType extends PaginatedData {
    data: Category[];
    links: any
}

export interface CategorysState {
    category: CategoryType,
    categoryItem: Category,
}
