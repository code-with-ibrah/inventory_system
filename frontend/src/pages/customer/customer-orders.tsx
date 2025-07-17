import React, {useState} from "react";
import Column from "antd/es/table/Column";
import {Button, DatePicker, Form, Select, Spin} from "antd";
import {FiEdit3, FiPlusCircle, FiPrinter} from "react-icons/fi";
import TlaTableWrapper from "../../common/tla-table-wrapper.tsx";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";
import {commonQuery} from "../../utils/query.ts";
import {currencyFormat, formatDate, htmlDateFormat} from "../../utils";
import {MenuLinks} from "../../utils/menu-links.ts";
import TlaDelete from "../../common/tla-delete.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks";
import TableActions from "../../common/table-actions.tsx";
import {useNavigate} from "react-router-dom";
import {
    deleteOrders,
    filterOrders,
    filterOrdersByPeriodForCustomers,
    getAllOrders
} from "../../state/orders/receiptAction.ts";
import {Order} from "../../types/order.ts";
import {setOrderItem} from "../../state/orders/orderSlice.ts";
import {MdOutlineAutorenew, MdOutlineSystemUpdateAlt} from "react-icons/md";
import SearchInput from "../../common/search-input.tsx";
import {orderStatus} from "../../utils/order-status.ts";
import {TlaErrorTag, TlaInfoTag, TlaSuccessTag} from "../../common/tla-tag.tsx";
import {FilterOutlined} from "@ant-design/icons";
import {unwrapResult} from "@reduxjs/toolkit";



const CustomerOrders: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.order.order);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [dates, setDates] = React.useState([]);
    const [fromDate, toDate] = dates;
    const customer = useAppSelector(state => state.customer.customerItem);

    const goToDetails = (record: any) => {
        dispatch(setOrderItem(record));
        navigate(MenuLinks.admin.customers.details.orderDetails);
    };

    const printInvoiceHandler = (record: any) => {
        dispatch(setOrderItem(record));
        navigate(MenuLinks.admin.order.invoice);
    }

    const onFinish = (values: any) => {
        const fromDate = htmlDateFormat(values.fromDate);
        const toDate = htmlDateFormat(values.toDate);
        setLoading(true);
        const filter = `customerId[eq]=${customer?.id}&fromDate=${fromDate}&toDate=${toDate}&filter=true`
        dispatch((filterOrders(filter)))
            .then(unwrapResult)
            .then((_: any) => {
                setLoading(false)
            }).catch(() => setLoading(false))
    }

    const handleDateChange = (values: any) => {
        setDates(values);
    };

    const resetFilterHandler = () => {
        setLoading(true);
        const filter = `customerId[eq]=${customer?.id}`
        dispatch(filterOrders(filter))
            .then(unwrapResult)
            .then((_: any) => {
                setLoading(false)
            }).catch(() => setLoading(false))
    }

    const handlerFilterOnchange = (filterType: any) => {
        setLoading(true);
        const filter = `filterType=${filterType}&customerId=${customer?.id}`;
        dispatch(filterOrdersByPeriodForCustomers(filter))
            .then(unwrapResult)
            .then((_: any) => {
                setLoading(false)
            }).catch(() => setLoading(false))
    }


    return (
        <>
            <div className="filter flex justify-between mt-5 mb-9">

                <div className="filter-by-date bg-white p-4 rounded-lg w-full max-w-7xl mx-auto">
                        <div className="flex flex-col sm:flex-row items-end w-full gap-4 overflow-x-auto pb-2">

                            {/* Preset Filter */}
                            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:flex-1">
                                <label className="font-medium text-sm min-w-[100px]">Filter:</label>
                                <Form className="w-full">
                                    <Form.Item className="m-0 w-full">
                                        <Select
                                            defaultValue={null}
                                            onChange={handlerFilterOnchange}
                                            style={{minWidth: 200, width: '100%'}}
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
                                <Form
                                    className="flex flex-col sm:flex-row items-center gap-2 w-full"
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        rules={[{required: true, message: "Required"}]}
                                        name={'fromDate'}
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
                                        rules={[{required: true, message: "Required"}]}
                                        name={'toDate'}
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
                                    Fetch overall records
                                </Button>
                            </div>

                        </div>
                    </div>

                </div>


                {/* actual works */}
                <Spin spinning={loading} tip={'Please wait...'}>
                    <div className={'bg-white rounded-2xl p-5'}>
                        <TlaOpen to={MenuLinks.admin.customers.details.orderForm}>
                            <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
                        </TlaOpen>

                        <div className={'flex-1 my-5'}>
                            <SearchInput placeholderColumn={'order number'} getData={getAllOrders}
                                         columns={["orderNumber"]}/>
                        </div>

                        <TlaTableWrapper getData={getAllOrders} data={data}
                                         filter={commonQuery(`&customerId[eq]=${customer?.id}`)} meta={meta}>
                            <Column
                                title="Order Number"
                                render={(record: Order) => (
                                    <span className={'cursor-pointer underline'} onClick={() => goToDetails(record)}>
                            {record?.orderNumber ?? "view details"}
                        </span>)}/>

                            <Column title="Date" render={(record: Order) => <span>{formatDate(record?.date)}</span>}/>

                            <Column title="Amount" render={(record: Order) => <span
                                className={'font-medium'}>{currencyFormat(+record?.amount)}</span>}/>

                            <Column title="Order Status" className={'capitalize'} render={(record: any) => <span>
                        {record?.status == orderStatus.preparing ? <TlaInfoTag text={orderStatus.preparing}/> : ''}
                                {record?.status == orderStatus.delivered ?
                                    <TlaSuccessTag text={orderStatus.delivered}/> : ''}
                                {record?.status == orderStatus.cancelled ?
                                    <TlaErrorTag text={orderStatus.cancelled}/> : ''}
                    </span>}/>

                            <Column title={'Action'} render={(record) => (
                                <TableActions items={[
                                    {
                                        key: '1',
                                        label: (
                                            <TlaOpen data={record} modal={true} to={MenuLinks.admin.order.form}>
                                                <FiEdit3/>
                                                Edit
                                            </TlaOpen>
                                        ),
                                    },
                                    {
                                        key: '2',
                                        label: (
                                            <TlaDelete title={'order'} column={record.id} callBack={deleteOrders}/>
                                        ),
                                    },
                                    {
                                        key: '3',
                                        label: (
                                            <button onClick={() => printInvoiceHandler(record)}>
                                                <FiPrinter/>
                                                Print invoice
                                            </button>
                                        ),
                                    },
                                    {
                                        key: '4',
                                        label: (
                                            <>
                                                {(record?.status != orderStatus.delivered) ?
                                                    <TlaOpen data={record} modal={true}
                                                             to={MenuLinks.admin.order.details.statusForm}>
                                                        <MdOutlineSystemUpdateAlt/>
                                                        Update Status
                                                    </TlaOpen> : null}
                                            </>
                                        ),
                                    }
                                ]}/>
                            )}/>
                        </TlaTableWrapper>
                    </div>
                </Spin>
            </>
            )
            }

            export default CustomerOrders;
