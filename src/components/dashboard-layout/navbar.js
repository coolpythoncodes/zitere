import { NavContainer } from 'styles'

// images
import menuIcon from 'assets/icons/menu.png'
import copyIcon from 'assets/icons/copy.svg'
import caretIcon from 'assets/icons/caret.svg'
import avatar from 'assets/icons/avatar.svg'

const Navbar = ({ sidebarOpen, openSidebar }) => {
    return (
        <NavContainer className="flex px-5 justify-between items-center h-[74px] font-Montserrat">
            <img
                src={menuIcon}
                alt=""
                onClick={openSidebar}
                className="lg:hidden cursor-pointer"
            />

            <div className="bg-[#F3F4F5] py-[9px] px-[14px] rounded-[38px] flex items-center space-x-[26px] lg:ml-auto cursor-pointer">
                <div className="flex items-center">
                    <img src={avatar} alt="" className='h-[30px] w-[30px]' />
                    <p className="text-base matter-medium leading-[18px] ml-2">0x1ba...38cb1</p>
                </div>
                <div className="flex items-center space-x-[7px]">
                    <img src={copyIcon} alt="" />
                    <img src={caretIcon} alt="" />
                </div>
            </div>
        </NavContainer>
    )
}

export default Navbar