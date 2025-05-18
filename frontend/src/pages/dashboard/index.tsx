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
                <div className="filter flex justify-between mt-5 mb-9">
                    {/*<div className="welcome">*/}
                    {/*    <p className="text-app-red text-2xl font-semibold">Welcome {user?.name}!</p>*/}
                    {/*</div>*/}

                    <div className={'filter-by-date bg-white p-4 rounded-lg ml-auto'}>

                        {/* first filter */}
                        <div className={''}>
                            <Form>
                                <div className="flex items-center ">
                                    <div className="flex gap-2 align-center">
                                        <label className={'font-medium text-lg'} htmlFor="#">Filter: </label>
                                        <Form.Item>
                                            <Select defaultValue={null} onChange={handlerFilterOnchange} style={{minWidth: 460}}>
                                                <Select.Option key={0} value={null}>Choose one</Select.Option>
                                                <Select.Option key={1} value="today">Today</Select.Option>
                                                <Select.Option key={2} value="yesterday">Yesturday</Select.Option>
                                                <Select.Option key={3} value="last_2_days">Last Two Days</Select.Option>
                                                <Select.Option key={4} value="last_3_days">Last Three Days</Select.Option>
                                                <Select.Option key={5} value="last_4_days">Last Four Days</Select.Option>
                                                <Select.Option key={6} value="week">This Week</Select.Option>
                                                <Select.Option key={7} value="month">This Month</Select.Option>
                                                <Select.Option key={8} value="last_month">Last Month</Select.Option>
                                                <Select.Option key={9} value="year">This Year</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>
                            </Form>
                        </div>


                        {/* second filter */}
                        <Form className="filter flex gap-2" onFinish={onFinish}>
                            <label className={'font-medium text-lg'} htmlFor="#">Custom Filter: </label>
                            <Form.Item rules={[{required: true, message: "Required"}]} name={'fromDate'}>
                                <DatePicker
                                    type={'date'}
                                    placeholder="From Date"
                                    value={fromDate}
                                    onChange={(date) => handleDateChange([date, toDate])}
                                    format="YYYY-MM-DD"
                                    style={{width: 150}}
                                />
                            </Form.Item>

                            <Form.Item rules={[{required: true, message: "Required"}]} name={'toDate'}>
                                <DatePicker
                                    type={'date'}
                                    placeholder="To Date"
                                    value={toDate}
                                    onChange={(date) => handleDateChange([fromDate, date])}
                                    format="YYYY-MM-DD"
                                    style={{width: 150}}
                                />
                            </Form.Item>

                            <Button htmlType={'submit'} type="primary" className={'btn-red'} icon={<FilterOutlined/>}>
                                Filter
                            </Button>
                        </Form>

                        {/* third filter */}
                        <Button type="primary" className={'btn-red'} icon={<MdOutlineAutorenew/>}
                                onClick={resetFilterHandler}>
                            Fetch overrall records
                        </Button>
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