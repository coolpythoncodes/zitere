import React from 'react'

const TransactionCategories = ({ changeActiveSection, activeSection }) => {
    const sections = ["all", 'initiated', 'accepted', 'completed', 'fulfilled', 'cancelled', 'indispute']
    return (
        <div className="hidden lg:flex items-center space-x-2 mb-6 pb-2 border-b border-[#F0F0F0] mt-4">
            {
                sections.map((item, index) => (
                    <div key={item} onClick={() => changeActiveSection(index)} className={`text-[#737374] matter-regular cursor-pointer capitalize text-sm leading-[19px] ${activeSection === index ? "text-[#5E44FF]" : ""}`}>
                        {item}
                    </div>
                ))
            }
        </div>)
}

export default TransactionCategories