import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {TlaError, TlaSuccess} from "../../utils/messages.ts";
import {TlaModal} from "../../common/pop-ups/TlaModal.tsx";
import {getAllGoodsReceiptPaymentStats} from "../../state/supplier/supplierAction.ts";
import { createGoodsReceiptPayment, updateGoodsReceiptPayment } from "../../state/goods-receipt-payments/goodsReceiptPaymentAction.ts";
import {generateUniqueCode} from "../../utils";


const SupplierPaymentForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm<any>();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);
    const supplier = useAppSelector(state => state.supplier.supplierItem);


    const onFinish = (values: any) => {
        setLoading(true);
        values.companyId = user?.companyId;
        values.supplierId = supplier?.id;
        values.paymentNumber = generateUniqueCode("PAY-");

        if((state?.data && state?.data?.id)){
            dispatch(updateGoodsReceiptPayment({ data: values, id: state?.data?.id}))
        }
        else{

            if(!confirm("Payment cannot be changed later, are you sure ?")){
                setLoading(false);
                return;
            }

            dispatch(createGoodsReceiptPayment(values))
                .then(unwrapResult)
                .then(() => {

                    dispatch(getAllGoodsReceiptPaymentStats(supplier?.id))
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

export default SupplierPaymentForm;
