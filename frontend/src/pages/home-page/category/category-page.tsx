import {useEffect, useState} from "react";
import WelcomeSection from "../../../common/welcome/welcome-section.js";
import CardList from "../../../common/card/card-list.js";
import {useNavigate} from "react-router-dom";
import {setCategory} from "../../../state/category/categorySlice.ts";
import "./category-page.css";
import {getAllCategories, searchCategories} from "../../../state/category/categoryAction";
import SearchBanner from "../../../common/search-banner/search-banner.js";
import {setLoaderState} from "../../../state/common/commonSlice.js";
import {unwrapResult} from "@reduxjs/toolkit";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {Category} from "../../../types/category.ts";
import {MenuLinks} from "../../../utils/menu-links.ts";

const CategoryPage = () => {
    const {data, meta} = useAppSelector((state) => state.category.category);
    const selectedAward = useAppSelector(state => state.award.awardItem);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const filter = `awardId[eq]=${selectedAward.id}&isActive[eq]=1`;
    const [searchKeyword, setKeyword] = useState('');

    const gotoContestantPage = (category: Category) => {
        dispatch(setCategory(category));
        navigate(MenuLinks.home.contestant);
    };

    useEffect(() => {
        if(!selectedAward.id) {
            navigate(-1);
        }

        if(searchKeyword.trim() === ''){
            dispatch(getAllCategories(filter))
        }

    }, [searchKeyword]);


    const searchOnClickHandler = () => {
        if(searchKeyword.trim() !== "" || searchKeyword.length > 0){
            dispatch(setLoaderState(true));
            dispatch(searchCategories(`${filter}&keyword=${searchKeyword}`))
                .then(unwrapResult)
                .then(() => dispatch(setLoaderState(false)))
                .catch(() => dispatch(setLoaderState(false)));
            return;
        }
    };


    return <>

        <section className="awards-section">
            <WelcomeSection
                title={selectedAward.name}
                desc1={"choose your contestant's category"}
                desc2={'and cast your vote!'}
            />
        </section>

        <section style={{ marginBottom: 70}}>
            <SearchBanner
                onClick={searchOnClickHandler}
                setKeyword={setKeyword}
                placeholder={'Search Category by name'}
            />
        </section>

        <section className="award-card__section">
                <CardList
                    emptyText={'It appears there are no categories available'}
                    onClick={gotoContestantPage}
                    data={data}
                    getData={getAllCategories}
                    filter={filter}
                    meta={meta}
                />
        </section>

    </>
};

export default CategoryPage;


