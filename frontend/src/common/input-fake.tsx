type props = {
    value: string | number,
    className?: string
}

const InputFake = ({ value, className } : props) => {
    return <>
        <p className={`p-2 rounded-md transition hover:border-blue-400 border ${className}`}>{ value }</p>
    </>
}

export default InputFake;