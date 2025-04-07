import { FiArrowLeft } from 'react-icons/fi'

export default function BackToLogin () {
    const goBack = () => {
        localStorage.removeItem('persist:root')
        window.location.href = '/login'
    }
  return (
      <p onClick={goBack} className={'cursor-pointer text-gray-500 flex items-center justify-center gap-x-2'}>
          <FiArrowLeft/> Back to login
      </p>
  )
}
