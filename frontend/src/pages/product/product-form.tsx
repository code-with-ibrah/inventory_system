 import React, {useState} from "react";
import {Button, Form, Input, InputNumber, Upload, Image} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {UploadOutlined} from "@ant-design/icons";
 import {useAppDispatch} from "../../hooks";
 import {createPayloadWithImage, handleImageChange} from "../../utils/image-upload.tsx";
 import {createProduct, getAllProducts, updateProduct} from "../../state/product/productAction.ts";
 import {TlaError, TlaSuccess} from "../../utils/messages.ts";
 import {TlaModal} from "../../common/pop-ups/TlaModal.tsx";
 import DropdownSearch from "../../common/dropdown-search.tsx";
 import {Product} from "../../types/product";


const ProductForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [imageFile, setImageFile] =  useState<Blob | MediaSource | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<Blob | MediaSource | null>(null);
    const [form] = Form.useForm();


    const onFinish = (values: any) => {
        const formData = createPayloadWithImage(values, imageFile, thumbnailFile);
        setLoading(true);
        ((state?.data && state?.data?.id) ? dispatch(updateProduct({ data: formData, id: state?.data?.id})) : dispatch(createProduct(formData)))
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
        <TlaModal title={"Award"} loading={loading}>
            <Form form={form} requiredMark={false} onFinish={onFinish} initialValues={{...state?.data}} size={'large'}
                  layout={"vertical"}>
                <div className={'grid grid-cols-3 md:grid-cols-3 gap-2'}>
                    <Form.Item label="Image">
                        <Upload
                            name="image"
                            listType="picture-card"
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={(file) => handleImageChange(file, setImageFile, setThumbnailFile)}>
                            {
                                imageFile ? (<img src={URL.createObjectURL(imageFile)} alt="avatar" style={{
                                    width: '100%',
                                    borderRadius: '10px',
                                    marginTop: '25px',
                                    maxHeight: '135px',
                                }}/>) : (
                                    <div>
                                        <UploadOutlined/>
                                        <div className="ant-upload-text">Upload</div>
                                    </div>
                                )}
                        </Upload>

                        {state?.data?.id && <Image
                            className={'thumbnail-img'}
                            width={50}
                            src={state?.data?.thumbnail}
                            preview={{ src: state?.data?.image }}
                        />}
                    </Form.Item>

                    <div className={'col-span-2 grid grid-cols-1 gap-2'}>

                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: "Required"
                                }
                            ]}
                            name={"code"} label={"Code"}>
                            <Input readOnly={(state?.data?.id > 0)}/>
                        </Form.Item>

                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: "Required"
                                }
                            ]}
                            name={"name"} label={"Name"}>
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            style={{ marginTop: '-15px' }}
                            className={'col-span-2'}
                            rules={[
                                {
                                    required: true,
                                    message: "Required"
                                }
                            ]}
                            name={"systemPercentage"} label={"Percentage *"}>
                            <Input/>
                        </Form.Item>
                    </div>
                </div>


                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>

                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Required"
                            }
                        ]}
                        name={"costPerVote"} label={"Cost Per Vote"}>
                        <InputNumber style={{width: '100%'}}/>
                    </Form.Item>

                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Required"
                            }
                        ]}
                        name={"userCode"} label={"Organisation *"}>
                        <DropdownSearch
                            defaultValue={state?.data?.organisation?.name}
                            object
                            searchApi={getAllProducts}
                            placeholder="click to select organisation"
                            setResult={(product: Product) => {
                                if (product) {
                                    form.setFieldValue('productId', product.id);
                                    return
                                }

                                form.setFieldValue('productId', null)
                            }}
                        />
                    </Form.Item>
                </div>


                    <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: "Required"
                                }
                            ]}
                            name={"startDate"} label={"Start Date"}>
                            <Input type={'date'}/>
                        </Form.Item>

                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: "Required"
                                }
                            ]}
                            name={"endDate"} label={"End Date"}>
                            <Input type={'date'}/>
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

export default ProductForm