import {PaginatedData} from "./common.ts";

export type Payment = {
    id: number,
    amount: number,
    voteCount: number,
    voteType: string,
    awardId: number
}

export type PaymentStats = {
    ussdVoteCount: number,
    ussdVoteAmount: number,
    webVoteCount: number,
    webVoteAmount: number,
    totalVoteCount: number,
    totalVoteAmount: number
}

export interface PaymentType extends PaginatedData {
    data: Payment[];
    links: any
}

export interface PaymentsState {
    payment: PaymentType,
    paymentItem: Payment,
    stats: PaymentStats,
    ussdVerificationStatus: any
}
