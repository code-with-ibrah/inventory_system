import dayjs from "dayjs";

export const PoweredBy = () => {
    return (
        <div className={'text-xs'}>
            &copy; {dayjs().format('YYYY')} Jessden inventory system&nbsp;-&nbsp;
            <a href="tel: +233552621276">
                <span className={'text-gray-500 text-xs font-medium'}>Powered By HAPPY TECH</span>
            </a>
        </div>
    )
}
