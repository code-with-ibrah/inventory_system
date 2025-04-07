import React, {useEffect} from 'react';
import {Button, Form, FormProps, Input, Spin} from 'antd';
import {changePassword} from "../../state/auth/authActions.ts";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {unwrapResult} from "@reduxjs/toolkit";
import {MenuLinks} from "../../utils/menu-links.ts";
import {TlaError, TlaSuccess} from "../../utils/messages.ts";
import Title from "./verification/title.tsx";

type FieldType = {
    password: string,
    confirmPassword: string
};

const SetNewPassword: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(false);
    const user = useAppSelector(state => state.auth.user);

    const onFinish: FormProps<FieldType>['onFinish'] = (values: any) => {
        setLoading(true);
        values.userId = user?.id;
        values.email = user?.email;

        dispatch(changePassword(values))
            .then(unwrapResult)
            .then((_) => {
                TlaSuccess("Password changed successfully.");
                navigate(MenuLinks.login);
                return;
            })
            .catch((obj) => {
                setLoading(false);
                TlaError(obj?.message ?? obj.message)
            })
    };
    useEffect(() => {
        if(!user?.email){
            navigate(MenuLinks.login);
            TlaError("Request is expired, retry")
            return;
        }
    }, [user?.email]);
    return (
        <Spin spinning={loading} tip={'Changing Password...'}>
            <Form autoComplete={"off"}
                  requiredMark={false}
                  className={'w-[300px] mx-auto'}
                  size={'large'}
                  layout="vertical"
                  name="login-form"
                  onFinish={onFinish}>
                <div className={'mb-8'}>
                    <Title
                        title={'Set new password'}
                        subText={'Create a new password for your account.'}
                    />
                </div>
                <Form.Item<FieldType> className={'mb-2'} label={'Enter new password'} name="password"
                      rules={[
                          {required: true, message: 'Enter your new password'},
                          {min: 4, message: 'Password must be at least 6 characters'},
                      ]}>
                    <Input rootClassName={"auth-input"}/>
                </Form.Item>

                <Form.Item<FieldType> className={'mb-2'} label={'Confirm password'} name="confirmPassword"
                      rules={[
                          {required: true, message: 'Confirm new password!'},
                          ({getFieldValue}) => ({
                              validator(_, value) {
                                  if (!value || getFieldValue('password') === value) {
                                      return Promise.resolve();
                                  }
                                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                              },
                          })
                      ]}>
                    <Input rootClassName={"auth-input"}/>
                </Form.Item>

                <Button className={'btn-red'} block htmlType="submit">
                    Change Password
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

export default SetNewPassword;
