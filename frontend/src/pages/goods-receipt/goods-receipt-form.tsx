import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {TlaError, TlaSuccess} from "../../utils/messages.ts";
import {TlaModal} from "../../common/pop-ups/TlaModal.tsx";
import {createGoodsReceipt, updateGoodsReceipt} from "../../state/goods-receipt/goodsReceiptAction.ts";
import {generateUniqueCode} from "../../utils";
import {MenuLinks} from "../../utils/menu-links.ts";
import {setGoodsReceipt} from "../../state/goods-receipt/goodsReceiptSlice.ts";


const GoodsReceiptForm: React.FC = () => {
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
        values.userId = user?.id;
        values.supplierId = supplier?.id;
        values.totalAmount = 0;
        values.receiptNumber = generateUniqueCode("REC-", 12);
        ((state?.data && state?.data?.id) ? dispatch(updateGoodsReceipt({ data: values, id: state?.data?.id}))
            : dispatch(createGoodsReceipt(values)))
            .then(unwrapResult)
            .then((record: any) => {
                TlaSuccess("Successful");
                dispatch(setGoodsReceipt(record));
                navigate(MenuLinks.admin.supplier.details.receipt.items);
                setLoading(false);
            })
            .catch((err) => {
                TlaError(err?.message ?? "");
                setLoading(false);
            })
    }

    return (
        <TlaModal title={"Goods Receipt"} loading={loading}>
            <Form requiredMark={false} form={form} onFinish={onFinish} initialValues={{...state?.data}} size={'large'} layout={"vertical"}>
               <br/>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                    <Form.Item className="col-span-2"
                        rules={[
                            {
                                required: true,
                                message: "Required"
                            }
                        ]}
                        name={"date"}  label={"Date *"}>
                        <Input type={'date'}/>
                    </Form.Item>
                    <Form.Item className={'col-span-2'}
                               name={"conditionOfGoods"} label={"Goods Condition (optional)"}>
                        <Input.TextArea placeholder={'well packaged.'}/>
                    </Form.Item>


                </div>
                <Button className={'btn-red flex ml-auto'} htmlType={"submit"}>
                    Save
                </Button>
            </Form>
        </TlaModal>
    )
}

export default GoodsReceiptForm;
