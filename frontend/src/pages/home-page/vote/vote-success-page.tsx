import {Button, Result } from "antd";
import { CiCircleCheck } from "react-icons/ci";
import {useNavigate} from "react-router-dom";
import "./vote-success-page.css";
import {MenuLinks} from "../../../utils/menu-links.ts";


const VoteSuccessPage = () => {
    const navigate = useNavigate();

    const awardsPageHandler = () => {
        navigate(MenuLinks.home.awards);
    }

    return <section className="vote-success__section">
           <Result
               status="success"
               icon={<CiCircleCheck style={{
                   fontSize: "80px",
                   color: "#223D80",
                   margin: "auto"
               }} />}
               title="Your vote has been successfully cast.!"
               subTitle="Please allow 1-5 minutes for your vote to be reflected in the analytics. Thank you for your patience."
               extra={[
                   <Button onClick={awardsPageHandler} key="buy">Go back</Button>,
               ]}
           />
       </section>
};

export default VoteSuccessPage;