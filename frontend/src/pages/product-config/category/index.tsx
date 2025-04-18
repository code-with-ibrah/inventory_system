import React from "react";
import Column from "antd/es/table/Column";
import {Button} from "antd";
import {FiPlusCircle} from "react-icons/fi";
import {useAppSelector} from "../../../hooks";
import {MenuLinks} from "../../../utils/menu-links.ts";
import {renderStatus} from "../../../utils";
import TlaTableWrapper from "../../../common/tla-table-wrapper.tsx";
import TlaDelete from "../../../common/tla-delete.tsx";
import TlaEdit from "../../../common/tla-edit.tsx";
import TlaOpen from "../../../common/pop-ups/TlaOpen.tsx";
import {deleteCategory, getAllCategories} from "../../../state/category/categoryAction.ts";
import SearchInput from "../../../common/search-input.tsx";



const Categories: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.category.category);

    return (
        <div className={'bg-white rounded-2xl p-5'}>
            <TlaOpen to={MenuLinks.admin.productSettings.categoryForm}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
            </TlaOpen>

            <div className={'flex-1 my-5'}>
                <SearchInput columns={["name"]} getData={getAllCategories}/>
            </div>

            <TlaTableWrapper getData={getAllCategories} data={data} filter={""} meta={meta}>
                <Column title="Name" dataIndex="name"/>
                <Column title="Active Status" dataIndex={(record: any) => renderStatus(record.isActive)}/>
                <Column
                    title={'Action'}
                    render={((record) => (
                            <div className={'flex items-center gap-2'}>
                                <TlaEdit data={record} link={MenuLinks.admin.productSettings.categoryForm}/>
                                <TlaDelete title={'role'} column={record.id} callBack={deleteCategory}/>
                            </div>
                        )
                    )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default Categories;
