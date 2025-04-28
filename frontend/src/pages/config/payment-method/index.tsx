import React from "react";
import Column from "antd/es/table/Column";
import {useAppSelector} from "../../../hooks";
import {Button} from "antd";
import {FiPlusCircle} from "react-icons/fi";
import TlaOpen from "../../../common/pop-ups/TlaOpen.tsx";
import TlaTableWrapper from "../../../common/tla-table-wrapper.tsx";
import {MenuLinks} from "../../../utils/menu-links.ts";
import TlaDelete from "../../../common/tla-delete.tsx";
import TlaEdit from "../../../common/tla-edit.tsx";
import {deletePaymentMethod, getAllPaymentMethods} from "../../../state/payment-method/paymentMethodAction.ts";
import {commonQuery} from "../../../utils/query.ts";


const PaymentMethods: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.paymentMethod.paymentMethod);
    return (
        <div className={'bg-white rounded-2xl p-5'}>
            <TlaOpen to={MenuLinks.admin.config.paymentMethodForm}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
            </TlaOpen>
            <TlaTableWrapper getData={getAllPaymentMethods} data={data} filter={commonQuery()} meta={meta}>
                <Column title="Name" dataIndex="name"/>

                <Column
                    title={'Action'}
                    render={((record: any) => (
                            <div className={'flex items-center gap-2'}>
                                <TlaEdit data={record} link={MenuLinks.admin.config.paymentMethodForm}/>
                                <TlaDelete title={'payment method'} column={record?.id} callBack={deletePaymentMethod}/>
                            </div>
                        )
                    )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default PaymentMethods
