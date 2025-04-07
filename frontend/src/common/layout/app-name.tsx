import { GoDotFill } from "react-icons/go";

export const AppName = () => {
    return (
        <div className={'text-midnight-blue text-2xl font-bold relative w-fit'}>
            <span className={'text-yellow-600'}>YELLO</span> &nbsp;
            <span className={'font-extralight'}>EVENTS &nbsp; <GoDotFill size={40} className={'text-app-yellow absolute -top-4 -right-7'} /></span>
        </div>
    )
}
