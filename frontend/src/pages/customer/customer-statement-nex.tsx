import React, {useEffect, useState} from "react";
import {Button, DatePicker, Form, Spin} from "antd";
import {currencyFormat, formatDate, htmlDateFormat} from "../../utils";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useNavigate} from "react-router-dom";
import {FilterOutlined} from "@ant-design/icons";
import {unwrapResult} from "@reduxjs/toolkit";
import {TlaError} from "../../utils/messages.ts";
import {getAllCustomerStatements} from "../../state/customer/customerAction.ts";
import CompanyWatermark from "../common/company-watermark.tsx";



const CustomerStatements: React.FC = () => {
    const data = useAppSelector(state => state.customer.statements);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [dates] = React.useState([]);
    const [fromDate, toDate] = dates;
    const [selectedFromDate, setSelectedFromDate] = useState<any>();
    const [_, setSelectedToDate] = useState<any>();
    const [displayRecords, setDisplayRecords] = useState<boolean>(false);

    const customer = useAppSelector(state => state.customer.customerItem);
    // const customerOrderPayment = useAppSelector(state => state.customer.customerOrderStats?.data);
    const dispatch = useAppDispatch();



    const printHandler = () => {
        print();
    }

    const onFinish = (values: any) => {
        const fromDate = htmlDateFormat(values.fromDate);
        const toDate = htmlDateFormat(values.toDate);

        setSelectedFromDate(fromDate);
        setSelectedToDate(toDate);

        setLoading(true);
        const filter = `fromDate=${fromDate}&toDate=${toDate}&id=${customer?.id}`
        dispatch((getAllCustomerStatements(filter)))
            .then(unwrapResult)
            .then((_: any) => {
                setDisplayRecords(true);
                setLoading(false)
            }).catch(() => setLoading(false))
    }

    const resetStatmentHandler = () => {
        setLoading(true);
        setSelectedFromDate(false);
        const filter = `&id[eq]=${customer?.id}`;
        dispatch(getAllCustomerStatements(filter))
            .then(unwrapResult)
            .then((_: any) => {
                setLoading(false);
                setDisplayRecords(true);
            })
            .catch(() => {
                setLoading(false);
                TlaError('Failed to fetch data, retry');
                navigate(-1);
            })
    }

    useEffect(() => {

    }, [selectedFromDate]);




    return (
        <div>

            <div className="filter flex justify-between mt-5 mb-9 no-print">
                <div className="bg-white p-4 rounded-lg ml-auto">
                    <Form layout="inline" onFinish={onFinish}>
                        <label className="font-medium text-md">Custom Filter: &nbsp; </label>


                        <Form.Item rules={[{required: true, message: "Required"}]} name={'fromDate'}>
                            <DatePicker
                                type={'date'}
                                placeholder="From Date"
                                value={fromDate}
                                format="YYYY-MM-DD"
                                style={{width: 150}}
                            />
                        </Form.Item>

                        <Form.Item rules={[{required: true, message: "Required"}]} name={'toDate'}>
                            <DatePicker
                                type={'date'}
                                placeholder="To Date"
                                value={toDate}
                                format="YYYY-MM-DD"
                                style={{width: 150}}
                            />
                        </Form.Item>


                        <Button
                            className={'btn btn-red'}
                            size={'large'}
                            htmlType="submit"
                            type="primary"
                            icon={<FilterOutlined/>}>Filter</Button> &nbsp;

                        <Button
                            className="btn btn-red"
                            size={'large'}
                            onClick={resetStatmentHandler}
                            type="primary"
                            icon={<FilterOutlined/>}>Fetch all records</Button>
                    </Form>

                    {data?.length > 0 ? (
                        <Button
                            className="btn btn-red"
                            size={'large'}
                            onClick={printHandler}
                            type="primary"
                            icon={<FilterOutlined/>}>Print Statements</Button>
                    ) : ''}
                </div>
            </div>

            {/* Statement Header */}
            {displayRecords && (
                <div className="mb-6 flex justify-between items-center p-3 gap-4">

                    <div className="text-topline">
                        <b className={'underline'}>Company Information</b>
                        <p><b>Company: </b>Jessen Ventures</p>
                        <p><b>Location:</b> Dome Pillar 2</p>
                        <p><b>Digital Address:</b> GE-325-9976</p>
                        <p><b>Phone:</b> +233 50 006 1419</p>
                    </div>

                    <div className="text-topline">
                        <b className={'underline'}>Customer Information</b>
                        <p><b>Customer:</b> {customer?.name ?? "-"}</p>
                        <p><b>Company: </b> {customer?.companyName ?? "-"}</p>
                        <p><b>Location:</b> {customer?.location ?? "-"}</p>
                        <p><b>Address:</b> {customer?.address ?? "-"}</p>
                        <p><b>Phone:</b> {customer?.phone ?? "-"}</p>
                    </div>

                    <div className="image-topline">
                        <img className={'business-logo'} src="/logo-plain.png" alt=""/>
                    </div>
                </div>
            )}

            {/* Ledger Table */}
            <Spin spinning={loading}>
                {displayRecords ? (
                    <div className="bg-white rounded-xl shadow overflow-auto mb-6" style={{position: "relative"}}>

                        <CompanyWatermark/>
                        
                        
                        <table className="min-w-full border border-gray-300 text-sm">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 border">Date</th>
                                <th className="px-4 py-2 border">Order Number</th>
                                <th className="px-4 py-2 border text-right">Debit (GHS)</th>
                                <th className="px-4 py-2 border text-right">Credit (GHS)</th>
                                <th className="px-4 py-2 border text-right">Grand Total (GHS)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((record: any, index: number) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border">{formatDate(record.date)}</td>
                                    <td className="px-4 py-2 border">{record?.paymentNumber ?? '-'}</td>
                                    <td className="px-4 py-2 border text-right">{record.debit ? currencyFormat(+record.debit) : ''}</td>
                                    <td className="px-4 py-2 border text-right">{record.credit ? currencyFormat(+record.credit) : ''}</td>
                                    <td className="px-4 py-2 border text-right font-semibold">{currencyFormat(+record.balance)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center bg-white p-6 rounded-xl">Filter to view customer statement</div>
                )}
            </Spin>
        </div>
    );


}

export default CustomerStatements;
