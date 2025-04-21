import {PaginatedData} from "./common";

export type Product = {
    id: number,
    name: string,
    sku: string,
    costPrice: number,
    quantity: number,
    stockAlertLevel: number,
    companyId: number,
    categoryId: number,
    categoryName: string,
    brandId: number,
    brandName: string,
    barcode: string,
    isDeleted: boolean,
    isActive: boolean,
    image: string,
    unitPrice: string,
    stockUnitId: number,
    stockUnitName: string,
    expirationDate: string,
    taxRate: number,
    serialNumber: string,
    batchNumber: string,
    longDescription: string,
    shortDescription: string,
    standardPackageQuantity: number,
}

export interface ProductType extends PaginatedData {
    data: Product[];
    links: any
}

export interface ProductsState {
    product: ProductType,
    productItem: Product
}
