import React from "react";
import Column from "antd/es/table/Column";
import {Button} from "antd";
import {FiPlusCircle} from "react-icons/fi";
import {MenuLinks} from "../../utils/menu-links.ts";
import {useAppSelector } from "../../hooks";
import TlaTableWrapper from "../../common/tla-table-wrapper.tsx";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";
import {sampleMetaData} from "../../utils/sample-meta-data.ts";
import TlaDelete from "../../common/tla-delete.tsx";
import {commonQuery} from "../../utils/query.ts";
import {Supplier} from "../../types/supplier.ts";
import {
    getAllSupplierByProduct,
    removeSupplierFromProduct
} from "../../state/product-supplier/productSupplierAction.ts";


const ProductSupplierList: React.FC = () => {
    const {data} = useAppSelector((state) => state.productSupplier.supplierList);
    const product = useAppSelector(state => state.product.productItem);

    return (
        <div className={'bg-white p-5 rounded-2xl'}>
            <TlaOpen to={MenuLinks.admin.product.details.productSuppliersForm}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>Add Supplier</Button>
            </TlaOpen>


            <TlaTableWrapper getData={getAllSupplierByProduct} parameter={product?.id} data={data} filter={commonQuery()} meta={sampleMetaData}>
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
                                    callBack={removeSupplierFromProduct}
                                    confirmPurpose={'remove'}
                                />
                            </div>
                        )
                    )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default ProductSupplierList
