import { Upload } from "antd";
import {FiUploadCloud} from "react-icons/fi";

interface IDragUpload {
  setSelectedFile: (info: any) => void;
  text?: string;
  accept?: string[] | string;
}

export default function DragUpload({
  setSelectedFile,
  text,
  accept,
}: IDragUpload) {
  const uploadProps = {
    accept,
    beforeUpload: (info: any) => {
      setSelectedFile(info);
    },
    name: "file",
    multiple: false,
    maxCount: 1,
    method: "get",
  };

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /*@ts-expect-error*/
    <Upload.Dragger
      {...uploadProps}
      style={{ background: "white", border: "dotted 2px #EAECF0" }}
    >
      <div className={"w-fit mx-auto"}>
        <FiUploadCloud size={25} className={'text-gray-500'}/>
      </div>
      <p className="text-sm text-primary-700 font-medium">
        Click to {text ?? "Upload"}
      </p>
    </Upload.Dragger>
  );
}
