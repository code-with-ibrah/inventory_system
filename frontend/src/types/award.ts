import {PaginatedData} from "./common.ts";

export type Award = {
    isVisible: boolean;
    packageStartDate: string;
    packageEndDate: string;
    endDate: string;
    _count: any;
    userCode: any;
    organisation: any;
    id: number,
    name: string,
    code: string,
    image: string,
    systemPercentage: number,
    costPerVote: number,
}

export interface AwardType extends PaginatedData {
    data: Award[];
    links: any
}

export interface AwardsState {
    award: AwardType,
    awardItem: Award
}
