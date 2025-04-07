import React, {useEffect} from 'react';
import {Button, Form, FormProps, Input, Spin} from 'antd';
import {login} from "../../state/auth/authActions.ts";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {unwrapResult} from "@reduxjs/toolkit";
import {MenuLinks} from "../../utils/menu-links.ts";
import {TlaError} from "../../utils/messages.ts";
import {getHomeLink} from "../../utils/menus.ts";
import AuthTitle from "./auth-title.tsx";

type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};

const Login: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(false);
    const user = useAppSelector(state => state.auth.user);
    const [searchParams, _] = useSearchParams();

    const email: any = searchParams.get("email");
    const initialFormValues: any = {
        email,
        password: "000000"
    };



    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        setLoading(true);
        dispatch(login(values)).then(unwrapResult)
            .then((res) => {
                navigate(getHomeLink(res?.user?.roleName));
            })
            .catch((obj) => {
                setLoading(false);
                TlaError(obj?.message ?? obj.message);
            })
    };

    useEffect(() => {

        if(user?.id){
            // @ts-ignore
            navigate(getHomeLink(user?.roleName));
        }
    }, [user, searchParams]);


    return (
        <Spin spinning={loading}>
            <AuthTitle title={'Welcome back!'} subtitle={'Enter your email and password'}/>
            <Form autoComplete={"off"} initialValues={initialFormValues}
                requiredMark={false}
                className={'w-[300px] mx-auto'}
                size={'large'}
                layout="vertical"
                name="login-form"
                onFinish={onFinish}>
                <Form.Item className={'mb-2'} label={'Email'} name="email"
                    rules={[
                        {required: true, message: 'Enter your email!'},
                        {type: "email", message: "Enter valid email"}
                    ]}>
                    <Input rootClassName={"auth-input"}/>
                </Form.Item>

                <Form.Item label={'Password'} name="password"
                    rules={[{required: true, message: 'Enter your password!'}]}>
                    <Input.Password rootClassName={"auth-input"}/>
                </Form.Item>
                <Button className={'btn-red'} block htmlType="submit">
                    Login
                </Button>
            </Form>

            <div className={'mt-5 text-sm flex gap-4'}>
                <Link className={"text-gray-900 hover:text-midnight-blue"} to={MenuLinks.forgotPassword}>
                    Forgot password ?
                </Link>
                |

                <Link className={"text-gray-900 hover:text-midnight-blue"} to={MenuLinks.home.index}>
                    Home Page
                </Link>
            </div>
        </Spin>
    )
}

export default Login;
