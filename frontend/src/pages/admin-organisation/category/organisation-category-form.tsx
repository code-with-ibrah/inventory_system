import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {TlaModal} from "../../../common/pop-ups/TlaModal.tsx";
import {Button, Form, Input, Upload, Image} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {TlaError, TlaSuccess} from "../../../utils/messages.ts";
import {UploadOutlined} from "@ant-design/icons";
import { createCategory, updateCategory } from "../../../state/category/categoryAction.ts";
import {createPayloadWithImage, handleImageChange} from "../../../utils/image-upload.tsx";



const OrganisationCategoryForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState<MediaSource | Blob | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<MediaSource | Blob | null>(null);
    const [form] = Form.useForm();
    const award = useAppSelector(state => state.award.awardItem);


    const onFinish = (values: any) => {
        values.userCode = award?.userCode;
        values.awardId = award.id;
        const formData = createPayloadWithImage(values, imageFile, thumbnailFile);
        setLoading(true);
        ((state?.data && state?.data?.id) ? dispatch(updateCategory({ data: formData, id: state?.data?.id})) : dispatch(createCategory(formData)))
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
    }

    return (
        <TlaModal title={"Category"} loading={loading}>
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
                                            marginTop: '15px',
                                            height: '235px',
                                            objectFit: 'cover'
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
    
    
    
                            <Form.Item className={'col-span-2'}
                                rules={[
                                    {
                                        required: true,
                                        message: "Required"
                                    }
                                ]}
                                name={"name"} label={"Name"}>
                                <Input/>
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
}

export default OrganisationCategoryForm