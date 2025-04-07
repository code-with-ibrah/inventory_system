import TlaOpen from "../../../common/pop-ups/TlaOpen.tsx";
import {MenuLinks} from "../../../utils/menu-links.ts";
import {FiEdit3, FiUsers} from "react-icons/fi";
import {LuBook} from "react-icons/lu";
import {useAppSelector} from "../../../hooks";
import {DollarCircleOutlined, HistoryOutlined} from "@ant-design/icons";
import {dateHasExpired} from "../../../utils";


const AwardDetails = () => {

    const award = useAppSelector(state => state.award.awardItem);

    return <>
        <div>
            <div className={'flex flex-wrap justify-between items-center'}>
                <h3 className={'text-2xl font-bold flex items-center gap-x-3'}>
                    {award?.name}

                    <TlaOpen title={"Edit Award"} data={award} modal={true} to={MenuLinks.admin.award.form}>
                        <FiEdit3/>
                    </TlaOpen>
                </h3>

                <div>
                    <h3 className={'uppercase font-medium'}>
                        {award?.organisation?.name ?? "Award Program"}
                    </h3>
                </div>
            </div>
            <br/>
            <div className={'flex flex-wrap items-center gap-x-5'}>
                {
                    award?.costPerVote &&
                    <div className={'flex items-center gap-x-3'}>
                        <DollarCircleOutlined/> GHS {award?.costPerVote} (per-vote)
                    </div>
                }
                <div className={'flex items-center gap-x-3'}>
                    <LuBook/> {award?._count?.category} Categories
                </div>
                <div className={'flex items-center gap-x-3'}>
                    <FiUsers/> {award?._count?.contestant} Contestants
                </div>
                <div className={'flex items-center gap-x-3'}>
                    <HistoryOutlined/> Status: { dateHasExpired(award?.endDate) }
                </div>
            </div>
        </div>
    </>
}


export default AwardDetails;