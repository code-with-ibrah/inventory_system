import React from "react";
import Column from "antd/es/table/Column";
import {Button} from "antd";
import {FiEdit3, FiPlusCircle, FiToggleLeft} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import {MenuLinks} from "../../utils/menu-links.ts";
import {useAppDispatch, useAppSelector } from "../../hooks/index";
import {setProduct} from "../../state/product/productSlice.ts";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";
import SearchInput from "../../common/search-input.tsx";
import TlaTableWrapper from "../../common/tla-table-wrapper.tsx";
import {Product} from "../../types/product.ts";
import TableActions from "../../common/table-actions.tsx";
import TlaDelete from "../../common/tla-delete.tsx";
import {deleteProduct, getAllProducts, toggleProduct} from "../../state/product/productAction.ts";
import TlaToggleActive from "../../common/tla-toggle-active.tsx";
import { Link } from "react-router-dom";



const ProductForm: React.FC = () => {
    const {data, meta} = useAppSelector((state) => state.award.award);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const goToDetails = (record: any) => {
        dispatch(setProduct(record));
        navigate(MenuLinks.admin.product.details.index);
    }

    const goToPrintInfoPage = (record: any) => {
        dispatch(setProduct(record));
        navigate(MenuLinks.admin.product.details.index);
    }

    const handleFilter = (searchTerm: string) => {
        console.log("searching for : " + searchTerm);
        // dispatch(updateMemberFilter({...memberFilterRef.current, search: searchTerm}));
    };


    return (
        <div className={'bg-white p-5 rounded-2xl'}>
            {/*<TlaOpen to={MenuLinks.admin.product.form}>*/}
            {/*    <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>*/}
            {/*</TlaOpen>*/}

            <Link to={MenuLinks.admin.product.formPage}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
            </Link>

            <div className={'flex-1 my-5'}>
                <SearchInput defaultValue={'search word'} loading={false}
                             getData={handleFilter}/>
            </div>

            <TlaTableWrapper getData={getAllProducts} data={data} filter={""} meta={meta}>
                <Column
                    title="Name"
                    render={(record: Product) => (
                        <span className={'cursor-pointer underline'} onClick={() => goToDetails(record)}>
                        {record.name}
                    </span>
                    )}/>

                <Column title="Code" dataIndex="code"/>
                <Column title="Start Date" dataIndex="startDate"/>
                <Column title="End Date" dataIndex="endDate"/>
                <Column title="Cost" dataIndex="costPerVote"/>
                <Column title={'Action'} render={((record) => (
                        <TableActions items={[
                            {
                                key: '1',
                                label: (
                                    <TlaOpen data={record} modal={true} to={MenuLinks.admin.product.form}>
                                        <FiEdit3/>
                                        Edit
                                    </TlaOpen>
                                ),
                            },
                            {
                                key: '2',
                                label: (
                                    <TlaDelete title={'Award'} column={record.id} callBack={deleteProduct}/>
                                ),
                            },
                            {
                                key: '3',
                                label: (
                                    <div className={'flex align-items-center gap-2'}>
                                        <FiToggleLeft className={'mt-1'}/>
                                        <TlaToggleActive title={'award'} column={record.id}
                                                         callBack={toggleProduct}/>
                                    </div>
                                ),
                            }
                        ]}/>
                    )
                )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default ProductForm
