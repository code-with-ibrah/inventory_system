import {useAppSelector} from "../../hooks";
import {MenuLinks} from "../../utils/menu-links.ts";
import {FiEdit3} from "react-icons/fi";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";


const CustomerDetail = () => {
    const customer = useAppSelector(state => state.customer.customerItem);

    return <>
        <div>
            <h2 className={'capitalize'}>
                <span className={' text-2xl font-medium'}>Detailed customer Information</span>
                &nbsp; - &nbsp;
                <span style={{fontSize: "19px"}}>({customer?.name})</span>
            </h2>
            <div className={'flex flex-wrap justify-between items-center'}>
                <TlaOpen title={"customer"} data={customer} modal={true} to={MenuLinks.admin.customers.form}>
                   <span className={'mt-2 text-xl flex items-center gap-x-3 cursor-pointer text-yellow-500'}>
                       Edit customer Info <FiEdit3/>
                    </span>
                </TlaOpen>
            </div>
        </div>
    </>
}

export default CustomerDetail;