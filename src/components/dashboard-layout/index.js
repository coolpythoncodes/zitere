import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Layout, Main } from "styles"
import { sidebarLinks } from "utils/data";
import Aside from "./aside"
import Navbar from "./navbar";

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const location = useLocation()

    const openSidebar = () => {
        setSidebarOpen(true);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };
    return (
        <Layout className="grid grid-cols-1 grid-rows-[0.2fr,3fr]  h-screen lg:grid-cols-[0.8fr,1fr,1fr,1fr]">
            <Navbar {...{ sidebarOpen, openSidebar }} />
            <Aside {...{ sidebarOpen, closeSidebar }} >
                {
                    sidebarLinks.map((item, index) => (
                        <Link key={index} to={item.to} className={`px-8 py-[14px] flex items-center space-x-[10px] relative ${location.pathname === item.to ? "bg-[#373B5E] before:content-[''] before:absolute before:h-full before:w-[4px] before:bg-[#5E44FF] before:-right-[0.5px] before:top-0" : ""} `}>
                            <img src={item.icon} alt="" />
                            <p className="sidebar-text">{item.name}</p>
                        </Link>
                    ))
                }
            </Aside >
            <Main className="pt-5 pb-[100px] md:pt-8 font-Montserrat bg-[#F5F5F5]">
                <div className="w-11/12 mx-auto">
                    <Outlet />
                </div>
            </Main>
        </Layout>
    )
}

export default DashboardLayout