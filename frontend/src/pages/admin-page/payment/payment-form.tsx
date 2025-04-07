import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {TlaModal} from "../../../common/pop-ups/TlaModal.tsx";
import {Button, Form, InputNumber, Select} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {TlaError, TlaSuccess} from "../../../utils/messages.ts";
import {
    adjustContestantVote,
    getAllContestants,
} from "../../../state/contestant/contestantAction.ts";
import {setContestant} from "../../../state/contestant/contestantSlice.ts";

const PaymentForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 
    const [form] = Form.useForm();

    const contestant = useAppSelector(state => state.contestant.contestantItem);

 
    const onFinish = (values: any) => {
        setLoading(true);

        values.email = "management@event.com";
        values.categoryId = contestant.categoryId;
        values.awardId = contestant.awardId;


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
                    });
                
                navigate(-1);

            })
            .catch((obj) => {
                setLoading(false);
                TlaError(obj.message)
            })
    }



    return (
        <TlaModal title={"Payments"} loading={loading}>
            <Form form={form} requiredMark={false} onFinish={onFinish} initialValues={{...state?.data}} size={'large'}
                  layout={"vertical"}>
                <div className={'grid grid-cols-3 md:grid-cols-3 gap-2'}>

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
                        Save
                    </Button>
                </div>
            </Form>
        </TlaModal>
    )
}

export default PaymentForm