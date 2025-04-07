import React from "react";
import Column from "antd/es/table/Column";
import TlaTableWrapper from "../../../common/tla-table-wrapper.tsx";
import TlaDelete from "../../../common/tla-delete.tsx";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {MenuLinks} from "../../../utils/menu-links.ts";
import TlaOpen from "../../../common/pop-ups/TlaOpen.tsx";
import {FiEdit3, FiPrinter, FiToggleLeft} from "react-icons/fi";
import {deleteAward, getAllAwards} from "../../../state/award/awardsAction.ts";
import TableActions from "../../../common/table-actions.tsx";
import {Award} from "../../../types/award.ts";
import {setAward} from "../../../state/award/awardSlice.ts";
import {useNavigate} from "react-router-dom";
import TlaToggleActive from "../../../common/tla-toggle-active.tsx";
import {toggleActiveness} from "../../../state/award/awardsAction.ts";
import {renderStatus} from "../../../utils";

const OrganisationAwards: React.FC = () => {
    const {data, meta} = useAppSelector((state) => state.award.award);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);

    // @ts-ignore
    const filter = `userCode[eq]=${user?.organisation?.organisationUserCode}`;

    const goToDetails = (record: any) => {
        dispatch(setAward(record));
        navigate(MenuLinks.organisation.award.details.index)
    }


    const goToPrintInfoPage = (record: any) => {
        dispatch(setAward(record));
        navigate(MenuLinks.admin.award.printAwards);
    }


    return (
        <div className={'bg-white rounded-2xl p-5'}>
            {/*<TlaOpen to={MenuLinks.admin.award.form}>*/}
            {/*    <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>*/}
            {/*</TlaOpen>*/}
            <TlaTableWrapper getData={getAllAwards} data={data} filter={filter} meta={meta}>
                <Column
                    title="Name"
                    render={( record: Award) => (
                        <span className={'cursor-pointer underline'} onClick={() => goToDetails(record)}>
                            {record.name}
                        </span>
                    )}/>

                <Column title="Code" dataIndex="code"/>
                <Column title="Start Date" dataIndex="startDate"/>
                <Column title="End Date" dataIndex="endDate"/>
                <Column title="Cost" dataIndex="costPerVote"/>
                <Column title="Active Status" render={(record) => renderStatus(record?.isActive) } />
                <Column title={'Action'} render={((record) => (
                        <TableActions items={[
                            {
                                key: '1',
                                label: (
                                    <TlaOpen data={record} modal={true} to={MenuLinks.admin.award.form}>
                                        <FiEdit3/>
                                        Edit
                                    </TlaOpen>
                                ),
                            },
                            {
                                key: '2',
                                label: (
                                    <TlaDelete title={'Award'} column={record.id} callBack={deleteAward}/>
                                ),
                            },
                            {
                                key: '3',
                                label: (
                                    <div className={'flex align-items-center gap-2'}>
                                        <FiToggleLeft className={'mt-1'}/>
                                        <TlaToggleActive title={'award'} column={record.id} callBack={toggleActiveness}/>
                                    </div>
                                ),
                            },
                            {
                                key: '4',
                                label: (
                                    <div onClick={() => goToPrintInfoPage(record)} className={'flex align-items-center gap-2'}>
                                        <FiPrinter className={'mt-1'}/>
                                        <span title={'Print Info'}>Print Info</span>
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

export default OrganisationAwards
