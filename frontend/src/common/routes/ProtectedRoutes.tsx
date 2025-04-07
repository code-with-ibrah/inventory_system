import {AppProtectedRoutes} from "./app-protected-routes.tsx";
import {useAppSelector} from "../../hooks";
import {OrganisationRoutes} from "./organisation-routes.tsx";
import FirstTimeUser from "../../pages/auth/first-time-user.tsx";

export const ProtectedRoutes = () => {

    const user = useAppSelector(state => state.auth.user);

    if (!user?.passwordChanged) {
        return <FirstTimeUser/>
    }

    if (user?.roleName === "organisation") return <OrganisationRoutes/>

    return <AppProtectedRoutes/>
}
