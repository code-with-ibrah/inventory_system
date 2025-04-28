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
import {deleteInstallmentPlan, getAllInstallmentPlans} from "../../../state/installment-plan/installmentPlanAction.ts";
import {commonQuery} from "../../../utils/query.ts";


const InstallmentPlans: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.installmentPlan.installmentPlan);
    return (
        <div className={'bg-white rounded-2xl p-5'}>
            <TlaOpen to={MenuLinks.admin.config.installmentPlanForm}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
            </TlaOpen>
            <TlaTableWrapper getData={getAllInstallmentPlans} data={data} filter={commonQuery()} meta={meta}>
                <Column title="Plan" dataIndex="plan"/>
                <Column title="Times for Payment" dataIndex="installmentPayCount"/>
                <Column title="Total months for Payment" dataIndex="installmentMonthCount"/>

                <Column
                    title={'Action'}
                    render={((record: any) => (
                            <div className={'flex items-center gap-2'}>
                                <TlaEdit data={record} link={MenuLinks.admin.config.installmentPlanForm}/>
                                <TlaDelete title={'installment plan'} column={record?.id} callBack={deleteInstallmentPlan}/>
                            </div>
                        )
                    )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default InstallmentPlans
