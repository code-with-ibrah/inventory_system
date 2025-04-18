import {useAppDispatch, useAppSelector} from "../../hooks";
import {MenuLinks} from "../../utils/menu-links.ts";
import {FiEdit3} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import {setProduct} from "../../state/product/productSlice.ts";
import {Product} from "../../types/product.ts";


const ProductDetail = () => {
    const product: Product = useAppSelector(state => state.product.productItem);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const gotoDetails = () => {
        dispatch(setProduct(product));
        navigate(`${MenuLinks.admin.product.formPage}?edit=${product?.id}`);
    };

        return <>
            <div>
                <h2 className={'capitalize'}>
                    <span className={' text-2xl font-medium'}>Detailed Product Information</span>
                     &nbsp; - &nbsp;
                    <span style={{ fontSize: "19px"}}>({product?.name})</span>
                </h2>
                <div className={'flex flex-wrap justify-between items-center'}>
                    <span className={'mt-2 text-xl flex items-center gap-x-3 cursor-pointer text-yellow-500'} onClick={gotoDetails}>
                        Edit Product Info <FiEdit3/>
                    </span>
                </div>
            </div>
        </>

}

export default ProductDetail;