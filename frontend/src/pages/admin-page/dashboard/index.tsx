import React from "react";
import DashboardChart from "./dashboard-chart.tsx";
import Counts from "./counts.tsx";
import { Calendar } from "antd";

const Analytics: React.FC = () => {
    return (
        <div>
            <div className={"bg-white rounded-lg mb-5"}>
                <Counts/>
            </div>

            <div className={"grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-0 md:gap-x-5"}>
                <div className={'col-span-3 bg-white rounded-lg p-5'}>
                    <p className={'text-gray-500 font-semibold'}>Product, Orders and Sales by Suppliers </p>
                    <DashboardChart/>
                </div>

                {/*<div className={"bg-white rounded-lg p-5"}>*/}
                {/*    <Calendar fullscreen={false}/>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

export default Analytics
