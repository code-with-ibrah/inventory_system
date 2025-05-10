import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {commonQuery} from "../../utils/query.ts";
import {Order} from "../../types/order.ts";
import {getAllOrderItems} from "../../state/orders/item/orderItemAction.ts";
import { Form, Input} from "antd";
import {TlaModal} from "../../common/pop-ups/TlaModal.tsx";


const OrdersInvoiceForm = () => {
    const order: Order = useAppSelector(state => state.order.orderItem);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllOrderItems(commonQuery(`&orderId[eq]=${order?.id}`)));
    }, []);


    return <>
        <TlaModal title={"Orders"} loading={false}>
            <Form requiredMark={false} size={'large'} layout={"vertical"}>
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
                        name={"originalPrice"} label={"Amount *"}>
                        <Input type={'number'} min={'0'} step={'any'} placeholder={'8952.78'}/>
                    </Form.Item>

                    <Form.Item
                        name={"discount"} label={"Discount (optional)"}>
                        <Input type={'number'} min={'0'} max={'100'} placeholder={'50%'}/>
                    </Form.Item>
                </div>
                
            </Form>
        </TlaModal>
    </>
}


export default OrdersInvoiceForm;