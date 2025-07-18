import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {TlaError, TlaSuccess} from "../../utils/messages.ts";
import {TlaModal} from "../../common/pop-ups/TlaModal.tsx";
import {createPayment, updatePayment} from "../../state/orders/payments/paymentAction.ts";
import {getAllCustomerPaymentStats} from "../../state/customer/customerAction.ts";
import {generateUniqueCode} from "../../utils";


const CustomerPaymentForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm<any>();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);
    const customer = useAppSelector(state => state.customer.customerItem);



    const onFinish = (values: any) => {
        setLoading(true);
        values.companyId = user?.companyId;
        values.customerId = customer?.id;
        values.paymentNumber = generateUniqueCode("PAY-");

        if((state?.data && state?.data?.id)){
            dispatch(updatePayment({ data: values, id: state?.data?.id}))
        }
        else{

            if(!confirm("Payment cannot be changed later, are you sure ?")){
                setLoading(false);
                return;
            }

            dispatch(createPayment(values))
                .then(unwrapResult)
                .then(() => {

                    dispatch(getAllCustomerPaymentStats(customer?.id))
                        .then(unwrapResult)
                        .then(_ => {
                            TlaSuccess("Successful");
                            setLoading(true);
                            navigate(-1);
                        })
                })
                .catch((err) => {
                    TlaError(err?.message ?? "");
                    setLoading(false);
                })
        }

    }

    return (
        <TlaModal title={"Payments"} loading={loading}>
            <Form requiredMark={false} form={form} onFinish={onFinish} initialValues={{...state?.data}} size={'large'} layout={"vertical"}>
               <br/>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Required"
                            }
                        ]}
                        name={"date"} label={"Date *"}>
                        <Input type={'date'} style={{ width: "100%"}}/>
                    </Form.Item>

                    <Form.Item
                        rules={[{required: true, message: "Required"}]}
                        name={"amount"} label={"Amount *"}>
                        <Input type={'number'} min={0} step={'any'} placeholder={'2443.22'}/>
                    </Form.Item>
                </div>
                <Button className={'btn-red flex ml-auto'} htmlType={"submit"}>
                    Save
                </Button>
            </Form>
        </TlaModal>
    )
}

export default CustomerPaymentForm;
