import React from "react";
import Column from "antd/es/table/Column";
import TlaTableWrapper from "../../../common/tla-table-wrapper.tsx";
import TlaDelete from "../../../common/tla-delete.tsx";
import {useAppSelector} from "../../../hooks";
import {MenuLinks} from "../../../utils/menu-links.ts";
import TlaOpen from "../../../common/pop-ups/TlaOpen.tsx";
import { Image} from "antd";
import {FiEdit3, FiToggleLeft} from "react-icons/fi";
import TableActions from "../../../common/table-actions.tsx";
import {
    getAllContestants, permentlyDeleteContestant,
    verifyContestant
} from "../../../state/contestant/contestantAction.ts";
import TlaToggleActive from "../../../common/tla-toggle-active.tsx";
import {Contestant} from "../../../types/contestant.ts";


const OrganisationUnverifiedContestants: React.FC = () => {
    const {data, meta} = useAppSelector((state) => state.contestant.contestant);
    const user = useAppSelector((state) => state.auth.user);

    let filter = `isVerified[eq]=0&userCode[eq]=${user?.code}`;

    return (
        <div className={'bg-white rounded-2xl p-5'}>

            <TlaTableWrapper getData={getAllContestants} data={data} filter={filter} meta={meta}>
                <Column title="Image" render={(record: Contestant) => <>
                    <Image
                        className={'thumbnail-img'}
                        width={50}
                        src={record?.thumbnail}
                        preview={{ src: record?.image }}
                    />
                </>}/>

                <Column title="Name" dataIndex={'name'}/>
                <Column title="Stage Name" dataIndex={'stageName'}/>
                <Column title="Phone" dataIndex={'phone'}/>
                <Column title="Email" dataIndex={'email'}/>

                <Column title="Award" dataIndex="awardName"/>
                <Column title="Category" dataIndex="categoryName"/>
                <Column title={'Action'} render={((record) => (
                        <TableActions items={[
                            {
                                key: '1',
                                label: (
                                    <TlaOpen data={record} modal={true} to={MenuLinks.admin.contestant.form}>
                                        <FiEdit3/>
                                        Edit
                                    </TlaOpen>
                                ),
                            },
                            {
                                key: '2',
                                label: (
                                    <TlaDelete title={'contestants'} column={record.id} callBack={permentlyDeleteContestant}/>
                                ),
                            },
                            {
                                key: '3',
                                label: (
                                    <div className={'flex align-items-center gap-2'}>
                                        <FiToggleLeft className={'mt-1'}/>
                                        <TlaToggleActive text={'verify contestants'} title={'contestant'} column={record.id} callBack={verifyContestant}/>
                                    </div>
                                ),
                            }
                        ]}/>
                    )
                )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default OrganisationUnverifiedContestants
