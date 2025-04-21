import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";
import {MenuLinks} from "../../utils/menu-links.ts";
import {FiEdit3} from "react-icons/fi";
import {useAppSelector} from "../../hooks";
import StockInfo from "./stock-info.tsx";

const StockDetails = () => {
    const stock = useAppSelector(state => state.stock.stockItem);
    return <>
        <div>
            <div className={'bg-white p-3 rounded-lg inner-header mb-2'}>
                <div>
                    <h2 className={'capitalize'}>
                        <span className={' text-2xl font-medium'}>Detailed Warehouse Information</span>
                        &nbsp; - &nbsp;
                        <span style={{fontSize: "17px"}}>({
                            // @ts-ignore
                            stock?.product?.name
                        })</span>
                    </h2>
                    <div className={'flex flex-wrap justify-between items-center'}>
                        <TlaOpen title={"Edit Stock"} data={stock} modal={true} to={MenuLinks.admin.stock.form}>
                            <span className={'mt-2 text-xl flex items-center gap-x-3 cursor-pointer text-yellow-500'}>
                                Edit Stock Info <FiEdit3/>
                            </span>
                        </TlaOpen>
                    </div>
                </div>
            </div>
            <div className={'rounded-2xl'}>
                <StockInfo/>
            </div>
        </div>
    </>
}


export default StockDetails;