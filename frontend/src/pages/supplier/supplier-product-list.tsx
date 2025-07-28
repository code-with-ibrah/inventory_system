import React from "react";
import {Button} from "antd";
import Column from "antd/es/table/Column";
import {useNavigate} from "react-router-dom";
import { FiPlusCircle} from "react-icons/fi";
import {Product} from "../../types/product.ts";
import {commonQuery} from "../../utils/query.ts";
import {MenuLinks} from "../../utils/menu-links.ts";
import TlaDelete from "../../common/tla-delete.tsx";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {sampleMetaData} from "../../utils/sample-meta-data.ts";
import {setProduct} from "../../state/product/productSlice.ts";
import TlaTableWrapper from "../../common/tla-table-wrapper.tsx";
import {
    getAllProductBySuppliers,
    removeProductFromSupplier
} from "../../state/product-supplier/productSupplierAction.ts";


const SupplierProductList: React.FC = () => {
    const { data } = useAppSelector(state => state.productSupplier.productList);
    const supplier = useAppSelector(state => state.supplier.supplierItem);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const goToDetails = (record: any) => {
        dispatch(setProduct(record));
        navigate(MenuLinks.admin.product.details.index);
    }
    return (
        <div className={'bg-white p-5 rounded-2xl'}>
            <TlaOpen to={MenuLinks.admin.supplier.details.supplierProductForm}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>Add Supplied Product</Button>
            </TlaOpen>

            <TlaTableWrapper getData={getAllProductBySuppliers} parameter={supplier?.id} data={data} filter={commonQuery()} meta={sampleMetaData}>
                <Column
                    title="Name"
                    render={(record: Product) => (
                        <span onClick={() => goToDetails(record)} className={'cursor-pointer underline'}>
                        {record.name}
                    </span>
                    )}/>

                {/*<Column title={'Cost Price'} render={(record: Product) => (<span>*/}
                {/*    {(record.costPrice)}*/}
                {/*</span>)}/>*/}

                <Column
                    title={'Action'}
                    render={((record: Product) => (
                            <div className={'flex items-center gap-2'}>
                                <TlaDelete
                                    confirmPurpose={'discontinue'}
                                    btnName={'Remove'}
                                    title={'product from this supply'}
                                    query={`productId=${record.id}&supplierId=${supplier?.id}`}
                                    callBack={removeProductFromSupplier}/>
                            </div>
                        )
                    )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default SupplierProductList
