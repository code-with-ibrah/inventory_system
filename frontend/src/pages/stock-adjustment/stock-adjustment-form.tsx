import React, {useState} from "react";
import {Button, Form, Input, Select} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {TlaError, TlaSuccess} from "../../utils/messages.ts";
import {TlaModal} from "../../common/pop-ups/TlaModal.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {createStockAdjustment, updateStockAdjustment} from "../../state/stock-adjustment/stockAdjustmentAction.ts";


const StockAdjustmentForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm<any>();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);

    const onFinish = (values: any) => {
        setLoading(true);
        values.companyId = user?.companyId;
        values.userId = user?.id;

        ((state?.data && state?.data?.id) ?
            dispatch(updateStockAdjustment({ data: values, id: state?.data?.id})) :
            dispatch(createStockAdjustment(values)))
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
        <TlaModal title={"Stock Adjustment"} loading={loading}>
            <Form requiredMark={false} form={form} onFinish={onFinish} initialValues={{...state?.data}} size={'large'} layout={"vertical"}>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>

                    <Form.Item
                        name={"date"} label={"Date *"}
                        rules={[{ required: true, message: "Required" }]}>
                        <Input type={'date'}/>
                    </Form.Item>

                    <Form.Item
                        name={'reasonCode'}
                        label={'Reason Code'}
                        rules={[{required: true, message: "Required"}]}>
                        <Select defaultValue={null}>
                            <Select.Option key={0} value={null}>Choose One</Select.Option>
                            <Select.Option key={1} value={'Receiving'}>Receiving</Select.Option>
                            <Select.Option key={2} value={'Damage'}>Damage</Select.Option>
                            <Select.Option key={3} value={'adjustment'}>Adjustment</Select.Option>
                            <Select.Option key={4} value={'others'}>Others</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        className={'col-span-2'}
                        name={"reason"} label={"Reason (optional)"}>
                        <Input.TextArea/>
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

export default StockAdjustmentForm
