import React, {useEffect, useState} from "react";
import Column from "antd/es/table/Column";
import {Button, Select, Spin} from "antd";
import {FiPlusCircle} from "react-icons/fi";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {MenuLinks} from "../../utils/menu-links.ts";
import SearchInput from "../../common/search-input.tsx";
import TlaTableWrapper from "../../common/tla-table-wrapper.tsx";
import {commonQuery} from "../../utils/query.ts";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";
import {Product} from "../../types/product.ts";
import {useNavigate} from "react-router-dom";
import {setStock} from "../../state/stock/stockSlice.ts";
import {getAllStocks, getAllStocksByFilter, getAllStockStatusByFilter} from "../../state/stock/stockAction.ts";
import {setProduct} from "../../state/product/productSlice.ts";
import {FilterOutlined} from "@ant-design/icons";
import {getAllStockUnits} from "../../state/stock-unit/stockUnitAction.ts";
import {unwrapResult} from "@reduxjs/toolkit";
import {TlaErrorTag, TlaSuccessTag} from "../../common/tla-tag.tsx";
import {currencyFormat} from "../../utils";



const Stocks: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.stock.stock);
    const dispatch = useAppDispatch();
    const stockUnit = useAppSelector(state => state.stockUnit.stockUnit);
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState("all");
    const [stockStatusFilter, setStockStatusFilter] = useState("all");
    const [loading, setLoading] = useState(false);


    const goToDetails = (record: any) => {
        dispatch(setStock(record));
        dispatch(setProduct(record?.product));
        navigate(MenuLinks.admin.stock.details);
    }


    useEffect(() => {
        dispatch(getAllStockUnits(commonQuery()));
    }, []);





    const handleStockStatusChange = (value: any) => {
        setStockStatusFilter(value);
    };


    const handleApplyStockStatusFilter = () => {
        setLoading(true);

        if(stockStatusFilter == "all"){
            dispatch(getAllStocks(commonQuery()))
                .then(unwrapResult)
                .then(() => {
                    setLoading(false);
                });
        }
        else
        {
            dispatch(getAllStockStatusByFilter(`filter=${stockStatusFilter}&type=${selectedType}`))
                .then(unwrapResult)
                .then(() => {
                    setLoading(false);
                });
        }
    };



    const handleChange = (value: any) => {
        setSelectedType(value);
    };

    const handleFilter = () => {
        setLoading(true);


        if(selectedType == "all"){
            dispatch(getAllStocks(commonQuery()))
                .then(unwrapResult)
                .then(() => {
                    setLoading(false);
                });
        }
        else
        {
            dispatch(getAllStocksByFilter(`filter=${selectedType}`))
                .then(unwrapResult)
                .then(() => {
                    setLoading(false);
                });
        }


    };



    return (

        <div>
            <Spin spinning={loading} tip={'Applying Filter...'}>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Apply Filter</h3>

                <div className="p-4 bg-white rounded-2xl shadow-lg max-w-full mx-auto mb-8 font-inter">

                    {/* This outer div arranges the two main filter sections in a row on sm screens and up */}
                    <div className="flex flex-col sm:flex-row items-start justify-start sm:space-x-8 space-y-4 sm:space-y-0">

                        {/* First Filter Group: Select Type */}
                        <div className="flex-1 w-full sm:w-1/2">
                            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <div className="flex-1 w-full">
                                    <label htmlFor="filter-type"
                                           className="block text-sm font-medium text-gray-700 mb-1">
                                        Select Type:
                                    </label>
                                    <Select
                                        id="filter-type"
                                        defaultValue={selectedType}
                                        style={{width: '100%'}}
                                        onChange={handleChange}
                                        options={[
                                            {value: 'all', label: 'All'},
                                            ...stockUnit.data.map(item => {
                                                return {value: item.id, label: item.name};
                                            })
                                        ]}
                                        size="large"
                                        className="rounded-md shadow-sm border-gray-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </div>

                                <div className="w-full sm:w-auto" style={{marginTop: 24}}>
                                    <Button
                                        type="primary"
                                        icon={<FilterOutlined/>}
                                        onClick={handleFilter}
                                        size="large"
                                        className="w-full bg-app-red hover:bg-app-red focus:ring-offset-2 rounded-md transition duration-150 ease-in-out shadow-md"
                                    >
                                        Apply Filter
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Second Filter Group: Stocks Status */}
                        <div className="flex-1 w-full sm:w-1/2">
                            {/* This inner div arranges the Select and Button in a row on sm screens and up */}
                            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <div className="flex-1 w-full">
                                    <label htmlFor="stocks-status"
                                           className="block text-sm font-medium text-gray-700 mb-1">
                                        Stocks Status:
                                    </label>
                                    <Select
                                        id="stocks-status"
                                        defaultValue="all"
                                        style={{width: '100%'}}
                                        onChange={handleStockStatusChange}
                                        options={[
                                            {value: 'all', label: 'All'},
                                            {value: 'in', label: 'In Stock'},
                                            {value: 'low', label: 'Low Stock'},
                                            {value: 'out', label: 'Out of Stock'},
                                        ]}
                                        size="large"
                                        className="rounded-md shadow-sm border-gray-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </div>

                                <div className="w-full sm:w-auto" style={{marginTop: 24}}>
                                    <Button
                                        type="primary"
                                        icon={<FilterOutlined/>}
                                        onClick={handleApplyStockStatusFilter}
                                        size="large"
                                        className="w-full bg-app-red hover:bg-app-red focus:ring-offset-2 rounded-md transition duration-150 ease-in-out shadow-md"
                                    >
                                        Apply Status Filter
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={'bg-white rounded-2xl p-5'}>
                    <TlaOpen to={MenuLinks.admin.stock.form}>
                        <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
                    </TlaOpen>

                    <div className={'flex-1 my-5'}>
                        <SearchInput columns={["productName"]} getData={getAllStocks}/>
                    </div>

                    <TlaTableWrapper getData={getAllStocks} data={data} filter={commonQuery()} meta={meta}>
                        <Column
                            title="Name"
                            render={(record: Product) => (
                                <span className={'cursor-pointer underline'} onClick={() => goToDetails(record)}>
                            {
                                // @ts-ignore
                                record?.product?.name
                            }
                        </span>
                            )}/>
                        <Column title="Quantity" dataIndex="quantityOnHand"/>
                        <Column title="stock Alert Level" dataIndex="stockAlertLevel"/>
                        <Column title="Type" render={(record: any) => <span>{record?.product?.stockUnitName}</span>}/>
                        <Column title="Unit Price"
                                render={(record: any) => <span>{currencyFormat(+record?.product?.unitPrice)}</span>}/>
                        <Column
                            title={'Status'}
                            render={((record) => (
                                    <div className={'flex items-center gap-2'}>
                                        {
                                            // Condition 1: Check if quantity is exactly 0 (Out of Stock)
                                            (+record?.quantityOnHand === 0) ?
                                                <TlaErrorTag text={'Out of Stock'}/> :
                                                // Condition 2: Check if quantity is less than or equal to stock alert level
                                                (+record?.quantityOnHand <= +record?.stockAlertLevel) ?
                                                    <TlaErrorTag text={'Low Stock'}/> :
                                                    // Condition 3: Otherwise, it's available
                                                    <TlaSuccessTag text={'In Stock'}/>
                                        }
                                    </div>
                                )
                            )}/>


                        {/*<Column title="Stock Price" render={(record: any) => <span>{currencyFormat(+record?.product?.costPrice)}</span>}/>*/}

                        {/*<Column*/}
                        {/*    title={'Action'}*/}
                        {/*    render={((record) => (*/}
                        {/*            <div className={'flex items-center gap-2'}>*/}
                        {/*                <TlaEdit data={record} link={MenuLinks.admin.stock.form}/>*/}
                        {/*            </div>*/}
                        {/*        )*/}
                        {/*    )}/>*/}
                    </TlaTableWrapper>
                </div>
            </Spin>


        </div>

    )
}

export default Stocks;
