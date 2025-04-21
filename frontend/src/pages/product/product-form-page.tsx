 import React, {useState} from "react";
import {Button, Form, Input, InputNumber, Spin} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
 import {useAppDispatch, useAppSelector} from "../../hooks";
 import {createProduct, updateProduct} from "../../state/product/productAction.ts";
 import {TlaError, TlaSuccess} from "../../utils/messages.ts";
 import TextArea from "antd/es/input/TextArea";
 import DropdownSearch from "../../common/dropdown-search.tsx";
 import {getAllCategories} from "../../state/category/categoryAction.ts";
 import {Category} from "../../types/category.ts";
 import {getAllBrands} from "../../state/brand/brandAction.ts";
 import {Brand} from "../../types/brand.ts";
 import {getAllStockUnits} from "../../state/stock-unit/stockUnitAction.ts";
 import {StockUnit} from "../../types/stock-unit.ts";
 import {commonQuery} from "../../utils/query.ts";
 import {getAllSuppliers} from "../../state/supplier/supplierAction.ts";





const ProductFormPage: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [searchParams, _] = useSearchParams();
    const inEditingMode = searchParams.get("edit");
    const [disabled, setDisabled] = useState<any>(inEditingMode);
    const user = useAppSelector(state => state.auth.user);
    let selectedProduct = {};


    if(inEditingMode){
        selectedProduct = useAppSelector(state => state.product.productItem);
    }


    const onFinish = (values: any) => {
        values.companyId = user?.companyId;
        setLoading(true);
        ((state?.data && state?.data?.id) ?
            dispatch(updateProduct({ data: values, id: state?.data?.id})) :
            dispatch(createProduct(values)))
            .then(unwrapResult)
            .then(() => {
                TlaSuccess("Successful");
                setLoading(false);
                navigate(-1);
            })
            .catch((obj) => {
                TlaError(obj?.message);
                setLoading(false);
            });
    };

    return (
        <>
            <section className="p-5 rounded-b-2xl">
                <div className="mx-auto max-w-7xl">

                    {/*<GoBack className={'mb-5 bg-red'}/>*/}
                    <h3 className={'text-xl text-app-red mb-3'}>{ inEditingMode ? 'Edit Product Information' : 'Add a new product'}</h3>
                    {inEditingMode && <div className={'flex justify-end'}>
                        {
                            disabled &&
                            <Button size={'large'} type={'text'} onClick={() => setDisabled((prev: any) => !prev)}
                                    htmlType={'button'}>Edit</Button>
                        }
                        {
                            !disabled &&
                            <div className={'flex items-center gap-3'}>
                                <Button size={'large'}
                                        onClick={() => setDisabled((prev: any) => !prev)}
                                        type={'default'} htmlType="submit">Cancel</Button>
                                <Button onClick={() => form.submit()} size={'large'} className={'btn-red'}
                                        htmlType="submit">Save</Button>
                            </div>
                        }
                    </div>}


                    <Spin spinning={loading} tip={'Please wait...'}>
                        <Form layout="vertical" onFinish={onFinish} form={form} initialValues={{ ...selectedProduct}}
                              className={'bg-white rounded-xl border p-5 my-3'}>
                            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 sm:gap-6">
                                <Form.Item
                                    label={'Product Name'}
                                    name="name"
                                    className="col-span-full sm:col-span-1"
                                    style={{marginBottom: 0}}>
                                    <Input disabled={disabled} size={"large"} placeholder="Type product name"/>
                                </Form.Item>

                                <Form.Item
                                    label={'SKU'}
                                    name="sku"
                                    className="col-span-full sm:col-span-1"
                                style={{marginBottom: 0}}>
                                <Input disabled={disabled} size={"large"} placeholder="SKU"/>
                            </Form.Item>

                            <Form.Item
                                style={{marginBottom: "-50px !important"}}
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

                            <Form.Item
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
                                name={"supplierId"} label={"Supplier"}>
                                <DropdownSearch
                                    defaultValue={state?.data?.supplierName}
                                    object
                                    disabled={disabled}
                                    searchApi={getAllSuppliers}
                                    extraParams={commonQuery()}
                                    placeholder="click to select suppliers"
                                    setResult={(brand: Brand) => {
                                        if (brand) {
                                            form.setFieldValue('supplierId', brand?.id);
                                            return
                                        }
                                        form.setFieldValue('supplierId', null)
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                    label={'Cost Price'}
                                    name="costPrice"
                                    className="col-span-full sm:col-span-1"
                                style={{marginBottom: 0}}>
                                <InputNumber style={{ width: "100%"}} disabled={disabled} size={"large"} placeholder="GHS 238"/>
                            </Form.Item>


                                <Form.Item
                                    label={'Quantity'}
                                    name="quantity"
                                    className="col-span-full sm:col-span-1"
                                    style={{marginBottom: 0}}>
                                    <InputNumber style={{ width: "100%"}} disabled={disabled} size={"large"} placeholder="900"/>
                                </Form.Item>

                                <Form.Item
                                    label={'Stock Alert Level'}
                                    name="stockAlertLevel"
                                    className="col-span-full sm:col-span-1"
                                    style={{marginBottom: 0}}>
                                    <InputNumber style={{ width: "100%"}} disabled={disabled} size={"large"} placeholder="14"/>
                                </Form.Item>


                            <Form.Item
                                label={'Unit Price'}
                                name="unitPrice"
                                className="col-span-full sm:col-span-1"
                                style={{marginBottom: 0}}>
                                <Input disabled={disabled} size={"large"} type="number" placeholder="GHS 99"/>
                            </Form.Item>

                            <Form.Item name={"stockUnitId"} label={"Stock Unit "}>
                                <DropdownSearch
                                    defaultValue={state?.data?.stockUnit}
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

                                <Form.Item
                                    label={'Standard Package Quantity'}
                                    name="standardPackageQuantity"
                                    className="col-span-full sm:col-span-1"
                                    style={{marginBottom: 0}}>
                                    <InputNumber style={{ width: "100%"}} disabled={disabled} size={'large'}/>
                                </Form.Item>

                                <Form.Item
                                    label={'Expiration Date'}
                                    name="expirationDate"
                                    className="col-span-full sm:col-span-1"
                                    style={{marginBottom: 0}}>
                                    <Input disabled={disabled} size={"large"} type="date"/>
                                </Form.Item>

                                <Form.Item
                                    label={'Tax Rate'}
                                    name="taxRate"
                                    className="col-span-full sm:col-span-1"
                                    style={{marginBottom: 0}}>
                                    <InputNumber disabled={disabled} style={{ width: "100%"}} size={"large"}/>
                                </Form.Item>

                                <Form.Item
                                    label={'Serial Number'}
                                    name="serialNumber"
                                    className="col-span-full sm:col-span-1"
                                    style={{marginBottom: 0}}>
                                    <Input disabled={disabled} size={"large"}/>
                                </Form.Item>

                                <Form.Item
                                    label={'Batch Number'}
                                    name="batchNumber"
                                    className="col-span-full sm:col-span-1"
                                    style={{marginBottom: 0}}>
                                    <Input disabled={disabled} size={"large"}/>
                                </Form.Item>

                                <Form.Item
                                    label={'Long Description'}
                                    name="longDescription"
                                    className="col-span-full sm:col-span-3"
                                    style={{marginBottom: 0}}>
                                    <TextArea disabled={disabled}
                                              size={"large"} rows={8}
                                              placeholder="Detailed Product description here"/>
                                </Form.Item>
                            </div>


                        {!inEditingMode && <div className={'w-fit ml-auto my-2'}>
                            <Button className={'btn-red px-8 py-5'} htmlType={"submit"}>
                                Save
                            </Button>
                        </div>}
                        </Form>
                    </Spin>

                </div>
            </section>

        </>
    )
};

 export default ProductFormPage