import React from "react";
import Column from "antd/es/table/Column";
import TlaTableWrapper from "../../../common/tla-table-wrapper.tsx";
import TlaDelete from "../../../common/tla-delete.tsx";
import {useAppSelector} from "../../../hooks";
import {MenuLinks} from "../../../utils/menu-links.ts";
import TlaOpen from "../../../common/pop-ups/TlaOpen.tsx";
import {Button} from "antd";
import {FiEdit3, FiPlusCircle} from "react-icons/fi";
import TableActions from "../../../common/table-actions.tsx";
import {deletePayment, getAllPayments, togglePaymentActiveness} from "../../../state/payment/paymentAction.ts";
import {currencyFormat, formatDate} from "../../../utils";
import TlaToggleActive from "../../../common/tla-toggle-active.tsx";



const OrganisationContestantVoteRecords: React.FC = () => {
    const {data, meta} = useAppSelector((state) => state.payment.payment);
    const award = useAppSelector(state => state.award.awardItem);
    const contestant = useAppSelector(state => state.contestant.contestantItem);


    const filter = `awardId[eq]=${award.id}&contestantId[eq]=${contestant.id}`;

    return (
        <div className={'bg-white rounded-2xl p-5'}>
            <TlaOpen to={MenuLinks.admin.contestant.index}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
            </TlaOpen>

            <TlaTableWrapper getData={getAllPayments} data={data} filter={filter} meta={meta}>
                <Column title="Name" dataIndex={'name'}/>

                <Column title="Payee email" dataIndex="email"/>
                <Column title="Amount" render={(record) => currencyFormat(record.amount)}/>
                <Column title="Vote" dataIndex="voteCount"/>
                <Column title="Type" dataIndex={"voteType"}/>
                <Column title="Payment Date" render={(record) => formatDate(record.createdAt, "D MMM YYYY hh:mm")}/>
                <Column title="Payment Reference" render={(record) => record.reference ?? "-"}/>

                <Column title={'Action'} render={((record) => (
                        <TableActions items={[
                            {
                                key: '3',
                                label: (
                                    <TlaOpen data={record} modal={true} to={MenuLinks.admin.paymentEditForm}>
                                        <FiEdit3/>
                                        Edit
                                    </TlaOpen>
                                ),
                            },
                            {
                                key: '1',
                                label: (
                                    <TlaDelete title={'payment'} column={record.id} callBack={deletePayment}/>
                                ),
                            },
                            {
                                key: '2',
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

export default OrganisationContestantVoteRecords
