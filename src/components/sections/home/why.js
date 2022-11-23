import React from 'react'
import { why } from 'utils/data'

const Why = () => {
    return (
        <section className='bg-[#454A75] py-10 md:py-[124px]'>
            <div className="layout-container">
                <h1 className='text-white matter-bold text-xl md:text-5xl md:leading-[58px] mb-5 md:mb-[56px]'>Why people are choosing us</h1>

                <div className="space-y-6 md:space-y-0 md:grid grid-cols-3 gap-x-6">
                    {
                        why.map((item, index) => (
                            <div key={index} className="rounded-lg py-6 px-4 bg-[#FEF7ED] even:bg-[#ECF5FE]">
                                <img src={item.icon} alt="" />
                                <div className="mt-8">
                                    <h3 className="text-primary-2 matter-medium mb-2 capitalize text-2xl leading-[29px]">{item.title}</h3>
                                    <p className="text-[#626161] matter-regular text-base leading-[19px]">{item.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Why