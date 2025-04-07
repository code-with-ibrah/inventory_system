import {Button, Result } from "antd";
import { CiCircleCheck } from "react-icons/ci";
import {useNavigate} from "react-router-dom";
import "../vote/vote-success-page.tsx";
import {MenuLinks} from "../../../utils/menu-links.ts";


const NominationSuccessPage = () => {
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
               title="Your nomination form has been successfully submitted."
               subTitle="Your request is pending finalization upon successful system verification."
               extra={[
                   <Button onClick={awardsPageHandler} key="buy">Go back</Button>,
               ]}
           />
       </section>
};

export default NominationSuccessPage;