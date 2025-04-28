import {PaginatedData} from "./common.ts";

export type Customer = {
    id: number,
    name: string,
    companyName: string,
    location: string,
    phone: string,
    address: string,
    registrationDate: string,
}

export interface CustomerType extends PaginatedData {
    data: Customer[];
    links: any
}

export interface CustomersState {
    customer: CustomerType,
    customerItem: Customer,
}
