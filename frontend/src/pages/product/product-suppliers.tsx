import React from "react";
import Column from "antd/es/table/Column";
import {Button} from "antd";
import {FiEdit3, FiPlusCircle} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import {MenuLinks} from "../../utils/menu-links.ts";
import {useAppDispatch, useAppSelector } from "../../hooks";
import {setProduct} from "../../state/product/productSlice.ts";
import SearchInput from "../../common/search-input.tsx";
import TlaTableWrapper from "../../common/tla-table-wrapper.tsx";
import TlaDelete from "../../common/tla-delete.tsx";
import {deleteSupplier, getAllSuppliers} from "../../state/supplier/supplierAction.ts";
import {Supplier} from "../../types/supplier.ts";
import TableActions from "../../common/table-actions.tsx";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";


const ProductSupplier: React.FC = () => {
    const {data, meta} = useAppSelector((state) => state.supplier.supplier);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const goToDetails = (record: any) => {
        dispatch(setProduct(record));
        navigate(MenuLinks.admin.product.formPage + "?edit=23");
    }

    return (
        <div className={'bg-white p-5 rounded-2xl'}>
            <TlaOpen to={MenuLinks.admin.product.details.productSupplierForm}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>Add Supplier</Button>
            </TlaOpen>

            <div className={'flex-1 my-5'}>
                <SearchInput getData={getAllSuppliers} columns={["name"]}/>
            </div>

            <TlaTableWrapper getData={getAllSuppliers} data={data} filter={""} meta={meta}>
                <Column
                    title="Name"
                    render={(record: Supplier) => (
                        <span className={'cursor-pointer underline'} onClick={() => goToDetails(record)}>
                        {record.name}
                    </span>
                    )}/>

                <Column title="Phone" dataIndex="phone"/>
                <Column title="Email" dataIndex="email"/>
                <Column title={'Action'} render={((record) => (
                        <TableActions items={[
                            {
                                key: '1',
                                label: (
                                    <TlaOpen data={record} modal={true} to={MenuLinks.admin.supplier.form}>
                                        <FiEdit3/>
                                        Edit
                                    </TlaOpen>
                                ),
                            },
                            {
                                key: '2',
                                label: (
                                    <TlaDelete title={'supplier'} column={record.id} callBack={deleteSupplier}/>
                                ),
                            }
                        ]}/>
                    )
                )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default ProductSupplier
