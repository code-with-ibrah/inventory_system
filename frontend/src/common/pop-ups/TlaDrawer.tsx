import React from "react";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import PopUps from "./index.ts";
import { Spin } from "antd";

interface Props {
  children: any;
  title?: string | React.ReactNode;
  width?: string;
  loading?: boolean;
}

const TlaDrawer: React.FC<Props> = ({
  children,
  title,
  width = "w-full md:w-1/2",
    loading = false,
}) => {
  const navigate = useNavigate();
  return (
    <PopUps>
      <div
        className="ant-drawer ant-drawer-right css-1e3x2xa ant-drawer-open"
        tabIndex={-1}
      >
        <div className="ant-drawer-mask"></div>
        <div
          tabIndex={0}
          aria-hidden="true"
          data-sentinel="start"
          style={{
            width: "0px",
            height: "0px",
            overflow: "hidden",
            outline: "none",
            position: "absolute",
          }}
        ></div>
        <div className={`ant-drawer-content-wrapper ${width}`}>
          <div className="ant-drawer-content" aria-modal="true" role="dialog">
            <div className="ant-drawer-wrapper-body">
              <div className={`ant-drawer-header fixed top-0 right-0 z-10 justify-between items-center ${width}`}>
                <p className={'text-2xl'}>{title ?? "-"}</p>
                <div className={"flex gap-x-2 items-center"}>
                  <div className="ant-drawer-header-title">
                    <div className="ant-drawer-title">
                      <div
                        onClick={() => {
                          navigate(-1);
                        }}
                        aria-label="Close"
                        className="cursor-pointer bg-gray-100 p-1.5 rounded-full"
                      >
                        <MdClose className={"text-gray-600"} />
                      </div>
                    </div>
                  </div>
                  <div className="ant-drawer-extra"></div>
                </div>
              </div>
              <div
                className="ant-drawer-body px-5 overflow-y-auto"
                style={{ paddingBottom: "20px", marginTop: "60px" }}
              >
                <Spin spinning={loading}>
                    {children}
                </Spin>
              </div>
            </div>
          </div>
        </div>
        <div
          tabIndex={0}
          aria-hidden="true"
          data-sentinel="end"
          style={{
            width: "0px",
            height: "0px",
            overflow: "hidden",
            outline: "none",
            position: "absolute",
          }}
        ></div>
      </div>
    </PopUps>
  );
};

export default TlaDrawer;
