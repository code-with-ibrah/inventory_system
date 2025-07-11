import React from "react";
import Column from "antd/es/table/Column";
import {Button} from "antd";
import {FiPlusCircle} from "react-icons/fi";
import {deleteCustomer, getAllCustomers} from "../../state/customer/customerAction.ts";
import TlaTableWrapper from "../../common/tla-table-wrapper.tsx";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";
import SearchInput from "../../common/search-input.tsx";
import {commonQuery} from "../../utils/query.ts";
import {formatDate} from "../../utils";
import {MenuLinks} from "../../utils/menu-links.ts";
import TlaEdit from "../../common/tla-edit.tsx";
import TlaDelete from "../../common/tla-delete.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Customer} from "../../types/customer.ts";
import {useNavigate} from "react-router-dom";
import {setCustomer} from "../../state/customer/customerSlice.ts";


const Customers: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.customer.customer);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const gotoDetails = (record: any) => {
        dispatch(setCustomer(record));
        navigate(MenuLinks.admin.customers.details.index);
    };

    return (
        <div className={'bg-white rounded-2xl p-5'}>
            <TlaOpen to={MenuLinks.admin.customers.form}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
            </TlaOpen>

            <div className={'flex-1 my-5'}>
                <SearchInput columns={["name"]} getData={getAllCustomers}/>
            </div>

            <TlaTableWrapper getData={getAllCustomers} data={data} filter={commonQuery()} meta={meta}>
                <Column title="Name" render={(record) =>
                    <span onClick={()=> gotoDetails(record)} className={'cursor-pointer underline'}> {record.name} </span>}/>
                <Column title="Company" dataIndex="companyName"/>
                <Column title="Location" dataIndex="location"/>
                <Column title="Phone" dataIndex="phone"/>
                <Column title="Address" dataIndex="address"/>
                <Column title="Date Joined" render={(record: Customer) => <span>
                    { formatDate(record.registrationDate) }
                </span>}/>
                <Column
                    title={'Action'}
                    render={((record) => (
                            <div className={'flex items-center gap-2'}>
                                <TlaEdit data={record} link={MenuLinks.admin.customers.form}/>
                                <TlaDelete title={'customer'} column={record.id} callBack={deleteCustomer}/>
                            </div>
                        )
                    )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default Customers;
