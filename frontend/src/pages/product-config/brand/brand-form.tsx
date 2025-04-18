import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {TlaError, TlaSuccess} from "../../../utils/messages.ts";
import {createBrand, getAllBrands, updateBrand} from "../../../state/brand/brandAction.ts";
import {TlaModal} from "../../../common/pop-ups/TlaModal.tsx";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import DropdownSearch from "../../../common/dropdown-search.tsx";
import {Brand} from "../../../types/brand.ts";
import {commonQuery} from "../../../utils/query.ts";

const BrandForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm<any>();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);

    const onFinish = (values: any) => {
        setLoading(true);
        values.companyId = user?.companyId;
        ((state?.data && state?.data?.id) ? dispatch(updateBrand({ data: values, id: state?.data?.id})) : dispatch(createBrand(values)))
            .then(unwrapResult)
            .then(() => {
                TlaSuccess("Successful")
                setLoading(true)
                navigate(-1)
            })
            .catch((err) => {
                TlaError(err?.message ?? "")
                setLoading(false)
            })
    }



    return (
        <TlaModal title={"Brands"} loading={loading}>
            <Form requiredMark={false} form={form} onFinish={onFinish} initialValues={{...state?.data}} size={'large'} layout={"vertical"}>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                    <Form.Item className={'col-span-2'}
                       rules={[
                           {
                               required: true,
                               message: "Required"
                           }
                       ]}
                       name={"name"} label={"Name *"}>
                        <Input/>
                    </Form.Item>

                    <Form.Item className={'col-span-2'}
                               name={"brandId"} label={"Parent Brand (optional)"}>
                        <DropdownSearch
                            defaultValue={state?.data?.parent?.name}
                            object
                            searchApi={getAllBrands}
                            extraParams={commonQuery()}
                            placeholder="click to select brand"
                            setResult={(brand: Brand) => {
                                if (brand) {
                                    form.setFieldValue('brandId', brand?.id);
                                    return
                                }
                                form.setFieldValue('brandId', null)
                            }}
                        />
                    </Form.Item>
                </div>
                <Button block className={'btn-red'} htmlType={"submit"}>
                    Save
                </Button>
            </Form>
        </TlaModal>
    )
}

export default BrandForm
