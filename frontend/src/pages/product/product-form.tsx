import React, {useState} from "react";
import {Button, Form, Input, InputNumber} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {createProduct, updateProduct} from "../../state/product/productAction.ts";
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
import {getAllSuppliers} from "../../state/supplier/supplierAction.ts";
import {Supplier} from "../../types/supplier.ts";
import {getAllWarehouses} from "../../state/warehouse/warehouseAction.ts";
import {Warehouse} from "../../types/warehouse.ts";


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

        setLoading(true);
        ((state?.data && state?.data?.id) ? dispatch(updateProduct({
            data: values,
            id: state?.data?.id
        })) : dispatch(createProduct(values)))
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
                        <Input disabled={disabled} size={"large"} placeholder="GHS 99"/>
                    </Form.Item>

                    <Form.Item
                        label={'SKU'}
                        name="sku"
                        className="col-span-full sm:col-span-1"
                        style={{marginBottom: 0}} rules={[{required: true, message: "Required"}]}>
                        <Input disabled={disabled} size={"large"} placeholder="SKU"/>
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

                    <Form.Item
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
                    </Form.Item>

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
                        name={"supplierId"} label={"Supplier (optional)"}>
                        <DropdownSearch
                            defaultValue={state?.data?.supplierName}
                            object
                            disabled={disabled}
                            searchApi={getAllSuppliers}
                            extraParams={commonQuery()}
                            placeholder="click to select suppliers"
                            setResult={(supplier: Supplier) => {
                                if (supplier) {
                                    form.setFieldValue('supplierId', supplier?.id);
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
                        style={{marginBottom: 0}} rules={[{required: true, message: "Required"}]}>
                        <InputNumber style={{width: "100%"}} disabled={disabled} size={"large"}
                                     placeholder="GHS 238"/>
                    </Form.Item>

                    <Form.Item
                        label={'Quantity'}
                        name="quantity"
                        className="col-span-full sm:col-span-1"
                        style={{marginBottom: 0}} rules={[{required: true, message: "Required"}]}>
                        <InputNumber style={{width: "100%"}} disabled={disabled} size={"large"} placeholder="900"/>
                    </Form.Item>

                    <Form.Item
                        label={'Location in Warehouse'}
                        name="locationInWarehouse"
                        className="col-span-full sm:col-span-1"
                        style={{marginBottom: 0}} rules={[{required: true, message: "Required"}]}>
                        <Input disabled={disabled} size={"large"} placeholder="Front"/>
                    </Form.Item>

                    <Form.Item
                        label={'Stock Alert Level'}
                        name="stockAlertLevel"
                        className="col-span-full sm:col-span-1"
                        style={{marginBottom: 0}} rules={[{required: true, message: "Required"}]}>
                        <InputNumber style={{width: "100%"}} disabled={disabled} size={"large"} placeholder="14"/>
                    </Form.Item>


                    <Form.Item
                        label={'Unit Price'}
                        name="unitPrice"
                        className="col-span-full sm:col-span-1"
                        style={{marginBottom: 0}} rules={[{required: true, message: "Required"}]}>
                        <Input disabled={disabled} size={"large"} type="number" placeholder="GHS 99"/>
                    </Form.Item>

                    <Form.Item
                        rules={[{required: true, message: "Required"}]}
                        name={"stockUnitId"} label={"Stock Unit "}>
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

                    <Form.Item
                        label={'Standard Package Quantity'}
                        name={'standardPackageQuantity'}
                        className="col-span-full sm:col-span-1"
                        style={{marginBottom: 0}}
                        rules={[
                            {required: true, message: "Required"}
                        ]}>
                        <InputNumber min={0} style={{width: "100%"}} disabled={disabled} size={'large'}/>
                    </Form.Item>

                    <Form.Item
                        label={'Expiration Date (optional)'}
                        name="expirationDate"
                        className="col-span-full sm:col-span-1"
                        style={{marginBottom: 0}}>
                        <Input disabled={disabled} size={"large"} type="date"/>
                    </Form.Item>

                    <Form.Item
                        label={'Serial Number (optional)'}
                        name="serialNumber"
                        className="col-span-full sm:col-span-1">
                        <Input disabled={disabled} size={"large"}/>
                    </Form.Item>

                    <Form.Item
                        label={'Batch Number (optional)'}
                        name="batchNumber"
                        className="col-span-full sm:col-span-1">
                        <Input disabled={disabled} size={"large"}/>
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