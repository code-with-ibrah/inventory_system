import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { MenuLinks } from "../../utils/menu-links.ts";
import {AppLayout} from "../layout/AppLayout.tsx";
import {ModalRoute} from "./ModalRoute.tsx";
import OrganisationAwards from "../../pages/admin-organisation/awards";
import Users from "../../pages/admin-organisation/users/index.tsx";
import OrganisationAwardDetailsLayout from "../../pages/admin-organisation/awards/organisation-award-details-layout.tsx";
import OrganisationCategories from "../../pages/admin-organisation/category/organisation-category.tsx";
import OrganisationContestants from "../../pages/admin-organisation/contestants/organisation-contestants.tsx";
import AwardBonus from "../../pages/admin-page/award-bonus";
import OrganisationAwardStats from "../../pages/admin-organisation/awards/organisation-award-stats.tsx";
import OrganisationVoteHistory from "../../pages/admin-organisation/awards/organisation-award-history.tsx";
import OrganisationCategoryDetailLayout
    from "../../pages/admin-organisation/category/organisation-category-details-layout.tsx";
import OrganisationResults from "../../pages/admin-organisation/category/organisation-result.tsx";
import {PublicRoutes} from "./PublicRoutes.tsx";
import AwardsOrganisationContestants
    from "../../pages/admin-organisation/contestants/awards-organisation-contestants.tsx";
import Analytics from "../../pages/admin-organisation/dashboard";
import OrganisationProfile from "../../pages/admin-organisation/profile/organisation-profile.tsx";
import AdminNotFound from "../../pages/common/admin-not-found.tsx";
import OrganisationUnverifiedContestants
    from "../../pages/admin-organisation/contestants/organisation-unverified-contestant-list.tsx";

export const OrganisationRoutes = () => {
    const location = useLocation()
    const background = location.state && location.state.background

    return (
        <div>
            <Routes location={background || location}>
                <Route path={MenuLinks.organisation.dashboard} element={<AppLayout/>}>
                    <Route index element={<Analytics/>}/>
                    <Route path={MenuLinks.organisation.award.index}>
                        <Route index element={<OrganisationAwards/>}/>
                        <Route path={MenuLinks.organisation.award.details.index} element={<OrganisationAwardDetailsLayout/>}>
                            <Route index element={<OrganisationCategories/>} />
                            <Route path={MenuLinks.organisation.award.details.contestants.index} element={<AwardsOrganisationContestants/>} />
                            <Route path={MenuLinks.organisation.award.details.category.index} element={<OrganisationCategories/>} />
                            <Route path={MenuLinks.organisation.award.details.bonus.index} element={<AwardBonus/>} />
                            <Route path={MenuLinks.organisation.award.details.stats.index} element={<OrganisationAwardStats/>} />
                            <Route path={MenuLinks.organisation.award.details.payment.index} element={<OrganisationVoteHistory/>} />
                        </Route>
                    </Route>


                    <Route path={MenuLinks.organisation.category.details} element={<OrganisationCategoryDetailLayout/>} >
                        <Route index element={<OrganisationContestants/>} />
                        <Route path={MenuLinks.organisation.category.contestants} element={<OrganisationContestants/>} />
                        <Route path={MenuLinks.organisation.category.results} element={<OrganisationResults/>} />
                    </Route>

                    <Route path={MenuLinks.organisation.profile.index} element={<OrganisationProfile/>}/>
                    <Route path={MenuLinks.organisation.nomination} element={<OrganisationUnverifiedContestants/>} />
                    <Route path={MenuLinks.organisation.users} element={<Users/>} />

                    <Route path={'*'} element={<AdminNotFound/>}/>
                </Route>
            </Routes>

            <PublicRoutes/>

            {background && (<><ModalRoute/> <Outlet/></>)}
        </div>
    )
}
