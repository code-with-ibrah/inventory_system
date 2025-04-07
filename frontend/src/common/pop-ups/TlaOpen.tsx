import { Link, useLocation } from 'react-router-dom'

interface Props extends React.ComponentProps<typeof Link> {
    children?: any,
    data?: object,
    modal?: boolean,
    to: string,
}

function TlaOpen({to = '#', children, data, modal = true, ...rest}: Props) {
    const location = useLocation()
    return (
        <Link {...rest} className={'flex gap-2 items-center'} to={to} state={{background: modal ? location : null, data}}>
            {children}
        </Link>
    )
}


export default TlaOpen
