import "./card.css";
import {Image} from "antd";
import {Contestant} from "../../types/contestant.ts";
import {Award} from "../../types/award.ts";
import {dateHasExpiredChecker} from "../../utils";

type Props = {
    contestant: Contestant;
    awardItem: Award
}

const ContestantCard = ({ contestant, awardItem }: Props) => {

    async function shareHandler() {
        try {
            (!dateHasExpiredChecker(awardItem?.endDate)) && await navigator.share({
                title: 'Share this page',
                text: 'Vote for your contestant here!',
                url: window.location.href
            });
        } catch (error) {
            console.error('Error sharing content:', error);
        }
    }



    return <div className="contestant-card">

        {/*<img className='card-img' src="/assets/img/page/award.png" alt=""/>*/}

        <Image
            className={'card-img'}
            width={'100%'}
            src={contestant?.thumbnail}
            preview={{
                src: contestant?.image,
            }}
        />

        <div className="contestant-card__body">
            <span className='text-content'><b>Name:</b> {contestant?.name}</span>
            <span className='text-content'><b>Code:</b> {contestant?.uniqueCode}</span>
            <span className='text-content'><b>Award:</b> {contestant?.awardName}</span>
            <span className='text-content'><b>Category:</b> {contestant?.categoryName}</span>

            {awardItem?.isVisible &&
                <span className='text-content'><b>total </b>votes: {contestant?.totalVoteCount}</span>
            }

            <button onClick={shareHandler} className={dateHasExpiredChecker(awardItem?.endDate) ? 'btn cursor-not-allowed' : 'btn cursor-pointer' }>
                {dateHasExpiredChecker(awardItem?.endDate) ? 'Program is ended' : 'Share Now' }
            </button>
        </div>

    </div>
}

export default ContestantCard;