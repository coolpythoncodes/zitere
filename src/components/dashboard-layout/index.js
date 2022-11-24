import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "styles"
import { sidebarLinks } from "utils/data";
import Aside from "./aside"
import Navbar from "./navbar";

const DashboardLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const location = useLocation()
    console.log(location)

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
            {children}
        </Layout>
    )
}

export default DashboardLayout