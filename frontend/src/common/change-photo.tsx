import { useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { CiCamera } from "react-icons/ci";
import {handleImageLoadError} from "../utils";
import DefaultUser from "../assets/icons/account.svg";

interface FileProps {
    file: any;
    url: any;
}

interface UploadProps {
    cb?: (file: any) => void;
}

function ChangePhoto({ cb }: UploadProps) {
    const [selectedFile, setSelectedFile] = useState<FileProps>({
        file: null,
        url: "null",
    });

    const uploadProps = {
        beforeUpload: async (file: Blob) => {
            await getBase64(file).then((url) => {
                setSelectedFile({file, url});
                cb && cb(file);
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
        method: 'get',
        showUploadList: false,
        className: "upload-photo",
    };

    function getBase64(file: Blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    return (
            <div className={"relative"}>
                    <img
                        src={selectedFile.url}
                        className={
                            "h-[100px] w-[100px] md:h-[100px] md:w-[100px]" +
                            " rounded-full shadow-3.5xl border-app-red border-2 border-dotted p-1"
                        }
                        alt="ProfileImage"
                        onError={(e) => handleImageLoadError(e, DefaultUser)}
                    />

                <div className={"w-fit absolute bottom-0 right-0 md:right-1"}>
                    <ImgCrop rotationSlider>
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/*@ts-expect-error*/}
                        <Upload {...uploadProps}>
                            <CiCamera className={'text-white'} size={16}/>
                        </Upload>
                    </ImgCrop>
                </div>
            </div>
    );
}

export default ChangePhoto;
