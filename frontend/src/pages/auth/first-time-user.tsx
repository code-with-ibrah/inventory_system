import React, {useEffect} from 'react';
import { Button, Form, FormProps, Input, Spin } from 'antd';
import { changePassword } from "../../state/auth/authActions.ts";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { MdOutlinePassword } from "react-icons/md";
import { TlaError } from "../../utils/messages.ts";
import Logout from "../../common/layout/logout.tsx";
import { FiArrowLeft } from "react-icons/fi";
import { AppName } from "../../common/layout/app-name.tsx";
import { PoweredBy } from "../../common/layout/powered-by.tsx";
import {User} from "../../types/common.ts"; 

type FieldType = {
    email?: string;
    currentPassword?: string;
    password?: string;
    passwordConfirm?: string;
};

const FirstTimeUser: React.FC = () => {
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const user: User = useAppSelector(state => state.auth.user)

    const onFinish: FormProps<FieldType>['onFinish'] = (values: any) => {
        setLoading(true);
        values.userId = user?.id;
        values.email = user?.email;


        dispatch(changePassword(values)).then(unwrapResult)
            .then(() => {
                setLoading(false);
            })
            .catch((obj) => {
                setLoading(false);
                TlaError(obj?.message ?? obj.message)
            })
    };

    useEffect(() => {
        // if(!user){ navigate(-1); }
    }, [user]);

    return (
        <div>

            <Spin spinning={loading}>
                <div className={'flex items-center justify-center h-svh'}>
                    <div className={''}>
                        <div className={'w-fit mx-auto mb-5'}>
                            <AppName/>
                        </div>
                        <div>
                            <div className={'border p-2 rounded-md w-fit mx-auto border-midnight-blue'}>
                                <MdOutlinePassword size={20}/>
                            </div>
                            <div className={'text-center my-2'}>
                                <h1 className={'text-midnight-blue text-md md:text-3xl font-bold'}>Set a new
                                    Password!</h1>
                                <p className={'text-gray-500 text-sm mb-5'}>Must be at least 6 characters</p>
                            </div>
                            <Form
                                requiredMark={false}
                                className={'w-[300px] mx-auto'}
                                size={'large'}
                                layout="vertical"
                                name="login-form"
                                onFinish={onFinish}>
                                {/*<Form.Item<FieldType>
                                label={<span className={"text-midnight-blue"}>Current Password</span>}
                                name="currentPassword"
                                rules={[
                                    {required: true, message: 'Enter your password!'},
                                    {min: 4, message: 'Password must be at least 4 characters long!'}
                                ]}>
                                <Input.Password rootClassName={"auth-input"} placeholder={'Password'}/>
                            </Form.Item>*/}

                                <Form.Item<FieldType>
                                    label={<span className={"text-midnight-blue"}>New Password</span>}
                                    name="password"
                                    rules={[
                                        {required: true, message: 'Enter your password!'},
                                        {min: 6, message: 'Password must be at least 4 characters long!'}
                                    ]}>
                                    <Input.Password rootClassName={"auth-input"}/>
                                </Form.Item>

                                <Form.Item<FieldType>
                                    label={<span className={"text-midnight-blue"}>Confirm Password</span>}
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
                                    <Input.Password rootClassName={"auth-input"}/>
                                </Form.Item>

                                <Form.Item>
                                    <Button className={'btn-red'} block type="primary"
                                            htmlType="submit">
                                        Change Password
                                    </Button>
                                </Form.Item>
                            </Form>
                            <div>
                                <Logout
                                    className={'flex items-center justify-center gap-x-3 hover:underline underline-offset-4 cursor-pointer'}>
                                    <FiArrowLeft size={20}/>
                                    Back to login
                                </Logout>
                            </div>
                        </div>
                        <div className={'py-5'}>
                            <PoweredBy/>
                        </div>
                    </div>
                </div>
            </Spin>
        </div>
    )
}

export default FirstTimeUser;
