import React from "react";
import Column from "antd/es/table/Column";
import {Button} from "antd";
import {FiPlusCircle} from "react-icons/fi";
import TlaTableWrapper from "../../common/tla-table-wrapper.tsx";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";
import SearchInput from "../../common/search-input.tsx";
import {commonQuery} from "../../utils/query.ts";
import {formatDate} from "../../utils";
import {MenuLinks} from "../../utils/menu-links.ts";
import {useAppSelector} from "../../hooks";
import {Customer} from "../../types/customer.ts";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getAllSuppliers} from "../../state/supplier/supplierAction.ts";
import {setSupplier} from "../../state/supplier/supplierSlice.ts";


const SupplierStatementIndex: React.FC = () => {
    const {data, meta} = useAppSelector(state => state.supplier.supplier);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goToDetails = (customer: any) => {
        dispatch(setSupplier(customer));
        navigate(MenuLinks.admin.statement.supplierStatements);
    }

    return (
        <div className={'bg-white rounded-2xl p-5'}>
            <TlaOpen to={MenuLinks.admin.supplier.form}>
                <Button className={'btn btn-red'} size={'large'} icon={<FiPlusCircle/>}>New</Button>
            </TlaOpen>

            <div className={'flex-1 my-5'}>
                <SearchInput columns={["name"]} getData={getAllSuppliers}/>
            </div>

            <TlaTableWrapper getData={getAllSuppliers} data={data} filter={commonQuery()} meta={meta}>
                <Column title="Name" render={(record: any) => <span className={'underline cursor-pointer'} onClick={() => goToDetails(record)}>
                    { record?.name }
                </span>} />

                <Column title="Company" dataIndex="companyName"/>
                <Column title="Phone" dataIndex="phone"/>
                <Column title="Date Joined" render={(record: Customer) => <span>
                    { formatDate(record.registrationDate) }
                </span>}/>
            </TlaTableWrapper>
        </div>
    )
}

export default SupplierStatementIndex;
