import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";
import {MenuLinks} from "../../utils/menu-links.ts";
import {FiEdit3} from "react-icons/fi";
import {useAppSelector} from "../../hooks";
import WarehouseInfo from "./warehouse-info.tsx";

const WarehouseDetails = () => {
    const warehouse = useAppSelector(state => state.warehouse.warehouseItem);
    return <>
        <div>
            <div className={'bg-white p-3 rounded-lg inner-header mb-2'}>
                <div>
                    <h2 className={'capitalize'}>
                        <span className={' text-2xl font-medium'}>Detailed Warehouse Information</span>
                        &nbsp; - &nbsp;
                        <span style={{fontSize: "17px"}}>({warehouse?.name})</span>
                    </h2>
                    <div className={'flex flex-wrap justify-between items-center'}>
                        <TlaOpen title={"Edit Award"} data={warehouse} modal={true} to={MenuLinks.admin.warehouse.form}>
                            <span className={'mt-2 text-xl flex items-center gap-x-3 cursor-pointer text-yellow-500'}>
                                Edit Warehouse Info <FiEdit3/>
                            </span>
                        </TlaOpen>
                    </div>
                </div>
            </div>
            <div className={'rounded-2xl'}>
                <WarehouseInfo/>
            </div>
        </div>
    </>
}


export default WarehouseDetails;