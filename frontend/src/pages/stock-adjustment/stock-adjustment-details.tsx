import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";
import {MenuLinks} from "../../utils/menu-links.ts";
import {FiEye} from "react-icons/fi";
import {useAppSelector} from "../../hooks";
import StockAdjustmentItems from "./items/stock-adjustment-items.tsx";

const StockAdjustmentDetails = () => {
    const stockAdjustment = useAppSelector(state => state.stockAdjustment.stockAdjustmentItem);
    return <>
        <div>
            <div className={'bg-white p-3 rounded-lg inner-header mb-2'}>
                <div>
                    <h2 className={'capitalize'}>
                        <span className={' text-2xl font-medium'}>Detailed Stock Adjustment Information</span>
                        &nbsp; by &nbsp;
                        <span style={{fontSize: "17px"}}>({
                            // @ts-ignore
                            stockAdjustment?.user
                        })</span>
                    </h2>
                    <div className={'flex flex-wrap justify-between items-center'}>
                        <TlaOpen title={"edit stock adjustment"} data={stockAdjustment} modal={true} to={MenuLinks.admin.stockAdjustment.form}>
                            <span className={'mt-2 text-xl flex items-center gap-x-3 cursor-pointer text-yellow-500'}>
                                View stock Adjustment Info <FiEye/>
                            </span>
                        </TlaOpen>
                    </div>
                </div>
            </div>
            <div className={'rounded-2xl'}>
                <StockAdjustmentItems/>
            </div>
        </div>
    </>
}


export default StockAdjustmentDetails;