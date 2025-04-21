import React from "react";
import Column from "antd/es/table/Column";
import {Button} from "antd";
import {FiPlusCircle} from "react-icons/fi";
import {MenuLinks} from "../../utils/menu-links.ts";
import {useAppSelector } from "../../hooks";
import TlaTableWrapper from "../../common/tla-table-wrapper.tsx";
import {getAllSupplierProduct} from "../../state/supplier/supplierAction.ts";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";
import {sampleMetaData} from "../../utils/sample-meta-data.ts";
import TlaDelete from "../../common/tla-delete.tsx";
import {deleteProductSupplier} from "../../state/product-supplier/productSupplierAction.ts";
import {commonQuery} from "../../utils/query.ts";
import {Supplier} from "../../types/supplier.ts";


const ProductSupplier: React.FC = () => {
    const {data} = useAppSelector((state) => state.supplier.supplierProduct);
    const product = useAppSelector(state => state.product.productItem);


    return (
        <div className={'bg-white p-5 rounded-2xl'}>
            <TlaOpen to={MenuLinks.admin.product.details.productSuppliersForm}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>Add Supplier</Button>
            </TlaOpen>


            <TlaTableWrapper getData={getAllSupplierProduct} parameter={product?.id} data={data} filter={commonQuery()} meta={sampleMetaData}>
                <Column
                    title="Name" dataIndex={'name'}/>

                <Column title="Phone" dataIndex="phone"/>
                <Column title="Email" dataIndex="email"/>
                <Column title="Company" dataIndex="companyName"/>
                <Column
                    title={'Action'}
                    render={((record: Supplier) => (
                            <div className={'flex items-center gap-2'}>
                                <TlaDelete
                                    btnName={'Remove'}
                                    title={'supplier from the suppliers'}
                                    query={`supplierId=${record.id}&productId=${product?.id}`}
                                    callBack={deleteProductSupplier}
                                    confirmPurpose={'remove'}
                                />
                            </div>
                        )
                    )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default ProductSupplier
