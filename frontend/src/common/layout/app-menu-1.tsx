import {Link, useMatch, useParams} from "react-router-dom";
import {Menu} from "../../types/common.ts";
import {appIcons} from "../app-icons.tsx";

interface Props {
    menus: Menu[];
}

const AppMenu1 = ({menus}: Props) => {

    const {name, societyName} = useParams()

    return (
        menus.map((menu) => {
            let link = menu.link

            if (name) {
                link = link.replace(':name', name)
            }

            if(societyName) {
                link = link.replace(':societyName', societyName)
            }

            const isActive = useMatch(link);
            return (
                <div key={menu.label} className={`${isActive ? 'active-nav-item' : ''} nav-item`}>
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
