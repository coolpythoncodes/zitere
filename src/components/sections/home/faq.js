import FaqWidget from 'components/faq-widget'
import { useState } from 'react';
import { faq } from 'utils/data'

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const _handleToggle = (index) => {
        setActiveIndex(index === activeIndex ? -1 : index);
    };

    const isActive = (index, activeIndex) => {
        if (index === activeIndex) return true
        else return false
    }
    return (
        <section className='bg-[#F7F6FF] py-10 md:py-[64px]'>
            <div className="layout-container max-w-[828px]">
                <h1 className='text-primary-2 matter-medium text-center text-xl md:text-5xl md:leading-[58px] mb-5 md:mb-[56px]'>Frequently asked questions</h1>
                <div className='bg-white'>
                    {
                        faq.map((item, index) => (
                            <FaqWidget
                                active={isActive(index, activeIndex)}
                                onToggle={() => _handleToggle(index)}
                                key={index}
                                index={index}
                                question={item.question}
                                answer={item.answer}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Faq