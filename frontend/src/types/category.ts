import {PaginatedData} from "./common.ts";

export type Category = {
    userCode: any;
    awardName: string;
    awardId: any;
    id: number,
    name: string,
    code: string,
    image: string,
    _count: []
}

export interface CategoryType extends PaginatedData {
    data: Category[];
    links: any
}

export interface CategorysState {
    category: CategoryType,
    categoryItem: Category,
    categoryWithContestants: []
}
