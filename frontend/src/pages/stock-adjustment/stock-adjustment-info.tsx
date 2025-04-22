import {Spin} from "antd";
import {useAppSelector} from "../../hooks";
import {useEffect, useState} from "react";
import SingleItem from "../../common/single-item.tsx";
import {Stock} from "../../types/stock.ts";

const StockAdjustmentInfo = () => {
    const stock: Stock = useAppSelector(state => state.stock.stockItem);
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
                    <SingleItem title={"Product"} value={
                        // @ts-ignore
                        stock?.product?.name ?? '-'
                    }/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Unit Price"} value={
                        // @ts-ignore
                        stock?.product?.unitPrice ?? '-'
                    }/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Cost Price"} value={
                        // @ts-ignore
                        stock?.product?.costPrice ?? '-'
                    }/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Quantity On Hand"} value={stock?.quantityOnHand ?? '-'}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Stock Alert Level"} value={stock?.stockAlertLevel ?? '-'}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Location"} value={stock?.locationInWarehouse ?? '-'}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Full Package Quantity"} value={stock?.standardPackageQty ?? '-'}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Total Sales"} value={
                        // @ts-ignore
                        '-'
                    }/>
                </div>
            </div>
        </div>
    </Spin>);

}

export default StockAdjustmentInfo;