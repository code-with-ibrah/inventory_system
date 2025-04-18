import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {TlaError, TlaSuccess} from "../../utils/messages.ts";
import {TlaModal} from "../../common/pop-ups/TlaModal.tsx";
import {createSupplier, updateSupplier} from "../../state/supplier/supplierAction.ts";
import DropdownSearch from "../../common/dropdown-search.tsx";
import {Category} from "../../types/category.ts";
import {getAllProducts} from "../../state/product/productAction.ts";
import {Product} from "../../types/product.ts";


const SupplierForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const user = useAppSelector(state => state.auth.user);

    const onFinish = (values: any) => {
        values.companyId = user?.companyId;
        setLoading(true);
        ((state?.data && state?.data?.id) ? dispatch(updateSupplier({ data: values, id: state?.data?.id})) :
            dispatch(createSupplier(values)))
            .then(unwrapResult)
            .then(() => {
                TlaSuccess("Successful");
                setLoading(false);
                navigate(-1);
            })
            .catch((obj) => {
                TlaError(obj?.message);
                setLoading(false);
            });
    };

    return (
        <TlaModal title={"Supplier"} loading={loading}>
            <Form form={form} requiredMark={false} onFinish={onFinish} initialValues={{...state?.data}} size={'large'}
                  layout={"vertical"}>
                <br/>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>

                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Required"
                            }
                        ]}
                        name={"name"} label={"Name *"}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Required"
                            }
                        ]}
                        name={"phone"} label={"Phone *"}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Required"
                            }
                        ]}
                        name={"companyName"} label={"Company Name *"}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Required"
                            }
                        ]}
                        name={"email"} label={"Email *"}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Required"
                            }
                        ]}
                        name={"registrationDate"} label={"Registration Date"}>
                        <Input type={'date'}/>
                    </Form.Item>

                    {/*<Form.Item name={"productId"} label={"Product (optional)"}>*/}
                    {/*    <DropdownSearch*/}
                    {/*        defaultValue={state?.data?.product?.name}*/}
                    {/*        object*/}
                    {/*        extraParams={"&isDeleted[eq]=0&isActive[eq]=1"}*/}
                    {/*        searchApi={getAllProducts}*/}
                    {/*        placeholder="click to select product"*/}
                    {/*        setResult={(product: Product) => {*/}
                    {/*            if (product) {*/}
                    {/*                form.setFieldValue('productId', product?.id);*/}
                    {/*                return*/}
                    {/*            }*/}
                    {/*            form.setFieldValue('productId', null)*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</Form.Item>*/}

                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Required"
                            }
                        ]}
                        name={"addressLineOne"} label={"Address Line One*"}>
                        <Input.TextArea/>
                    </Form.Item>


                    <Form.Item
                        className={'col-span-2'}
                        rules={[
                            {
                                required: true,
                                message: "Required"
                            }
                        ]}
                        name={"addressLineTwo"} label={"Address Line Two *"}>
                        <Input.TextArea/>
                    </Form.Item>

                </div>

                    <div className={'w-fit ml-auto'}>
                        <Button className={'btn-red'} htmlType={"submit"}>
                            Save
                        </Button>
                    </div>
            </Form>
        </TlaModal>
)
};

export default SupplierForm