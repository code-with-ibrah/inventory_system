import { Route, Routes} from "react-router-dom";
import Login from "../../pages/auth/login.tsx";
import Register from "../../pages/auth/register.tsx";
import AuthLayout from "../../pages/auth/auth-layout.tsx";
import {MenuLinks} from "../../utils/menu-links.ts";
import Manual from "../../pages/auth/verify/manual.tsx";
import Verified from "../../pages/auth/verify/verified.tsx";
import ForgetPassword from "../../pages/auth/forget-password.tsx";
import SetNewPassword from "../../pages/auth/set-new-password.tsx";
import {useAppSelector} from "../../hooks";
import PasswordResetRequestVerification from "../../pages/auth/password-reset-request.verification.tsx";

export const PublicRoutes = () => {
    const user = useAppSelector(state => state.auth.user);

    return (
        <Routes>

            <Route element={<AuthLayout/>}>
                 <Route path={'/'} element={<Login/>}/>
                <Route path={MenuLinks.login} element={<Login/>}/>
                <Route path={MenuLinks.register} element={<Register/>}/>
                <Route path={MenuLinks.manual} element={<Manual/>}/>
                <Route path={MenuLinks.verified} element={<Verified/>}/>
                <Route path={MenuLinks.forgotPassword} element={<ForgetPassword/>} />
                <Route path={MenuLinks.setNewPassword} element={<SetNewPassword/>} />
                <Route path={MenuLinks.verifyPasswordReset} element={<PasswordResetRequestVerification/>}/>
                <Route path="*" element={<Login/>}/>
            </Route>

        </Routes>

    )
}
