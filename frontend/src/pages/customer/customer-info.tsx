import {Spin} from "antd";
import {useAppSelector} from "../../hooks";
import {useEffect, useState} from "react";
import SingleItem from "../../common/single-item.tsx";

const CustomerInfo = () => {
    const customer: any = useAppSelector(state => state.customer.customerItem);
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
                    <SingleItem title={"Name"} value={customer?.name}/>
                </div>

                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Phone"} value={customer?.phone ?? '-'}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Company"} value={customer?.companyName ?? '-'}/>
                </div>
                
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Phone"} value={customer?.phone ?? '-'}/>
                </div>
                <div className={'bg-white p-2 md:p-5 rounded-lg'}>
                    <SingleItem title={"Address"} value={customer?.address ?? '-'}/>
                </div>

            </div>
        </div>
    </Spin>);

}

export default CustomerInfo;