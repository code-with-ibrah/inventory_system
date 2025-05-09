import {PaginatedData} from "./common.ts";

export type Order = {
    id: number,
    orderNumber: string,
    date: string,
    customerId: number,
    amount: number,
    status: string,
    installmentPlanId: number,
    currency: number,
    paymentMethodId: number,
    discount: number,
    taxAmount: number,
    userId: number,
    isActive: boolean,
    isDeleted: boolean,
    companyId: number,
    customer: any,
    totalPayments: number,
    originalPrice: number,
}

export interface OrderType extends PaginatedData {
    data: Order[];
    links: any
}

export interface OrdersState {
    order: OrderType,
    orderItem: Order
}

export type OrderItem = {
    id: number,
    orderId: number,
    productId: number,
    customerId: number,
    description: string,
    quantity: number,
    unitPriceAtSale: number,
    totalCost: number,
    isActive: boolean,
    isDeleted: boolean,
}

export interface OrderItemType extends PaginatedData {
    data: OrderItem[];
    links: any
}

export interface OrderItemState {
    orderItem: OrderItemType,
    singleOrderItem: OrderItem,
}
