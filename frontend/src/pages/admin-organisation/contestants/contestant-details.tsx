import TlaOpen from "../../../common/pop-ups/TlaOpen.tsx";
import {MenuLinks} from "../../../utils/menu-links.ts";
import {FiEdit3} from "react-icons/fi";
import {useAppSelector} from "../../../hooks";
import {currencyFormat} from "../../../utils";


const AwardDetails = () => {

    const award = useAppSelector(state => state.award.awardItem);
    const contestant = useAppSelector(state => state.contestant.contestantItem);
    const category = useAppSelector(state => state.category.categoryItem);



    // @ts-ignore
    return <>
        <div>
            <div className={'flex flex-wrap justify-between items-center'}>
                <h3 className={'text-2xl font-bold flex items-center gap-x-3'}>
                    { contestant?.name }

                    <TlaOpen title={"Edit Contestant"} data={contestant} modal={true} to={ MenuLinks.admin.contestant.form }>
                        <FiEdit3/>
                    </TlaOpen>
                </h3>

                <div>
                    <h3 className={'uppercase font-medium'}>
                        { award?.organisation?.name ?? "Award Program" }
                    </h3>
                </div>
            </div>




            <div className={'flex flex-wrap items-center gap-x-12 my-2'}>
                {/*{*/}
                {/*    <div className={'flex items-center gap-x-3'}>*/}
                {/*        <DollarCircleOutlined/> { currencyFormat(contestant?.totalVoteAmount) }*/}
                {/*    </div>*/}
                {/*}*/}
                <div className={'flex items-center gap-x-1'}>
                    <b>Category: </b>{category?.name}
                </div>
                <div className={'flex items-center gap-x-1'}>
                    <b>Award: </b>{category?.awardName}
                </div>
                <div className={'flex items-center gap-x-1'}>
                    <b>Total Votes: </b>{contestant?.totalVoteCount}
                </div>

                <div className={'flex items-center gap-x-1'}>
                    <b>Total Amount: </b>{currencyFormat(contestant?.totalVoteAmount)}
                </div>

            </div>
        </div>
    </>
}


export default AwardDetails;