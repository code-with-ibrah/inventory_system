import './App.css'
import { useAppSelector } from "./hooks";
import { PublicRoutes } from "./common/routes/PublicRoutes.tsx";
import { ProtectedRoutes } from "./common/routes/ProtectedRoutes.tsx";
import ScrollToTop from "./common/scroll-to-top.tsx";

function App() {
    let authenticated = useAppSelector((state) => state.auth.authenticated);

    return (
        <>
            <ScrollToTop/>
        {authenticated ? <ProtectedRoutes/> : <PublicRoutes/>}
        </>
    )
}

export default App
