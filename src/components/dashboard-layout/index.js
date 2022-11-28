import { useContractContext } from "context/ContractContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Layout, Main } from "styles"
import { ethereum, web3 } from "utils/constant";

import { sidebarLinks } from "utils/data";
import { handleNetworkSwitch, isPolygonNetwork } from "utils/helper";
import Aside from "./aside"
import Navbar from "./navbar";

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { isWalletConnected } = useContractContext()

    const location = useLocation()

    const openSidebar = () => {
        setSidebarOpen(true);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };


    const networkChanged = async (chainId) => {
        if (!(isPolygonNetwork(chainId))) {
            await handleNetworkSwitch("testnet")
        }
    }
    useEffect(() => {
        ethereum?.on('chainChanged', networkChanged)
        return () => {
            ethereum?.removeListener("chainChanged", networkChanged);
        };
    }, [])

    useEffect(() => {
        const switchNetwork = async () => {
            if (!ethereum) return toast.error("You must install Metamask in your browser extension.")
            const chainId = await web3.eth.getChainId().then()
            if (!isPolygonNetwork(chainId)) {
                await handleNetworkSwitch("testnet")
            }
        }
        switchNetwork()
    }, [isWalletConnected])
    return (
        <>
            <p className="text-center matter-medium text-[#191535] text-sm leading-[17px] py-3 bg-[#6EE3C0] md:text-base md:leading-[19px]">Warning : You are on Testnet environment</p>
            <Layout className="grid grid-cols-1 grid-rows-[0.2fr,3fr] h-screen relative lg:grid-cols-[0.8fr,1fr,1fr,1fr]">
                <Navbar {...{ sidebarOpen, openSidebar }} />
                <Aside {...{ sidebarOpen, closeSidebar }} >
                    {
                        sidebarLinks.map((item, index) => (
                            <Link key={index} to={item.to} className={`px-8 py-[14px] flex items-center space-x-[10px] relative ${location.pathname.includes(item.to) ? "bg-[#373B5E] before:content-[''] before:absolute before:h-full before:w-[4px] before:bg-[#5E44FF] before:-right-[0.5px] before:top-0" : ""} `}>
                                <img src={item.icon} alt="" />
                                <p className="sidebar-text">{item.name}</p>
                            </Link>
                        ))
                    }
                </Aside >
                <Main className="pt-5 pb-[100px] md:pt-8 bg-[#F5F5F5]">
                    <div className="w-11/12 mx-auto">
                        <Outlet />
                    </div>
                </Main>
            </Layout>
        </>
    )
}

export default DashboardLayout