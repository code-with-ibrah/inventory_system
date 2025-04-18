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
import {deleteProduct, getAllProducts} from "../../state/product/productAction.ts";
import { Link } from "react-router-dom";
import {commonQuery} from "../../utils/query.ts";



const ProductForm: React.FC = () => {
    const {data, meta} = useAppSelector((state) => state.product.product);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const goToDetails = (record: any) => {
        dispatch(setProduct(record));
        navigate(MenuLinks.admin.product.details.index);
    }

    return (
        <div className={'bg-white p-5 rounded-2xl'}>
            <Link to={MenuLinks.admin.product.formPage}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
            </Link>

            <div className={'flex-1 my-5'}>
                <SearchInput getData={getAllProducts} columns={["name"]}/>
            </div>

            <TlaTableWrapper getData={getAllProducts} data={data} filter={commonQuery()} meta={meta}>
                <Column
                    title="Name"
                    render={(record: Product) => (
                        <span className={'cursor-pointer underline'} onClick={() => goToDetails(record)}>
                        {record.name}
                    </span>
                    )}/>

                <Column title="Sku" dataIndex="sku"/>
                <Column title="Quantity" dataIndex="quantity"/>
                <Column title="Cost Price" dataIndex="costPrice"/>
                <Column title="Unit Price" dataIndex="unitPrice"/>
                <Column title="Category" dataIndex={"categoryName"}/>
                <Column title="Brand" dataIndex={"brandName"}/>
                <Column title="Unit" dataIndex={"stockUnitName"}/>
                <Column
                    title={'Action'}
                    render={((record) => (
                            <div className={'flex items-center gap-2'}>
                                <TlaDelete title={'product'} column={record.id} callBack={deleteProduct}/>
                            </div>
                        )
                    )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default ProductForm
