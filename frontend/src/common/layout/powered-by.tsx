import dayjs from "dayjs";

export const PoweredBy = () => {
    return (
        <div className={'text-xs'}>
            &copy; {dayjs().format('YYYY')} Yello Events Production&nbsp;-&nbsp;
            <a href="tel: +233268607453">
                <span className={'text-gray-500 text-xs font-medium'}>Powered By HAPPY TECH</span>
            </a>
        </div>
    )
}
