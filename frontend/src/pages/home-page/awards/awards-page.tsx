import {useEffect, useState} from "react";
import WelcomeSection from "../../../common/welcome/welcome-section";
import CardList from "../../../common/card/card-list";
import "./awards-page.css";
import {useNavigate} from "react-router-dom";
import SearchBanner from "../../../common/search-banner/search-banner";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {getAllAwards, searchAwards} from "../../../state/award/awardsAction.ts";
import {unwrapResult} from "@reduxjs/toolkit";
import {Award} from "../../../types/award.ts";
import {setLoaderState} from "../../../state/common/commonSlice.ts";
import {setAward} from "../../../state/award/awardSlice.ts";
import {MenuLinks} from "../../../utils/menu-links.ts";

const AwardsPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {data, meta} = useAppSelector(state => state.award.award);

    const [keyword, setKeyword] = useState('');
    const filter =  "isActive[eq]=1";

    const gotoCategoriesPage = (award: Award) => {
        dispatch(setAward(award));
        navigate(MenuLinks.home.category);
    };

    const searchOnClickHandler = () => {
        if(keyword.trim() !== "" || keyword.length > 0){
            dispatch(setLoaderState(true));
            dispatch(searchAwards(keyword))
                .then(unwrapResult)
                .then(() => dispatch(setLoaderState(false)))
                .catch(() => dispatch(setLoaderState(false)));
        }
    };

    useEffect(() => {
        if(keyword === "" || keyword.length === 0 ){
            dispatch(setLoaderState(true));
            dispatch(getAllAwards(filter))
                .then(unwrapResult)
                .then(() => dispatch(setLoaderState(false)))
                .catch(() => dispatch(setLoaderState(false)))
        }

    }, [keyword]);

    return <>

        <section className="awards-section">
            <WelcomeSection
                title={'available awards'}
                desc1={'choose your fav award program'}
                desc2={'and cast your vote!'}
            />
        </section>


        <section style={{ marginBottom: 70}}>
            <SearchBanner
                onClick={searchOnClickHandler}
                setKeyword={setKeyword}
                placeholder={'Search Award by name'}
            />
        </section>


        <section className="award-card__section">
            <CardList
                onClick={gotoCategoriesPage}
                data={data}
                meta={meta}
                filter={filter}
                getData={getAllAwards}
            />
        </section>

    </>
};

export default AwardsPage;


