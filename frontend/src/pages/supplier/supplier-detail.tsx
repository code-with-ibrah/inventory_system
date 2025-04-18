import {useAppDispatch, useAppSelector} from "../../hooks";
import {MenuLinks} from "../../utils/menu-links.ts";
import {FiEdit3} from "react-icons/fi";
import {setProduct} from "../../state/product/productSlice.ts";
import {useNavigate} from "react-router-dom";


const SupplierDetail = () => {
    const supplier = useAppSelector(state => state.supplier.supplierItem);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const gotoDetails = () => {
        dispatch(setProduct(supplier));
        navigate(`${MenuLinks.admin.product.formPage}?edit=${supplier?.id}`);
    };

        return <>


            <div>
                <h2 className={'capitalize'}>
                    <span className={' text-2xl font-medium'}>Detailed Supplier Information</span>
                    &nbsp; - &nbsp;
                    <span style={{fontSize: "19px"}}>({supplier?.name})</span>
                </h2>
                <div className={'flex flex-wrap justify-between items-center'}>
                    <span className={'mt-2 text-xl flex items-center gap-x-3 cursor-pointer text-yellow-500'}
                          onClick={gotoDetails}>
                        Edit Supplier Info <FiEdit3/>
                    </span>
                </div>
            </div>


            {/*<div>*/}
            {/*    <div className={'flex flex-wrap justify-between items-center'}>*/}
            {/*        <h3 className={'text-2xl font-bold flex items-center gap-x-3'}>*/}

            {/*            <TlaOpen title={"Edit Supplier"} data={supplier} modal={true} to={MenuLinks.admin.supplier.form}>*/}
            {/*                Edit*/}
            {/*                <FiEdit3/>*/}
            {/*            </TlaOpen>*/}
            {/*        </h3>*/}

            {/*        <div>*/}
            {/*            <h3 className={'uppercase font-medium'}>*/}
            {/*                {supplier?.name} - {supplier?.companyName}*/}
            {/*            </h3>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <br/>*/}
            {/*    <div className={'flex flex-wrap items-center gap-x-5'}>*/}
            {/*        <div className={'flex items-center gap-x-3'}>*/}
            {/*            <BiSolidStore/> { supplier?.companyName }*/}
            {/*        </div>*/}
            {/*        <div className={'flex items-center gap-x-3'}>*/}
            {/*            /!*<StockOutlined/> Stock Unit ({ stockUnit?.data?.length })*!/*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>

}

export default SupplierDetail;