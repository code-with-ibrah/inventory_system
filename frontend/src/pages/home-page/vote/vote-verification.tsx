import React, {useEffect} from "react"
import { Spin } from "antd";
import {verifyContestantPayment} from "../../../state/contestant/contestantAction.js";
import {unwrapResult} from "@reduxjs/toolkit";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useAppDispatch} from "../../../hooks";
import {MenuLinks} from "../../../utils/menu-links.ts";


const VoteVerificationPage = () => {
    const dispatch = useAppDispatch();
    const [searchParams, _] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {

        const reference: string | null = (searchParams.get("reference"));

        dispatch(verifyContestantPayment(reference))
            .then(unwrapResult)
            .then((_) => {
                return navigate(MenuLinks.home.payment.success);
            })
            .catch(_ => {
                return navigate(MenuLinks.home.payment.failure);
            })
    }, []);


    return <React.Fragment>


        <section style={{ margin: "35vh auto" }}>
            <Spin tip="Verification in progress..." size="large" spinning={true}>
                &nbsp;
            </Spin>
        </section>



    </React.Fragment>
}

export default VoteVerificationPage;