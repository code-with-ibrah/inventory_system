import React from "react";
import Column from "antd/es/table/Column";
import TlaTableWrapper from "../../../common/tla-table-wrapper.tsx";
import TlaDelete from "../../../common/tla-delete.tsx";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {MenuLinks} from "../../../utils/menu-links.ts";
import TlaOpen from "../../../common/pop-ups/TlaOpen.tsx";
import {Button} from "antd";
import {FiEdit3, FiPlusCircle} from "react-icons/fi";
import TableActions from "../../../common/table-actions.tsx";
import {Award} from "../../../types/award.ts";
import {useNavigate} from "react-router-dom";
import {setContestant} from "../../../state/contestant/contestantSlice.ts";
import {contestantActivenes, deleteContestant, getAllContestants} from "../../../state/contestant/contestantAction.ts";
import {renderStatus} from "../../../utils";
import TlaToggleActive from "../../../common/tla-toggle-active.tsx";
import {contestantFilter} from "../../../utils/contestant-filter.ts";


type propsType = {
    awardPage?: boolean
}

const Contestants: React.FC = (props: propsType) => {
    const {data, meta} = useAppSelector((state) => state.contestant.contestant);
    const award = useAppSelector(state => state.award.awardItem);
    const category = useAppSelector(state => state.category.categoryItem);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const goToDetails = (record: any) => {
        dispatch(setContestant(record));
        navigate(MenuLinks.admin.contestant.details.index);
    }

    let filter = `awardId[eq]=${award.id}&categoryId[eq]=${category.id}&${contestantFilter}`;


    return (
        <div className={'bg-white rounded-2xl p-5'}>
            <TlaOpen to={MenuLinks.admin.contestant.form}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
            </TlaOpen>

            <TlaTableWrapper getData={getAllContestants} data={data} filter={filter} meta={meta}>
                <Column
                    title="Name"
                    render={(record: Award) => (
                        <span className={'cursor-pointer underline'} onClick={() => goToDetails(record)}>
                            {record.name}
                        </span>
                    )}/>

                <Column title="Unique Code" dataIndex="uniqueCode"/>
                <Column title="Total Vote" dataIndex="totalVoteCount"/>
                <Column title="Total Amount" dataIndex="totalVoteAmount"/>
                {props.awardPage && <Column title="Category" dataIndex="categoryName"/>}
                <Column title="Active Status" render={(record) => renderStatus(record?.isActive) } />
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
                                    <TlaDelete title={'contestants'} column={record.id} callBack={deleteContestant}/>
                                ),
                            },
                            {
                                key: '3',
                                label: (
                                    <TlaToggleActive title={'contestant'} column={record.id} callBack={contestantActivenes}/>
                                ),
                            }
                        ]}/>
                    )
                )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default Contestants
