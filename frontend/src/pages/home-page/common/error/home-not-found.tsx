import { Button, Result } from 'antd';
import "./general-page-error.css";
import {useNavigate} from "react-router-dom";
import {MenuLinks} from "../../../../utils/menu-links.ts";

type Props = {
    code?: any;
    title?: string;
    message?: string;
}
const HomeNotFound= (props: Props) => {
    const navigator = useNavigate();
    const clickHandler = () => {
        navigator(MenuLinks.home.awards);
        return;
    }

    return <>
            <section className="error-page__section">
                <Result
                    status={props.code ?? 404}
                    title={props.title ?? 404}
                    subTitle={props.message ?? 'Sorry, the page you visited does not exist.."'}
                    extra={<Button type="primary" onClick={clickHandler}>Back Home</Button>}
                />
            </section>
    </>
};






export default HomeNotFound;