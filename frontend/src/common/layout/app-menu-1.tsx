import {Link, useMatch} from "react-router-dom";
import {Menu} from "../../types/common.ts";
import {appIcons} from "../app-icons.tsx";

interface Props {
    menus: Menu[];
}

const AppMenu1 = ({menus}: Props) => {

    return (
        menus.map((menu) => {
            let link = menu.link

            const isActive = useMatch(link);
            return (
                <div key={menu.label} className={`${isActive ? 'active-details-nav-item' : ''} nav-details-item`}>
                    <Link to={link} className={'w-full'}>
                        <div className={`flex items-center gap-x-2`}>
                            <span>{menu.icon && appIcons[menu.icon]}</span>
                            {menu.label}
                        </div>
                    </Link>
                </div>
            )
        })
    );
};

export default AppMenu1;
