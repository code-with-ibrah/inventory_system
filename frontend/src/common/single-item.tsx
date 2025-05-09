import React from "react";

interface Props {
    title?: string,
    value?: string | number | any,
    className?: string,
}

const SingleItem: React.FC<Props> = ({title, value, className}) => {
    return (
        <div className={className}>
            <p className={'text-gray-500 font-medium text-md'}>{title}</p>
            <div>
                <p className={'font-medium'}>{value ?? "-"}</p>
            </div>
        </div>
    )
}

export default SingleItem
