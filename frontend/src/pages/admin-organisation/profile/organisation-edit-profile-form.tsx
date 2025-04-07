import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {Button, Form, Input} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {createAwardBonusPackage, updateAwardBonusPackage} from "../../../state/award-bonus/awardBonusAction.ts";
import {unwrapResult} from "@reduxjs/toolkit";
import {TlaError, TlaSuccess} from "../../../utils/messages.ts";
import {TlaModal} from "../../../common/pop-ups/TlaModal.tsx";

const OrganisationEditProfileForm: React.FC = () => {
    const { state } = useLocation()
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm<any>();
    const navigate = useNavigate();
    const award = useAppSelector(state => state.award.awardItem);

    const user = useAppSelector(state => state.auth.user);

    const onFinish = (values: any) => {
        setLoading(true);
        values.awardId = award.id;

        ((state?.data && state?.data?.id) ? dispatch(updateAwardBonusPackage({
            data: values,
            id: state?.data?.id
        })) : dispatch(createAwardBonusPackage(values)))
            .then(unwrapResult)
            .then(() => {
                TlaSuccess("Successful")
                setLoading(false)
                navigate(-1)
            })
            .catch((err) => {
                TlaError(err?.message ?? "")
                setLoading(false)
            })
    }

    return (
        <TlaModal title={"Edit Profile"} loading={loading}>
            <Form form={form} requiredMark={false} onFinish={onFinish} initialValues={{ ...user }} size={'large'} layout={"vertical"}>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                    <Form.Item
                        label={'Full Name *'} name={'name'}
                        rules={[
                            {required: true, message: "Required"},
                        ]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label={'Email *'} name={'email'}
                        rules={[
                            {required: true, message: "Required"},
                        ]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label={'Organisation *'} name={["organisation", "name"]}
                        rules={[
                            {required: true, message: "Required"},
                        ]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label={'Phone *'} name={["organisation", "phone"]}
                        rules={[
                            {required: true, message: "Required"},
                        ]}>
                        <Input/>
                    </Form.Item>

                </div>
                <div className={'w-fit ml-auto'}>
                    <Button className={'btn-red'} htmlType={"submit"}>
                        Save
                    </Button>
                </div>
            </Form>
        </TlaModal>
    )
}

export default OrganisationEditProfileForm
