import React from "react";

interface Props extends React.HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
}
const HeaderTitle: React.FC<Props> = ({ children, ...props }) => {

    return (
        <div {...props} className={'text-2xl  w-fit  font-medium text-midnight-blue'}>
            {children}
        </div>
    )
}

export default HeaderTitle
