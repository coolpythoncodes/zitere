import { Button } from "components/input";
import { getStarted } from "utils/data/links.data";

const GetStarted = () => {
	return (
		<section className="bg-[#F6FAFE] py-10 md:py-16">
			<div className="layout-container text-center">
				<h1 className="text-[#18191F] matter-medium text-2xl md:text-4xl md:leading-[56px]">
					Send/receive money now.
				</h1>
				<p className="matter-regular mt-2 mb-6 text-[19px] leading-7 text-b3 max-w-[540px] md:mx-auto">
					Download Zitere mobile applications, and keep track of all
					transactions on the go.
				</p>
				<Button 
					href={getStarted} 
					title="Get Started" 
					className='mx-auto' 
				/>
			</div>
		</section>
	);
}

export default GetStarted