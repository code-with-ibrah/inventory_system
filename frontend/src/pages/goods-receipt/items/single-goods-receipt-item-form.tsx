import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {TlaError, TlaSuccess } from "../../../utils/messages.ts";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {TlaModal} from "../../../common/pop-ups/TlaModal.tsx";
import DropdownSearch from "../../../common/dropdown-search.tsx";
import {getAllProducts} from "../../../state/product/productAction.ts";
import {commonQuery} from "../../../utils/query.ts";
import {Product} from "../../../types/product.ts";
import {updateGoodsReceiptItem} from "../../../state/goods-receipt/items/goodsReceiptItemAction.ts";


const SingleGoodsReceiptItemForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm<any>();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);
    const goodsReceiptItem = useAppSelector(state => state.goodsReceipt.goodsReceiptItem);

    const onFinish = (values: any) => {
        setLoading(true);
        values.companyId = user?.companyId;
        values.goodsReceiptId = goodsReceiptItem?.id;

        dispatch(updateGoodsReceiptItem({ data: values, id: state?.data?.id}))
            .then(unwrapResult)
            .then(() => {
                TlaSuccess("Successful");
                setLoading(false);
                navigate(-1);
            })
            .catch((err) => {
                TlaError(err?.message ?? "");
                setLoading(false);
            })
    }


    return (
        <TlaModal title={"Goods Receipt Item"} loading={loading}>
            <Form requiredMark={false} form={form} onFinish={onFinish}
                  initialValues={{...state?.data}} size={'large'} layout={"vertical"}>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>

                    <Form.Item
                        rules={[{required: true, message: "Required"}]}
                        className={'col-span-2'}
                        name={"productId"} label={"Product *"}>
                        <DropdownSearch
                            object
                            defaultValue={state?.data?.product?.name}
                            searchApi={getAllProducts}
                            extraParams={commonQuery()}
                            placeholder="click to select product"
                            setResult={(product: Product) => {
                                if (product) {
                                    form.setFieldValue("productId", product.id)
                                    return
                                }
                                form.setFieldValue("productId", null)
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name={"quantityReceived"} label={"Quantity *"}
                        rules={[{ required: true, message: "Required" }]}>
                        <Input type="number" min={'0'}/>
                    </Form.Item>

                    <Form.Item
                        name={"unitPriceAtReceipt"} label={"Unit Price *"}
                        rules={[{ required: true, message: "Required" }]}>
                        <Input type="number" min={'0'}/>
                    </Form.Item>

                </div>
                <Button className={'btn-red flex ml-auto'} htmlType={"submit"}>
                    Save
                </Button>
            </Form>
        </TlaModal>
    )
}

export default SingleGoodsReceiptItemForm
