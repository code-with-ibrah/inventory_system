import React, {useEffect} from "react"
import { Spin } from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useAppDispatch} from "../../hooks";
import {verifyPasswordReset} from "../../state/auth/authActions.ts";
import {MenuLinks} from "../../utils/menu-links.ts";
import {TlaError} from "../../utils/messages.ts";


const PasswordResetRequestVerification = () => {
    const dispatch = useAppDispatch();
    const [searchParams, _] = useSearchParams();
    const navigate = useNavigate();


    useEffect(() => {
        const userId: string | null = (searchParams.get("link"));
        const expirationDuration: string | null = (searchParams.get("expires"));
        const token: string | null = (searchParams.get("token"));

        const params = `link=${userId}&expires=${expirationDuration}&token=${token}`;

        dispatch(verifyPasswordReset(params))
            .then(unwrapResult)
            .then(() => {
                navigate(MenuLinks.setNewPassword);
                return;
            })
            .catch(() => {
                TlaError("Request is no longer valid. Kindly start again.");
                navigate(MenuLinks.forgotPassword);
                return;
            })

            navigate(MenuLinks.forgotPassword);
    }, []);


    return <React.Fragment>


        <section style={{ margin: "35vh auto" }}>
            <Spin tip="Verification in progress..." size="large" spinning={true}>
                &nbsp;
            </Spin>
        </section>



    </React.Fragment>
}

export default PasswordResetRequestVerification;