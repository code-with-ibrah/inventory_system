import {Spin} from "antd";
import {useAppSelector} from "../../hooks";
import {Supplier} from "../../types/supplier.ts";
import {formatDate} from "../../utils";
import {useEffect, useState} from "react";
import SingleItem from "../../common/single-item.tsx";

const SupplierInfo = () => {
    const supplier: Supplier = useAppSelector(state => state.supplier.supplierItem);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500)
    }, [loading]);

    return (<Spin spinning={loading}>
        <div className={"mb-5"}>
            <div className={'gap-2 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2'}>
                <div className={'bg-white p-2 md:p-5 rounded-lg w-100'}>
                    <SingleItem title={"Name"} value={supplier?.name}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Phone"} value={supplier?.phone}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Email"} value={supplier?.email}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Company"} value={supplier?.companyName}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Date Joined"} value={formatDate(supplier?.registrationDate)?.toString()}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Address Line One"} value={supplier?.addressLineOne}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Address Line One"} value={supplier?.addressLineTwo}/>
                </div>
            </div>
        </div>
    </Spin>);

}

export default SupplierInfo;