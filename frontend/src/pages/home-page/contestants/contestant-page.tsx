import {useEffect} from 'react';
import WelcomeSection from "../../../common/welcome/welcome-section.js";
import CardList from "../../../common/card/card-list.js";
import {getAllContestants} from "../../../state/contestant/contestantAction";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../hooks";
import {MenuLinks} from "../../../utils/menu-links.ts";
import {Contestant} from "../../../types/contestant.ts";


const ContestantsPage = () => {
    const { data, meta } = useAppSelector(state => state.contestant.contestant);
    const selectedCategory = useAppSelector(state => state.category.categoryItem);

    const filter = `categoryId[eq]=${selectedCategory.id}&isActive[eq]=1`;
    const navigate = useNavigate();

    useEffect(() => {
        if(!selectedCategory.id) {
            navigate(-1);
        }
    });

    const gotoContestantVotePage = (contestant: Contestant) => {
        navigate(MenuLinks.home.contestantInfo.replace(":uniqueCode", contestant.uniqueCode));
    };

    return <>

        <WelcomeSection
            title={'select your contestant!'}
        />

        <section className="contestant-section">
            <div className="home-container">

                <CardList
                    onClick={gotoContestantVotePage}
                    filter={filter}
                    getData={getAllContestants}
                    data={data}
                    // links={links}
                    meta={meta}
                    emptyText={'This category does not currently have any contestants.'}
                />

            </div>
        </section>

    </>
}

export default ContestantsPage;