import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {TlaModal} from "../../../common/pop-ups/TlaModal.tsx";
import {Button, Form, Input} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useNavigate} from "react-router-dom";
import {TlaError, TlaSuccess} from "../../../utils/messages.ts";
import {updateAwardBonusDate} from "../../../state/award/awardsAction.ts";
import {setAward} from "../../../state/award/awardSlice.ts";
import {Award} from "../../../types/award.ts";

const AwardBonusPackageForm: React.FC = () => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm<any>();
    const navigate = useNavigate();
    const award = useAppSelector(state => state.award.awardItem);


    const onFinish = (values: any) => {
        setLoading(true);
        values.id = award.id;

       dispatch(updateAwardBonusDate(values))
            .then(unwrapResult)
            .then((award: Award) => {
                TlaSuccess("Successful");
                dispatch(setAward(award));
                setLoading(false)
                navigate(-1)
            })
            .catch((err) => {
                TlaError(err?.message ?? "")
                setLoading(false)
            })
    }


    return (
        <TlaModal title={"Award Bonus Votes"} loading={loading}>
            <Form form={form} onFinish={onFinish} initialValues={{ ...award }} size={'large'} layout={"vertical"}>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                    <Form.Item
                        label={'From *'} name={'packageStartDate'}
                        rules={[
                            {required: true, message: "Required"},
                        ]}>
                        <Input type={'date'} style={{ width: "100%" }}/>
                    </Form.Item>

                    <Form.Item
                        label={'To'} name={'packageEndDate'}
                        rules={[
                            {required: true, message: "Required"},
                        ]}>
                        <Input type={'date'} style={{ width: "100%" }}/>
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
