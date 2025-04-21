import React, {useState} from "react";
import {Button, Form} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {TlaModal} from "../../common/pop-ups/TlaModal.tsx";
import DropdownSearch from "../../common/dropdown-search.tsx";
import {commonQuery} from "../../utils/query.ts";
import {Supplier} from "../../types/supplier.ts";
import {createProductSupplier} from "../../state/product-supplier/productSupplierAction.ts";
import { unwrapResult } from "@reduxjs/toolkit";
import {TlaError, TlaSuccess} from "../../utils/messages.ts";
import {getAllSuppliers} from "../../state/supplier/supplierAction.ts";
import {Product} from "../../types/product.ts";

const ProductSupplierForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm<any>();
    const navigate = useNavigate();
    const product: Product = useAppSelector(state => state.product.productItem);

    const onFinish = (values: any) => {
        setLoading(true);
        values.productId = product?.id;
        dispatch(createProductSupplier(values))
            .then(unwrapResult)
            .then(() => {
                TlaSuccess("Successful, Refresh for update");
                setLoading(false);
                navigate(-1);
            })
            .catch((err) => {
                TlaError(err?.message ?? "");
                setLoading(false);
            })
    }

    return (
        <TlaModal title={"Product Supplier Form"} loading={loading}>
            <Form requiredMark={false} form={form} onFinish={onFinish} initialValues={{...state?.data}} size={'large'} layout={"vertical"}>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                    <Form.Item className={'col-span-2'} name={"supplierId"} label={"Supplier"}>
                        <DropdownSearch
                            object
                            searchApi={getAllSuppliers}
                            placeholder="click to select supplier"
                            extraParams={commonQuery()}
                            setResult={(supplier: Supplier) => {
                                if (supplier) {
                                    form.setFieldValue('supplierId', supplier?.id);
                                    return
                                }
                                form.setFieldValue('supplierId', null)
                            }}/>
                    </Form.Item>

                </div>
                <div>
                    <Button className={'btn-red block ml-auto'} htmlType={"submit"}>
                        Save
                    </Button>
                </div>
            </Form>
        </TlaModal>
    )
}

export default ProductSupplierForm
