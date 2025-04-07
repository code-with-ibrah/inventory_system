import React from "react";
import Column from "antd/es/table/Column";
import TlaTableWrapper from "../../../common/tla-table-wrapper.tsx";
import TlaDelete from "../../../common/tla-delete.tsx";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {MenuLinks} from "../../../utils/menu-links.ts";
import TlaOpen from "../../../common/pop-ups/TlaOpen.tsx";
import {Button} from "antd";
import {FiEdit3, FiPlusCircle, FiPrinter, FiToggleLeft} from "react-icons/fi";
import {deleteAward, getAllAwards, toggleAwardVisibility} from "../../../state/award/awardsAction.ts";
import TableActions from "../../../common/table-actions.tsx";
import {Award} from "../../../types/award.ts";
import {setAward} from "../../../state/award/awardSlice.ts";
import {useNavigate} from "react-router-dom";
import TlaToggleActive from "../../../common/tla-toggle-active.tsx";
import {toggleActiveness} from "../../../state/award/awardsAction.ts";
import {renderStatus} from "../../../utils";
import SearchInput from "../../../common/search-input.tsx";

const AdminAwards: React.FC = () => {
    const {data, meta} = useAppSelector((state) => state.award.award);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const goToDetails = (record: any) => {
        dispatch(setAward(record));
        navigate(MenuLinks.admin.award.details.index)
    }

    const goToPrintInfoPage = (record: any) => {
        dispatch(setAward(record));
        navigate(MenuLinks.admin.award.printAwards);
    }

    const handleFilter = (searchTerm: string) => {
        console.log("searching for : " + searchTerm);
        // dispatch(updateMemberFilter({...memberFilterRef.current, search: searchTerm}));
    };


    return (
        <div className={'bg-white p-5 rounded-2xl'}>
            <TlaOpen to={MenuLinks.admin.award.form}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
            </TlaOpen>

            <div className={'flex-1 my-5'}>
                <SearchInput defaultValue={'search word'} loading={false}
                             getData={handleFilter}/>
            </div>

            <TlaTableWrapper getData={getAllAwards} data={data} filter={""} meta={meta}>
                <Column
                    title="Name"
                    render={(record: Award) => (
                        <span className={'cursor-pointer underline'} onClick={() => goToDetails(record)}>
                        {record.name}
                    </span>
                    )}/>

                <Column title="Code" dataIndex="code"/>
                <Column title="Start Date" dataIndex="startDate"/>
                <Column title="End Date" dataIndex="endDate"/>
                <Column title="Cost" dataIndex="costPerVote"/>
                <Column title="Active Status" render={(record) => renderStatus(record?.isActive)}/>
                <Column title="Display in Result" render={(record) => renderStatus(record?.isVisible, "yes")}/>
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
                                        <TlaToggleActive title={'award'} column={record.id}
                                                         callBack={toggleActiveness}/>
                                    </div>
                                ),
                            },
                            {
                                key: '4',
                                label: (
                                    <div onClick={() => goToPrintInfoPage(record)}
                                         className={'flex align-items-center gap-2'}>
                                        <FiPrinter className={'mt-1'}/>
                                        <span title={'Print Info'}>Print Info</span>
                                    </div>
                                ),
                            },
                            {
                                key: '4',
                                label: (
                                    <div className={'flex align-items-center gap-2'}>
                                        <FiToggleLeft className={'mt-1'}/>
                                        <TlaToggleActive title={'award'} text={'Toggle award display in result'} column={record.id}
                                                         callBack={toggleAwardVisibility}/>
                                    </div>
                                ),
                            },
                        ]}/>
                    )
                )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default AdminAwards
