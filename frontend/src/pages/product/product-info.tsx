import {Image, Spin} from "antd";
import {useAppSelector} from "../../hooks";
import {useEffect, useState} from "react";
import SingleItem from "../../common/single-item.tsx";
import {Product} from "../../types/product.ts";
import {formatDate} from "../../utils";

const ProductInfo = () => {
    const product: Product = useAppSelector(state => state.product.productItem);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500)
    }, [loading]);

    return (<Spin spinning={loading}>
        <div className={"mb-5"}>
            <div className={'gap-2 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2'}>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Name"} value={product?.name}/>
                </div>

                {product?.image ? <div className={'bg-white p-2 md:p-5 rounded-lg col-span-1'}>
                    <p className={'text-gray-500 font-medium text-md'}>Image</p>
                    <div>
                        <Image
                            className={'thumbnail-img'}
                            width={150}
                            height={50}
                            src={product?.image}
                            preview={{src: product.image}}
                        />
                    </div>
                </div> : null}

                {product?.barcode ? <div className={'bg-white p-2 md:p-5 rounded-lg col-span-1'}>
                    <p className={'text-gray-500 font-medium text-md'}>Barcode</p>
                    <div>
                        <Image
                            className={'thumbnail-img'}
                            width={150}
                            height={50}
                            src={product?.barcode}
                            preview={{src: product.barcode}}
                        />
                    </div>
                </div> : null}

                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Sku"} value={product?.sku}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Quantity"} value={product?.quantity}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Stock Alert Level"} value={product?.stockAlertLevel}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Standard Package Quantity"} value={product?.quantity}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Cost Price"} value={product?.costPrice}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Unit Price"} value={product?.unitPrice}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Tax"} value={product?.taxRate}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Category"} value={product?.categoryName}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Brand"} value={product?.brandName}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Stock Unit"} value={product?.stockUnit}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Expiration Date"} value={formatDate(product?.expirationDate)?.toString()}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Serial Number"} value={product?.serialNumber}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Batch Number"} value={product?.batchNumber}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Description"} value={product?.longDescription}/>
                </div>
            </div>
        </div>
    </Spin>);

}

export default ProductInfo;