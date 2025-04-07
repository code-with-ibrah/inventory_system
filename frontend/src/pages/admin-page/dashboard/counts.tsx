import React, {useEffect, useState} from "react";
import SingleItem from "./single-item.tsx";
import {Spin} from "antd";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {getDashboardCount} from "../../../state/dashboard/dashboardAction.ts";
import {unwrapResult} from "@reduxjs/toolkit";



const Counts: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();
    const counters: any = useAppSelector(state => state.dashboardCounter.dashboardCounter);

    const filter = "";

    useEffect(() => {
        dispatch(getDashboardCount(filter))
            .then(unwrapResult)
            .then((_) => {
                setLoading(false)
            }).catch(() => setLoading(false))
    }, []);

    return (
        <Spin spinning={loading}>
            <div className={"bg-white p-2 md:p-5 rounded-lg mb-5"}>
                <div className={"grid grid-cols-4 gap-5 p-5 border-none md:border-y"}>
                    <div className={'border-r'}>
                        <SingleItem title={"Total Awards"} value={counters?.totalAwards ?? 0}/>
                    </div>
                    <div className={'border-r'}>
                        <SingleItem title={"Ongoing Awards"} value={counters?.ongoingAwards ?? 0}/>
                    </div>
                    <div className={'border-r'}>
                        <SingleItem title={"Organisation (active)"} value={counters?.totalOrganisation ?? 0}/>
                    </div>
                    <SingleItem title={"Nominee Requests"} value={counters?.totalNomineeRequests ?? 0}/>
                </div>
            </div>
        </Spin>
    )
}

export default Counts