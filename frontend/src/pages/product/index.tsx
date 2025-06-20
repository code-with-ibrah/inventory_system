import React, {useEffect, useState} from "react";
import Column from "antd/es/table/Column";
import {Button, Select, Spin} from "antd";
import {FiEdit3, FiPlusCircle} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import {MenuLinks} from "../../utils/menu-links.ts";
import {useAppDispatch, useAppSelector } from "../../hooks";
import {setProduct} from "../../state/product/productSlice.ts";
import SearchInput from "../../common/search-input.tsx";
import TlaTableWrapper from "../../common/tla-table-wrapper.tsx";
import {Product} from "../../types/product.ts";
import TlaDelete from "../../common/tla-delete.tsx";
import {deleteProduct, getAllProducts} from "../../state/product/productAction.ts";
import {commonQuery} from "../../utils/query.ts";
import TableActions from "../../common/table-actions.tsx";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";
import {currencyFormat} from "../../utils/index.ts";
import {FilterOutlined} from "@ant-design/icons";
import {getAllCategories} from "../../state/category/categoryAction.ts";
import {getAllBrands} from "../../state/brand/brandAction.ts";
import {getAllStockUnits} from "../../state/stock-unit/stockUnitAction.ts";
import {unwrapResult} from "@reduxjs/toolkit";



const Products: React.FC = () => {
    const {data, meta} = useAppSelector((state) => state.product.product);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // load data from states
    const productTypeList = useAppSelector(state => state.stockUnit.stockUnit);
    const categoryTypeList = useAppSelector(state => state.category.category);
    const brandList = useAppSelector(state => state.brand.brand);


    // fetching from database
    useEffect(() => {
        dispatch(getAllCategories(commonQuery()));
        dispatch(getAllBrands(commonQuery()));
        dispatch(getAllStockUnits(commonQuery()));
    }, []);


    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<any>("all");
    const [selectedBrandFilter, setSelectedBrandFilter] = useState<any>("all");
    const [selectedTypeFilter, setSelectedTypeFilter] = useState<any>("all");
    const [loading, setLoading] = useState<boolean>(false);


    const onChangeCategoryFilter = (value: any) => setSelectedCategoryFilter(value);
    const onChangeBrandFilter = (value: any) => setSelectedBrandFilter((value));
    const onChangeTypeFilter = (value: any) => setSelectedTypeFilter(value);


    const handleCategoryFilter = () => {
        setLoading(true);
        if(selectedCategoryFilter != "all"){
            dispatch(getAllProducts(commonQuery(`&categoryId[eq]=${selectedCategoryFilter}`)))
                .then(unwrapResult)
                .then(() => {
                    setLoading(false);
                });
        }
        else{
            dispatch(getAllProducts(commonQuery()))
                .then(unwrapResult)
                .then(() => {
                    setLoading(false);
                });
        }
    }

    const handleTypeFilter = () => {
        setLoading(true);
        if(selectedTypeFilter != "all"){
            dispatch(getAllProducts(commonQuery(`&stockUnitId[eq]=${selectedTypeFilter}`)))
                .then(unwrapResult)
                .then(() => {
                    setLoading(false);
                });
        }
        else{
            dispatch(getAllProducts(commonQuery()))
                .then(unwrapResult)
                .then(() => {
                    setLoading(false);
                });
        }

    }

    const handleBrandFilter = () => {
        setLoading(true);
        if(selectedBrandFilter != "all"){
            dispatch(getAllProducts(commonQuery(`&brandId[eq]=${selectedBrandFilter}`)))
                .then(unwrapResult)
                .then(() => {
                    setLoading(false);
                });

        }
        else{
            dispatch(getAllProducts(commonQuery()))
                .then(unwrapResult)
                .then(() => {
                    setLoading(false);
                });
        }
    }



    const goToDetails = (record: any) => {
        dispatch(setProduct(record));
        navigate(MenuLinks.admin.product.details.index);
    }

    return (
        <>
            <Spin spinning={loading} tip={'Please wait...'}>

                <h3 className="text-xl font-semibold mb-4 text-gray-800">Filter Product</h3>
                <div className="p-4 bg-white rounded-2xl sh o mb-8 font-inter">

                    {/* main filter */}
                    <div className="flex flex-col sm:flex-row items-end w-full gap-4 overflow-x-auto pb-2">
                        {/* Category Filter */}
                        {/* On small screens, this div will take full width, stacking vertically. */}
                        {/* On sm: breakpoint and up, flex-1 will allow it to take available horizontal space. */}
                        <div className="flex-1 w-full sm:min-w-[200px]">
                            <label htmlFor="filter-category" className="block text-sm font-medium text-gray-700 mb-1">
                                Select Category:
                            </label>
                            <Select
                                id="filter-category"
                                defaultValue={selectedCategoryFilter}
                                style={{width: '100%'}}
                                onChange={onChangeCategoryFilter}
                                options={[
                                    {value: 'all', label: 'All'},
                                    ...categoryTypeList.data.map(item => {
                                        return {value: item.id, label: item.name};
                                    })
                                ]}
                                size="large"
                                className="rounded-md shadow-sm border-gray-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                        </div>
                        {/* This div containing the button will also stack vertically on small screens. */}
                        {/* On sm: breakpoint and up, flex-shrink-0 keeps its size in the horizontal row. */}
                        <div className="w-full sm:w-auto flex-shrink-0">
                            <Button
                                type="primary"
                                icon={<FilterOutlined/>}
                                onClick={handleCategoryFilter}
                                size="large"
                                className="w-full bg-app-red hover:bg-app-red focus:ring-offset-2 rounded-md transition duration-150 ease-in-out shadow-md"
                            >
                                Apply Filter
                            </Button>
                        </div>

                        {/* Brand Filter */}
                        <div className="flex-1 w-full sm:min-w-[200px]">
                            <label htmlFor="filter-brand" className="block text-sm font-medium text-gray-700 mb-1">
                                Select Brand:
                            </label>
                            <Select
                                id="filter-brand"
                                defaultValue={selectedBrandFilter}
                                style={{width: '100%'}}
                                onChange={onChangeBrandFilter}
                                options={[
                                    {value: 'all', label: 'All'},
                                    ...brandList.data.map(item => {
                                        return {value: item.id, label: item.name};
                                    })
                                ]}
                                size="large"
                                className="rounded-md shadow-sm border-gray-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="w-full sm:w-auto flex-shrink-0">
                            <Button
                                type="primary"
                                icon={<FilterOutlined/>}
                                onClick={handleBrandFilter}
                                size="large"
                                className="w-full bg-app-red hover:bg-app-red focus:ring-offset-2 rounded-md transition duration-150 ease-in-out shadow-md"
                            >
                                Apply Filter
                            </Button>
                        </div>

                        {/* Type Filter */}
                        <div className="flex-1 w-full sm:min-w-[200px]">
                            <label htmlFor="filter-type" className="block text-sm font-medium text-gray-700 mb-1">
                                Select Type:
                            </label>
                            <Select
                                id="filter-type"
                                defaultValue={selectedTypeFilter}
                                style={{width: '100%'}}
                                onChange={onChangeTypeFilter}
                                options={[
                                    {value: 'all', label: 'All'},
                                    ...productTypeList.data.map(item => {
                                        return {value: item.id, label: item.name};
                                    })
                                ]}
                                size="large"
                                className="rounded-md shadow-sm border-gray-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="w-full sm:w-auto flex-shrink-0">
                            <Button
                                type="primary"
                                icon={<FilterOutlined/>}
                                onClick={handleTypeFilter}
                                size="large"
                                className="w-full bg-app-red hover:bg-app-red focus:ring-offset-2 rounded-md transition duration-150 ease-in-out shadow-md"
                            >
                                Apply Filter
                            </Button>
                        </div>
                    </div>

                </div>


                <div className={'bg-white p-5 rounded-2xl'}>
                    <TlaOpen to={MenuLinks.admin.product.form}>
                        <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
                    </TlaOpen>

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

                        {/*<Column title="Sku" render={(record: any) => <span>{record?.sku ?? '-'}</span>}/>*/}
                        {/*<Column title="Cost Price" render={(record: Product) => (<span>*/}
                        {/*    {currencyFormat(+record.costPrice)}*/}
                        {/*</span>)}/>*/}

                        <Column title="Category" dataIndex={"categoryName"}/>
                        <Column title="Brand" dataIndex={"brandName"}/>
                        <Column title="Type" dataIndex={"stockUnitName"}/>
                        <Column title="Site" render={(record: any) => <span> {record?.site ?? ' - '}  </span>}/>
                        <Column title="Unit Price"
                                render={(record: any) => <span>{currencyFormat(+record.unitPrice)}</span>}/>
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
                                            <TlaDelete title={'product'} column={record.id} callBack={deleteProduct}/>
                                        ),
                                    }
                                ]}/>
                            )
                        )}/>
                    </TlaTableWrapper>
                </div>

            </Spin>
        </>
    )
}

export default Products
