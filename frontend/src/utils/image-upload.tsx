import imageCompression from "browser-image-compression";
import {TlaError} from "./messages.ts";


const imageResizeOptions = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 800,
    useWebWorker: true,
    fileType: 'image/jpeg',
    quality: 0.7,
};

const thumbnailResizeOptions = {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 150,
    useWebWorker: true,
    fileType: 'image/jpeg',
    quality: 0.6,
};




export const handleImageChange = async (file: any, setImageFile: any, setThumbnailFile: any)  => {

    if (file.file)
    {
        try {
            const compressedImageFile = await imageCompression(file.file, imageResizeOptions);
            setImageFile(compressedImageFile);

            const compressedThumbnailFile = await imageCompression(file.file, thumbnailResizeOptions);
            setThumbnailFile(compressedThumbnailFile);

            return true;
        }
        catch (error) {
            TlaError('Error resizing the image.');
            return null
        }
    }

    return null;
}


export const createPayloadWithImage = (formValues: any[], imageFile: any, thumbnailFile: any) => {
    const formData = new FormData();

    for (const key in formValues) {
        if (formValues.hasOwnProperty(key)) {
            formData.append(key, formValues[key]);
        }
    }

    if (imageFile) {
        // @ts-ignore
        formData.append('image', imageFile);
        // @ts-ignore
        formData.append('thumbnail', thumbnailFile);
    }

    return formData;
}