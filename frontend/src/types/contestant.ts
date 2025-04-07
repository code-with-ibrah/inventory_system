import {PaginatedData} from "./common.ts";

export type Contestant = {
    email: string;
    phone: string;
    stageName: string;
    costPerVote: 0;
    categoryId: any;
    userCode: any;
    thumbnail: any;
    id: number,
    name: string,
    image: string,
    awardId: number,
    uniqueCode: string,
    awardName: string,
    categoryName: string,
    totalVoteCount: number,
    totalVoteAmount: number,
}

export interface ContestantType extends PaginatedData {
    data: Contestant[];
    links: any
}

export interface ContestantsState {
    contestant: ContestantType,
    contestantItem: Contestant,
    votingResult: []
}
