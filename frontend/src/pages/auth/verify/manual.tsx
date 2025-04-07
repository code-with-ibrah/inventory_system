import { useState } from 'react'
import { Spin } from 'antd'
import BackToLogin from "../verification/back-to-login.tsx";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
    requestPasswordReset,
} from "../../../state/auth/authActions.ts";
import { unwrapResult } from "@reduxjs/toolkit";
import { resetState } from "../../../state/errorSlice.ts";
import { TlaError, TlaSuccess } from "../../../utils/messages.ts";
import AuthTitle from "../auth-title.tsx";

export default function Manual() {
    const [loading, setLoading] = useState(false);
    const {user} = useAppSelector(state => state.auth);

    const dispatch = useAppDispatch();


    const handleResend = () => {
        setLoading(true);

        dispatch(requestPasswordReset(user?.email))
            .then(unwrapResult)
            .then(() => {
                setLoading(false);
                TlaSuccess("Email has been sent!");
            })
            .catch((obj) => {
                setLoading(false);
                TlaError(obj?.message ?? obj.message + ". check your internet and re-try")
            }).finally(() => dispatch(resetState()));
    }


    return (
        <Spin spinning={loading} tip={'Processing...'}>
            <AuthTitle title={'Check your email'}
                       subtitle={'Verification email is sent if provided email exists in our records'}/>
            <div className={'flex items-center md:items-start justify-center md:justify-start flex-col bg-white-base'}>

                <div className={'mb-8 mt-7'}>
                    <p>Didn’t receive the email ? &nbsp;<span> Click the button to resend</span></p>
                </div>

                <button onClick={handleResend}
                        className={'mb-8 btn-red text-white text-base h-11 w-full ' +
                            ' rounded-lg'}>
                    Resend now
                </button>

                <BackToLogin/>
            </div>
        </Spin>
    )
}
