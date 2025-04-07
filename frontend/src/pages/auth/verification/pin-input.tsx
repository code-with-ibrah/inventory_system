import {useState, useRef } from 'react'
const PinInput = ({ length, onComplete }: { length: number, onComplete: (value: string) => void }) => {
  const [pin, setPin] = useState(Array(length).fill(''));
  const inputs = useRef([]);

  const handleChange = (e: any, index: number) => {
    const value = e.target.value
    if (/^[0-9]$/.test(value) || value === '') {
      const newPin = [...pin]
      newPin[index] = value
      setPin(newPin)

      if (value && index < length - 1) {
        // @ts-ignore
        (inputs.current[index + 1]).focus()
      }
      if (newPin.every(v => v !== '')) {
        onComplete(newPin.join(''))
      }
    }
  }

  const handleKeyDown = (e: any, index: number) => {

    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      // @ts-ignore
      (inputs.current[index - 1]).focus()
    }
  }

  return (
        <div className={'flex justify-between gap-x-4'}>
            {Array(length).fill(0).map((_, i) => (
                <input
                    className={'rounded-xl font-medium text-midnight-blue text-4xl md:text-5xl w-14 md:w-20 h-14' +
                        ' md:h-20' +
                        ' border' +
                        ' border-midnight-blue' +
                        ' focus:border-2 md:focus:border-4'}
                    key={i}
                    type="text"
                    maxLength={1}
                    value={ pin[i] }
                    onChange={(e) => handleChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    ref={(el) => {
                      // @ts-ignore
                      inputs.current[i] = el
                    }}
                    style={{ textAlign: 'center' }}
                />
            ))}
        </div>
  )
}

export default PinInput
