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
import {
    createBulkGoodsReceiptItems,
    getAllGoodsReceiptItems
} from "../../../state/goods-receipt/items/goodsReceiptItemAction.ts";


interface Props {
    setLoading: (loading: boolean) => void;
    form: any;
}

const GoodsReceiptFormContent: React.FC<Props> = ({setLoading, form}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const selectedGoodsReceiptItem = useAppSelector(state => state.goodsReceipt.goodsReceiptItem);
    const user = useAppSelector(state => state.auth.user);


    const onFinish = (values: any) => {
        setLoading(true);
        const goodsReceiptItem = values.goodsReceiptItem.map((item: any) => {
            const record = item;
            record.companyId = user?.companyId;
            record.goodsReceiptId = selectedGoodsReceiptItem?.id;
            return record;
        });

        

        dispatch(createBulkGoodsReceiptItems(goodsReceiptItem))
            .then(unwrapResult).then(() => {
            setLoading(false);
            dispatch(getAllGoodsReceiptItems(
                commonQuery(`&goodsReceiptId[eq]=${selectedGoodsReceiptItem?.id}`))
            );
            TlaSuccess("Success");
            navigate(-1);
        }).catch((err: any) => {
            TlaError(err?.message ?? "");
            setLoading(false);
            // navigate(-1);
        });
    };


    return (
        <Form initialValues={{}} requiredMark={false} size={'large'} onFinish={onFinish} form={form} layout="vertical">

            <Form.List name="goodsReceiptItem">
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
                                        extraParams={commonQuery()}
                                        placeholder="click to select product"
                                        setResult={(product: Product) => {
                                            if (product) {
                                                form.setFieldValue(["goodsReceiptItem", name, "productId"], product.id)
                                                return
                                            }
                                            form.setFieldValue(["goodsReceiptItem", name, "productId"], null)
                                        }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name={[name, "quantityReceived"]} label={"Quantity *"}
                                    rules={[{ required: true, message: "Required" }]}>
                                    <Input type="number" min={'0'}/>
                                </Form.Item>

                                <Form.Item
                                    name={[name, "unitPriceAtReceipt"]} label={"Unit Price *"}
                                    rules={[{ required: true, message: "Required" }]}>
                                    <Input type="number" min={'0'}/>
                                </Form.Item>


                                <Button onClick={() => remove(name)} className={'btn-red'} style={{ position: 'relative', top: 40}}>
                                    <AiFillMinusCircle />
                                </Button>
                            </Space>
                        ))}
                        <div style={{ width: "150px"}}>
                        <Button className="w-fit" type="dashed" onClick={() => add()} block icon={<FiPlusCircle />}>
                                New Item
                            </Button>
                        </div>
                    </>
                )}
            </Form.List>

        </Form>
    )
}

export default GoodsReceiptFormContent
