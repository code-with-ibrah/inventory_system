import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {createWarehouse, updateWarehouse} from "../../state/warehouse/warehouseAction.ts";
import {TlaError, TlaSuccess} from "../../utils/messages.ts";
import {TlaModal} from "../../common/pop-ups/TlaModal.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {generateWarehouseCode} from "../../utils";


const WarehouseForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm<any>();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);

    const onFinish = (values: any) => {
        setLoading(true);
        values.companyId = user?.companyId;
        values.code = (state?.data?.code) || generateWarehouseCode(values.name);
        values.creatorId = user?.id;
        ((state?.data && state?.data?.id) ?
            dispatch(updateWarehouse({ data: values, id: state?.data?.id})) :
            dispatch(createWarehouse(values)))
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
        <TlaModal title={"Warehouse"} loading={loading}>
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
                       name={"location"} label={"Location *"}
                        rules={[{ required: true, message: "Required" }]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name={"city"} label={"City (optional)"}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name={"country"} label={"Country (optional)"}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name={"phone"} label={"Phone (optional)"}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name={"email"} label={"Email (optional)"}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name={"type"} label={"Type (optional)"}>
                        <Input placeholder={'eg. storage'}/>
                    </Form.Item>

                    <Form.Item
                        name={"capacity"} label={"Capacity (optional)"}>
                        <Input placeholder={'eg. 20 meters long'}/>
                    </Form.Item>

                    <Form.Item className={'col-span-2'}
                        name={"description"} label={"Description (optional)"}>
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

export default WarehouseForm
