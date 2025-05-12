import React, {useState} from "react";
import {Button, Form, Select} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks";
import {TlaError, TlaSuccess} from "../../utils/messages.ts";
import {TlaModal} from "../../common/pop-ups/TlaModal.tsx";
import {updateOrderStatus} from "../../state/orders/receiptAction.ts";
import InputFake from "../../common/input-fake.tsx";
import {orderStatus} from "../../utils/order-status.ts";
import {setOrderItem} from "../../state/orders/orderSlice.ts";


const UpdateOrdersStatusForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm<any>();
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        if(values.status == orderStatus.delivered)
        {
            if(!confirm("Are you sure ? This action cannot be reversed")){
                return;
            }
        }

        setLoading(true);
        dispatch(updateOrderStatus({ data: values, id: state?.data?.id}))
            .then(unwrapResult)
            .then((res: any) => {

                dispatch(setOrderItem(res))

                TlaSuccess("Successful");
                setLoading(true);
                navigate(-1);
            })
            .catch((err) => {
                TlaError(err?.message ?? "");
                setLoading(false);
            })
    }

    return (
        <TlaModal title={"Order Status"} loading={loading}>
            <Form requiredMark={false} form={form} onFinish={onFinish} initialValues={{...state?.data}} size={'large'} layout={"vertical"}>
               <br/>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                    <Form.Item label={'Order Number'}>
                        <InputFake value={state?.data?.orderNumber}/>
                    </Form.Item>

                    <Form.Item
                        rules={[{required: true, message: "Required"}]}
                        name={"status"} label={"Status *"}>
                        <Select>
                            <Select.Option key={1} value={null}>Choose one</Select.Option>
                            <Select.Option key={2} value={orderStatus.preparing}>Preparing</Select.Option>
                            <Select.Option key={3} value={orderStatus.delivered}>Delivered</Select.Option>
                            <Select.Option key={4} value={orderStatus.cancelled}>Cancelled</Select.Option>
                        </Select>
                    </Form.Item>

                </div>
                <Button className={'btn-red flex ml-auto'} htmlType={"submit"}>
                    Save
                </Button>
            </Form>
        </TlaModal>
    )
}

export default UpdateOrdersStatusForm;
