import {PaginatedData} from "./common.ts";

export type AwardBonusPackage = {
    id: number,
    price: number,
    totalVote: number,
    isActive: boolean,
    awardId: number,
}

export interface AwardBonusPackageType extends PaginatedData {
    data: AwardBonusPackage[];
    links: any
}

export interface AwardBonusPackagesState {
    awardBonusPackage: AwardBonusPackageType,
    awardBonusPackageItem: AwardBonusPackage
}
