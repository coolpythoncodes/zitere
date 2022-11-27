import { Listbox } from '@headlessui/react'

// images
import chevronDown from 'assets/icons/chrevon-down.svg'

const Select = ({ label, data, state, handleSelectOption }) => {

    return (
        <div>
            <p className="label">{label}</p>
            <Listbox value={state} onChange={handleSelectOption} >
                <Listbox.Button className='flex items-center justify-between text-primary-2 capitalize text-base leading-[19px] matter-regular border border-[#A7B7C8] rounded-[5px] bg-white w-full py-[13px] px-3'>
                    {state}
                    <img src={chevronDown} alt="" />
                </Listbox.Button>
                <Listbox.Options className="bg-white py-1 text-primary-2 capitalize text-base leading-[19px] matter-regular rounded-[5px] border border-[#A7B7C8] h-[100px] overflow-hidden overflow-y-scroll">
                    {data?.map((value, index) => (
                        <Listbox.Option
                            key={index}
                            value={value}
                            // disabled={person.unavailable}
                            className="cursor-pointer hover:bg-[#5E44FF] hover:text-white px-3 py-2"
                        >
                            {value}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    )
}

export default Select