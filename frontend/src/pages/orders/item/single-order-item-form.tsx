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
import {updateOrderItem} from "../../../state/orders/item/orderItemAction.ts";
import {Order} from "../../../types/order.ts";


const SingleOrderItemForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm<any>();
    const navigate = useNavigate();
    const order: Order = useAppSelector(state => state.order.orderItem);

    const onFinish = (values: any) => {
        setLoading(true);
        values.orderId = order?.id;

        dispatch(updateOrderItem({ data: values, id: state?.data?.id}))
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
        <TlaModal title={"Order Item"} loading={loading}>
            <Form requiredMark={false} form={form} onFinish={onFinish} initialValues={{...state?.data}} size={'large'} layout={"vertical"}>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>

                    <Form.Item
                        rules={[{required: true, message: "Required"}]}
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
                        name={"quantity"} label={"Quantity *"}
                        rules={[{ required: true, message: "Required" }]}>
                        <Input type="number" min={'0'}/>
                    </Form.Item>

                    <Form.Item
                        name={"unitPriceAtSale"} label={"Unit Price (optional)"}>
                        <Input placeholder={'Auto Detect'} type="number" step={'any'} min={'0'}/>
                    </Form.Item>

                    <Form.Item name={'totalCost'} label={'Previous Total Cost'}>
                        <Input disabled={true} />
                    </Form.Item>
                </div>
                <Button className={'btn-red flex ml-auto'} htmlType={"submit"}>
                    Save
                </Button>
            </Form>
        </TlaModal>
    )
}

export default SingleOrderItemForm
