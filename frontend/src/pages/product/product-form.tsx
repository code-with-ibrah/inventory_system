import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {createProduct, getAllProducts, updateProduct} from "../../state/product/productAction.ts";
import {TlaError, TlaSuccess} from "../../utils/messages.ts";
import {TlaModal} from "../../common/pop-ups/TlaModal.tsx";
import DropdownSearch from "../../common/dropdown-search.tsx";
import {getAllCategories} from "../../state/category/categoryAction.ts";
import {commonQuery} from "../../utils/query.ts";
import {Category} from "../../types/category.ts";
import {getAllBrands} from "../../state/brand/brandAction.ts";
import {Brand} from "../../types/brand.ts";
import {getAllStockUnits} from "../../state/stock-unit/stockUnitAction.ts";
import {StockUnit} from "../../types/stock-unit.ts";
import TextArea from "antd/es/input/TextArea";
import {getAllWarehouses} from "../../state/warehouse/warehouseAction.ts";
import {Warehouse} from "../../types/warehouse.ts";
import {getAllSuppliers} from "../../state/supplier/supplierAction.ts";


const ProductForm: React.FC = () => {
    const {state} = useLocation();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const user = useAppSelector(state => state.auth.user);


    const onFinish = (values: any) => {
        values.companyId = user?.companyId;
        values.expirationDate = values.expirationDate || null;
        values.stockAlertLevel = (values.stockAlertLevel) ?? 10;
        values.standardPackageQuantity = 0;

        setLoading(true);
        ((state?.data && state?.data?.id) ? dispatch(updateProduct({
            data: values,
            id: state?.data?.id
        })) : dispatch(createProduct(values)))
            .then(unwrapResult)
            .then(() => {
                TlaSuccess("Successful");

                dispatch(getAllProducts(commonQuery()));

                setLoading(false);
                navigate(-1);
            })
            .catch((obj) => {
                TlaError(obj?.message);
                setLoading(false);
            });
    };

    const disabled = false;

    return (
        <TlaModal title={"Product Form"} loading={loading}>
            <Form form={form} requiredMark={false} onFinish={onFinish} initialValues={{...state?.data}} size={'large'}
                  layout={"vertical"}>

                <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">

                    <Form.Item
                        label={'Name'}
                        name="name"
                        className="col-span-full sm:col-span-1"
                        style={{marginBottom: 0}} rules={[{required: true, message: "Required"}]}>
                        <Input disabled={disabled} size={"large"} placeholder="Milk"/>
                    </Form.Item>


                    <Form.Item
                        rules={[{required: true, message: "Required"}]}
                        name={"categoryId"} label={"Category"}>
                        <DropdownSearch
                            defaultValue={state?.data?.categoryName}
                            object
                            disabled={disabled}
                            searchApi={getAllCategories}
                            extraParams={commonQuery()}
                            placeholder="click to select category"
                            setResult={(category: Category) => {
                                if (category) {
                                    form.setFieldValue('categoryId', category?.id);
                                    return
                                }
                                form.setFieldValue('categoryId', null)
                            }}
                        />
                    </Form.Item>


                    {!state?.data?.id ?  <Form.Item
                        rules={[{required: true, message: "Required"}]}
                        name={"wareHouseId"} label={"Warehouse"}>
                        <DropdownSearch
                            object
                            disabled={disabled}
                            searchApi={getAllWarehouses}
                            extraParams={commonQuery()}
                            placeholder="click to select warehouse"
                            setResult={(warehouse: Warehouse) => {
                                if (warehouse) {
                                    form.setFieldValue('wareHouseId', warehouse?.id);
                                    return;
                                }
                                form.setFieldValue('wareHouseId', null)
                            }}
                        />
                    </Form.Item> : null}


                    <Form.Item
                        rules={[{required: true, message: "Required"}]}
                        name={"brandId"} label={"Brand"}>
                        <DropdownSearch
                            defaultValue={state?.data?.brandName}
                            object
                            disabled={disabled}
                            searchApi={getAllBrands}
                            extraParams={commonQuery()}
                            placeholder="click to select brands"
                            setResult={(brand: Brand) => {
                                if (brand) {
                                    form.setFieldValue('brandId', brand?.id);
                                    return
                                }
                                form.setFieldValue('brandId', null)
                            }}
                        />
                    </Form.Item>


                    <Form.Item
                        rules={[{required: true, message: "Required"}]}
                        name={"supplierId"} label={"Supplier"}>
                        <DropdownSearch
                            defaultValue={state?.data?.supplierId}
                            object
                            disabled={disabled}
                            searchApi={getAllSuppliers}
                            extraParams={commonQuery()}
                            placeholder="click to select supplier"
                            setResult={(supplier: any) => {
                                if (supplier) {
                                    form.setFieldValue('supplierId', supplier?.id);
                                    return
                                }
                                form.setFieldValue('supplierId', null)
                            }}
                        />
                    </Form.Item>


                    {/*<Form.Item*/}
                    {/*    label={'Cost Price'}*/}
                    {/*    name="costPrice"*/}
                    {/*    className="col-span-full sm:col-span-1"*/}
                    {/*    style={{marginBottom: 0}} rules={[{required: true, message: "Required"}]}>*/}
                    {/*    <InputNumber style={{width: "100%"}} disabled={disabled} size={"large"}*/}
                    {/*                 placeholder="GHS 238"/>*/}
                    {/*</Form.Item>*/}



                    {/*{!state?.data?.id ? <Form.Item*/}
                    {/*    label={'Location in warehouse'}*/}
                    {/*    name="locationInWarehouse"*/}
                    {/*    className="col-span-full sm:col-span-1"*/}
                    {/*    style={{marginBottom: 0}} rules={[{required: true, message: "Required"}]}>*/}
                    {/*    <Input disabled={disabled} size={"large"} placeholder="Shelves"/>*/}
                    {/*</Form.Item> : null }*/}


                    <Form.Item
                        label={'Unit Price'}
                        name="unitPrice"
                        className="col-span-full sm:col-span-1"
                        style={{marginBottom: 0}} rules={[{required: true, message: "Required"}]}>
                        <Input disabled={disabled} size={"large"} type="number" placeholder="GHS 99"/>
                    </Form.Item>


                    {/*{!state?.data?.id ? <Form.Item*/}
                    {/*    label={'Stock Quantity'}*/}
                    {/*    name={'quantity'}*/}
                    {/*    className="col-span-full sm:col-span-1"*/}
                    {/*    style={{marginBottom: 0}}*/}
                    {/*    rules={[*/}
                    {/*        {required: true, message: "Required"}*/}
                    {/*    ]}>*/}
                    {/*    <InputNumber min={0} style={{width: "100%"}} disabled={disabled} size={'large'}/>*/}
                    {/*</Form.Item> : null}*/}


                    <Form.Item
                        label={'Stock Alert Level (optional)'}
                        name="stockAlertLevel"
                        tooltip={'Alert you when product quantity get to this level'}
                        className="col-span-full sm:col-span-1"
                        style={{marginBottom: 0}}>
                        <Input type={'number'}
                               title={'Alert you when product quantity get to this level'}
                               min={1} step={1}
                               disabled={disabled}
                               size={"large"} placeholder="10"/>
                    </Form.Item>


                    <Form.Item
                        rules={[{required: true, message: "Required"}]}
                        name={"stockUnitId"} label={"Type "}>
                        <DropdownSearch
                            defaultValue={state?.data?.stockUnitName}
                            object
                            disabled={disabled}
                            searchApi={getAllStockUnits}
                            extraParams={commonQuery()}
                            placeholder="click to select stock unit"
                            setResult={(stockUnit: StockUnit) => {
                                if (stockUnit) {
                                    form.setFieldValue('stockUnitId', stockUnit?.id);
                                    return
                                }
                                form.setFieldValue('stockUnitId', null)
                            }}
                        />
                    </Form.Item>

                    {/*<Form.Item*/}
                    {/*    label={'Available Quantity'}*/}
                    {/*    name={'standardPackageQuantity'}*/}
                    {/*    className="col-span-full sm:col-span-1"*/}
                    {/*    style={{marginBottom: 0}}*/}
                    {/*    rules={[*/}
                    {/*        {required: true, message: "Required"}*/}
                    {/*    ]}>*/}
                    {/*    <InputNumber min={0} style={{width: "100%"}} placeholder={'292'} disabled={disabled} size={'large'}/>*/}
                    {/*</Form.Item>*/}

                    <Form.Item
                        label={'Site'}
                        name="site"
                        style={{marginBottom: 0}}
                        rules={[
                            {required: true, message: "Required"}
                        ]}>
                        <Input disabled={disabled} placeholder={'China'} size={"large"} type="text"/>
                    </Form.Item>

                    <Form.Item
                        label={'Description (optional)'}
                        name="longDescription"
                        className="col-span-full sm:col-span-3">
                        <TextArea disabled={disabled}
                                  placeholder="Detailed Product description here"/>
                    </Form.Item>
                </div>


                <div className={'w-fit ml-auto mt-2 gap-2 flex'}>
                    <Button className={'bg-red-600 text-white'} onClick={() => navigate(-1)}>
                        Cancel
                    </Button>

                    <Button className={'btn-red'} htmlType={"submit"}>
                        Save
                    </Button>
                </div>


            </Form>
        </TlaModal>
    )
};

export default ProductForm