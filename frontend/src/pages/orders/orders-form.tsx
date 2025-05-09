import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {TlaError, TlaSuccess} from "../../utils/messages.ts";
import {TlaModal} from "../../common/pop-ups/TlaModal.tsx";
import DropdownSearch from "../../common/dropdown-search.tsx";
import {commonQuery} from "../../utils/query.ts";
import {generateUniqueCode} from "../../utils";
import {getAllCustomers} from "../../state/customer/customerAction.ts";
import {Customer} from "../../types/customer.ts";
import {getAllInstallmentPlans} from "../../state/installment-plan/installmentPlanAction.ts";
import {InstallmentPlan} from "../../types/installment-plan.ts";
import {createOrders, updateOrders} from "../../state/orders/receiptAction.ts";


const OrdersForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm<any>();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);

    const onFinish = (values: any) => {
        setLoading(true);
        values.companyId = user?.companyId;
        values.userId = user?.id;
        values.orderNumber = generateUniqueCode("ORD-", 12);
        ((state?.data && state?.data?.id) ? dispatch(updateOrders({ data: values, id: state?.data?.id}))
            : dispatch(createOrders(values)))
            .then(unwrapResult)
            .then(() => {
                TlaSuccess("Successful");
                setLoading(true);
                navigate(-1);
            })
            .catch((err) => {
                TlaError(err?.message ?? "");
                setLoading(false);
            })
    }

    return (
        <TlaModal title={"Orders"} loading={loading}>
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
                        <Input type={'number'} min={'0'} step={'any'} placeholder={'8952.78'}/>
                    </Form.Item>

                    <Form.Item
                        rules={[{required:true, message:"Required"}]}
                        name={"customerId"} label={"Customer"}>
                        <DropdownSearch
                            defaultValue={state?.data?.customer?.name}
                            object
                            searchApi={getAllCustomers}
                            placeholder="click to select customer"
                            extraParams={commonQuery()}
                            setResult={(customer: Customer) => {
                                if (customer) {
                                    form.setFieldValue('customerId', customer?.id);
                                    return
                                }
                                form.setFieldValue('customerId', null)
                            }}/>
                    </Form.Item>

                    <Form.Item
                        rules={[{required:true, message:"Required"}]}
                        name={"installmentPlanId"} label={"Installment Plan *"}>
                        <DropdownSearch
                            defaultValue={state?.data?.installmentPlan?.name}
                            object
                            searchApi={getAllInstallmentPlans}
                            placeholder="click to select plan"
                            extraParams={commonQuery()}
                            setResult={(installment: InstallmentPlan) => {
                                if (installment) {
                                    form.setFieldValue('installmentPlanId', installment?.id);
                                    return
                                }
                                form.setFieldValue('installmentPlanId', null)
                            }}/>
                    </Form.Item>

                    {/*<Form.Item*/}
                    {/*    rules={[{required:true, message:"Required"}]}*/}
                    {/*    name={"paymentMethod"} label={"Payment Method"}>*/}
                    {/*    <Select defaultValue={null}>*/}
                    {/*        <Select.Option key={0} value={null}>Choose one</Select.Option>*/}
                    {/*        <Select.Option key={1} value="Physical Cash">Physical Cash</Select.Option>*/}
                    {/*        <Select.Option key={2} value="Mobile Money (MoMo)">Mobile Money (MoMo)</Select.Option>*/}
                    {/*        <Select.Option key={3} value="Bank Transfer">Bank Transfer</Select.Option>*/}
                    {/*        <Select.Option key={4} value="Cheque">Cheque</Select.Option>*/}
                    {/*    </Select>*/}
                    {/*</Form.Item>*/}


                    <Form.Item className={'col-span-2'}
                        name={"discount"} label={"Discount (optional)"}>
                        <Input type={'number'} placeholder={'50%'}/>
                    </Form.Item>

                </div>
                <Button className={'btn-red flex ml-auto'} htmlType={"submit"}>
                    Save
                </Button>
            </Form>
        </TlaModal>
    )
}

export default OrdersForm;
