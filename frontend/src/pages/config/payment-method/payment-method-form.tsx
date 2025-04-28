import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {TlaError, TlaSuccess} from "../../../utils/messages.ts";
import {TlaModal} from "../../../common/pop-ups/TlaModal.tsx";
import {useAppDispatch} from "../../../hooks";
import {createUser, updateUser} from "../../../state/users/usersActions.ts";

const PaymentMethodForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm<any>();
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        setLoading(true);
        const defaultPassword = "000000";
        values.passwordChanged = false;
        values.password = defaultPassword;

        setLoading(true);
        ((state?.data && state?.data?.id) ? dispatch(updateUser({ data: values, id: state?.data?.id})) : dispatch(createUser(values)))
            .then(unwrapResult)
            .then(() => {
                TlaSuccess("Successful");
                setLoading(false);
                navigate(-1);
            })
            .catch((obj: any) => {
                TlaError(obj?.message);
                setLoading(false);
            });
    };



    return (
        <TlaModal title={"Payment Method"} loading={loading}>
            <Form requiredMark={false} form={form} onFinish={onFinish} initialValues={{...state?.data}} size={'large'} layout={"vertical"}>
                <br/>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                    <Form.Item className={'col-span-2'}
                               rules={[
                                   {
                                       required: true,
                                       message: "Required"
                                   }
                               ]}
                               name={"name"} label={"Name *"}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        rules={[
                            {
                                type: "email",
                                message: "Not a valid email"
                            }
                        ]}
                        name={"email"} label={"Email"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        rules={[{required: true, message: "Required"}]}
                        name={"phone"} label={"Phone Number"}>
                        <Input/>
                    </Form.Item>


                </div>
                <Button block className={'btn-red'} htmlType={"submit"}>
                    Save
                </Button>
            </Form>
        </TlaModal>
    )
}

export default PaymentMethodForm
