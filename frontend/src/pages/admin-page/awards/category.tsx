import React from "react";
import Column from "antd/es/table/Column";
import TlaTableWrapper from "../../../common/tla-table-wrapper.tsx";
import TlaDelete from "../../../common/tla-delete.tsx";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {MenuLinks} from "../../../utils/menu-links.ts";
import TlaOpen from "../../../common/pop-ups/TlaOpen.tsx";
import {Button} from "antd";
import {FiEdit3, FiPlusCircle, FiToggleLeft} from "react-icons/fi";
import TableActions from "../../../common/table-actions.tsx";
import {Award} from "../../../types/award.ts";
import {useNavigate} from "react-router-dom";
import {
    categoryActiveness,
    categoryVisibilityToggler,
    deleteCategory,
    getAllCategories
} from "../../../state/category/categoryAction.ts";
import {setCategory} from "../../../state/category/categorySlice.ts";
import TlaToggleActive from "../../../common/tla-toggle-active.tsx";
import {renderStatus} from "../../../utils";

const Categories: React.FC = () => {
    const {data, meta} = useAppSelector((state) => state.category.category);
    const award = useAppSelector(state => state.award.awardItem);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const goToDetails = (record: any) => {
        dispatch(setCategory(record));
        navigate(MenuLinks.admin.category.details.index);
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
                <Column title="Active Status" render={(record) => renderStatus(record?.isActive) } />
                <Column title="Display in Result" render={(record) => renderStatus(record?.isVisible, "yes")}/>
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
                            {
                                key: '2',
                                label: (
                                    <TlaDelete title={'category'} column={record.id} callBack={deleteCategory}/>
                                ),
                            },
                            {
                                key: '3',
                                label: (
                                    <TlaToggleActive title={'category'} column={record.id} callBack={categoryActiveness}/>
                                ),
                            },
                            {
                                key: '4',
                                label: (
                                    <div className={'flex align-items-center gap-2'}>
                                        <FiToggleLeft className={'mt-1'}/>
                                        <TlaToggleActive title={'award'} text={'Toggle category display in result'} column={record.id}
                                                         callBack={categoryVisibilityToggler}/>
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

export default Categories
