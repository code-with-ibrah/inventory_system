import React from "react";
import Column from "antd/es/table/Column";
import TlaTableWrapper from "../../../common/tla-table-wrapper.tsx";
import {useAppSelector} from "../../../hooks";
import TableActions from "../../../common/table-actions.tsx";
import TlaToggleActive from "../../../common/tla-toggle-active.tsx";
import {renderStatus} from "../../../utils";
import {
    contestantActivenes,
    getContestantResults
} from "../../../state/contestant/contestantAction.ts";


const Results: React.FC = () => {
    const category = useAppSelector(state => state.category.categoryItem);
    const data = useAppSelector(state => state.contestant.votingResult);
    const filter = `categoryId=${category.id}`;
    const meta:any = [];

    return (
        <div className={'bg-white rounded-2xl p-5'}>
            <TlaTableWrapper getData={getContestantResults} data={data} filter={filter} meta={meta}>

                <Column title="Name" dataIndex="name"/>
                <Column title="Total Vote" dataIndex="totalVoteCount"/>
                <Column title="Total Amount" dataIndex="totalVoteAmount"/>
                <Column title="Position" dataIndex="position"/>
                <Column title="Active Status" render={(record) => renderStatus(record?.isActive) } />

                <Column title={'Action'} render={((record) => (
                        <TableActions items={[
                            {
                                key: '3',
                                label: (
                                    <TlaToggleActive title={'category'} column={record.id} callBack={contestantActivenes}/>
                                ),
                            }
                        ]}/>
                    )
                )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default Results
