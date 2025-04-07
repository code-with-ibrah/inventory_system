import { FiUser } from "react-icons/fi";
import { User } from "../../types/common.ts";
import CurrentApp from "./current-app.tsx";

interface Props {
    collapsed: boolean;
    user: User
}

export const SideUserInfo = ({collapsed, user} : Props) => {

    return (
        <div className={`flex flex-col items-center  py-5 gap-2 ${collapsed ? 'justify-center' : ''}`}>
            <div className={"border min-h-10 min-w-10 rounded-full flex items-center justify-center"}>
                <FiUser size={20}/>
            </div>
            {!collapsed && (
                <div className={'max-w-full text-center'}>
                    <p className={'m-0 text-xs font-medium capitalize'}>
                        {
                            user ? user.name : "active"
                        }
                    </p>
                    <p title={user?.email} className={'text-xs text-ellipsis overflow-hidden'}>{user?.email}</p>
                    <div className={'text-sm py-0.5'}>
                        <CurrentApp/>
                    </div>
                    <p className={'text-xs font-medium capitalize bg-app-red text-white rounded-full py-0.5 px-3 w-fit mx-auto'}>{user?.roleName?.replace('_', ' ') ?? '-'}</p>
                </div>
            )}
        </div>
    )
}
