import React, {useState} from "react";
import {useAppDispatch} from "../../../hooks";
import {TlaModal} from "../../../common/pop-ups/TlaModal.tsx";
import {Button, Form, Input} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {TlaError} from "../../../utils/messages.ts";
import {getUssdTransactionStatus} from "../../../state/payment/paymentAction.ts";



const UssdVerificationForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        const clientReference = values.clientReference;

        setLoading(true);
        dispatch(getUssdTransactionStatus(clientReference))
            .then(unwrapResult)
            .then(() => {
                setLoading(false);
                navigate(-1);
            })
            .catch((obj) => {
                setLoading(false);
                TlaError(obj?.message);
            });
    }

    return (
        <TlaModal title={"USSD Transaction Verification"} loading={loading}> <br/>
            <Form form={form} requiredMark={false} onFinish={onFinish} initialValues={{...state?.data}} size={'large'}
                  layout={"vertical"}>
                <div className={'grid grid-cols-1 gap-2'}>

                    <Form.Item className={'col-span-2'}
                               rules={[
                                   {
                                       required: true,
                                       message: "Required"
                                   }
                               ]}
                               name={"clientReference"} label={"Transaction Reference *"}>
                        <Input/>
                    </Form.Item>

                </div>

                <div className={'w-fit ml-auto'}>
                    <Button className={'btn-red'} htmlType={"submit"}>
                        Verify Transaction
                    </Button>
                </div>
            </Form>
        </TlaModal>
    )
}

export default UssdVerificationForm