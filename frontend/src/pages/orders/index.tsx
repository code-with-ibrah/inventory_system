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
import {deleteOrders, filterOrders, filterOrdersByPeriod, getAllOrders} from "../../state/orders/receiptAction.ts";
import {Order} from "../../types/order.ts";
import {setOrderItem} from "../../state/orders/orderSlice.ts";
import {MdOutlineAutorenew, MdOutlineSystemUpdateAlt} from "react-icons/md";
import SearchInput from "../../common/search-input.tsx";
import {orderStatus} from "../../utils/order-status.ts";
import {TlaErrorTag, TlaInfoTag, TlaSuccessTag} from "../../common/tla-tag.tsx";
import {FilterOutlined} from "@ant-design/icons";
import {unwrapResult} from "@reduxjs/toolkit";



const Orders: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.order.order);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [dates, setDates] = React.useState([]);
    const [fromDate, toDate] = dates;

    const goToDetails = (record: any) => {
        dispatch(setOrderItem(record));
        navigate(MenuLinks.admin.order.details.index);
    };

    const printInvoiceHandler = (record: any) => {
        dispatch(setOrderItem(record));
        navigate(MenuLinks.admin.order.invoice);
    }

    const onFinish = (values: any) => {
        const fromDate = htmlDateFormat(values.fromDate);
        const toDate = htmlDateFormat(values.toDate);
        setLoading(true);
        const filter = `fromDate=${fromDate}&toDate=${toDate}&filter=true`
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
        const filter = ``
        dispatch(filterOrders(filter))
            .then(unwrapResult)
            .then((_: any) => {
                setLoading(false)
            }).catch(() => setLoading(false))
    }

    const handlerFilterOnchange = (filterType: any) => {
        setLoading(true);
        dispatch(filterOrdersByPeriod(filterType))
            .then(unwrapResult)
            .then((_: any) => {
                setLoading(false)
            }).catch(() => setLoading(false))
    }


    return (
        <>
            <div className="filter flex justify-between mt-5 mb-9">

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
                        Fetch overall records
                    </Button>
                </div>

            </div>



            {/* actual works */}
            <Spin spinning={loading} tip={'Please wait...'}>
                <div className={'bg-white rounded-2xl p-5'}>
                    <TlaOpen to={MenuLinks.admin.order.form}>
                        <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
                    </TlaOpen>

                    <div className={'flex-1 my-5'}>
                        <SearchInput placeholderColumn={'order number'} getData={getAllOrders} columns={["orderNumber"]}/>
                    </div>

                    <TlaTableWrapper getData={getAllOrders} data={data} filter={commonQuery()} meta={meta}>
                        <Column
                            title="Order Number"
                            render={(record: Order) => (
                                <span className={'cursor-pointer underline'} onClick={() => goToDetails(record)}>
                            {record?.orderNumber ?? "view details"}
                        </span>)}/>

                        <Column title="Date" render={(record: Order) => <span>{formatDate(record?.date)}</span>}/>
                        <Column title="Customer" render={(record: Order) => <span>{record?.customer?.name}</span>}/>

                        <Column title="Order Status" className={'capitalize'} render={(record: any) => <span>
                        {record?.status == orderStatus.preparing ? <TlaInfoTag text={orderStatus.preparing}/> : ''}
                            {record?.status == orderStatus.delivered ?
                                <TlaSuccessTag text={orderStatus.delivered}/> : ''}
                            {record?.status == orderStatus.cancelled ? <TlaErrorTag text={orderStatus.cancelled}/> : ''}
                    </span>}/>

                        {/*<Column title="Discount Percentage" render={(record: Order) => <span>{record?.discount}%</span>}/>*/}
                        <Column title="Amount" render={(record: Order) => <span
                            className={'font-medium'}>{currencyFormat(+record?.amount)}</span>}/>
                        <Column title="Total Paid Amount" render={(record: Order) => <span
                            className={'font-semibold'}>{currencyFormat(+record?.totalPayments)}</span>}/>


                        <Column
                            title="Payment Status"
                            render={(record: Order) => (
                                <span>
                                {+record?.totalPayments === 0 ? (
                                    <TlaErrorTag text={'Not Paid'}/>
                                ) : +record?.amount > 0 && +record?.totalPayments >= +record?.amount ? (
                                    <TlaSuccessTag text={'Fully Paid'}/>
                                ) : +record?.amount > 0 && +record?.totalPayments < +record?.amount ? (
                                    <TlaErrorTag text={'Partial Payments'}/>
                                ) : null}
                            </span>
                            )}
                        />

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

export default Orders;
