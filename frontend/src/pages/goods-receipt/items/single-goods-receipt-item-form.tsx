import React, {useState} from "react";
import {Button, Form, Input, Select} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {TlaError, TlaSuccess} from "../../../utils/messages.ts";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import { TlaModal } from "../../../common/pop-ups/TlaModal.tsx";
import { updateStockAdjustmentItem } from "../../../state/stock-adjustment-item/stockAdjustmentItemAction.ts";
import InputFake from "../../../common/input-fake.tsx";
import { currencyFormat } from "../../../utils";



const SingleGoodsReceiptItemForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm<any>();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);
    const adjustmentItem = useAppSelector(state => state.stockAdjustment.stockAdjustmentItem);

    const onFinish = (values: any) => {
        setLoading(true);
        values.companyId = user?.companyId;
        values.adjustedQuantity = Math.abs(+values.adjustedQuantity);
        values.adjustedQuantity = (values.status == "addition") ? +values.adjustedQuantity : (values.adjustedQuantity * -1);
        values.adjustmentId = adjustmentItem.id;
        values.companyId = user?.companyId;
        values.productId = state?.data?.productId;

        dispatch(updateStockAdjustmentItem({ data: values, id: state?.data?.id})) 
        .then(unwrapResult)
        .then(() => {
            TlaSuccess("Successful");
            setLoading(false);
            navigate(-1)
        })
        .catch((err: any) => {
            TlaError(err?.message ?? "");
            setLoading(false)
        })
    };

    return (
        <TlaModal title={"Goods Receipt Item"} loading={loading}>
            <Form requiredMark={false} form={form} onFinish={onFinish} initialValues={{...state?.data}} size={'large'} layout={"vertical"}>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>

                    <Form.Item label={'Product'}>
                        <InputFake value={state?.data?.product}/> 
                    </Form.Item>

                    <Form.Item
                        name={"adjustedQuantity"} label={"Adjusted Quantity *"}
                        rules={[{ required: true, message: "Required" }]}>
                        <Input type="number" min={'0'}/>
                    </Form.Item>

                    <Form.Item label={'Previous Adjustment Cost'}>
                        <InputFake value={currencyFormat(+state?.data?.associatedCost)}/> 
                    </Form.Item>

                    <Form.Item
                        name={'status'}
                        label={'Status'}
                        rules={[{required: true, message: "Required"}]}>
                        <Select defaultValue={null}>
                            <Select.Option key={0} value={null}>Choose One</Select.Option>
                            <Select.Option key={1} value={'addition'}>Addition</Select.Option>
                            <Select.Option key={2} value={'subtraction'}>Subtract</Select.Option>
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

export default SingleGoodsReceiptItemForm;
