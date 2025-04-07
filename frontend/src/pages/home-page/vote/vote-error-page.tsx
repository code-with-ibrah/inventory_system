import {Button, Result } from "antd";
import {CiCircleAlert} from "react-icons/ci";
import {useNavigate} from "react-router-dom";
import "./vote-success-page.css";
import {MenuLinks} from "../../../utils/menu-links.ts";


const VoteFailurePage = () => {
    const navigate = useNavigate();

    const awardsPageHandler = () => {
        navigate(MenuLinks.home.awards);
        return;
    }

    return <section className="vote-success__section">
           <Result
               status="error"
               icon={<CiCircleAlert style={{
                   fontSize: "80px",
                   color: "#223D80",
                   margin: "auto"
               }} />}
               title="Vote cast failed.!"
               subTitle="Please try again soon."
               extra={[
                   <Button onClick={awardsPageHandler} key="buy">Go back</Button>,
               ]}
           />
       </section>
};

export default VoteFailurePage;