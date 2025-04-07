import React, {useEffect, useState} from 'react';
import {Form, Input} from "antd";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {getPaymentStats} from "../../../state/payment/paymentAction.ts";
import {currencyFormat} from "../../../utils";
import {PaymentStats} from "../../../types/payment.ts";


const AwardStats: React.FC = () => {
    const award = useAppSelector(state => state.award.awardItem);
    const stats: PaymentStats = useAppSelector(state => state.payment.stats);
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const [systemProfit, setSystemProfits] = useState<number>(0);
    const [organisationProfit, setOrganisationProfit] = useState<number>(0);

    useEffect(() => {
        dispatch(getPaymentStats(`awardId=${award.id}`));
        setSystemProfits((+award?.systemPercentage / 100) * stats.totalVoteAmount);
        setOrganisationProfit(stats.totalVoteAmount - systemProfit)
    }, [award, stats]);


    const voteStats = {
        ussdVoteAmount: stats.ussdVoteAmount,
        ussdVoteCount: stats.ussdVoteCount,
        webVoteCount: stats.webVoteCount,
        webVoteAmount: stats.webVoteAmount,
        totalAmount: stats.totalVoteAmount,
        totalVotes: (stats.ussdVoteCount + stats.webVoteCount)
    }


    return (
        <>
            <div className={'mb-7'}>
                <div className={'p-5 flex items-center justify-between'}>
                    <h3 className={'text-xl text-app-red mb-1'}>Raw Information</h3>
                </div>


                <div className={''}>
                    <Form
                        // disabled={true}
                        className={'contestant-detail-form'}
                        form={form}
                        initialValues={{...voteStats}} size={'large'} layout={'vertical'}>
                        <div className={'bg-white p-5 rounded-2xl mb-3'}>
                            <div className={'grid grid-cols-2 md:grid-cols-3 gap-x-3'}>
                                <Form.Item label={"Web Votes"} name={'webVoteCount'}>
                                    <Input readOnly/>
                                </Form.Item>

                                <Form.Item label={"USSD Votes"} name={'ussdVoteCount'}>
                                    <Input readOnly/>
                                </Form.Item>

                                <Form.Item label={"Total Votes (USSD + WEB)"} name={'totalVotes'}>
                                    <Input readOnly/>
                                </Form.Item>

                                <Form.Item label={"Web Amount"} name={'webVoteAmount'}>
                                    <Input readOnly/>
                                </Form.Item>

                                <Form.Item label={"USSD Amount"} name={'ussdVoteAmount'}>
                                    <Input readOnly/>
                                </Form.Item>

                                <Form.Item label={"Total Amount (USSD + WEB)"} name={'totalAmount'}>
                                    <Input readOnly/>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>


            <div className={'mb-8'}>
                <div className={'p-5 flex items-center justify-between'}>
                    <h3 className={'text-xl text-app-red'}>Profit Information</h3>
                </div>


                <div className="mb-2">

                    <div className="flex justify-between gap-5 align-items-center">

                        <div className="flex flex-col gap-2 bg-white p-5 rounded-xl">
                            <p className="text-xl">Total Revenue</p>
                            <p className="text">{currencyFormat(stats.totalVoteAmount)}</p>
                        </div>

                        <div className="flex flex-col gap-2 bg-white p-5 rounded-xl">
                            <p className="text-xl">Voting System Profit ({award?.systemPercentage} %)</p>
                            <p className="text">{currencyFormat(systemProfit)}</p>
                        </div>

                        <div className="flex flex-col gap-2 bg-white p-5 rounded-xl">
                            <p className="text-xl">Organisation - ({award?.organisation?.name}) Profit -
                                ( {100 - +award?.systemPercentage} %)</p>
                            <p className="text">{currencyFormat(organisationProfit)}</p>
                        </div>

                    </div>

                </div>


            </div>

        </>
    )
};


export default AwardStats;
