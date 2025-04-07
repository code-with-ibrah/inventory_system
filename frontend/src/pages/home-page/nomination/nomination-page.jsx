import React from "react";
import HomePageLayout from "../layout/home-page-layout.js";
import CardList from '../../../common/card/card-list.js';
import WelcomeSection from "../../../common/welcome/welcome-section.js";
import "./nomination.css";
import {MenuLink} from "../../../utils/menu-link";


const NominationPage = () => {
    return <React.Fragment>
        <HomePageLayout>

        <WelcomeSection
            title={'activate your nomination!'}
            desc1={'choose your nominee award program'}
            desc2={'and nominate yourself!'}
        />


        <section className="nomination-section">
            <div className="home-container">
                <CardList data={[]} to={MenuLink.nomination.form} />
            </div>
        </section>




        </HomePageLayout>
    </React.Fragment>
}


export default NominationPage;