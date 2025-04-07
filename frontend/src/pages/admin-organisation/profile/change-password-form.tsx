import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {TlaModal} from "../../../common/pop-ups/TlaModal.tsx";
import {Button, Form, Input,} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {TlaError, TlaSuccess} from "../../../utils/messages.ts";
import {createAwardBonusPackage, updateAwardBonusPackage} from "../../../state/award-bonus/awardBonusAction.ts";


type FieldType = {
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
};


const ChangePasswordForm: React.FC = () => {
    const { state } = useLocation()
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm<any>();
    const navigate = useNavigate();
    const award = useAppSelector(state => state.award.awardItem);

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
        <TlaModal title={"Change Password"} loading={loading}>
            <Form form={form} requiredMark={false} onFinish={onFinish} initialValues={{ ...state?.data }} size={'large'} layout={"vertical"}>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                    <Form.Item<FieldType>
                        label={'Old Password *'} name={'oldPassword'}
                        className={'col-span-2'}
                        rules={[
                            {required: true, message: "Required"},
                        ]}>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label={<span className={"text-midnight-blue"}>New Password</span>}
                        name={'newPassword'}
                        rules={[
                            {required: true, message: 'Enter your password!'},
                            {min: 6, message: 'Password must be at least 4 characters long!'}
                        ]}>
                        <Input.Password rootClassName={"auth-input"}/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label={<span className={"text-midnight-blue"}>Confirm Password</span>}
                        name={'confirmPassword'}
                        dependencies={['newPassword']}
                        rules={[
                            {required: true, message: 'Enter your password again!'},
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords do not match!'));
                                },
                            }),
                        ]}>
                        <Input.Password rootClassName={"auth-input"}/>
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

export default ChangePasswordForm
