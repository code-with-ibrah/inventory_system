import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {unwrapResult} from "@reduxjs/toolkit";
import {Button, Form, Input, Spin } from "antd";
import ContestantCard from "../../../common/card/contestant-card.tsx";
import HomeNotFound from "../common/error/home-not-found.tsx";
import WelcomeSection from "../../../common/welcome/welcome-section.js";
import {castContestantVote, getContestantBYUniqueCode} from "../../../state/contestant/contestantAction.js";
import "./vote-page.css";
import { TlaError } from "../../../utils/messages.ts";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {getAllAwards} from "../../../state/award/awardsAction.ts";
import {setAward} from "../../../state/award/awardSlice.ts";
import {dateHasExpiredChecker} from "../../../utils";




const VotePage = () => {
    const params = useParams();
    const contestantUniqueCode = params.uniqueCode;
    const [found, setFound] = useState(true);
    const [voteAmount, setVoteAmount] = useState(0);
    const contestant = useAppSelector(state => state.contestant.contestantItem);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const contestantCodeNotFound = 404;
    const awardItem = useAppSelector(state => state.award.awardItem);




    useEffect(() => {

        dispatch(getAllAwards(`id[eq]=${contestant?.awardId}`))
            .then(unwrapResult)
            .then((res: any) => {
                const award = (res.data[0]);
                dispatch(setAward(award));
            })
            .catch((err: any) => {
                console.log(err);
            })


        setLoading(true);
        dispatch(getContestantBYUniqueCode(contestantUniqueCode))
            .then(unwrapResult)
            .then(response => {
                setLoading(false);
                if(!response.length){
                    TlaError("Error");
                    throw new Error(contestantCodeNotFound.toString());
                }
            })
            .catch((err: any) => {
                setLoading(false);
                if(err.message == contestantCodeNotFound){
                    TlaError("Error");
                    setFound(false);
                }
            });
    }, []);

    if(!found){
        return <HomeNotFound
            code={contestantCodeNotFound}
            title={'Contestant not Found'}
            message={`Code ${contestantUniqueCode} does not exist!`}
        />;
    }

    const voteCountOnChange = (e: any) => {
        const voteCount = Number(e.target.value);
        // @ts-ignore
        setVoteAmount(voteCount * contestant?.costPerVote);
    };

    const onFinish = (values: any) => {
        setLoading(true);

        const payload = {
            email: values.email,
            voteCount: values.voteCount,
            voteType: 'web',
            amount: voteAmount,
            contestantId: contestant?.id,
            categoryId: contestant?.categoryId,
            awardId: contestant?.awardId,
            userCode: contestant?.userCode
        };

        dispatch(castContestantVote(payload))
            .then(unwrapResult)
            .then(({ authorization_url }) => {
                window.location.assign(authorization_url);
            })
            .catch(() => {
                setLoading(false);
                return TlaError("connection failed, retry again!");
            });
    };

    return <>
        <section className="vote-section">
            <WelcomeSection
                title={ !found ? 'Contestant not found' : 'cast vote!'}
            />
        </section>

        <Spin tip="Please wait..." size="large" spinning={loading}>
            <section className='vote-contestant__section'>
                    <div className="home-container">

                        <div className="vote-contestant__wrapper">
                            <ContestantCard contestant={contestant} awardItem={awardItem} />

                            <div className="payment-form">
                                <Form requiredMark={false} onFinish={onFinish} size={'large'} layout={"vertical"}>
                                    <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                                        <div className="vote-cost__wrapper">
                                            <p className={'key'}>cost per vote: </p>
                                            <p className={'value'}>GHS { contestant?.costPerVote }</p>
                                        </div>

                                        <Form.Item
                                            name={"voteCount"}
                                            className={'col-span-2'}
                                            label={"Enter Number of votes *"}
                                            rules={[
                                                {required: true, message: 'Required.'},
                                            ]}>
                                            <Input
                                                onChange={voteCountOnChange}
                                                min={1}
                                                step={1}
                                                type={'number'}/>
                                        </Form.Item>

                                        <Form.Item
                                            rules={[
                                                {required: true, message: "Required"},
                                                {type: 'email', message: 'Please enter a valid email address.'},
                                            ]}
                                            name={"email"} className='col-span-2' label={"Enter your Email *"}>
                                            <Input/>
                                        </Form.Item>
                                    </div>

                                    <div className="vote-cost__wrapper">
                                        <p className={'key'}>vote cost: </p>
                                        <p className={'value'}>GHS {parseFloat(voteAmount.toString())}</p>
                                    </div>

                                    <div className={''}>
                                        <Button disabled={dateHasExpiredChecker(awardItem?.endDate)} className={'vote-btn'} block htmlType={"submit"}>
                                            {dateHasExpiredChecker(awardItem?.endDate) ? 'Program is ended' : 'Proceed With Payment' }
                                        </Button>
                                    </div>
                                </Form>
                            </div>

                        </div>

                    </div>
                </section>
        </Spin>
    </>
};



export default VotePage;