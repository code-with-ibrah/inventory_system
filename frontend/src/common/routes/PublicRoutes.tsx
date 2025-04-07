import { Route, Routes} from "react-router-dom";
import Login from "../../pages/auth/login.tsx";
import Register from "../../pages/auth/register.tsx";
import AuthLayout from "../../pages/auth/auth-layout.tsx";
import {MenuLinks} from "../../utils/menu-links.ts";
import Manual from "../../pages/auth/verify/manual.tsx";
import Verified from "../../pages/auth/verify/verified.tsx";
import ForgetPassword from "../../pages/auth/forget-password.tsx";
import SetNewPassword from "../../pages/auth/set-new-password.tsx";
import AwardsPage from "../../pages/home-page/awards/awards-page.tsx";
import CategoryPage from "../../pages/home-page/category/category-page.tsx";
import HomePageLayout from "../../pages/home-page/layout/home-page-layout.tsx"
import ContestantsPage from "../../pages/home-page/contestants/contestant-page.tsx";
import VotePage from "../../pages/home-page/vote/vote-page.tsx";
import IndexPage from "../../pages/home-page/index/index-page.tsx";
import NominationForm from "../../pages/home-page/nomination/nomination-form.tsx";
import VoteVerificationPage from "../../pages/home-page/vote/vote-verification.tsx";
import VoteErrorPage from "../../pages/home-page/vote/vote-error-page.tsx";
import VoteSuccessPage from "../../pages/home-page/vote/vote-success-page.tsx";
import HomeNotFound from "../../pages/home-page/common/error/home-not-found.tsx";
import {useAppSelector} from "../../hooks";
import Results from "../../pages/home-page/results";
import NominationSuccessPage from "../../pages/home-page/nomination/nomination-success-page.tsx";
import Navigator from "../Navigator.tsx";
import PasswordResetRequestVerification from "../../pages/auth/password-reset-request.verification.tsx";

export const PublicRoutes = () => {
    const user = useAppSelector(state => state.auth.user);

    return (
        <Routes>

            <Route element={<HomePageLayout/>}>
                <Route path={MenuLinks.home.index} element={ <IndexPage/> } />
                <Route path={MenuLinks.home.awards} element={ <AwardsPage/> } />
                <Route path={MenuLinks.home.category} element={<CategoryPage/>} />
                <Route path={MenuLinks.home.contestant} element={<ContestantsPage/>} />
                <Route path={MenuLinks.home.contestantInfo} element={<VotePage/>} />
                <Route path={MenuLinks.home.payment.verification} element={<VoteVerificationPage/>} />
                <Route path={MenuLinks.home.payment.failure} element={<VoteErrorPage/>}/>
                <Route path={MenuLinks.home.payment.success} element={<VoteSuccessPage/>}/>
                <Route path={MenuLinks.home.nominationSuccess} element={<NominationSuccessPage/>}/>
                <Route path={MenuLinks.home.results} element={<Results/>} />
                <Route path={MenuLinks.home.nominationForm} element={<Navigator url={"https://old.vote.yelloevents.com/contestant-form"}/>} />

                {(!user?.id) && <Route path={'*'} element={<HomeNotFound/>} />}
            </Route>

            <Route element={<AuthLayout/>}>
                {/* <Route path={'/'} element={<Login/>}/> */}
                <Route path={MenuLinks.login} element={<Login/>}/>
                <Route path={MenuLinks.auth.register} element={<Register/>}/>
                <Route path={MenuLinks.manual} element={<Manual/>}/>
                <Route path={MenuLinks.verified} element={<Verified/>}/>
                <Route path={MenuLinks.forgotPassword} element={<ForgetPassword/>} />
                <Route path={MenuLinks.setNewPassword} element={<SetNewPassword/>} />
                <Route path={MenuLinks.verifyPasswordReset} element={<PasswordResetRequestVerification/>}/>
                {/*<Route path="*" element={<Login/>}/>*/}
            </Route>


                {/* Nomination Form */}
            <Route path={MenuLinks.home.currentNominationForm} element={<NominationForm/>} />
        </Routes>

    )
}
