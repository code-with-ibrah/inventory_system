import {Image, Spin} from "antd";
import {useAppSelector} from "../../hooks";
import {useEffect, useState} from "react";
import SingleItem from "../../common/single-item.tsx";
import {currencyFormat} from "../../utils";

const ProductInfo = () => {
    const product: any = useAppSelector(state => state.product.productItem);
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

                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Category"} value={product?.categoryName ?? '-'}/>
                </div>

                {product?.barcode ? <div className={'bg-white p-2 md:p-5 rounded-lg col-span-1'}>
                    <p className={'text-gray-500 font-medium text-md'}>Barcode <small>(click to view)</small></p>
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

                {/*<div className={'bg-white p-2 md:p-5 rounded-lg'}>*/}
                {/*    <SingleItem title={"Sku"} value={product?.sku ?? '-'}/>*/}
                {/*</div>*/}
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Stock Alert Level"} value={product?.stockAlertLevel ?? '-'}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Cost Price"} value={currencyFormat(+product?.costPrice) ?? '-'}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Unit Price"} value={currencyFormat(+product?.unitPrice) ?? '-'}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Category"} value={product?.categoryName ?? '-'}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Brand"} value={product?.brandName ?? '-'}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Type"} value={product?.stockUnitName ?? '-'}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Site"} value={product?.site ?? '-'}/>
                </div>
                {/*<div className={'bg-white p-2 md:p-5 rounded-lg'}>*/}
                {/*    <SingleItem title={"Expiration Date"} value={*/}
                {/*        product?.expirationDate */}
                {/*            ? formatDate(product?.expirationDate)?.toString()*/}
                {/*            : 'not applicable'*/}
                {/*        }/>*/}
                {/*</div>*/}

                {/*<div className={'bg-white p-2 md:p-5 rounded-lg'}>*/}
                {/*    <SingleItem title={"Serial Number"} value={product?.serialNumber ?? '-'}/>*/}
                {/*</div>*/}

                {/*<div className={'bg-white p-2 md:p-5 rounded-lg'}>*/}
                {/*    <SingleItem title={"Batch Number"} value={product?.batchNumber ?? '-'}/>*/}
                {/*</div>*/}

                {/*<div className={'bg-white p-2 md:p-5 rounded-lg'}>*/}
                {/*    <p className={'text-gray-500 font-medium text-md'}>Description</p>*/}
                {/*    <div>*/}
                {/*       <p>*/}
                {/*           {product?.longDescription ?? '-'}*/}
                {/*       </p>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    </Spin>);

}

export default ProductInfo;