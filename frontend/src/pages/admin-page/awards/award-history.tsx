import React from "react";
import Column from "antd/es/table/Column";
import TlaTableWrapper from "../../../common/tla-table-wrapper.tsx";
import TlaDelete from "../../../common/tla-delete.tsx";
import {useAppSelector} from "../../../hooks";
import TableActions from "../../../common/table-actions.tsx";
import TlaToggleActive from "../../../common/tla-toggle-active.tsx";
import {renderStatus} from "../../../utils";
import {deletePayment, getAllPayments, togglePaymentActiveness} from "../../../state/payment/paymentAction.ts";



const VoteHistory: React.FC = () => {
    const {data, meta} = useAppSelector((state) => state.payment.payment);
    const award = useAppSelector(state => state.award.awardItem);

    const filter = `awardId[eq]=${award.id}`;

    return (
        <div className={'bg-white rounded-2xl p-5'}>
            {/*<TlaOpen to={MenuLinks.admin.category.form}>*/}
            {/*    <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>*/}
            {/*</TlaOpen>*/}
            <TlaTableWrapper getData={getAllPayments} data={data} filter={filter} meta={meta}>
                <Column title="Email" dataIndex={'email'}/>
                <Column title="Amount" dataIndex={'amount'}/>
                <Column title="Vote Count" dataIndex={'voteCount'}/>
                <Column title="Vote Type" dataIndex={'voteType'}/>
                <Column title="Reference" dataIndex={'reference'}/>

                <Column title="Active Status" render={(record) => renderStatus(record?.isActive) } />

                <Column title={'Action'} render={((record) => (
                        <TableActions items={[
                            // {
                            //     key: '1',
                            //     label: (
                            //         <TlaOpen data={record} modal={true} to={MenuLinks.admin.paymentEditForm}>
                            //             <FiEdit3/>
                            //             Edit
                            //         </TlaOpen>
                            //     ),
                            // },
                            {
                                key: '2',
                                label: (
                                    <TlaDelete title={'payment'} column={record.id} callBack={deletePayment}/>
                                ),
                            },
                            {
                                key: '3',
                                label: (
                                    <TlaToggleActive title={'payment'} column={record.id} callBack={togglePaymentActiveness}/>
                                ),
                            }
                        ]}/>
                    )
                )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default VoteHistory
