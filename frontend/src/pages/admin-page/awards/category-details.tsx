import TlaOpen from "../../../common/pop-ups/TlaOpen.tsx";
import {MenuLinks} from "../../../utils/menu-links.ts";
import {FiEdit3, FiUsers} from "react-icons/fi";
import {useAppSelector} from "../../../hooks";
import {DollarCircleOutlined} from "@ant-design/icons";


const CategoryDetails = () => {

    const award = useAppSelector(state => state.award.awardItem);
    const category =useAppSelector(state => state.category.categoryItem);


    // @ts-ignore
    return <>
        <div>
            <div className={'flex flex-wrap justify-between items-center'}>
                <h3 className={'text-2xl font-bold flex items-center gap-x-3'}>
                    {category?.name}

                    <TlaOpen title={"Edit Category"} data={category} modal={true} to={MenuLinks.admin.category.form}>
                        <FiEdit3/>
                    </TlaOpen>
                </h3>

                <div>
                    <h3 className={'uppercase font-medium'}>
                        {award?.name ?? "Category Program"}
                    </h3>
                </div>
            </div>
            <br/>
            <div className={'flex flex-wrap items-center gap-x-5'}>
                {
                    award?.costPerVote &&
                    <div className={'flex items-center gap-x-3'}>
                        <DollarCircleOutlined/> GHS {award?.costPerVote} (per - vote)
                    </div>
                }
                {/*<div className={'flex items-center gap-x-3'}>*/}
                {/*    <LuBook/> {award?._count?.category} Categories*/}
                {/*</div>*/}
                <div className={'flex items-center gap-x-3'}>
                    <FiUsers/> {
                    // @ts-ignore
                    category?._count?.contestant} Contestants
                </div>
            </div>
        </div>
    </>
}


export default CategoryDetails;