import React from "react";
import {Button, Form, Input, Select, Space} from "antd";
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
    createBulkStockAdjustmentItems,
    getAllStockAdjustmentItems
} from "../../../state/stock-adjustment-item/stockAdjustmentItemAction.ts";


interface Props {
    setLoading: (loading: boolean) => void;
    form: any;
}

const StockAdjustmentFormContent: React.FC<Props> = ({setLoading, form}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const adjustment = useAppSelector(state => state.stockAdjustment.stockAdjustmentItem);
    const user = useAppSelector(state => state.auth.user);


    const onFinish = (values: any) => {
        setLoading(true);

        const stockAdjustmentItem = values.stockAdjustmentItem.map((item: any) => {
            const record = item;
            record.adjustedQuantity = (item.status == "addition") ? +item.adjustedQuantity : (item.adjustedQuantity * -1);
            record.adjustmentId = adjustment.id;
            record.companyId = user?.companyId;
            return record;
        });
        

        dispatch(createBulkStockAdjustmentItems(stockAdjustmentItem))
            .then(unwrapResult).then(() => {
            dispatch(getAllStockAdjustmentItems(commonQuery(`&adjustmentId[eq]=${adjustment?.id}`)));
            setLoading(false);
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

            <Form.List name="stockAdjustmentItem">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    rules={[{required: true, message: "Required"}]}
                                    className={'col-span-2'}
                                    name={[name, "productId"]} label={"Product *"}>
                                    <DropdownSearch
                                        // defaultValue={state?.data?.product}
                                        object
                                        searchApi={getAllProducts}
                                        extraParams={commonQuery()}
                                        placeholder="click to select product"
                                        setResult={(product: Product) => {
                                            if (product) {
                                                form.setFieldValue(["stockAdjustmentItem", name, "productId"], product.id)
                                                return
                                            }
                                            form.setFieldValue(["stockAdjustmentItem", name, "productId"], null)
                                        }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name={[name, "adjustedQuantity"]} label={"Adjusting Quantity *"}
                                    rules={[{ required: true, message: "Required" }]}>
                                    <Input type="number" min={'0'}/>
                                </Form.Item>

                                <Form.Item
                                    name={[name, "status"]}
                                    label={'Status *'}
                                    rules={[{required: true, message: "Required"}]}>
                                    <Select defaultValue={null}>
                                        <Select.Option key={0} value={null}>Choose One</Select.Option>
                                        <Select.Option key={1} value={'addition'}>Addition</Select.Option>
                                        <Select.Option key={2} value={'subtraction'}>Subtract</Select.Option>
                                    </Select>
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

export default StockAdjustmentFormContent
