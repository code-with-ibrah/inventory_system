import React from "react";
import Column from "antd/es/table/Column";
import {Button} from "antd";
import {FiPlusCircle} from "react-icons/fi";
import {useAppSelector} from "../../../hooks";
import {MenuLinks} from "../../../utils/menu-links.ts";
import {deleteBrand, getAllBrands} from "../../../state/brand/brandAction.ts";
import {renderStatus} from "../../../utils";
import TlaTableWrapper from "../../../common/tla-table-wrapper.tsx";
import TlaDelete from "../../../common/tla-delete.tsx";
import TlaEdit from "../../../common/tla-edit.tsx";
import TlaOpen from "../../../common/pop-ups/TlaOpen.tsx";



const Brands: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.brand.brand);

    return (
        <div className={'bg-white rounded-2xl p-5'}>
            <TlaOpen to={MenuLinks.admin.productSettings.brandForm}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
            </TlaOpen>
            <TlaTableWrapper getData={getAllBrands} data={data} filter={""} meta={meta}>
                <Column title="Name" dataIndex="name"/>
                <Column title="Active Status" dataIndex={(record: any) => renderStatus(record.isActive)}/>
                <Column
                    title={'Action'}
                    render={((record) => (
                            <div className={'flex items-center gap-2'}>
                                <TlaEdit data={record} link={MenuLinks.admin.productSettings.brandForm}/>
                                <TlaDelete title={'role'} column={record.id} callBack={deleteBrand}/>
                            </div>
                        )
                    )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default Brands
