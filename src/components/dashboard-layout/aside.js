import { useRef } from "react";
import Logo from "components/misc/logo";
import { Link } from "react-router-dom";
import { SidebarContainer } from "styles"
import useOnClickOutside from "utils/hooks/useOnClickOutside";

// images 
import whiteLogo from 'assets/white-logo.svg'
import closeIcon from 'assets/icons/white-close-icon.svg'
// import logOutIcon from 'assets/icons/log-out.svg'

const Aside = ({ children, sidebarOpen, closeSidebar }) => {
    const selectContainerRef = useRef(null);
    const clickOutsideHandler = () => {
        closeSidebar()
    };
    useOnClickOutside(selectContainerRef, clickOutsideHandler);

    const sidebarResponsiveStyle = () => {
        if (sidebarOpen) {
            return {
                display: "inline",
                zIndex: "9999",
                left: "0",
                position: "absolute",
                width: "213px",
            };
        }
    }
    return (
        <SidebarContainer style={sidebarResponsiveStyle()} className="hidden h-screen bg-[#454A75] pt-10 lg:block">
            <div className="flex flex-col h-[90vh]" ref={selectContainerRef}>
                <div className="px-8 flex items-center justify-between">
                    <Link to="/">
                        <Logo icon={whiteLogo} />
                    </Link>
                    <img
                        src={closeIcon}
                        alt=""
                        className="lg:hidden cursor-pointer"
                        onClick={closeSidebar}
                    />
                </div>

                <ul className="mt-20 space-y-5 cursor-pointer">
                    {children}
                </ul>

                {/* <div className="flex h-full pb-[100px] items-end">
                    <div
                        // onClick={logOut} 
                        className="flex items-center space-x-5 sidebar-text w-full px-8 cursor-pointer">
                        <img src={logOutIcon} alt="" />
                        <p>disconnect wallet</p>
                    </div>
                </div> */}
            </div>
        </SidebarContainer>
    )
}

export default Aside