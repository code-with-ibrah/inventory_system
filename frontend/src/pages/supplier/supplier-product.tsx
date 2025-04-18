import React from "react";
import Column from "antd/es/table/Column";
import {Button} from "antd";
import { FiPlusCircle} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import {MenuLinks} from "../../utils/menu-links.ts";
import {useAppDispatch, useAppSelector } from "../../hooks";
import {setProduct} from "../../state/product/productSlice.ts";
import SearchInput from "../../common/search-input.tsx";
import TlaTableWrapper from "../../common/tla-table-wrapper.tsx";
import {Product} from "../../types/product.ts";
import TlaDelete from "../../common/tla-delete.tsx";
import {deleteProduct, getAllProducts,} from "../../state/product/productAction.ts";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";


const SupplierProduct: React.FC = () => {
    const {data, meta} = useAppSelector((state) => state.product.product);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // const supplier: Supplier = useAppSelector(state => state.supplier.supplierItem);

    const goToDetails = (record: any) => {
        dispatch(setProduct(record));
        navigate(MenuLinks.admin.product.formPage + "?edit=23");
    }

    return (
        <div className={'bg-white p-5 rounded-2xl'}>
            <TlaOpen to={MenuLinks.admin.supplier.details.supplierProductForm}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>Add Supplied Product</Button>
            </TlaOpen>

            <div className={'flex-1 my-5'}>
                <SearchInput getData={getAllProducts} columns={["name"]}/>
            </div>

            <TlaTableWrapper getData={getAllProducts} data={data} filter={""} meta={meta}>
                <Column
                    title="Name"
                    render={(record: Product) => (
                        <span className={'cursor-pointer underline'} onClick={() => goToDetails(record)}>
                        {record.name}
                    </span>
                    )}/>

                <Column title="Category" dataIndex={"categoryName"}/>
                <Column title="Brand" dataIndex={"brandName"}/>
                <Column
                    title={'Action'}
                    render={((record) => (
                            <div className={'flex items-center gap-2'}>
                                <TlaDelete
                                    confirmPurpose={'discontinue'}
                                    btnName={'Discontinue Supply'}
                                    title={'product supply'}
                                    column={record.id} callBack={deleteProduct}/>
                            </div>
                        )
                    )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default SupplierProduct
