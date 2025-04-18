import {useAppSelector} from "../../hooks";
import {StockOutlined} from "@ant-design/icons";
import {BiCategory} from "react-icons/bi";
import {TbBrandX} from "react-icons/tb";


const ProductSettingsDetails = () => {

    const award = useAppSelector(state => state.award.awardItem);
    const brand = useAppSelector(state => state.brand.brand);
    const category = useAppSelector(state => state.category.category);
    const stockUnit = useAppSelector(state => state.stockUnit.stockUnit);

    return <>
        <div>
            <div className={'flex flex-wrap justify-between items-center'}>
                <h3 className={'text-2xl font-bold flex items-center gap-x-3'}>
                    {award?.name}

                    {/*<TlaOpen title={"Edit Award"} data={award} modal={true} to={MenuLinks.admin.}>*/}
                    {/*    <FiEdit3/>*/}
                    {/*</TlaOpen>*/}
                </h3>

                {/*<div>*/}
                {/*    <h3 className={'uppercase font-medium'}>*/}
                {/*        {award?.organisation?.name ?? "Award Program"}*/}
                {/*    </h3>*/}
                {/*</div>*/}
            </div>
            <br/>
            <div className={'flex flex-wrap items-center gap-x-5'}>
                <div className={'flex items-center gap-x-3'}>
                    <BiCategory/> Categories ({ category?.data?.length })
                </div>
                <div className={'flex items-center gap-x-3'}>
                    <TbBrandX/> Brands  ({ brand?.data?.length })
                </div>
                <div className={'flex items-center gap-x-3'}>
                    <StockOutlined/> Stock Unit ({ stockUnit?.data?.length })
                </div>
            </div>
        </div>
    </>
}


export default ProductSettingsDetails;