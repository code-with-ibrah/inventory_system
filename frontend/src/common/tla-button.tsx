import React from "react";

interface Props {
    text: string;
    icon?: any;
}
const TlaButton: React.FC<Props> = ({ text, icon }) => {

    return (
        <button className={'btn btn-primary flex gap-x-2 items-center'} type={"submit"}>
            {icon}
            {text}
        </button>
    )
}

export default TlaButton