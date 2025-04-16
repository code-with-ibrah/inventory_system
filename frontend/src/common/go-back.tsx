import {Button} from "antd";
import {IoArrowBackCircleOutline} from "react-icons/io5";
import {useNavigate} from "react-router-dom";

type Props = {
    title?: string;
    to?: string | undefined;
    className?: string;
}

const GoBack = ({ title, to, className}: Props) => {
    const navigate = useNavigate();
    const onClickHandler = () => {
        // @ts-ignore
        navigate(to ? to : -1);
    }
    return <>
        <Button
            className={`btn btn-red ${className}`}
            onClick={onClickHandler}
            icon={<IoArrowBackCircleOutline />}
            type={"primary"}
        >
            {title && title}
        </Button>
    </>
}

export default GoBack;