import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {createCustomer, updateCustomer} from "../../state/customer/customerAction.ts";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {TlaError, TlaSuccess} from "../../utils/messages.ts";
import {TlaModal} from "../../common/pop-ups/TlaModal.tsx";


const CustomerForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm<any>();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);

    const onFinish = (values: any) => {
        setLoading(true);
        values.companyId = user?.companyId;
        ((state?.data && state?.data?.id) ? dispatch(updateCustomer({ data: values, id: state?.data?.id}))
            : dispatch(createCustomer(values)))
            .then(unwrapResult)
            .then(() => {
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
        <TlaModal title={"Customer"} loading={loading}>
            <Form requiredMark={false} form={form} onFinish={onFinish} initialValues={{...state?.data}} size={'large'} layout={"vertical"}>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                    <Form.Item
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
                                       required: true,
                                       message: "Required"
                                   }
                               ]}
                               name={"companyName"} label={"Company *"}>
                        <Input placeholder={"Joabeng Institutes"}/>
                    </Form.Item>


                    <Form.Item
                               rules={[
                                   {
                                       required: true,
                                       message: "Required"
                                   }
                               ]}
                               name={"location"} label={"Location *"}>
                        <Input placeholder={"Accra"}/>
                    </Form.Item>


                    <Form.Item
                               rules={[
                                   {
                                       required: true,
                                       message: "Required"
                                   }
                               ]}
                               name={"phone"} label={"Phone *"}>
                        <Input placeholder={"0201298443"}/>
                    </Form.Item>

                    <Form.Item
                               rules={[
                                   {
                                       required: true,
                                       message: "Required"
                                   }
                               ]}
                               name={"registrationDate"} label={"Date Joined *"}>
                        <Input type="date"/>
                    </Form.Item>

                    <Form.Item
                               name={"address"} label={"Address"}>
                        <Input.TextArea placeholder={'WS-743-355-18'}/>
                    </Form.Item>


                </div>
                <Button className={'btn-red flex ml-auto'} htmlType={"submit"}>
                    Save
                </Button>
            </Form>
        </TlaModal>
    )
}

export default CustomerForm
