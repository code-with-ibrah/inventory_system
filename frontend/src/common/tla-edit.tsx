import { Link, useLocation } from 'react-router-dom'
import { FiEdit2 } from "react-icons/fi";

interface Props {
    text?: any,
    icon?: any,
    data: NonNullable<unknown>,
    link: string
    border?: string
}

function TlaEdit ({ link = "form", data, text, icon = <FiEdit2/>, border = 'border' }: Props) {
    const location = useLocation()
    return (
        <Link title={'Edit'} to={link} state={{ background: location, data }}>
            <div className={`cursor-pointer ${border} p-1.5 rounded-md`}>
                {icon}{text}
            </div>
        </Link>
    )
}

export default TlaEdit
