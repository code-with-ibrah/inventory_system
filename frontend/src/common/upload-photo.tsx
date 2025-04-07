import { useState } from "react";
import { Spin, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { CiCamera } from "react-icons/ci";
import ProfilePhoto from "./profile-photo.tsx";
import { FileProps, getBase64 } from "../utils/upload.util.ts";

interface UploadProps {
    photo: string;
    userId: number;
    allowChange?: boolean;
}

function UploadPhoto({photo, userId, allowChange = true}: UploadProps) {
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<FileProps>({
        file: null,
        url: null,
    });

    const uploadProps = {
        beforeUpload: async (file: Blob) => {
            setLoading(true);
            await getBase64(file).then((url) => {
                setSelectedFile({file, url});

                const formData = new FormData();
                formData.append("user_id", userId.toString());
                formData.append("file", file);

            });
            return true;
        },
        listType: "picture-circle",
        maxCount: 1,
        onRemove: () => {
            setSelectedFile({
                file: null,
                url: null,
            });
        },
        method: undefined,
        showUploadList: false,
        className: "upload-photo",
    };

    return (
        <Spin spinning={loading}>
            <div className={"relative"}>
                {selectedFile.url ? (
                    <img
                        src={selectedFile.url}
                        className={
                            "h-[100px] w-[100px] md:h-[150px] md:w-[150px]" +
                            " rounded-full shadow-3.5xl border-app-red border-2 border-dotted p-1"
                        }
                        alt="ProfileImage"
                    />
                ) : (
                    <ProfilePhoto photo={photo}/>
                )}
                {allowChange && (

                    <div className={"w-fit absolute bottom-0 right-0 md:right-1"}>
                        <ImgCrop rotationSlider>
                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                            {/*@ts-expect-error*/}
                            <Upload {...uploadProps}>
                                <CiCamera className={'text-white'} size={16}/>
                            </Upload>
                        </ImgCrop>
                    </div>
                )}
            </div>
        </Spin>
    );
}

export default UploadPhoto;
