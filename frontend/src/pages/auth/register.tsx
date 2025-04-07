import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { register } from "../../state/auth/authActions.ts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { resetState, updateState } from "../../state/errorSlice.ts";
import TlaLoader from "../../common/tla-loader.tsx";
import { MenuLinks } from "../../utils/menu-links.ts";

type FieldType = {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    password?: string;
    passwordConfirm?: string;
    token?: string;
};

const Register: React.FC = () => {
    const { token } = useParams()
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        dispatch(updateState({status: "loading"}));
        values.token = token
        dispatch(register(values)).then(unwrapResult)
            .then(() => {
                dispatch(updateState({
                    status: "succeeded",
                    message: `Success.`
                }));
                navigate(MenuLinks.manual);
            })
            .catch((obj) => {
                dispatch(updateState({
                    status: "failed",
                    errors: obj.message ?? obj
                }));
            }).finally(() => dispatch(resetState()));
    };

    return (
        <Form
            requiredMark={false}
            className={'w-full md:w-[400px] mx-auto'}
            size={'large'}
            layout="vertical"
            name="register-form"
            onFinish={onFinish}>

            <div className={"grid grid-cols-2 gap-x-2"}>
                <Form.Item<FieldType>
                    className={'mb-2'}
                    label={<span className={"text-midnight-blue"}>First Name</span>}
                    name="firstName"
                    rules={[{required: true, message: 'Enter your first name!'}]}>
                    <Input placeholder={'First Name'}/>
                </Form.Item>
                <Form.Item<FieldType>
                    className={'mb-2'}
                    label={<span className={"text-midnight-blue"}>Last Name</span>}
                    name="lastName"
                    rules={[{required: true, message: 'Enter your last name!'}]}>
                    <Input placeholder={'Last Name'}/>
                </Form.Item>
            </div>

            <Form.Item<FieldType>
                className={'mb-2'}
                label={<span className={"text-midnight-blue"}>Phone Number</span>}
                name="phoneNumber"
                rules={[
                    {required: true, message: 'Enter your phone number!'},
                    {pattern: /^[0-9]+$/, message: 'Not a valid phone number!'}
                ]}>
                <Input placeholder={'Phone Number'}/>
            </Form.Item>
            <div className={"grid grid-cols-2 gap-x-2"}>
                <Form.Item<FieldType>
                    label={<span className={"text-midnight-blue"}>Password</span>}
                    name="password"
                    rules={[
                        {required: true, message: 'Enter your password!'},
                        {min: 6, message: 'Password must be at least 6 characters long!'}
                    ]}>
                    <Input.Password placeholder={'Password'}/>
                </Form.Item>

                <Form.Item<FieldType>
                    label={<span className={"text-midnight-blue"}>Repeat Password</span>}
                    name="passwordConfirm"
                    dependencies={['password']}
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
                    <Input.Password placeholder={'Repeat Password'}/>
                </Form.Item>
            </div>
            <TlaLoader>
                <Form.Item>
                    <Button className={'bg-midnight-blue hover:!bg-midnight-blue'} block type="primary"
                            htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </TlaLoader>
            <div className={"text-center text-gray-500"}>
                Already have an account? <Link to={MenuLinks.login} className={"text-midnight-blue font-semibold"}>Login Here</Link>
            </div>
        </Form>
    );
};

export default Register;
