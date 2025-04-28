import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {createRole, updateRole} from "../../../state/role/rolesAction.ts";
import {TlaError, TlaSuccess} from "../../../utils/messages.ts";
import { TlaModal } from "../../../common/pop-ups/TlaModal.tsx";
import {useAppDispatch} from "../../../hooks";

const RoleForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm<any>();
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        setLoading(true);
        values.isActive = 1;
        ((state?.data && state?.data?.id) ?
            dispatch(updateRole({ data: values, id: state?.data?.id})) :
            dispatch(createRole(values)))
            .then(unwrapResult)
            .then(() => {
                TlaSuccess("Successful")
                setLoading(true)
                navigate(-1)
            })
            .catch((err: any) => {
                TlaError(err?.message ?? "")
                setLoading(true)
            })
    }



    return (
        <TlaModal title={"Role Form"} loading={loading}>
            <Form requiredMark={false} form={form} onFinish={onFinish} initialValues={{...state?.data}} size={'large'} layout={"vertical"}>
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
                </div>
                <Button block className={'btn-red flex ml-auto'} htmlType={"submit"}>
                    Save
                </Button>
            </Form>
        </TlaModal>
    )
}

export default RoleForm
