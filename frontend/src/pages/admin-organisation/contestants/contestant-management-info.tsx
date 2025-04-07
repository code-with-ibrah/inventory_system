import React, {useState} from 'react';
import {Button, Form, InputNumber, Select, Spin} from "antd";
import { unwrapResult } from "@reduxjs/toolkit";
import {adjustContestantVote, getAllContestants} from "../../../state/contestant/contestantAction.ts";
import {TlaError, TlaSuccess} from '../../../utils/messages.ts';
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {setContestant} from "../../../state/contestant/contestantSlice.ts";

const ContestantManagementInfo: React.FC = () => {
    const contestant = useAppSelector(state => state.contestant.contestantItem);
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const category = useAppSelector(state => state.category.categoryItem);
    const [loading, setLoading] = useState(false);


    const onFinish = (values: any) => {
        setLoading(true);

        values.email = "management@event.com";
        values.categoryId = category.id;
        values.awardId = category.awardId;


        dispatch(adjustContestantVote({data: values, id: contestant?.id}))
            .then(unwrapResult)
            .then(() => {
                setLoading(false);
                form.resetFields();
                TlaSuccess("Successful");

                dispatch( getAllContestants(`id[eq]=${contestant.id}`))
                    .then(unwrapResult)
                    .then(({data}) => {
                        const contestant = data[0];
                        dispatch(setContestant(contestant));
                    })

            })
            .catch((obj) => {
                setLoading(false);
                TlaError(obj.message)
            })
    };


    return (
        <div className={'mb-8'}>
            <div className={'p-5 flex items-center justify-between'}>
                <h3 className={'text-xl text-app-red mb-3'}>Adjust Vote</h3>
            </div>

            <Spin spinning={loading} tip={'loading...'}>

                <div>
                <Form
                    className={'contestant-detail-form'}
                    form={form}
                    initialValues={{...contestant}}
                    onFinish={onFinish} size={'large'} layout={'vertical'}>
                    <div className={'bg-white p-5 rounded-2xl mb-3'}>

                        <div className={''}>
                            <Form.Item label={"Vote Count"} name={'voteCount'} rules={[ {required: true, message: "Required"}]}>
                                <InputNumber style={{width: "100%"}}/>
                            </Form.Item>

                            <Form.Item label={"Vote Amount"} name={'amount'}
                                    rules={[
                                        { required: true, message: "Required" }
                                    ]}>
                                <InputNumber step='any' style={{width: "100%"}}/>
                            </Form.Item>

                            <Form.Item label={"Status"} name={'status'}
                                       rules={[
                                           {required: true, message: 'Required'},
                                       ]}>
                                <Select>
                                    <Select.Option value={null}>Choose one</Select.Option>
                                    <Select.Option value={'addition'}>Addition</Select.Option>
                                    <Select.Option value={'subtraction'}>Subtraction</Select.Option>
                                </Select>
                            </Form.Item>

                        </div>

                    <div className={'w-fit ml-auto'}>
                    <Button className={'btn-red'} htmlType={"submit"}>
                            Adjust Vote
                        </Button>
                    </div>
                    </div>

                </Form>
            </div>

            </Spin>

        </div>
    )
};


export default ContestantManagementInfo;
