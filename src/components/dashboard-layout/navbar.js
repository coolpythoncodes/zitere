import { NavContainer } from 'styles'

// images
import menuIcon from 'assets/icons/menu.png'
import { Button } from 'components/input'

const Navbar = ({ sidebarOpen, openSidebar }) => {
    return (
        <NavContainer className="flex px-5 justify-between items-center h-[74px] font-Montserrat">
            <img
                src={menuIcon}
                alt=""
                onClick={openSidebar}
                className="lg:hidden cursor-pointer"
            />

            <Button title="Connect" className='lg:ml-auto w-[110px] lg:w-[192px]' />
        </NavContainer>
    )
}

export default Navbar