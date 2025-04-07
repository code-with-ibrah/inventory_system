import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {TlaModal} from "../../../common/pop-ups/TlaModal.tsx";
import {Button, Form, Input, Upload, Image} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {TlaError, TlaSuccess} from "../../../utils/messages.ts";
import {UploadOutlined} from "@ant-design/icons";
import {createContestant, updateContestant} from "../../../state/contestant/contestantAction.ts";
import {createPayloadWithImage, handleImageChange} from "../../../utils/image-upload.tsx";





const AwardForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState<MediaSource | Blob | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<MediaSource | Blob | null>(null);
    const [form] = Form.useForm();

    const category = useAppSelector(state => state.category.categoryItem);



    // @ts-ignore
    const onFinish = (values: any) => {
        values.categoryId = category.id;
        // @ts-ignore
        values.awardId = category?.awardId;
        values.isVerified = 1;
        values.isActive = 1;
        // @ts-ignore
        values.userCode = category?.userCode;

        const formData = createPayloadWithImage(values, imageFile, thumbnailFile);

        setLoading(true);
        ((state?.data && state?.data?.id) ? dispatch(updateContestant({ data: formData, id: state?.data?.id})) : dispatch(createContestant(formData)))
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



    // @ts-ignore
    return (
        <TlaModal title={"Contestants"} loading={loading}>
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
                            style={{ marginTop: '-15px' }}
                            className={'col-span-2'}
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
                            style={{ marginTop: '-15px' }}
                            className={'col-span-2'}
                            rules={[
                                {
                                    required: true,
                                    message: "Required"
                                }
                            ]}
                            name={"stageName"} label={"Stage Name *"}>
                            <Input/>
                        </Form.Item>


                        <Form.Item
                            name={"studentId"} label={"Student Id"}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name={"programOfStudy"} label={"Program of Study"}>
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            className={'col-span-2'}
                            rules={[{ required: true, message: "Required" }]}
                            name={"phone"} label={"Phone *"}>
                            <Input/>
                        </Form.Item>


                    </div>
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

export default AwardForm