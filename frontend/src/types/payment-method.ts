import {PaginatedData} from "./common.ts";

export type PaymentMethod = {
    id: number,
    installmentPayCount: number,
    installmentMonthCount: number,
    interestRate: number,
    description: string,
    companyId: number
}

export interface PaymentMethodType extends PaginatedData {
    data: PaymentMethod[];
    links: any
}

export interface PaymentMethodsState {
    paymentMethod: PaymentMethodType,
    paymentMethodItem: PaymentMethod,
}
