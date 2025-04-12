import { Outlet } from "react-router-dom";
import { AppName } from "../../common/layout/app-name.tsx";
import { PoweredBy } from "../../common/layout/powered-by.tsx";

const AuthLayout = () => {
    return (
        <div className={'auth-wrapper'}>
            <div className={'p-10 flex flex-col items-center justify-center auth-right-side'}>
                <div className={'rounded-lg bg-white md:bg-transparent p-5'}>
                    <div className={'mb-5'}>
                        <AppName/>
                    </div>
                    <Outlet/>
                    <div className={'py-5'}>
                        <PoweredBy/>
                    </div>
                </div>
            </div>
            <div className={'auth-side'}></div>
        </div>
    )
};

export default AuthLayout;
