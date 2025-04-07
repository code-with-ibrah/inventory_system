import "./index-page.css";
import Title from "antd/es/typography/Title";
import {Link, useNavigate} from "react-router-dom";
import { Flex } from "antd";
import {setAward} from "../../../state/award/awardSlice.js";
import CardList from "../../../common/card/card-list.js";
import {getAllAwards} from "../../../state/award/awardsAction.ts";
import {MenuLinks} from "../../../utils/menu-links.ts";
import advertImage from "../../../../src/assets/images/page/advert.png";
import {useAppDispatch, useAppSelector} from "../../../hooks";


const IndexPage = () => {
    const { data} = useAppSelector((state) => state.award.award);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const filter =  "isActive[eq]=1";


    const gotoCategoriesPage = (award: any) => {
        dispatch(setAward(award));
        navigate(MenuLinks.home.category);
    }


    return <>

        <section className="welcome-section">
            <div className="home-container">
                <div className="welcome-section__wrapper">
                    <p className="welcome-section__title">Get in the action!</p>
                    <p className="welcome-section__desc">Vote for your favorite contestants </p>
                    <p className="welcome-section__desc">and make them shine! </p>
                </div>
            </div>
        </section>


        <section className="award-section">
            <div className="home-container">

                <Flex gap={20} justify="space-between" align="center">
                    <Title className="section-title" level={2}>Awards</Title>

                    {data.length != 0 && <Link
                        to={MenuLinks.home.awards}
                        className="btn">View all
                    </Link>}
                </Flex>

                <section className="award-card__section">
                    <CardList
                        limit={3}
                        onClick={gotoCategoriesPage}
                        data={data}
                        getData={getAllAwards}
                        filter={filter}
                    />
                </section>

            </div>
        </section>


        <section className="advert-section">
            <div className="home-container">

                <div className="advert-section__wrapper">

                <div className="content">
                        <img src={advertImage} alt="Image" className="content-img" />
                        <div className="content-text__wrapper">
                            <Title level={2} className="content-title">
                                Sign up as an organizer on our platform 
                                and set up your events for voting and ticketing!
                            </Title>

                            <p className="content-desc">
                                Simply create an account and verify your email. 
                                <p>That's it. your account is all set and ready to go!</p>
                            </p>

                            {/*<Link to='/' className="btn">Signup </Link>*/}
                            <a className={'btn'} href="mailTo:khobbysekyi@gmail.com">Join Now</a>
                        </div>
                    </div>

                </div>

            </div>
        </section>





    </>

}

export default IndexPage;