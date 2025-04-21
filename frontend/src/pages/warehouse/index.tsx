import React from "react";
import Column from "antd/es/table/Column";
import {Button} from "antd";
import {FiEdit3, FiPlusCircle} from "react-icons/fi";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {MenuLinks} from "../../utils/menu-links.ts";
import SearchInput from "../../common/search-input.tsx";
import TlaTableWrapper from "../../common/tla-table-wrapper.tsx";
import {commonQuery} from "../../utils/query.ts";
import {deleteWarehouse, getAllWarehouses} from "../../state/warehouse/warehouseAction.ts";
import TlaDelete from "../../common/tla-delete.tsx";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";
import {Product} from "../../types/product.ts";
import {useNavigate} from "react-router-dom";
import {setWarehouse} from "../../state/warehouse/warehouseSlice.ts";
import TableActions from "../../common/table-actions.tsx";



const Warehouses: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.warehouse.warehouse);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const goToDetails = (record: any) => {
        dispatch(setWarehouse(record));
        navigate(MenuLinks.admin.warehouse.details);
    }
    return (
        <div className={'bg-white rounded-2xl p-5'}>
            <TlaOpen to={MenuLinks.admin.warehouse.form}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
            </TlaOpen>

            <div className={'flex-1 my-5'}>
                <SearchInput columns={["name"]} getData={getAllWarehouses}/>
            </div>

            <TlaTableWrapper getData={getAllWarehouses} data={data} filter={commonQuery()} meta={meta}>
                <Column
                    title="Name"
                    render={(record: Product) => (
                        <span className={'cursor-pointer underline'} onClick={() => goToDetails(record)}>
                        {record.name}
                    </span>
                    )}/>
                <Column title="Type" dataIndex="type"/>
                <Column title="Capacity" dataIndex="capacity"/>
                <Column title="Location" dataIndex="location"/>
                <Column title="Contact" dataIndex="phone"/>
                <Column title={'Action'} render={((record) => (
                    <TableActions items={[
                        {
                            key: '1',
                            label: (
                                <TlaOpen data={record} modal={true} to={MenuLinks.admin.warehouse.form}>
                                    <FiEdit3/>
                                    Edit
                                </TlaOpen>
                            ),
                        },
                        {
                            key: '2',
                            label: (
                                <TlaDelete title={'warehouse'} column={record.id} callBack={deleteWarehouse}/>
                            ),
                        }
                    ]}/>
                )
                )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default Warehouses;
