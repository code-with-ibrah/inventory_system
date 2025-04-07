import React from "react";
import Column from "antd/es/table/Column";
import TlaTableWrapper from "../../../common/tla-table-wrapper.tsx";
import {useAppSelector} from "../../../hooks";
import {
    getContestantResults,
} from "../../../state/contestant/contestantAction.ts";


const OrganisationResults: React.FC = () => {
    const category = useAppSelector(state => state.category.categoryItem);
    const data = useAppSelector(state => state.contestant.votingResult);
    const filter = `categoryId=${category.id}`;
    const meta: any = [];

    return (
        <div className={'bg-white rounded-2xl p-5'}>
            <TlaTableWrapper getData={getContestantResults} data={data} filter={filter} meta={meta}>

                <Column title="Name" dataIndex="name"/>
                <Column title="Total Vote" dataIndex="totalVoteCount"/>
                <Column title="Position" dataIndex="position"/>
            </TlaTableWrapper>
        </div>
    )
}

export default OrganisationResults
