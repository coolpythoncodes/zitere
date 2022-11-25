import { forwardRef } from 'react'
import usdc from 'assets/icons/usdc.svg'

const Input = forwardRef(({
    label,
    type = 'text',
    name,
    handleTextChange,
    value,
    isDisabled,
    placeholder,
    className,
    additionalInfo,
    ...props }, ref) => {
    return (
        <div>
            <label className='label'>{label}</label>
            <div className="flex items-center rounded-[5px] bg-white border border-[#A7B7C8] pr-3 py-1">
                <input
                    type={type}
                    ref={ref}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    onChange={handleTextChange}
                    value={value}
                    disabled={isDisabled}
                    className={`outline-none text-[#5B616E] placeholder:text-[#5B616E] pl-2 py-2 pr-4 text-sm flex-1 ${className}`}
                    {...props}
                />
                <div className="flex items-center bg-[#E0E7FF] py-[5px] px-[6px] rounded-lg">
                    <img src={usdc} alt="" />
                    <p className="text-primary pl-1 capitalize text-sm leading-[19px] matter-bold ">USDC</p>
                </div>
            </div>
            <p className="text-[#62688F] capitalize text-sm leading-[17px] matter-regular mt-2">{additionalInfo}</p>
        </div>
    )
})

export default Input