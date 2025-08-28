import React from "react";
import {Button, Form, Input, Space} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useNavigate} from "react-router-dom";
import {AiFillMinusCircle} from "react-icons/ai";
import {FiPlusCircle} from "react-icons/fi";
import {getAllProducts} from "../../../state/product/productAction.ts";
import { TlaError, TlaSuccess } from "../../../utils/messages.ts";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import DropdownSearch from "../../../common/dropdown-search.tsx";
import {commonQuery} from "../../../utils/query.ts";
import {Product} from "../../../types/product.ts";
import {Order} from "../../../types/order.ts";
import {createBulkOrderItems, getAllOrderItems} from "../../../state/orders/item/orderItemAction.ts";
import {setOrderItem} from "../../../state/orders/orderSlice.ts";


interface Props {
    setLoading: (loading: boolean) => void;
    form: any;
}

const OrderItemFormContent: React.FC<Props> = ({setLoading, form}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const order: Order = useAppSelector(state => state.order.orderItem);


    const onFinish = (values: any) => {
        setLoading(true);

        const uniqueItems: any[] = [];
        const seenItemIds = new Set();

        values.orderItem.forEach((item: any) => {
            if (!seenItemIds.has(item.productId)) {
                seenItemIds.add(item.productId);
                uniqueItems.push(item);
            }
        });

        const orderItem = uniqueItems.map((item: any) => {
            const record = { ...item };
            record.orderId = order?.id;
            return record;
        });

        dispatch(createBulkOrderItems(orderItem))
            .then(unwrapResult).then((result: Order) => {
                const currentOrder = result;
                currentOrder.totalPayments = order.totalPayments;
            dispatch(setOrderItem(currentOrder));
            dispatch(getAllOrderItems(commonQuery(`&orderId[eq]=${order?.id}`)))
                .then(() => {
                    setLoading(false);
                    TlaSuccess("Success");
                })
            navigate(-1);
        }).catch((err: any) => {
            TlaError(err?.message ?? "");
            setLoading(false);
            // navigate(-1);
        });
    };


    return (
        <Form initialValues={{}} requiredMark={false} size={'large'} onFinish={onFinish} form={form} layout="vertical">

            <Form.List name="orderItem">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    rules={[{required: true, message: "Required"}]}
                                    className={'col-span-2'}
                                    name={[name, "productId"]} label={"Product *"}>
                                    <DropdownSearch
                                        object
                                        searchApi={getAllProducts}
                                        extraParams={commonQuery("&fetch-all")}
                                        placeholder="click to select product"
                                        setResult={(product: Product) => {
                                            if (product) {
                                                form.setFieldValue(["orderItem", name, "productId"], product.id)
                                                return
                                            }
                                            form.setFieldValue(["orderItem", name, "productId"], null)
                                        }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name={[name, "quantity"]} label={"Quantity*"}
                                    rules={[
                                        { required: true, message: "Quantity is required." },
                                        {
                                            validator: (_, value) => {
                                                const numValue = Number(value);
                                                if (isNaN(numValue) || numValue <= 0) {
                                                    return Promise.reject(new Error('Quantity must be greater than zero.'));
                                                }
                                                else if(numValue.toString().indexOf(".") > -1){
                                                    return Promise.reject(new Error('Quantity must be whole numbers.'));
                                                }
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}>
                                    <Input type="number" step={1} min={'1'}/>
                                </Form.Item>

                                <Form.Item
                                    name={[name, "unitPriceAtSale"]} label={"Unit Price (optional)"}>
                                    <Input placeholder={'Auto Detect'} type="number" min={'0'}/>
                                </Form.Item>


                                <Button onClick={() => remove(name)} className={'btn-red'} style={{ position: 'relative', top: 40}}>
                                    <AiFillMinusCircle />
                                </Button>
                            </Space>
                        ))}
                        <div style={{ width: "150px"}}>
                        <Button className="w-fit" type="dashed" onClick={() => add()} block icon={<FiPlusCircle />}>
                                New Product
                            </Button>
                        </div>
                    </>
                )}
            </Form.List>

        </Form>
    )
}

export default OrderItemFormContent
