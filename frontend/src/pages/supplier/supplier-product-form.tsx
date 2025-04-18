import React, {useState} from "react";
import {Button, Form} from "antd";
import {useLocation} from "react-router-dom";
import {useAppSelector} from "../../hooks";
import {TlaModal} from "../../common/pop-ups/TlaModal.tsx";
import DropdownSearch from "../../common/dropdown-search.tsx";
import {getAllProducts} from "../../state/product/productAction.ts";
import {commonQuery} from "../../utils/query.ts";
import {Product} from "../../types/product.ts";


const SupplierProductForm: React.FC = () => {
    const { state } = useLocation();
    // const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm<any>();
    // const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);

    const onFinish = (values: any) => {
        setLoading(true);
        values.companyId = user?.companyId;
        setLoading(false);
        // ((state?.data && state?.data?.id) ? dispatch(updateCategory({ data: values, id: state?.data?.id}))
        //     : dispatch(createCategory(values)))
        //     .then(unwrapResult)
        //     .then(() => {
        //         TlaSuccess("Successful")
        //         setLoading(true)
        //         navigate(-1)
        //     })
        //     .catch((err) => {
        //         TlaError(err?.message ?? "")
        //         setLoading(false)
        //     })
    }



    return (
        <TlaModal title={"Supplier's Product"} loading={loading}>
            <Form requiredMark={false} form={form} onFinish={onFinish} initialValues={{...state?.data}} size={'large'} layout={"vertical"}>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                    <br/>
                    <Form.Item className={'col-span-2'}
                               name={"productId"} label={"Product"}>
                        <DropdownSearch
                            object
                            searchApi={getAllProducts}
                            placeholder="click to select product"
                            extraParams={commonQuery()}
                            setResult={(product: Product) => {
                                if (product) {
                                    form.setFieldValue('productId', product?.id);
                                    return
                                }
                                form.setFieldValue('productId', null)
                            }}
                        />
                    </Form.Item>

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

export default SupplierProductForm
