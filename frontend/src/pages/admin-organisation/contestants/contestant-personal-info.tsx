import React, {useState} from 'react';
import {Button, Form, Image, Input, InputNumber, Select, Spin, Upload} from "antd";
import { unwrapResult } from "@reduxjs/toolkit";
import { updateContestant} from "../../../state/contestant/contestantAction.ts";
import {TlaError, TlaSuccess} from '../../../utils/messages.ts';
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {UploadOutlined} from "@ant-design/icons";
import imageCompression from "browser-image-compression";
import {setContestant} from "../../../state/contestant/contestantSlice.ts";

const ContestantPersonalInfo: React.FC = () => {
    const dispatch = useAppDispatch();
    const contestant = useAppSelector(state => state.contestant.contestantItem);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [imageFile, setImageFile] = useState<Blob | MediaSource>(new Blob([]));
    const [thumbnailFile, setThumbnailFile] = useState<Blob | MediaSource>(new Blob([]));
    const [form] = Form.useForm();


    const handleImageChange = async (info: any) => {

        if (info.file)
        {
            const imageResizeOptions = {
                maxSizeMB: 0.2,
                maxWidthOrHeight: 800,
                useWebWorker: true,
                fileType: 'image/jpeg',
                quality: 0.7,
            };

            const thumbnailResizeOptions = {
                maxSizeMB: 0.05,
                maxWidthOrHeight: 150,
                useWebWorker: true,
                fileType: 'image/jpeg',
                quality: 0.6,
            };

            try {
                const compressedImageFile = await imageCompression(info.file, imageResizeOptions);
                setImageFile(compressedImageFile);

                const compressedThumbnailFile = await imageCompression(info.file, thumbnailResizeOptions);
                setThumbnailFile(compressedThumbnailFile);

            }
            catch (error) {
                TlaError('Error resizing the image.');
                setImageFile(new Blob([]));
                setThumbnailFile(new Blob([]));
            }
        }
        else
        {
            setImageFile(new Blob([]));
            setThumbnailFile(new Blob([]));
        }
    };


    const onFinish = (values: any) => {
        const formData = new FormData();

        values.userCode = contestant?.userCode;
        values.awardId = contestant?.awardId;
        values.categoryId = contestant?.categoryId;

        // Append other form values
        for (const key in values) {
            if (values.hasOwnProperty(key)) {
                formData.append(key, values[key]);
            }
        }

        // Append the image file [when updating...]
        if (imageFile) {
            // @ts-ignore
            formData.append('image', imageFile);
            // @ts-ignore
            formData.append('thumbnail', thumbnailFile);
        }
        else
        {
            // if(!state?.data?.id){
            //     TlaError('Please select an image before submitting.');
            //     return;
            // }
        }


        setLoading(true);
        dispatch(updateContestant({ data: formData, id: contestant.id}))
            .then(unwrapResult)
            .then((contestant) => {
                dispatch(setContestant(contestant));
                TlaSuccess("Successful");
                setLoading(false);
                setDisabled(true);
            })
            .catch((obj) => {
                TlaError(obj?.message);
                setLoading(false);
            });
    }



    return (
        <div className={'mb-8'}>
            <div className={'p-5 flex items-center justify-between'}>
                <Form.Item label="">
                    <Upload
                        name="image"
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={() => false}
                        onChange={handleImageChange}>
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

                    {contestant?.thumbnail && <Image
                        className={'thumbnail-img'}
                        width={50}
                        src={contestant?.thumbnail}
                        preview={{ src: contestant?.image }}
                    />}
                </Form.Item>
                <h3 className={'text-xl text-app-red mb-3'}>Personal Information</h3>


                <div className={'flex items-center gap-3'}>
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
                </div>
            </div>


            <Spin spinning={loading} tip={'Please wait...'}>
                <div className={'mb-12'}>
                    <Form
                        disabled={disabled}
                        className={'contestant-detail-form'}
                        form={form}
                        initialValues={{...contestant}}
                        onFinish={onFinish} size={'large'} layout={'vertical'}>
                        <div className={'bg-white p-5 rounded-b-2xl mb-3'}>
                            <div className={'grid grid-cols-2 md:grid-cols-4 gap-x-3'}>
                                <Form.Item label={"Name"} name={'name'}>
                                    <Input/>
                                </Form.Item>

                                <Form.Item label={"Code"} name={'uniqueCode'}>
                                    <Input readOnly/>
                                </Form.Item>

                                <Form.Item label={"Stage Name"} name={'stageName'}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item label={"Student Id"} name={'studentId'}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item label={"Program of Study"} name={'programOfStudy'}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item
                                    rules={[{required: true, message: "Required"}]}
                                    label={"Phone"} name={'phone'}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item label={"Verification Status"} name={'isVerified'}>
                                    <Select>
                                        <Select.Option value={null}>Choose one</Select.Option>
                                        <Select.Option value={1}>Verified</Select.Option>
                                        <Select.Option value={0}>Not Verified</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item label={"Active Status"} name={'isActive'}>
                                    <Select>
                                        <Select.Option value={null}>Choose one</Select.Option>
                                        <Select.Option value={1}>Active</Select.Option>
                                        <Select.Option value={0}>Not Active</Select.Option>
                                    </Select>
                                </Form.Item>

                            </div>
                        </div>

                        <div className={'w-fit ml-auto'}>
                            <Button className={'btn-red'} htmlType={"submit"}>
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </div>
            </Spin>


            {/*    vote stats form */}
            <h3 className={'text-xl text-app-red mb-3'}>Votes Stats</h3>
            <div>
                <Form
                    className={'member-detail-form'}
                    form={form}
                    initialValues={{...contestant}}
                    onFinish={onFinish} size={'large'} layout={'vertical'}>
                    <div className={'bg-white p-5 rounded-2xl mb-3'}>

                        <div className={'grid grid-cols-1 md:grid-cols-4 gap-x-2'}>
                            <Form.Item label={"Ussd Vote Count"} name={'ussdVoteCount'}>
                                <InputNumber readOnly style={{width: "100%"}}/>
                            </Form.Item>
                            <Form.Item label={"Ussd Vote Amount"} name={'ussdVoteAmount'}>
                                <InputNumber readOnly style={{width: "100%"}}/>
                            </Form.Item>
                            <Form.Item label={"Web Vote Count"} name={'webVoteCount'}>
                                <InputNumber readOnly style={{width: "100%"}}/>
                            </Form.Item>
                            <Form.Item label={"Web Vote Amount"} name={'webVoteAmount'}>
                                <InputNumber readOnly style={{width: "100%"}}/>
                            </Form.Item>
                            <Form.Item label={"Total Vote Amount"} name={'totalVoteAmount'}>
                                <InputNumber readOnly style={{width: "100%"}}/>
                            </Form.Item>

                        </div>
                    </div>

                    {/*<div className={'w-fit ml-auto'}>*/}
                    {/*    <Button className={'btn-red'} htmlType={"submit"}>*/}
                    {/*        Save Changes*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                </Form>
            </div>


        </div>
    )
};


export default ContestantPersonalInfo;
