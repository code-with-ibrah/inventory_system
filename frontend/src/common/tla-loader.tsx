import { Spin } from "antd";
import { useAppSelector } from "../hooks";

const TlaLoader = ({ children, tip = true }: { children: any, tip?: boolean }) => {
  const status = useAppSelector((state) => state.errors.status);
  return (
    <Spin
      spinning={status === "loading"}
      tip={tip ? "Please wait...": ""}
    >
      {children}
    </Spin>
  );
};

export default TlaLoader;
