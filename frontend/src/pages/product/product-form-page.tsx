 import React, {useState} from "react";
import {Button, Form, Input, InputNumber, Upload, Image, Select, Spin} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
 import {useAppDispatch} from "../../hooks";
 import {createPayloadWithImage, handleImageChange} from "../../utils/image-upload.tsx";
 import {createProduct, getAllProducts, updateProduct} from "../../state/product/productAction.ts";
 import {TlaError, TlaSuccess} from "../../utils/messages.ts";
 import TextArea from "antd/es/input/TextArea";
 import {UploadOutlined} from "@ant-design/icons";





const ProductFormPage: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [imageFile, setImageFile] =  useState<Blob | MediaSource | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<Blob | MediaSource | null>(null);
    const [form] = Form.useForm();
    const [searchParams, _] = useSearchParams();
    const inEditingMode = searchParams.get("edit");
    const [disabled, setDisabled] = useState<any>(inEditingMode);



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
        <>

            <section className="p-5 rounded-b-2xl">

                <div className="mx-auto max-w-7xl">

                    {/*<GoBack className={'mb-5 bg-red'}/>*/}
                    <h3 className={'text-xl text-app-red mb-3'}>{ inEditingMode ? 'Edit Product Information' : 'Add a new product'}</h3>
                    {!inEditingMode && <div className={'flex justify-end'}>
                        {
                            disabled &&
                            <Button size={'large'} type={'text'} onClick={() => setDisabled(prev => !prev)}
                                    htmlType={'button'}>Edit</Button>
                        }
                        {
                            !disabled &&
                            <div className={'flex items-center gap-3'}>
                                <Button size={'large'}
                                        onClick={() => setDisabled(prev => !prev)}
                                        type={'default'} htmlType="submit">Cancel</Button>
                                <Button onClick={() => form.submit()} size={'large'} className={'btn-red'}
                                        htmlType="submit">Save</Button>
                            </div>
                        }
                    </div>}


                    <Spin spinning={loading} tip={'Please wait...'}>
                        <Form layout="vertical"
                              className={'bg-white rounded-xl border p-5 my-3'}>
                            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 sm:gap-6">
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


                                <Form.Item
                                    label={'Product Name'}
                                    name="name"
                                    className="col-span-full sm:col-span-1"
                                    style={{marginBottom: 0}}>
                                    <Input disabled={disabled} size={"large"} placeholder="Type product name"/>
                                </Form.Item>

                                <Form.Item
                                    label={'SKU'}
                                    name="sku"
                                    className="col-span-full sm:col-span-1"
                                style={{marginBottom: 0}}>
                                <Input disabled={disabled} size={"large"} placeholder="SKU"/>
                            </Form.Item>

                                <Form.Item
                                    label={'Category'}
                                    name="categoryId"
                                    className="col-span-full sm:col-span-1"
                                    style={{marginBottom: 0}}>
                                    <Select disabled={disabled} size={"large"}>
                                        <Select.Option value="Select category">Select category</Select.Option>
                                        <Select.Option value="TV">TV/Monitors</Select.Option>
                                        <Select.Option value="PC">PC</Select.Option>
                                        <Select.Option value="GA">Gaming/Console</Select.Option>
                                        <Select.Option value="PH">Phones</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label={'Brand'}
                                    name="brandId"
                                    className="col-span-full sm:col-span-1"
                                    style={{marginBottom: 0}}>
                                    <Select disabled={disabled} size={"large"}>
                                        <Select.Option value="Select category">Select brand</Select.Option>
                                        <Select.Option value="TV">Samsung</Select.Option>
                                        <Select.Option value="PC">Apple</Select.Option>
                                        <Select.Option value="GA">Infinix</Select.Option>
                                        <Select.Option value="PH">Itel</Select.Option>
                                    </Select>
                                </Form.Item>

                            <Form.Item
                                    label={'Cost Price'}
                                    name="costPrice"
                                    className="col-span-full sm:col-span-1"
                                style={{marginBottom: 0}}>
                                <Input disabled={disabled} size={"large"} placeholder="GHS 238"/>
                            </Form.Item>


                                <Form.Item
                                    label={'Quantity'}
                                    name="quantity"
                                    className="col-span-full sm:col-span-1"
                                    style={{marginBottom: 0}}>
                                    <Input disabled={disabled} size={"large"} placeholder="900"/>
                                </Form.Item>

                                <Form.Item
                                    label={'Stock Alert Level'}
                                    name="stockAlertLevel"
                                    className="col-span-full sm:col-span-1"
                                    style={{marginBottom: 0}}>
                                    <Input disabled={disabled} size={"large"} placeholder="14"/>
                                </Form.Item>


                            <Form.Item
                                label={'Unit Price'}
                                name="unitPrice"
                                className="col-span-full sm:col-span-1"
                                style={{marginBottom: 0}}>
                                <Input disabled={disabled} size={"large"} type="number" placeholder="GHS 99"/>
                            </Form.Item>

                                <Form.Item
                                    label={'Stock Unit'}
                                    name="stockUnitId"
                                    className="col-span-full sm:col-span-1"
                                    style={{marginBottom: 0}}>
                                    <Select disabled={disabled} size={"large"}>
                                        <Select.Option value="Select category">Select stock unit</Select.Option>
                                        <Select.Option value="TV">Create</Select.Option>
                                        <Select.Option value="PC">Bottles</Select.Option>
                                        <Select.Option value="GA">Half Bottles</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label={'Standard Package Quantity'}
                                    name="standardPackageQuantity"
                                    className="col-span-full sm:col-span-1"
                                    style={{marginBottom: 0}}>
                                    <InputNumber style={{ width: "100%"}} disabled={disabled} size={'large'}/>
                                </Form.Item>

                                <Form.Item
                                    label={'Expiration Date'}
                                    name="expirationDate"
                                    className="col-span-full sm:col-span-1"
                                    style={{marginBottom: 0}}>
                                    <Input disabled={disabled} size={"large"} type="date"/>
                                </Form.Item>

                                <Form.Item
                                    label={'Tax Rate'}
                                    name="taxRate"
                                    className="col-span-full sm:col-span-1"
                                    style={{marginBottom: 0}}>
                                    <InputNumber disabled={disabled} style={{ width: "100%"}} size={"large"}/>
                                </Form.Item>

                                <Form.Item
                                    label={'Serial Number'}
                                    name="serialNumber"
                                    className="col-span-full sm:col-span-1"
                                    style={{marginBottom: 0}}>
                                    <Input disabled={disabled} size={"large"}/>
                                </Form.Item>

                                <Form.Item
                                    label={'Batch Number'}
                                    name="batchNumber"
                                    className="col-span-full sm:col-span-1"
                                    style={{marginBottom: 0}}>
                                    <Input disabled={disabled} size={"large"}/>
                                </Form.Item>

                                <Form.Item
                                    label={'Long Description'}
                                    name="longDescription"
                                    className="col-span-full sm:col-span-2"
                                    style={{marginBottom: 0}}>
                                    <TextArea disabled={disabled}
                                              size={"large"} rows={8}
                                              placeholder="Detailed Product description here"/>
                                </Form.Item>
                            </div>


                        {inEditingMode && <div className={'w-fit ml-auto'}>
                            <Button className={'btn-red'} htmlType={"submit"}>
                                Save
                            </Button>
                        </div>}
                        </Form>
                    </Spin>

                </div>
            </section>

        </>
    )
};

 export default ProductFormPage