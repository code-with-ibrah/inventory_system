import { useLocation } from 'react-router-dom'

interface Props {
    title?: string;
    subText?: string,
    focusText?: string | null
}

export default function Title ({
  title = 'Check your email',
  subText = 'We sent a verification link to',
  focusText = null
}: Props) {
  const { state } = useLocation()
  focusText = focusText ?? state?.email
  return (
        <div className={'text-center md:text-left w-[360px]'}>
            <h1 className={'text-midnight-blue text-[30px] font-bold'}>{title}</h1>
            <p className={'text-gray-500'}>
                {subText}
                {
                    focusText &&
                    <>
                        <br/>
                        <span className={'font-semibold'}>{focusText}</span>
                    </>
                }
            </p>
        </div>
  )
}