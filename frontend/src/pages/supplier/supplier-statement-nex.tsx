import React, {useEffect, useState} from "react";
import {Button, DatePicker, Empty, Form, Spin} from "antd";
import {currencyFormat, formatDate, htmlDateFormat} from "../../utils";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useNavigate} from "react-router-dom";
import {FilterOutlined} from "@ant-design/icons";
import {unwrapResult} from "@reduxjs/toolkit";
import {TlaError} from "../../utils/messages.ts";
import {getAllSupplierStatements} from "../../state/supplier/supplierAction.ts";
import CompanyWatermark from "../common/company-watermark.tsx";
import {getAllGoodsReceipts} from "../../state/goods-receipt/goodsReceiptAction.ts";
import {setGoodsReceipt} from "../../state/goods-receipt/goodsReceiptSlice.ts";
import {MenuLinks} from "../../utils/menu-links.ts";
import StatementCompanyHeader from "../common/statement-company-header.tsx";



const SupplierStatements: React.FC = () => {
    const data = useAppSelector(state => state.supplier.statements);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [dates] = React.useState([]);
    const [fromDate, toDate] = dates;
    const [selectedFromDate, setSelectedFromDate] = useState<any>();
    const [selectedToDate, setSelectedToDate] = useState<any>();
    const [displayRecords, setDisplayRecords] = useState<boolean>(false);
    const supplier: any = useAppSelector(state => state.supplier.supplierItem);
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
        const filter = `fromDate=${fromDate}&toDate=${toDate}&id=${supplier?.id}`
        dispatch((getAllSupplierStatements(filter)))
            .then(unwrapResult)
            .then((_: any) => {
                setDisplayRecords(true);
                setLoading(false)
            }).catch(() => setLoading(false))
    }

    const resetStatmentHandler = () => {
        setLoading(true);
        setSelectedFromDate(false);
        const filter = `&id[eq]=${supplier?.id}`;
        dispatch(getAllSupplierStatements(filter))
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

    const goToReceipt = (receiptNumber: string) => {
        dispatch(getAllGoodsReceipts(`receiptNumber[eq]=${receiptNumber}`))
            .then(unwrapResult)
            .then(res => {
                const goodsReceipt = res?.data[0];
                dispatch(setGoodsReceipt(goodsReceipt));
                navigate(MenuLinks.admin.supplier.details.receipt.items);
            })
            .catch(_ => {
                navigate(-1);
                TlaError("Operation failed, re-try")
            });
    }

    useEffect(() => {

    }, [selectedFromDate]);




    return (
        <div className="pb-20">
            <div className="filter mt-6 mb-10 no-print">
                <div className="bg-white p-6 rounded-xl shadow-md w-full">
                    <Form onFinish={onFinish} className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        {/* Left side - Filters */}
                        <div className="flex flex-wrap items-center gap-4">
        <span className="font-semibold text-gray-700 text-base whitespace-nowrap">
          Custom Filter
        </span>
                            <Form.Item
                                name="fromDate"
                                rules={[{ required: true, message: "From date is required" }]}
                                className="m-0">
                                <DatePicker
                                    placeholder="From Date"
                                    value={fromDate}
                                    format="YYYY-MM-DD"
                                    style={{ width: 160 }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="toDate"
                                rules={[{ required: true, message: "To date is required" }]}
                                className="m-0"
                            >
                                <DatePicker
                                    placeholder="To Date"
                                    value={toDate}
                                    format="YYYY-MM-DD"
                                    style={{ width: 160 }}
                                />
                            </Form.Item>
                        </div>

                        {/* Right side - Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                                size="middle"
                                htmlType="submit"
                                type="primary"
                                icon={<FilterOutlined />}
                            >
                                Apply Filter
                            </Button>

                            <Button
                                className="bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg"
                                size="middle"
                                onClick={resetStatmentHandler}
                                type="default"
                                icon={<FilterOutlined />}
                            >
                                Fetch All
                            </Button>

                            <Button
                                className={`font-medium rounded-lg ${
                                    data?.length > 0
                                        ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                                        : "bg-yellow-200 text-gray-400 cursor-not-allowed"
                                }`}
                                size="middle"
                                onClick={data?.length > 0 ? printHandler : undefined}
                                type="default"
                                icon={<FilterOutlined />}
                                disabled={!data?.length}
                            >
                                Print Statement
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>

            {/* Statement Header */}
            {displayRecords && (

                <div className="mb-10">

                  <StatementCompanyHeader selectedFromDate={selectedFromDate} selectedToDate={selectedToDate}/>


                    {/* Supplier Info - Minimal */}
                    <div className="bg-gray-50 p-4 rounded-lg border text-sm flex justify-between items-center">
                        <h3 className="font-bold">Supplier:</h3>
                        <p className="font-medium">
                            {supplier?.companyName ?? "Supplier Name"} &nbsp; | &nbsp;
                            {supplier?.email ?? "-"} &nbsp; | &nbsp;
                            {supplier?.phone ?? "-"}
                        </p>
                    </div>

                </div>



            )}


            {/* Ledger Table */}
            <Spin spinning={loading}>
                {displayRecords ? (
                    <div className="bg-white rounded-xl shadow overflow-auto mb-6" style={{position: "relative"}}>
                        <CompanyWatermark/>
                        <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-gray-100 text-gray-700 text-xs uppercase tracking-wide sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold">Date</th>
                                <th className="px-4 py-3 text-left font-semibold">Receipt Number</th>
                                <th className="px-4 py-3 text-right font-semibold">Debit (GHS)</th>
                                <th className="px-4 py-3 text-right font-semibold">Credit (GHS)</th>
                                <th className="px-4 py-3 text-right font-semibold">Grand Total (GHS)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data?.length > 0 ? (
                                data.map((record: any, index: number) => (
                                    <tr
                                        key={index}
                                        className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"
                                    >
                                        <td className="px-4 py-2 border-t">{formatDate(record.date)}</td>
                                        <td className="px-4 py-2 border-t">
                                            {record?.paymentNumber ? (
                                                <span
                                                    onClick={() => goToReceipt(record?.paymentNumber)}
                                                    className="underline text-blue-600 cursor-pointer hover:text-blue-800">{record?.paymentNumber}</span>) : (
                                                "-"
                                            )}
                                        </td>
                                        <td className="px-4 py-2 border-t text-right">
                                            {record.debit ? currencyFormat(+record.debit) : ""}
                                        </td>
                                        <td className="px-4 py-2 border-t text-right">
                                            {record.credit ? currencyFormat(+record.credit) : ""}
                                        </td>
                                        <td className="px-4 py-2 border-t text-right font-semibold">
                                            {currencyFormat(+record.balance)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-4 py-10 text-center">
                                        <Empty description="No records found" />
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>

                    </div>
                ) : (
                    <div className="text-center bg-white p-6 rounded-xl">Filter to view supplier statement</div>
                )}
            </Spin>
        </div>
    );


}

export default SupplierStatements;
