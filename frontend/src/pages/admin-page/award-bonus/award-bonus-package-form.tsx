import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {TlaModal} from "../../../common/pop-ups/TlaModal.tsx";
import {Button, Form, InputNumber} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {TlaError, TlaSuccess} from "../../../utils/messages.ts";
import {createAwardBonusPackage, updateAwardBonusPackage} from "../../../state/award-bonus/awardBonusAction.ts";

const AwardBonusPackageForm: React.FC = () => {
    const { state } = useLocation()
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm<any>();
    const navigate = useNavigate();
    const award = useAppSelector(state => state.award.awardItem);

    const onFinish = (values: any) => {
        setLoading(true);
        values.awardId = award.id;

        ((state?.data && state?.data?.id) ? dispatch(updateAwardBonusPackage({
            data: values,
            id: state?.data?.id
        })) : dispatch(createAwardBonusPackage(values)))
            .then(unwrapResult)
            .then(() => {
                TlaSuccess("Successful")
                setLoading(false)
                navigate(-1)
            })
            .catch((err) => {
                TlaError(err?.message ?? "")
                setLoading(false)
            })
    }

    return (
        <TlaModal title={"Award Bonus Package"} loading={loading}>
            <Form form={form} onFinish={onFinish} initialValues={{ ...state?.data }} size={'large'} layout={"vertical"}>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                    <Form.Item
                        label={'Price *'} name={'price'}
                        rules={[
                            {required: true, message: "Required"},
                        ]}>
                        <InputNumber style={{ width: "100%" }}/>
                    </Form.Item>

                    <Form.Item
                        label={'Total Vote'} name={'totalVote'}
                        rules={[
                            {required: true, message: "Required"},
                        ]}>
                        <InputNumber style={{ width: "100%" }}/>
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

export default AwardBonusPackageForm
