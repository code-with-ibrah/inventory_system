import React, {useEffect, useState} from "react";
import DashboardChart from "./dashboard-chart.tsx";
import DashboardCounts from "./dashboard-counts.tsx";
import {Button, Calendar, DatePicker, Form, Select, Spin} from "antd";
import {FilterOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../../hooks";
import RevenueCounts from "./revenue-counts.tsx";
import {MdOutlineAutorenew} from "react-icons/md";
import {getDashboardCount, getDashboardCountByPeriod} from "../../state/dashboard/dashboardAction.ts";
import {unwrapResult} from "@reduxjs/toolkit";
import {htmlDateFormat} from "../../utils";


const Analytics: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [dates, setDates] = React.useState([]);
    const [fromDate, toDate] = dates;
    // @ts-ignore
    const {data: dashboardCounter} = useAppSelector(state => state.dashboardCounter.dashboardCounter);
    const dispatch = useAppDispatch();

    useEffect(() => {
        resetFilterHandler();
    }, []);

    const handleDateChange = (values: any) => {
        setDates(values);
    };


    const resetFilterHandler = () => {
        setLoading(true);
        const filter = ``
        dispatch(getDashboardCount(filter))
            .then(unwrapResult)
            .then((_: any) => {
                setLoading(false)
            }).catch(() => setLoading(false))
    }

    const onFinish = (values: any) => {
        const fromDate = htmlDateFormat(values.fromDate);
        const toDate = htmlDateFormat(values.toDate);
        setLoading(true);
        const filter = `fromDate=${fromDate}&toDate=${toDate}&filter=true`
        dispatch(getDashboardCount(filter))
            .then(unwrapResult)
            .then((_: any) => {
                setLoading(false)
            }).catch(() => setLoading(false))
    }

    const handlerFilterOnchange = (filterType: any) => {
        setLoading(true);
        dispatch(getDashboardCountByPeriod(filterType))
            .then(unwrapResult)
            .then((_: any) => {
                setLoading(false)
            }).catch(() => setLoading(false))
    }



    return (
        <div>

            <Spin spinning={loading} tip={'Please wait...'}>
                <div className="filter flex flex-col md:flex-row md:justify-end mt-5 mb-9 w-full px-4">

                    <div className="bg-white p-4 pb-4 rounded-lg shadow-md w-full overflow-x-auto pb-2 flex flex-col sm:flex-row items-end gap-4">

                        {/* Preset Filter */}
                        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:flex-1">
                            <label className="font-medium text-sm min-w-[80px]">Filter:</label>
                            <Form className="w-full">
                                <Form.Item className="m-0 w-full">
                                    <Select
                                        defaultValue={null}
                                        onChange={handlerFilterOnchange}
                                        style={{minWidth: 150, width: '100%'}}
                                        size="large"
                                    >
                                        <Select.Option key={0} value={null}>Choose one</Select.Option>
                                        <Select.Option key={1} value="today">Today</Select.Option>
                                        <Select.Option key={2} value="yesterday">Yesterday</Select.Option>
                                        <Select.Option key={3} value="last_2_days">Last Two Days</Select.Option>
                                        <Select.Option key={4} value="last_3_days">Last Three Days</Select.Option>
                                        <Select.Option key={5} value="last_4_days">Last Four Days</Select.Option>
                                        <Select.Option key={6} value="week">This Week</Select.Option>
                                        <Select.Option key={7} value="month">This Month</Select.Option>
                                        <Select.Option key={8} value="last_month">Last Month</Select.Option>
                                        <Select.Option key={9} value="year">This Year</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Form>
                        </div>

                        {/* Custom Date Filter */}
                        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:flex-1">
                            <label className="font-medium text-sm min-w-[120px]">Custom Filter:</label>
                            <Form className="flex flex-col sm:flex-row items-center gap-2 w-full" onFinish={onFinish}>
                                <Form.Item
                                    name="fromDate"
                                    rules={[{required: true, message: "Required"}]}
                                    className="m-0"
                                >
                                    <DatePicker
                                        placeholder="From Date"
                                        value={fromDate}
                                        onChange={(date) => handleDateChange([date, toDate])}
                                        format="YYYY-MM-DD"
                                        style={{width: 150}}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="toDate"
                                    rules={[{required: true, message: "Required"}]}
                                    className="m-0"
                                >
                                    <DatePicker
                                        placeholder="To Date"
                                        value={toDate}
                                        onChange={(date) => handleDateChange([fromDate, date])}
                                        format="YYYY-MM-DD"
                                        style={{width: 150}}
                                    />
                                </Form.Item>
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    className="bg-app-red hover:bg-app-red focus:ring-offset-2 rounded-md transition duration-150 ease-in-out shadow-md"
                                    icon={<FilterOutlined/>}
                                >
                                    Filter
                                </Button>
                            </Form>
                        </div>

                        {/* Reset Button */}
                        <div className="w-full sm:w-auto flex-shrink-0">
                            <Button
                                type="primary"
                                className="w-full bg-app-red hover:bg-app-red focus:ring-offset-2 rounded-md transition duration-150 ease-in-out shadow-md"
                                icon={<MdOutlineAutorenew/>}
                                onClick={resetFilterHandler}
                            >
                                Fetch overall revenue records
                            </Button>
                        </div>

                    </div>


                </div>

                <div className={'revenue-counters'}>
                    <RevenueCounts data={dashboardCounter}/>
                </div>

                <div className={'counters'}>
                    <DashboardCounts data={dashboardCounter}/>
                </div>

                {/*<div className={'revenue-counters'}>*/}
                {/*    <OtherUtilityCounts/>*/}
                {/*</div>*/}

                <br/>

                <div className={"grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-0 md:gap-x-5"}>
                    <div className={'col-span-2 bg-white rounded-lg p-5'}>
                        <p className={'text-gray-500 font-semibold'}>Orders</p>
                        <DashboardChart/>
                    </div>

                    <div className={"bg-white rounded-lg p-5"}>
                        <Calendar fullscreen={false}/>
                    </div>
                </div>
            </Spin>

        </div>
    )
}

export default Analytics