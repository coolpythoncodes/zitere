import { useRef } from 'react';

import plusIcon from 'assets/icons/plus.png'
import closeIcon from 'assets/icons/close.png'

const FaqWidget = ({ question, answer, active, onToggle, index }) => {
    const faqAnswerElement = useRef(null);

    return (
        <div className={`py-3 md:py-6 px-4 md:px-8 ${index === 2 ? '' : 'border-b border-[#D9D9D9]'}`}>
            {/* Question */}
            <div className="flex items-center justify-between cursor-pointer" onClick={onToggle}>
                <p className="matter-medium text-primary-2 text-lg md:text-xl md:leading-6">{question}</p>
                <img src={active ? closeIcon : plusIcon} className="h-[10px] w-[10px]" alt="" />
            </div>
            {/* Answer */}
            <div
                ref={faqAnswerElement}
                className={`transition-all ease-in-out duration-[700ms] overflow-hidden ${active ? "opacity-100" : "opacity-0"}`}
                style={
                    active
                        ? {
                            height: faqAnswerElement.current?.scrollHeight,
                        }
                        : {
                            height: 0,
                        }


                }
            >
                <p className="matter-regular text-b3 text-base leading-[19px] mt-3 w-11/12">{answer}</p>
            </div>
        </div>
    )
}

export default FaqWidget