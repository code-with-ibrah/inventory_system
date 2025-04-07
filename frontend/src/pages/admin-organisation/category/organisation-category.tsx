import React from "react";
import Column from "antd/es/table/Column";
import TlaTableWrapper from "../../../common/tla-table-wrapper.tsx";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {MenuLinks} from "../../../utils/menu-links.ts";
import TlaOpen from "../../../common/pop-ups/TlaOpen.tsx";
import {Button} from "antd";
import {FiEdit3, FiPlusCircle} from "react-icons/fi";
import TableActions from "../../../common/table-actions.tsx";
import {Award} from "../../../types/award.ts";
import {useNavigate} from "react-router-dom";
import { getAllCategories} from "../../../state/category/categoryAction.ts";
import {setCategory} from "../../../state/category/categorySlice.ts";

const OrganisationCategories: React.FC = () => {
    const {data, meta} = useAppSelector((state) => state.category.category);
    const award = useAppSelector(state => state.award.awardItem);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const goToDetails = (record: any) => {
        dispatch(setCategory(record));
        navigate(MenuLinks.organisation.category.details);
    }

    const filter = `awardId[eq]=${award.id}`;

    return (
        <div className={'bg-white rounded-2xl p-5'}>
            <TlaOpen to={MenuLinks.admin.category.form}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
            </TlaOpen>
            <TlaTableWrapper getData={getAllCategories} data={data} filter={filter} meta={meta}>
                <Column
                    title="Name"
                    render={( record: Award) => (
                        <span className={'cursor-pointer underline'} onClick={() => goToDetails(record)}>
                            {record.name}
                        </span>
                    )}/>

                <Column title='Total Contestants' dataIndex={["_count", "contestant"]}/>
                {/*<Column title="Active Status" render={(record) => renderStatus(record?.isActive) } />*/}
                <Column title={'Action'} render={((record) => (
                        <TableActions items={[
                            {
                                key: '1',
                                label: (
                                    <TlaOpen data={record} modal={true} to={MenuLinks.admin.category.form}>
                                        <FiEdit3/>
                                        Edit
                                    </TlaOpen>
                                ),
                            },
                            // {
                            //     key: '2',
                            //     label: (
                            //         <TlaDelete title={'category'} column={record.id} callBack={deleteCategory}/>
                            //     ),
                            // },
                            // {
                            //     key: '3',
                            //     label: (
                            //         <TlaToggleActive title={'category'} column={record.id} callBack={categoryActiveness}/>
                            //     ),
                            // }
                        ]}/>
                    )
                )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default OrganisationCategories
