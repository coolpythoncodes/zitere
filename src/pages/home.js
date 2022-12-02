import React from 'react'
import Layout from "components/layout"
import { Faq, GetStarted, Hero, Why } from "components/sections/home"

// images
import one from 'assets/images/1.svg'
import two from 'assets/images/2.svg'


const Home = () => {
    return (
        <Layout>
            <Hero />
            <section className="pt-20 lg:pt-[144px] pb-10 lg:pb-16 bg-[#F5F5F5]">
                <div className="layout-container">
                    {/* first part */}
                    <div className="mb-20 lg:mb-32 grid gap-y-10 md:gap-y-0 md:grid-cols-2 md:gap-x-20 lg:gap-x-[105px] md:items-center">
                        <div className="">
                            <img src={one} alt="" className="" />
                        </div>
                        <div className="">
                            <h1 className="text-[#18191F] matter-semiBold text-3xl lg:text-4xl xl:text-5xl xl:leading-[48px]">Send money across <br /> continents</h1>
                            <p className="matter-regular text-b3 lg:text-[22px] lg:leading-[31px] mt-2">Enjoy convenient cross-border transfers on Zitere. No paperwork. No bank protocol.</p>
                        </div>
                    </div>

                    {/* second part */}
                    <div className="grid gap-y-10 md:gap-y-0 md:grid-cols-2 md:gap-x-16 lg:gap-x-[117px]  md:items-center">
                        <div className="md:order-last">
                            <img src={two} alt="" className="" />
                        </div>
                        <div className="">
                            <h1 className="text-[#18191F] matter-semiBold text-3xl lg:text-4xl xl:text-5xl xl:leading-[48px]">Send up to $10,000 <br /> daily to bank accounts</h1>
                            <p className="matter-regular text-b3 lg:text-[22px] lg:leading-[31px] mt-5">There are no limits on the amount you can send, so long as your business meets the standard verification processes. Our platform allows you to move bulk business payments without sweats</p>
                        </div>
                    </div>
                </div>
            </section>
            <Why />
            <Faq />
            <GetStarted />
        </Layout>
    )
}

export default Home