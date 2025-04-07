import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout.tsx";
import { ModalRoute } from "./ModalRoute.tsx";
import AdminAwards from "../../pages/admin-page/awards";
import {MenuLinks} from "../../utils/menu-links.ts";
import AwardDetailLayout from "../../pages/admin-page/awards/award-details-layout.tsx";
import Categories from "../../pages/admin-page/awards/category.tsx";
import Contestants from "../../pages/admin-page/awards/contestants.tsx";
import CategoryDetailLayout from "../../pages/admin-page/awards/category-details-layout.tsx";
import ContestantDetailsLayout from "../../pages/admin-page/awards/contestant-details-layout.tsx";
import ContestantPersonalInfo from "../../pages/admin-page/awards/contestant-personal-info.tsx";
import ContestantVoteRecords from "../../pages/admin-page/awards/contestant-vote-records.tsx";
import ContestantManagementInfo from "../../pages/admin-page/awards/contestant-management-info.tsx";
import Organisations from "../../pages/admin-page/organisations";
import AwardBonusPackage from "../../pages/admin-page/award-bonus";
import AwardStats from "../../pages/admin-page/awards/award-stats.tsx";
import {PublicRoutes} from "./PublicRoutes.tsx";
import VoteHistory from "../../pages/admin-page/awards/award-history.tsx";
import Results from "../../pages/admin-page/category/result.tsx";
import AwardPrintInfo from "../../pages/admin-page/awards/award-print-info.tsx";
import ConfigLayout from "../../pages/admin-page/config/config-layout.tsx";
import Users from "../../pages/admin-page/config/users";
import Roles from "../../pages/admin-page/config/roles";
import Analytics from "../../pages/admin-page/dashboard/index.tsx";
import AdminNotFound from "../../pages/common/admin-not-found.tsx";
import UnverifiedContestantList from "../../pages/admin-page/contestant/unverified-contestant-list.tsx";
import UssdVerificationForm from "../../pages/admin-page/payment/ussd-verification-form.tsx";

export const AppProtectedRoutes = () => {
    const location = useLocation()
    const background = location.state && location.state.background

    return (
        <div>
            <Routes location={background || location}>
                <Route path={MenuLinks.admin.dashboard}  element={<AppLayout/>}>
                     <Route index element={<Analytics/>}/>

                    {/* new one here */}
                    <Route path={MenuLinks.admin.award.index} element={<AdminAwards/>} />
                    <Route path={MenuLinks.admin.award.printAwards} element={<AwardPrintInfo/>} />

                    <Route path={MenuLinks.admin.award.details.index} element={<AwardDetailLayout/>} >
                        <Route index element={<Categories/>}/>
                        <Route path={MenuLinks.admin.award.details.contestants} element={<Contestants/>} />
                        <Route path={MenuLinks.admin.award.details.bonus} element={<AwardBonusPackage/>} />
                        <Route path={MenuLinks.admin.award.details.stats} element={<AwardStats/>} />
                        <Route path={MenuLinks.admin.award.details.history} element={<VoteHistory/>} />
                    </Route>

                    <Route path={MenuLinks.admin.category.details.index} element={<CategoryDetailLayout/>}>
                        <Route index element={<Contestants/>} />
                        <Route path={MenuLinks.admin.category.details.results} element={<Results/>} />
                    </Route>
                    <Route path={MenuLinks.admin.category.index} element={<Categories/>} />

                    <Route path={MenuLinks.admin.contestant.details.index} element={<ContestantDetailsLayout/>}>
                        <Route index element={<ContestantPersonalInfo/>} />
                        <Route path={MenuLinks.admin.contestant.details.personalInfo} element={<ContestantPersonalInfo/>} />
                        <Route path={MenuLinks.admin.contestant.details.voteRecords} element={<ContestantVoteRecords/>} />
                        <Route path={MenuLinks.admin.contestant.details.manage} element={<ContestantManagementInfo/>} />
                    </Route>
                    <Route path={MenuLinks.admin.contestant.index} element={<Contestants/>} />

                    <Route path={MenuLinks.admin.config.details.index} element={<ConfigLayout/>}>
                        <Route index element={<Users/>}/>
                        <Route path={MenuLinks.admin.config.details.users} element={<Users/>}/>
                        <Route path={MenuLinks.admin.config.details.roles} element={<Roles/>}/>
                    </Route>
                    <Route path={MenuLinks.admin.organisation.index} element={<Organisations/>} />
                    <Route path={MenuLinks.admin.nomination} element={<UnverifiedContestantList/>}/>
                    <Route path={MenuLinks.admin.ussdVerification} element={<UssdVerificationForm/>}/>

                    <Route path={'*'} element={<AdminNotFound/>}/>
                </Route>
            </Routes>

            <PublicRoutes/>

            {background && (<><ModalRoute/> <Outlet/></>)}
        </div>
    )
}
