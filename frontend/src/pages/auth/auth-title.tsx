interface Props {
    title: string;
    subtitle: string;
}

const AuthTitle = ({title, subtitle}: Props) => {
    return (
        <>
            <h1 className={'text-midnight-blue text-md md:text-3xl font-bold'}>{title}</h1>
            <p className={'text-gray-500 text-xs mb-5'}>{subtitle}</p>
        </>
    )
}

export default AuthTitle;
