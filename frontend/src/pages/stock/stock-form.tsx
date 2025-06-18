import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import { getAllWarehouses} from "../../state/warehouse/warehouseAction.ts";
import {TlaError, TlaSuccess} from "../../utils/messages.ts";
import {TlaModal} from "../../common/pop-ups/TlaModal.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks";
import DropdownSearch from "../../common/dropdown-search.tsx";
import {getAllProducts} from "../../state/product/productAction.ts";
import {commonQuery} from "../../utils/query.ts";
import {Product} from "../../types/product.ts";
import {createStock, updateStock} from "../../state/stock/stockAction.ts";


const StockForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm<any>();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);

    const onFinish = (values: any) => {
        setLoading(true);
        values.companyId = user?.companyId;

        ((state?.data && state?.data?.id) ?
            dispatch(updateStock({ data: values, id: state?.data?.id})) :
            dispatch(createStock(values)))
            .then(unwrapResult)
            .then(() => {
                TlaSuccess("Successful")
                setLoading(true)
                navigate(-1)
            })
            .catch((err: any) => {
                TlaError(err?.message ?? "")
                setLoading(false)
            })
    }

    return (
        <TlaModal title={"Stocks"} loading={loading}>
            <Form requiredMark={false} form={form} onFinish={onFinish} 
                initialValues={{...state?.data}} size={'large'} layout={"vertical"}>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>

                    <Form.Item name={"productId"} label={"Product"}>
                        <DropdownSearch
                            object 
                            disabled={true}
                            defaultValue={state?.data?.product?.name}
                            searchApi={getAllProducts}
                            placeholder="click to select product"
                            extraParams={commonQuery()}
                            setResult={(product: Product) => {
                                if (product) {
                                    form.setFieldValue('productId', product?.id);
                                    return
                                }
                                form.setFieldValue('productId', null)
                            }}/>
                    </Form.Item>

                    <Form.Item
                        rules={[
                            { required: true, message: "Required" }
                        ]}
                        name={"wareHouseId"}
                        label={"Warehouse"}>
                        <DropdownSearch
                            defaultValue={state?.data?.warehouse}
                            object
                            searchApi={getAllWarehouses}
                            placeholder="click to select warehouse"
                            extraParams={commonQuery()}
                            setResult={(warehouse: Product) => {
                                if (warehouse) {
                                    form.setFieldValue('wareHouseId', warehouse?.id);
                                    return
                                }
                                form.setFieldValue('wareHouseId', null)
                            }}/>
                    </Form.Item>

                    <Form.Item
                       name={"stockAlertLevel"} label={"Stock Alert Level *"}
                        rules={[{ required: true, message: "Required" }]}>
                        <Input type={'number'}/>
                    </Form.Item>

                    {/*<Form.Item*/}
                    {/*    rules={[*/}
                    {/*        {*/}
                    {/*            required: true,*/}
                    {/*            message: "Required"*/}
                    {/*        }*/}
                    {/*    ]}*/}
                    {/*    name={"locationInWarehouse"} label={"Location in warehouse *"}>*/}
                    {/*    <Input/>*/}
                    {/*</Form.Item>*/}
                </div>
               <div>
                   <Button className={'btn-red block ml-auto'} htmlType={"submit"}>
                       Save
                   </Button>
               </div>
            </Form>
        </TlaModal>
    )
}

export default StockForm
