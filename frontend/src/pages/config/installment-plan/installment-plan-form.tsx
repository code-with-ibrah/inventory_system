import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {TlaError, TlaSuccess} from "../../../utils/messages.ts";
import {TlaModal} from "../../../common/pop-ups/TlaModal.tsx";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {createInstallmentPlan, updateInstallmentPlan} from "../../../state/installment-plan/installmentPlanAction.ts";

const InstallmentPlanForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm<any>();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);

    const onFinish = (values: any) => {
        setLoading(true);
        values.companyId = user?.companyId;
        ((state?.data && state?.data?.id) ?
            dispatch(updateInstallmentPlan({ data: values, id: state?.data?.id})) :
            dispatch(createInstallmentPlan(values)))
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
        <TlaModal title={"Installment Plan"} loading={loading}>
            <Form requiredMark={false} form={form} onFinish={onFinish} initialValues={{...state?.data}} size={'large'} layout={"vertical"}>
                <br/>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                    <Form.Item
                               rules={[
                                   {
                                       required: true,
                                       message: "Required"
                                   }
                               ]}
                               name={"plan"} label={"Plan *"}>
                        <Input placeholder={'3 months plan'}/>
                    </Form.Item>

                    <Form.Item
                        rules={[{required: true, message: "Required"}]}
                        name={"installmentPayCount"} label={"Installment Payment Count *"} >
                        <Input placeholder={'7'} type={'number'} min={0}/>
                    </Form.Item>

                    <Form.Item
                        rules={[{required: true, message: "Required"}]}
                        name={"installmentMonthCount"} label={"Installment Month Count *"} >
                        <Input placeholder={'4'} type={'number'} min={0}/>
                    </Form.Item>

                    <Form.Item
                        rules={[{required: true, message: "Required"}]}
                        name={"interestRate"} label={"Interest Rate *"} >
                        <Input placeholder={'3.5'} type={'number'} step={'any'} min={0}/>
                    </Form.Item>

                    <Form.Item
                        className={'col-span-2'}
                        name={"description"} label={"Description"}>
                        <Input.TextArea/>
                    </Form.Item>

                </div>
                <Button className={'btn-red flex ml-auto'} htmlType={"submit"}>
                    Save
                </Button>
            </Form>
        </TlaModal>
    )
}

export default InstallmentPlanForm
