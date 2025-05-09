import {PaginatedData} from "./common.ts";

export type Payment = {
    id: number,
    amount: number,
    customerId: number,
    orderId: number,
    comanyId: number
}

export interface PaymentType extends PaginatedData {
    data: Payment[];
    links: any
}

export interface PaymentsState {
    payment: PaymentType,
    paymentItem: Payment,
}
