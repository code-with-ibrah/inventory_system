import {PaginatedData} from "./common.ts";

export type GoodsReceipt = {
    id: number,
    supplierId: number,
    userId: number,
    date: string,
    totalAmount: number,
    conditionOfGoods: number,
    isActive: boolean,
    isDeleted: boolean,
    isRecorded: boolean,
    companyId: number,
    updatedAt: string,
    receiptNumber: string
}

export interface GoodsReceiptType extends PaginatedData {
    data: GoodsReceipt[];
    links: any
}

export interface GoodsReceiptsState {
    goodsReceipt: GoodsReceiptType,
    goodsReceiptItem: GoodsReceipt,
}

export type GoodsReceiptItem = {
    id: number,
    goodsReceiptId: number,
    productId: number,
    quantityReceived: number,
    unitPriceAtReceipt: number,
    companyId: number
}

export interface GoodsReceiptItemType extends PaginatedData {
    data: GoodsReceiptItem[];
    links: any
}

export interface GoodsReceiptItemState {
    goodsReceiptItem: GoodsReceiptItemType,
    singleGoodsReceiptItem: GoodsReceiptItem,
}
