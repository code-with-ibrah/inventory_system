import {AppProtectedRoutes} from "./app-protected-routes.tsx";
import {useAppSelector} from "../../hooks";
import {CompanyRoutes} from "./company-routes.js";
import FirstTimeUser from "../../pages/auth/first-time-user.tsx";
import {UserRoles} from "../../utils/user-roles";

export const ProtectedRoutes = () => {

    const user = useAppSelector(state => state.auth.user);

    if (!user?.passwordChanged) {
        return <FirstTimeUser/>
    }

    if (user?.roleName === UserRoles.COMPANY) return <CompanyRoutes/>;

    return <AppProtectedRoutes/>
};
