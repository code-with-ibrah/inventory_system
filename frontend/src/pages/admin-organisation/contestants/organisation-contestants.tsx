import React from "react";
import Column from "antd/es/table/Column";
import TlaTableWrapper from "../../../common/tla-table-wrapper.tsx";
import { useAppSelector} from "../../../hooks";
import {MenuLinks} from "../../../utils/menu-links.ts";
import TlaOpen from "../../../common/pop-ups/TlaOpen.tsx";
import {Button} from "antd";
import {FiPlusCircle} from "react-icons/fi";
import {getAllContestants} from "../../../state/contestant/contestantAction.ts";


type propsType = {
    awardPage?: boolean
}

const OrganisationContestants: React.FC = (props: propsType) => {
    const {data, meta} = useAppSelector((state) => state.contestant.contestant);
    const award = useAppSelector(state => state.award.awardItem);
    const category = useAppSelector(state => state.category.categoryItem);

    // const dispatch = useAppDispatch();
    // const navigate = useNavigate();

    // const goToDetails = (record: any) => {
    //     dispatch(setContestant(record));
    //     navigate(MenuLinks.admin.contestant.details.index);
    // }

    let filter = `awardId[eq]=${award.id}&isActive[eq]=1&isVerified[eq]=1&userCode=${category.userCode}`;

    if(category?.id){
        filter += `&categoryId[eq]=${category.id}`
    }

    return (
        <div className={'bg-white rounded-2xl p-5'}>
            <TlaOpen to={MenuLinks.admin.contestant.form}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
            </TlaOpen>

            <TlaTableWrapper getData={getAllContestants} data={data} filter={filter} meta={meta}>
                <Column title="Name" dataIndex={"name"}/>

                <Column title="Unique Code" dataIndex="uniqueCode"/>
                <Column title="Total Vote" dataIndex="totalVoteCount"/>
                {/*<Column title="Total Amount" dataIndex="totalVoteAmount"/>*/}
                {props.awardPage && <Column title="Category" dataIndex="categoryName"/>}
{/*                <Column title={'Action'} render={((record) => (
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
                        ]}/>
                    )
                )}/>*/}
            </TlaTableWrapper>
        </div>
    )
}

export default OrganisationContestants
