import {Spin} from "antd";
import {useAppSelector} from "../../hooks";
import {useEffect, useState} from "react";
import SingleItem from "../../common/single-item.tsx";
import {Warehouse} from "../../types/warehouse.ts";
import {formatDate} from "../../utils";

const WarehouseInfo = () => {
    const warehouse: Warehouse = useAppSelector(state => state.warehouse.warehouseItem);
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
                    <SingleItem title={"Name"} value={warehouse?.name ?? '-'}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Created Date"}
                                value={formatDate(warehouse?.createdAt, 'MMMM DD, YYYY') ?? '-'}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Code"} value={warehouse?.code ?? '-'}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Location"} value={warehouse?.location ?? '-'}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"City"} value={warehouse?.city ?? '-'}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Country"} value={warehouse?.country ?? '-'}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Type"} value={warehouse?.type ?? '-'}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Phone"} value={warehouse?.phone ?? '-'}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Email"} value={warehouse?.type ?? '-'}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Capacity"} value={warehouse?.capacity ?? '-'}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Address"} value={
                        <>
                            <span>{warehouse?.addressLineOne ?? '-'}</span>
                            <span>{warehouse?.addressLineTwo ?? '-'}</span>
                        </>
                    }/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    {
                        // @ts-ignore
                        <SingleItem title={"Creator"} value={warehouse?.creator?.name ?? '-'}/>
                    }
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    {
                        // @ts-ignore
                        <SingleItem title={"Last Editor"} value={warehouse?.lastEditor?.name ?? '-'}/>
                    }
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg md:col-span-3'}>
                    <p className={'text-gray-500 font-medium text-md'}>Description</p>
                    <div>
                        <p>{warehouse?.description}</p>
                    </div>
                </div>
            </div>
        </div>
    </Spin>);

}

export default WarehouseInfo;