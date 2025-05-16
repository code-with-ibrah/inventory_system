import React from "react";
import DashboardChart from "./dashboard-chart.tsx";
import DashboardCounts from "./dashboard-counts.tsx";
import {Button, Calendar, DatePicker, Form} from "antd";
import 'dayjs/locale/en-gb';
import {FilterOutlined} from "@ant-design/icons";
import {useAppSelector} from "../../hooks";
import RevenueCounts from "./revenue-counts.tsx";


const Analytics: React.FC = (props: any) => {

    const [dates, setDates] = React.useState([]);
    const [fromDate, toDate] = dates;
    const user = useAppSelector(state => state.auth.user);

    const handleDateChange = (values: any) => {
        setDates(values);
    };

    const handleFilter = () => {
        if (props.onFilter) {

            props.onFilter({
                // @ts-ignore
                fromDate: fromDate ? fromDate.format('YYYY-MM-DD') : undefined,
                // @ts-ignore
                toDate: toDate ? toDate.format('YYYY-MM-DD') : undefined,
            });
        }
    };

    return (
        <div>

            <div className="filter flex justify-between mt-5 mb-9">
                <div className="welcome">
                    <p className="text-app-red text-2xl font-semibold">Welcome {user?.name}!</p>
                </div>

                <div>
                    <Form className="filter flex gap-2">
                        <DatePicker
                            placeholder="From Date"
                            value={fromDate}
                            onChange={(date) => handleDateChange([date, toDate])}
                            format="YYYY-MM-DD"
                            style={{width: 150}}
                        />
                        <DatePicker
                            placeholder="To Date"
                            value={toDate}
                            onChange={(date) => handleDateChange([fromDate, date])}
                            format="YYYY-MM-DD"
                            style={{width: 150}}
                        />
                        <Button type="primary" className={'btn-red'} icon={<FilterOutlined/>} onClick={handleFilter}>
                            Filter
                        </Button>
                    </Form>
                </div>
            </div>


            <div className={'counters'}>
                <p className="text-app-red text-2xl uppercase font-semibold mb-2 mt-8">dashboard counters</p>
                <div className="bg-white rounded-lg mb-5">
                    <DashboardCounts/>
                </div>
            </div>

            <div className={'revenue-counters'}>
                <p className="text-app-red text-2xl uppercase font-semibold mb-2 mt-8">Revenue Statistics</p>
                <div className="bg-white rounded-lg mb-5">
                    <RevenueCounts/>
                </div>
            </div>

            <div className={"grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-0 md:gap-x-5"}>
                <div className={'col-span-2 bg-white rounded-lg p-5'}>
                    <p className={'text-gray-500 font-semibold'}>Product, Orders and Sales by Suppliers </p>
                    <DashboardChart/>
                </div>

                <div className={"bg-white rounded-lg p-5"}>
                    <Calendar fullscreen={false}/>
                </div>
            </div>
        </div>
    )
}

export default Analytics