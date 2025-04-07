import React from "react";
import Column from "antd/es/table/Column";
import TlaTableWrapper from "../../../common/tla-table-wrapper.tsx";
import TlaDelete from "../../../common/tla-delete.tsx";
import { useAppSelector} from "../../../hooks";
import {MenuLinks} from "../../../utils/menu-links.ts";
import TlaOpen from "../../../common/pop-ups/TlaOpen.tsx";
import {Button} from "antd";
import {FiEdit3, FiPlusCircle} from "react-icons/fi";
import TableActions from "../../../common/table-actions.tsx";
import TlaToggleActive from "../../../common/tla-toggle-active.tsx";
import {
    deleteAwardBonusPackage,
    getAllAwardBonusPackages,
    toggleActiveness
} from "../../../state/award-bonus/awardBonusAction.ts";
import {dateHasExpired, renderStatus} from "../../../utils";
import {FieldTimeOutlined} from "@ant-design/icons";

const AwardBonusPackage: React.FC = () => {
    const {data, meta} = useAppSelector((state) => state.awardBonusPackage.awardBonusPackage);
    const award = useAppSelector(state => state.award.awardItem);


    const filter = `awardId[eq]=${award.id}`;

    return (
        <>
            <div className="p-4 bg-white w-fit rounded-2xl flex gap-6 my-6">
                <div className="flex gap-2 text-align-center">
                    <p className="title-xl font-bold">From: </p>
                    <p>{award?.packageStartDate ?? 'not-set'}</p> &nbsp; |
                </div>

                <div className="flex gap-2 text-align-center">
                    <p className="title-xl font-bold">To: </p>
                    <p>{award?.packageEndDate ?? 'not-set'}</p> &nbsp; |
                </div>

                <div className="flex gap-2 text-align-center">
                    <p> { dateHasExpired(award?.packageEndDate) }</p>
                </div>

            </div>


            <div className={'bg-white rounded-2xl p-5'}>
                <div className="flex gap-4">
                    <TlaOpen to={MenuLinks.admin.award.details.bonusForm}>
                        <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
                    </TlaOpen>
                    <TlaOpen to={MenuLinks.admin.award.details.bonusDateForm}>
                        <Button className={'btn btn-red'} size={'large'} icon={<FieldTimeOutlined/>}>Set Bonus Date</Button>
                    </TlaOpen>
                </div>

                <TlaTableWrapper getData={getAllAwardBonusPackages} data={data} filter={filter} meta={meta}>
                    <Column title="Price" dataIndex={"price"}/>
                    <Column title="Total Votes" dataIndex={"totalVote"}/>
                    <Column title="Active Status" render={(record) => renderStatus(record?.isActive)}/>
                    <Column title={'Action'} render={((record) => (
                            <TableActions items={[
                                {
                                    key: '1',
                                    label: (
                                        <TlaOpen data={record} modal={true}
                                                 to={MenuLinks.admin.award.details.bonusForm}>
                                            <FiEdit3/>
                                            Edit
                                        </TlaOpen>
                                    ),
                                },
                                {
                                    key: '2',
                                    label: (
                                        <TlaDelete title={'award bonus'} column={record.id}
                                                   callBack={deleteAwardBonusPackage}/>
                                    ),
                                },
                                {
                                    key: '3',
                                    label: (
                                        <TlaToggleActive title={'award bonus'} column={record.id}
                                                         callBack={toggleActiveness}/>
                                    ),
                                }
                            ]}/>
                        )
                    )}/>
                </TlaTableWrapper>
            </div>
        </>
    )
}

export default AwardBonusPackage
