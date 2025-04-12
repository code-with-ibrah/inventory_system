import './App.css'
import { useAppSelector } from "./hooks";
import ScrollToTop from "./common/scroll-to-top.tsx";
import { PublicRoutes } from "./common/routes/PublicRoutes";
import { ProtectedRoutes } from "./common/routes/ProtectedRoutes";

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
