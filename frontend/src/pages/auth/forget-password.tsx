import React from 'react';
import { Button, Form, FormProps, Input, Spin } from 'antd';
import { requestPasswordReset } from "../../state/auth/authActions.ts";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { MenuLinks } from "../../utils/menu-links.ts";
import { TlaError } from "../../utils/messages.ts";
import AuthTitle from "./auth-title.tsx";

type FieldType = {
    email: string
};

const ForgetPassword: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(false);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        setLoading(true);
        dispatch(requestPasswordReset(values.email))
            .then(unwrapResult)
            .then((_) => {
                navigate(MenuLinks.manual);
                return;
            })
            .catch((obj) => {
                setLoading(false);
                TlaError(obj?.message ?? obj.message)
            })
    };

    return (
        <Spin spinning={loading} tip={'Please wait...'}>
            <AuthTitle title={'Forgot password!'} subtitle={'Enter your email to reset your password.'}/>
            <Form autoComplete={"off"}
                  requiredMark={false}
                  className={'w-[300px] mx-auto'}
                  size={'large'}
                  layout="vertical"
                  name="login-form"
                  onFinish={onFinish}>
                <Form.Item<FieldType> label={'Email'} name="email"
                                      rules={[
                                          {required: true, message: 'Enter your email!'}
                                      ]}>
                    <Input rootClassName={"auth-input"}/>
                </Form.Item>

                <Button className={'btn-red'} block htmlType="submit">
                    Reset Password
                </Button>
            </Form>

            <div className={'mt-5 text-sm'}>
                <Link className={"text-gray-900 hover:text-midnight-blue"} to={MenuLinks.login}>
                    Back to Login Page
                </Link>
            </div>
        </Spin>
    )
}

export default ForgetPassword;
