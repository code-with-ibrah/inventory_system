import React, {useState} from "react";
import {Button, Form, Input, Select} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {TlaError, TlaSuccess} from "../../../utils/messages.ts";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import { TlaModal } from "../../../common/pop-ups/TlaModal.tsx";
import {
    createStockAdjustmentItem,
    updateStockAdjustmentItem
} from "../../../state/stock-adjustment-item/stockAdjustmentItemAction.ts";
import DropdownSearch from "../../../common/dropdown-search.tsx";
import {commonQuery} from "../../../utils/query.ts";
import {Product} from "../../../types/product.ts";
import {getAllProducts} from "../../../state/product/productAction.ts";


const StockAdjustmentItemForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm<any>();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);
    const adjustmentItem = useAppSelector(state => state.stockAdjustment.stockAdjustmentItem);

    const onFinish = (values: any) => {
        setLoading(true);
        values.companyId = user?.companyId;
        values.adjustmentId = adjustmentItem?.id;
        values.adjustedQuantity = (values.status != "addition")
            ? (+values.adjustedQuantity) * -1
            : (+values.adjustedQuantity);


        ((state?.data && state?.data?.id) ?
            dispatch(updateStockAdjustmentItem({ data: values, id: state?.data?.id})) :
            dispatch(createStockAdjustmentItem(values)))
            .then(unwrapResult)
            .then(() => {
                TlaSuccess("Successful")
                setLoading(true)
                navigate(-1)
            })
            .catch((err: any) => {
                TlaError(err?.message ?? "")
                setLoading(false)
            })
    }

    return (
        <TlaModal title={"Stock Adjustment Items"} loading={loading}>
            <Form requiredMark={false} form={form} onFinish={onFinish} initialValues={{...state?.data}} size={'large'} layout={"vertical"}>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>

                    <Form.Item
                        rules={[{required: true, message: "Required"}]}
                        className={'col-span-2'}
                        name={"productId"} label={"Product"}>
                        <DropdownSearch
                            defaultValue={state?.data?.product}
                            object
                            searchApi={getAllProducts}
                            extraParams={commonQuery()}
                            placeholder="click to select product"
                            setResult={(product: Product) => {
                                if (product) {
                                    form.setFieldValue('productId', product?.id);
                                    return
                                }
                                form.setFieldValue('productId', null);
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name={"adjustedQuantity"} label={"Adjusted Quantity *"}
                        rules={[{ required: true, message: "Required" }]}>
                        <Input type="number" min={'0'}/>
                    </Form.Item>

                    <Form.Item
                        name={'status'}
                        label={'Status'}
                        rules={[{required: true, message: "Required"}]}>
                        <Select defaultValue={null}>
                            <Select.Option key={0} value={null}>Choose One</Select.Option>
                            <Select.Option key={1} value={'addition'}>Add to Quantity</Select.Option>
                            <Select.Option key={2} value={'subtraction'}>Subtract From Quantity</Select.Option>
                        </Select>
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

export default StockAdjustmentItemForm
