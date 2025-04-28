import React, {useState} from "react";
import {Button, Form, Spin} from "antd";
import {useNavigate} from "react-router-dom";
import TlaDrawer from "../../../common/pop-ups/TlaDrawer.tsx";
import StockAdjustmentFormContent from "./stock-adjustment-form-content.tsx";

const StockAdjustmentItemForm: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [current] = useState<number>(0);


    return (
            <TlaDrawer title={"Stock Adjustment Items"} className="p-5">
            <Spin spinning={loading}>
                <div>
                    <StockAdjustmentFormContent setLoading={setLoading} form={form}/>
                    <div className={'fixed bottom-0 right-0 z-10 px-5 py-2 bg-white border-t w-full md:w-[50%]'}>
                        <div className={'w-fit ml-auto flex items-center gap-3'}>
                            {
                                current === 1 &&
                                <Button size={'large'} className={'btn-red'} onClick={() => {navigate(-1)}}>
                                    Cancel
                                </Button>
                            }
                            <Button size={'large'} className={'btn-red'} type="primary" onClick={() => form.submit()}>
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            </Spin>
        </TlaDrawer>
    )
}

export default StockAdjustmentItemForm
