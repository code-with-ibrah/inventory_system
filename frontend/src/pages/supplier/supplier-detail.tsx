import {useAppSelector} from "../../hooks";
import {MenuLinks} from "../../utils/menu-links.ts";
import {FiEdit3} from "react-icons/fi";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";


const SupplierDetail = () => {
    const supplier = useAppSelector(state => state.supplier.supplierItem);

    return <>
        <div>
            <h2 className={'capitalize'}>
                <span className={' text-2xl font-medium'}>Detailed Supplier Information</span>
                &nbsp; - &nbsp;
                <span style={{fontSize: "19px"}}>({supplier?.name})</span>
            </h2>
            <div className={'flex flex-wrap justify-between items-center'}>
                <TlaOpen title={"Supplier"} data={supplier} modal={true} to={MenuLinks.admin.supplier.form}>
                   <span className={'mt-2 text-xl flex items-center gap-x-3 cursor-pointer text-yellow-500'}>
                       Edit Supplier Info <FiEdit3/>
                    </span>
                </TlaOpen>
            </div>
        </div>
    </>
}

export default SupplierDetail;