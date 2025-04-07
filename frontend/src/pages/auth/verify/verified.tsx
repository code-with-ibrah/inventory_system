import { Link } from 'react-router-dom'
import Title from "../verification/title.tsx";
import { FiMail } from "react-icons/fi";

export default function Verified () {
  return (
        <div className={'flex items-center md:items-start justify-start flex-col bg-white-base'}>
            <FiMail size={30}/>
            <div className={'mb-8'}>
                <Title title={'Verification Complete'}
                       focusText={''}
                       subText={'Login now.'}/>
            </div>
            <Link to={'/login'} className={'mb-8'}>
                <button className={'bg-midnight-blue border-midnight-blue text-white text-base h-11 w-[360px]' +
                    ' rounded-lg'}>
                    Click to Log in
                </button>
            </Link>
        </div>
  )
}
