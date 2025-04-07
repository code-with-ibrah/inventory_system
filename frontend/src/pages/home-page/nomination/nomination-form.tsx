import React, {useEffect, useState} from "react";
import {useAppDispatch} from "../../../hooks";
import {TlaModal} from "../../../common/pop-ups/TlaModal.tsx";
import {Button, Form, Input, Upload, Image, Select} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useLocation, useNavigate} from "react-router-dom";
import {TlaError, TlaSuccess} from "../../../utils/messages.ts";
import { getAllAwards } from "../../../state/award/awardsAction.ts";
import {UploadOutlined} from "@ant-design/icons";
import DropdownSearch from "../../../common/dropdown-search.tsx";
import {Award} from "../../../types/award.ts";
import {getAllCategoryWithoutPagination} from "../../../state/category/categoryAction.ts";
import {Category} from "../../../types/category.ts";
import { nominateContestant} from "../../../state/contestant/contestantAction.ts";
import {MenuLinks} from "../../../utils/menu-links.ts";
import {createPayloadWithImage, handleImageChange} from "../../../utils/image-upload.tsx";



const NominationForm: React.FC = () => {
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState<MediaSource | Blob | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<MediaSource | Blob | null>(null);
    const [awardId, setAwardId] = useState<number>(0);
    const [fetchedDataLength, setFetchedDataLength] = useState<number>(0);
    const [form] = Form.useForm();


    const onFinish = (values: any) => {

        if(imageFile == null){
            TlaError("Please upload your image");
            return;
        }

        const formData = createPayloadWithImage(values, imageFile, thumbnailFile);
        setLoading(true);
        dispatch(nominateContestant(formData))
            .then(unwrapResult)
            .then(() => {
                TlaSuccess("Successful");
                setLoading(false);
                navigate(MenuLinks.home.nominationSuccess);
            })
            .catch((obj) => {
                TlaError(obj?.message);
                setLoading(false);
            });
    }

    const onChange = (awardId: any) => {
        setAwardId(+awardId);
    }

    const categoryOnClick = () => {
        if(!awardId){
            TlaError("Select award first");
            form.setFieldValue('categoryId', null);

            return;
        }
    }

    const cancelBtnOnclick = () => {
        if(confirm("Close nomination form ?")){
            navigate(MenuLinks.home.awards);
            return;
        }
    }

    useEffect(() => {

    }, [fetchedDataLength]);

    return (
        <TlaModal title={"Nomination Form"} loading={loading}>
            <Form form={form} requiredMark={false} onFinish={onFinish} initialValues={{...state?.data}} size={'large'}
                  layout={"vertical"}>
                <div className={'grid grid-cols-2 md:grid-cols-3 gap-2'}>
                    <Form.Item
                        rules={[{required: true, message: "Required"}]}
                        label="Image">
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
                            preview={{src: state?.data?.image}}
                        />}
                    </Form.Item>

                    <div className={'col-span-2 grid grid-cols-1 gap-2'}>

                        <Form.Item className={'col-span-2'}
                            rules={[{required: true, message: "Required"}]}
                            name={"name"} label={"Name *"}>
                            <Input />
                        </Form.Item>

                        <Form.Item style={{marginTop: '-15px'}}
                            rules={[{required: true, message: "Required"}]}
                            name={"stageName"} label={"Stage Name *"}>
                            <Input/>
                        </Form.Item>
                    </div>
                </div>


                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                    <Form.Item
                        rules={[{ required: true, message: "Required" }]}
                        name={"email"} label={"Email *"}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        rules={[{ required: true, message: "Required" }]}
                        name={"gender"} label={"Gender *"}>
                        <Select defaultValue={'Choose gender'}>
                            <Select.Option value="male">Male</Select.Option>
                            <Select.Option value="female">Female</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        className={'col-span'}
                        name={"school"} label={"School (optional)"}>
                        <Input placeholder={"TTU"}/>
                    </Form.Item>

                    <Form.Item
                        className={'col-span'}
                        name={"studentId"} label={"Student Id (optional)"}>
                        <Input placeholder={"CUC-202418"}/>
                    </Form.Item>

                    <Form.Item
                        className={'col-span'}
                        name={"programOfStudy"} label={"Program (optional)"}>
                        <Input placeholder={"Computer Science"}/>
                    </Form.Item>

                    <Form.Item
                        className={'col-span'}
                        rules={[
                            {required: true, message: "Required"},
                            {max: 10, message: "should be ten (10) digits"},
                            {min: 10, message: "should be ten (10) digits"},
                        ]}
                        name={"phone"} label={"Phone *"}>
                        <Input placeholder={'0268200221'}/>
                    </Form.Item>
                </div>


                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2 mt-3'}>

                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Required"
                            }
                        ]}
                        name={"awardId"} label={"Choose Award *"}>
                        <DropdownSearch
                            onChange={onChange}
                            extraParams={"isActive[eq]=1"}
                            object
                            allowClear={true}
                            searchApi={getAllAwards}
                            placeholder="click to get award"
                            setResult={(award: Award) => {
                                if (award) {
                                    form.setFieldValue('awardId', award.id)
                                    return
                                }
                                form.setFieldValue('awardId', null)
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Required"
                            }
                        ]}
                        name={"categoryId"} label={"Select Category *"}
                        help="Choose award first before category">
                        <DropdownSearch
                            extraParams={`awardId[eq]=${awardId}`}
                            onClick={categoryOnClick}
                            disabled={(awardId == 0)}
                            singleFetch={false}
                            allowClear={true}
                            setFetchedDataLength={setFetchedDataLength}
                            object
                            searchApi={getAllCategoryWithoutPagination}
                            placeholder="click to get categories"
                            setResult={(category: Category) => {
                                if (category) {
                                    form.setFieldValue('categoryId', category.id)
                                    return
                                }
                                form.setFieldValue('categoryId', null)
                            }}
                        />
                    </Form.Item>
                </div>


                <div className={'w-fit ml-auto mt-5 flex gap-4'}>
                    <Button type={'primary'} className={'bg-red-700 text-white'} htmlType={"button"} onClick={cancelBtnOnclick}>
                        Cancel
                    </Button>

                    <Button className={'btn-red'} htmlType={"submit"}>
                        Submit Nomination
                     </Button>
                </div>
            </Form>
        </TlaModal>
    )
}

export default NominationForm