import React, {useEffect, useState} from "react";
import SingleItem from "./single-item.tsx";
import {Spin} from "antd";
import {unwrapResult} from "@reduxjs/toolkit";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getDashboardCount} from "../../state/dashboard/dashboardAction.ts";



const Counts: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();
    const counters: any = useAppSelector(state => state.dashboardCounter.dashboardCounter);

    const filter = "";

    useEffect(() => {
        dispatch(getDashboardCount(filter))
            .then(unwrapResult)
            .then((_: any) => {
                setLoading(false)
            }).catch(() => setLoading(false))
    }, []);

    return (
        <Spin spinning={loading}>
            <div className={"bg-white p-2 md:p-5 rounded-lg mb-5"}>
                <div className={"grid grid-cols-4 gap-5 p-5 border-none md:border-y"}>
                    <div className={'border-r'}>
                        <SingleItem title={"Total Products"} value={counters?.totalAwards ?? 0}/>
                    </div>
                    <div className={'border-r'}>
                        <SingleItem title={"New Orders"} value={counters?.ongoingAwards ?? 0}/>
                    </div>
                    <div className={'border-r'}>
                        <SingleItem title={"Today Sales"} value={counters?.totalOrganisation ?? 0}/>
                    </div>
                    <SingleItem title={"Unread Notifications"} value={counters?.totalNomineeRequests ?? 0}/>
                </div>
            </div>
        </Spin>
    )
}

export default Counts