import { Button } from 'components/input'
import showcase from 'assets/images/show-case.svg'
import { getStarted } from 'utils/data';

const Hero = () => {
    return (
        <section className="bg-[#25283D] py-10 md:py-20">
            <div className="layout-container gap-y-10 md:gap-y-0 grid md:grid-cols-2 md:gap-x-10 lg:gap-x-[160px] md:items-center">
                <div className="">
                    <h1 className="text-white matter-semiBold text-4xl md:text-2xl lg:text-4xl xl:text-[64px] xl:leading-[77px]">
                        The fastest way to send money across borders
                    </h1>
                    <p className="mt-2 mb-[18px] matter-regular text-[#F0F0F0] text-xl md:text-base leading-6">
                        Send money online to Nigeria, Ghana, Kenya, Cote D'Ivoire and South Africa from the
                        anywhere,Enjoy free local and cross-border transfers, easily track
                        all payments,
                    </p>
                    <Button
                        href={getStarted}
                        title="Get Started"
                    />
                </div>
                <div className="md:flex justify-end">
                    <img src={showcase} alt="" className='w-full' />
                </div>
            </div>
        </section>
    );
}

export default Hero
