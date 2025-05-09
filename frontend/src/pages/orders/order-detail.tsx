import {useAppSelector} from "../../hooks";
import {MenuLinks} from "../../utils/menu-links.ts";
import {FiEye} from "react-icons/fi";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";


const OrderDetail = () => {
    const order = useAppSelector(state => state.order.orderItem);

    return <>
        <div>
            <h2 className={'capitalize'}>
                <span className={' text-2xl font-medium'}>Detailed Order Information</span>
                &nbsp;  &nbsp;
                <span style={{fontSize: "19px"}}>{order?.customer?.name ? " for " + order?.customer?.name  : null }</span>
            </h2>
            <div className={'flex flex-wrap justify-between items-center'}>
                <TlaOpen title={"Order"} data={order} modal={true} to={MenuLinks.admin.order.form}>
                   <span className={'mt-2 text-xl flex items-center gap-x-3 cursor-pointer text-yellow-500'}>
                       View Order Info <FiEye/>
                    </span>
                </TlaOpen>
            </div>
        </div>
    </>
}

export default OrderDetail;