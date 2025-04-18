import React, {useState} from "react";
import {Button, Form} from "antd";
import {useLocation} from "react-router-dom";
import { useAppSelector } from "../../hooks";
import {getAllSuppliers} from "../../state/supplier/supplierAction.ts";
import {Supplier} from "../../types/supplier.ts";
import {TlaModal} from "../../common/pop-ups/TlaModal.tsx";
import DropdownSearch from "../../common/dropdown-search.tsx";
import {commonQuery} from "../../utils/query.ts";


const ProductSupplier: React.FC = () => {
    const { state } = useLocation();
    // const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm<any>();
    // const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);
    // const product: Product = useAppSelector(state => state.product.productItem);

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
        <TlaModal title={"Add Product's Supplier"} loading={loading}>
            <Form requiredMark={false} form={form} onFinish={onFinish} initialValues={{...state?.data}} size={'large'} layout={"vertical"}>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                    <br/>
                    <Form.Item name={"supplierId"}
                               label={"Supplier"}
                               className={'col-span-2'}>
                        <DropdownSearch
                            object
                            searchApi={getAllSuppliers}
                            placeholder="click to select supplier"
                            extraParams={commonQuery("&productId[neq]=7")}
                            setResult={(supplier: Supplier) => {
                                if (supplier) {
                                    form.setFieldValue('supplierId', supplier?.id);
                                    return
                                }
                                form.setFieldValue('supplierId', null)
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

export default ProductSupplier
