import {PaginatedData} from "./common.ts";

export type PercentageShare = {
    id: number,
    price: number,
    totalVote: number,
    isActive: boolean,
    awardId: number,
}

export interface PercentageShareType extends PaginatedData {
    data: PercentageShare[];
    links: any
}

export interface PercentageSharesState {
    percentageShare: PercentageShareType,
    percentageShareItem: PercentageShare
}
