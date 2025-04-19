import React, { useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { Spin } from "antd";
import TlaChart from "./components/tla-chart.tsx";
import {useAppDispatch} from "../../hooks";
import {getChartData} from "../../state/analytics/analyticsActions.ts";

const DashboardChart: React.FC = () => {
    const [loading, setLoading] = React.useState(true);
    const dispatch = useAppDispatch();
    const [categories, setCategories] = React.useState<string[]>([]);
    const [circuits, setCircuits] = React.useState<number[]>([]);
    const [societies, setSocieties] = React.useState<number[]>([]);
    const [members, setMembers] = React.useState<number[]>([]);

    useEffect(() => {
        dispatch(getChartData())
            .then(unwrapResult)
            .then((data: any) => {
                setLoading(false)

                setCategories(data.map((item: any) => item.name))
                setCircuits(data.map((item: any) => item._count.circuits))
                setSocieties(data.map((item: any) => item._count.societies))
                setMembers(data.map((item: any) => item._count.members))

            })
            .catch(() => setLoading(false))
    }, []);

    const series = [
        {
            name: 'Awards',
            data: circuits
        },
        {
            name: 'Categories',
            data: societies
        },
        {
            name: 'Contestants',
            data: members
        }
    ]

    return (
        <Spin spinning={loading}>
            <TlaChart labels={categories} series={series}/>
        </Spin>
    )
}

export default DashboardChart
