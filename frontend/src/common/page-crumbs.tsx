import {Breadcrumb} from "antd";
import {FiHome} from "react-icons/fi";
import {IoIosArrowForward} from "react-icons/io";
import {useLocation} from "react-router-dom";
import {Link} from "react-router-dom";
import {capitalize} from "../utils";
import {MenuLinks} from "../utils/menu-links.ts";

const PageCrumbs = () => {
    const {pathname} = useLocation();
    const pathSnippets = pathname.split("/").filter((i) => i);
    const items = [
        {
            title: (
                <Link to={"/"}>
                    <FiHome
                        style={{color: "var(--Gray-500)", marginTop: 5, fontSize: 16}}
                    />
                </Link>
            ),
        },
    ];

    pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
        isNaN(parseInt(pathSnippets[index])) &&
        items.push({
            title: (
                <Link to={url}>
                    {capitalize(
                        decodeURIComponent(pathSnippets[index]).replace("-", " "),
                    )}
                </Link>
            ),
        });
    });

    const excluded = [
        '/',
        MenuLinks.analytics,
        MenuLinks.admin.dashboard,
        MenuLinks.company.dashboard,
    ];

    return (
        !excluded.includes(pathname) ?
            <div className={"mb-2 py-3 px-5 rounded-lg no-print"}>
                <Breadcrumb items={items} separator={<IoIosArrowForward/>}/>
            </div> : <></>
    );
};

export default PageCrumbs;
