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
                <p className="text-2xl fw-bold my-4">Statement of Account (delivered orders)</p>

                <div className="flex gap-2">
                    {
                        selectedFromDate ? (
                            <div className={'bg-white p-2 rounded flex-1 border-r'}> {/* Added flex-1 */}
                                <p className={'text-gray-500 font-medium text-md'}>{'Period'}</p>
                                <div>
                                    <p className={'font-medium'}>
                                        <b>{selectedFromDate}</b> &nbsp; to &nbsp;<b>{selectedToDate}</b>
                                    </p>
                                </div>
                            </div>
                        ) : null
                    }
                    <SingleItem className={'bg-white p-2 rounded flex-1 border-r'} title={'Customer'}
                                value={customer?.name}/>
                    <SingleItem className={'bg-white p-2 rounded flex-1'} title={'Company'}
                                value={customer?.companyName}/>
                </div>


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
                        <div className={'bg-white rounded-2xl mb-20'}>

                            <div className="overflow-x-auto bg-white shadow-sm rounded-lg receipt-container">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                    <tr>
                                        <th className="px-3 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Order Number
                                        </th>
                                        {/*<th className="px-3 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>*/}
                                        <th className="px-3 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                        <th className="px-3 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Total Cost
                                        </th>
                                        <th className="px-3 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Amount Paid
                                        </th>
                                        <th
                                            className="px-3 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Remaining
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data.map((record) => (
                                        <tr key={record.id} className="hover:bg-gray-50">
                                            <td className="px-3 py-2 border-b border-gray-200 bg-white text-sm">
                                    <span className={'cursor-pointer underline text-blue-600 hover:text-blue-800'}
                                          onClick={() => goToDetails(record)}>
                                        {record?.orderNumber ?? "view details"}
                                    </span>
                                            </td>
                                            {/*<td className="px-3 py-2 border-b border-gray-200 bg-white text-sm">*/}
                                            {/*    <span className="relative inline-block px-2 py-1 capitalize text-green-900 leading-tight">*/}
                                            {/*        <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"/>*/}
                                            {/*        <span className="relative">{record?.status}</span>*/}
                                            {/*    </span>*/}
                                            {/*</td>*/}
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
                                {
                                    ((+record?.amount) - (+record?.totalPayments)) < 0 ? currencyFormat(0) : currencyFormat((+record?.amount) - (+record?.totalPayments))
                                }
                            </span>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                    {/* --- Table Footer for Overall Remaining Balance --- */}
                                    <tfoot>
                                    <tr>
                                        {/* Empty cells to span across the columns before "Remaining" */}
                                        <td className="px-3 py-2 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase"
                                            colSpan={2}>
                                            Overall Total Balance
                                        </td>
                                        <td className="px-3 py-3 bg-gray-100 text-left text-sm font-bold text-gray-900">
                                            {currencyFormat(totalCostSoFar)}
                                        </td>
                                        <td className="px-3 py-3 bg-gray-100 text-left text-sm font-bold text-gray-900">
                                            {currencyFormat(amountPaidSooFar)}
                                        </td>
                                        <td className="px-3 py-3 bg-gray-100 text-left text-sm font-bold text-gray-900">
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
