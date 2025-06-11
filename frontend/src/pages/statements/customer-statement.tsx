import React, {useEffect, useState} from "react";
import {Button, DatePicker, Form, Spin} from "antd";
import {currencyFormat, formatDate, htmlDateFormat} from "../../utils";
import {MenuLinks} from "../../utils/menu-links.ts";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useNavigate} from "react-router-dom";
import {MdOutlineAutorenew} from "react-icons/md";
import {FilterOutlined, PrinterFilled} from "@ant-design/icons";
import {filterOrdersForCustomers, getAllOrders} from "../../state/orders/receiptAction.ts";
import {setOrderItem} from "../../state/orders/orderSlice.ts";
import {unwrapResult} from "@reduxjs/toolkit";
import SingleItem from "../../common/single-item.tsx";
import {TlaError} from "../../utils/messages.ts";



const CustomerStatements: React.FC = () => {
    const {data} = useAppSelector(state => state.order.order);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [dates] = React.useState([]);
    const [fromDate, toDate] = dates;
    const customer = useAppSelector(state => state.customer.customerItem);
    const dispatch = useAppDispatch();
    const [selectedFromDate, setSelectedFromDate] = useState<any>();
    const [selectedToDate, setSelectedToDate] = useState<any>();
    const [displayRecords, setDisplayRecords] = useState<boolean>(false);

    const goToDetails = (record: any) => {
        dispatch(setOrderItem(record));
        navigate(MenuLinks.admin.order.details.index);
    };

    const printStatementHandler = () => {
        print();
    }

    const onFinish = (values: any) => {
        const fromDate = htmlDateFormat(values.fromDate);
        const toDate = htmlDateFormat(values.toDate);

        setSelectedFromDate(fromDate);
        setSelectedToDate(toDate);

        setLoading(true);
        const filter = `fromDate=${fromDate}&toDate=${toDate}&filter=true&customerId=${customer?.id}`
        dispatch((filterOrdersForCustomers(filter)))
            .then(unwrapResult)
            .then((_: any) => {
                setDisplayRecords(true);
                setLoading(false)
            }).catch(() => setLoading(false))
    }

    const resetFilterHandler = () => {
        setLoading(true);
        setSelectedFromDate(false);
        const filter = `&customerId[eq]=${customer?.id}&status[eq]=delivered`;
        dispatch(getAllOrders(filter))
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


    const overallRemainingBalance = data.reduce((sum, record) => {
        const remaining = (+record?.amount) - (+record?.totalPayments);
        return sum + (remaining > 0 ? remaining : 0);
    }, 0);

    // Calculate total cost so far
    const totalCostSoFar = data.reduce((sum, record) => sum + (+record?.amount), 0);

    // Calculate total paid so far
    const amountPaidSooFar = data.reduce((sum, record) => sum + (+record?.totalPayments), 0);


    return (
        <>
            <div className="filter flex justify-between mt-5 mb-9 no-print">
                <div className={'filter-by-date bg-white p-4 rounded-lg ml-auto'}>

                    {/* first filter */}
                    <Form className="filter flex gap-2" onFinish={onFinish}>
                        <label className={'font-medium text-lg'} htmlFor="#">Custom Filter: </label>
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

                        <Button htmlType={'submit'} type="primary" className={'btn-red'} icon={<FilterOutlined/>}>
                            Filter
                        </Button>
                    </Form>

                    {/* third filter */}
                    <Button type="primary" className={'btn-red'} icon={<MdOutlineAutorenew/>}
                            onClick={resetFilterHandler}>
                        Fetch overall records
                    </Button> &nbsp;

                    {data?.length > 0 ?  <Button type="primary" className={'btn-red'} icon={<PrinterFilled/>}
                                                 onClick={printStatementHandler}>
                        Print Statement
                    </Button> : null}
                </div>
            </div>


            {/* Customer Info */}
            <div className="mb-4">
                <p className="text-2xl fw-bold my-4 text-center">Statement of Account (delivered orders)</p>

                <div className="flex gap-4 justify-center my-5">
                    {
                        selectedFromDate ? (
                            <div className={'bg-white p-2 rounded flex-1'}>
                                <p className={'text-gray-500 font-medium text-md'}>{'Period'}</p>
                                <div>
                                    <p className={'font-medium'}>
                                        <b>{selectedFromDate}</b> &nbsp; to &nbsp;<b>{selectedToDate}</b>
                                    </p>
                                </div>
                            </div>
                        ) : null
                    }
                    <SingleItem className={'bg-white p-2 rounded  border-r'} title={'Customer'}
                                value={customer?.name}/>
                    <SingleItem className={'bg-white p-2 rounded'} title={'Company'}
                                value={customer?.companyName}/>
                </div>

                <hr/>


                <div className="flex gap-4 my-8 w-full border-r">
                    <SingleItem className={'bg-white p-2 rounded flex-1 border-r'} title={'Total Cost'}
                                value={displayRecords ? currencyFormat(totalCostSoFar) : 'GHS 0'}/>
                    <SingleItem className={'bg-white p-2 rounded flex-1 border-r'} title={'Amount Paid'}
                                value={displayRecords ? currencyFormat(amountPaidSooFar) : 'GHS 0'}/>
                    <SingleItem className={'bg-white p-2 rounded flex-1'} title={'Remaining'}
                                value={displayRecords ? currencyFormat(overallRemainingBalance) : 'GHS 0'}/>

                </div>
            </div>

        {/* actual works */}

            <Spin spinning={loading} tip={'Please wait...'}>
                {
                    displayRecords ?

                        <div className="bg-white rounded-2xl shadow-lg mb-20 font-sans">
                            <div className="overflow-x-auto">
                                <table className="min-w-full leading-normal table-auto rounded-lg overflow-hidden">
                                    {/* Table Header */}
                                    <thead>
                                    <tr>
                                        <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-950 uppercase tracking-wider rounded-tl-lg">
                                            Order Number
                                        </th>
                                        <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-950 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-950 uppercase tracking-wider">
                                            Total Cost
                                        </th>
                                        <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-950 uppercase tracking-wider">
                                            Amount Paid
                                        </th>
                                        <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-950 uppercase tracking-wider rounded-tr-lg">
                                            Remaining
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data.map((record: any) => (
                                        <React.Fragment key={record.id}>
                                            {/* Main Order Record Row */}
                                            <tr className="">
                                                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                                                        <span className="cursor-pointer underline text-blue-600 hover:text-blue-800" onClick={() => goToDetails && goToDetails(record)}>
                                                            {record?.orderNumber ?? "view details"}
                                                        </span>
                                                        </td>
                                                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                                                            <span>{formatDate(record?.date)}</span>
                                                        </td>
                                                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                                                            <span>{currencyFormat(+record?.amount)}</span>
                                                        </td>
                                                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                                                            <span>{currencyFormat(+record?.totalPayments)}</span>
                                                        </td>
                                                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                                                        <span>
                                                            {currencyFormat(Math.max(0, (+record?.amount) - (+record?.totalPayments)) )}
                                                        </span>
                                                </td>
                                            </tr>

                                            {/* Sub-Records for Payments - Always displayed if payments exist */}
                                            {record?.payments && record?.payments?.length > 0 && (
                                                <>
                                                    <tr className="bg-gray-50 mb-5">
                                                        <td colSpan={5}
                                                            className="px-3 py-2 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider pl-8">
                                                            Payment Details:
                                                        </td>
                                                    </tr>
                                                    {record?.payments?.map((payment: any, index: number) => (
                                                        <tr key={payment.id || `payment-${record.id}-${index}`} className="bg-gray-100 transition duration-150 ease-in-out">
                                                            <td className="px-3 py-2 border-b border-gray-200 text-sm text-gray-700 pl-8">
                                                                {formatDate(payment.date)}
                                                            </td>
                                                            <td className="px-3 py-2 border-b border-gray-200 text-sm text-gray-700">
                                                                {currencyFormat(+payment.amount)}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </>
                                            )}
                                        </React.Fragment>
                                    ))}
                                    </tbody>
                                    {/* Table Footer for Overall Remaining Balance */}
                                    <tfoot>
                                    <tr>
                                        {/* Empty cells to span across the columns before "Remaining" */}
                                        <td className="px-3 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase rounded-bl-lg"
                                            colSpan={2}> {/* This colspan remains 3 to align 'Overall Totals' across the first three data columns */}
                                            Overall Totals
                                        </td>
                                        <td className="px-3 py-3 bg-gray-100 text-left text-sm font-bold text-gray-900">
                                            {currencyFormat(totalCostSoFar)}
                                        </td>
                                        <td className="px-3 py-3 bg-gray-100 text-left text-sm font-bold text-gray-900">
                                            {currencyFormat(amountPaidSooFar)}
                                        </td>
                                        <td className="px-3 py-3 bg-gray-100 text-left text-sm font-bold text-gray-900 rounded-br-lg">
                                            {currencyFormat(overallRemainingBalance)}
                                        </td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                        : <div className="bg-white p-5 rounded-2xl mb-20 text-center">
                            Filter to get records
                        </div>
                }
            </Spin>
        </>
    )
}

export default CustomerStatements;
