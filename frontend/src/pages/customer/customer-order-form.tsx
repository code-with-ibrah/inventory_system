import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {TlaError, TlaSuccess} from "../../utils/messages.ts";
import {TlaModal} from "../../common/pop-ups/TlaModal.tsx";
import {commonQuery} from "../../utils/query.ts";
import {generateUniqueCode} from "../../utils";
import {createOrders, updateOrders} from "../../state/orders/receiptAction.ts";
import {setOrderItem} from "../../state/orders/orderSlice.ts";
import {Order} from "../../types/order.ts";
import {MenuLinks} from "../../utils/menu-links.ts";
import {getAllOrderItems} from "../../state/orders/item/orderItemAction.ts";


const CustomerOrderForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm<any>();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);
    const order = useAppSelector(state => state.order.orderItem);
    const customer = useAppSelector(state => state.customer.customerItem);

    const formData = {...state?.data };
    formData.originalPrice = order?.amount;


    const onFinish = (values: any) => {
        setLoading(true);
        values.companyId = user?.companyId;
        values.userId = user?.id;
        values.amount = values.originalPrice;
        values.orderNumber = generateUniqueCode("ORD-", 12);
        values.discount = (values.discount) ? values.discount : 0.00;
        values.amount = (values.amount) ? values.amount : 0.00;
        values.customerId = customer?.id;

        if((state?.data && state?.data?.id))
        {
            dispatch(updateOrders({ data: values, id: state?.data?.id}))
                .then(unwrapResult)
                .then((res: Order) => {
                    dispatch(setOrderItem(res));
                    navigate(-1);
                    setLoading(false);
                })
                .catch((err) => {
                    TlaError(err?.message ?? "");
                    setLoading(false);
            })
        }
        else
        {
            dispatch(createOrders(values))
                .then(unwrapResult)
                .then((record: any) => {
                    TlaSuccess("Successful");
                    dispatch(setOrderItem(record));
                    dispatch(getAllOrderItems(commonQuery(`&orderId[eq]=${record?.id}`)));
                    // navigate(MenuLinks.admin.order.details.index);
                    navigate(MenuLinks.admin.order.details.products);
                    setLoading(false)
                })
                .catch((err) => {
                    TlaError(err?.message ?? "");
                    setLoading(false);
                })
        }
    }

    return (
        <TlaModal title={"Orders"} loading={loading}>
            <Form requiredMark={false} form={form} onFinish={onFinish} initialValues={{...formData}} size={'large'} layout={"vertical"}>
               <br/>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Required"
                            }
                        ]}
                        name={"site"} label={"Site *"}>
                        <Input type={'input'} placeholder={'eg. Takoradi'}/>
                    </Form.Item>

                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Required"
                            }
                        ]}
                        name={"date"} label={"Date *"}>
                        <Input type={'date'}/>
                    </Form.Item>

                </div>

                <Button className={'btn-red flex ml-auto'} htmlType={"submit"}>
                    Save
                </Button>
            </Form>
        </TlaModal>
    )
}

export default CustomerOrderForm;
