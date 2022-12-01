import Logo from "components/misc/logo"

const Footer = () => {
    return (
        <footer className="layout-container py-4 md:py-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <Logo />
                <p className="mt-2 matter-regular text-sm leading-6 text-b3 text-center md:text-left">Copyright © 2021 Zitere. <br/>
                    All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer