import {useAppSelector} from "../../hooks";
import {MenuLinks} from "../../utils/menu-links.ts";
import {FiEdit3} from "react-icons/fi";
import {Product} from "../../types/product.ts";
import TlaOpen from "../../common/pop-ups/TlaOpen.tsx";


const ProductDetail = () => {
    const product: Product = useAppSelector(state => state.product.productItem);

    return <>
        <div>
            <h2 className={'capitalize'}>
                <span className={' text-2xl font-medium'}>Detailed Product Information</span>
                &nbsp; - &nbsp;
                <span style={{fontSize: "19px"}}>({product?.name})</span>
            </h2>
            <div className={'flex flex-wrap justify-between items-center'}>
                <TlaOpen title={"Edit Award"} data={product} modal={true} to={MenuLinks.admin.product.form}>
                   <span className={'mt-2 text-xl flex items-center gap-x-3 cursor-pointer text-yellow-500'}>
                            Edit Product Info <FiEdit3/>
                    </span>
                </TlaOpen>

            </div>
        </div>
    </>

}

export default ProductDetail;