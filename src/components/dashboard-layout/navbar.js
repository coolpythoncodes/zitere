import { NavContainer } from 'styles'
import { useContractContext } from 'context/ContractContext'

// images
import menuIcon from 'assets/icons/menu.png'
import { Button } from 'components/input'
import { formatWalletAddress } from 'utils/helper'

const Navbar = ({ openSidebar }) => {

    const { account, isWalletConnected, connectWallet } = useContractContext()
    return (
        <NavContainer className="flex px-5 justify-between items-center h-[74px] font-Montserrat">
            <img
                src={menuIcon}
                alt=""
                onClick={openSidebar}
                className="lg:hidden cursor-pointer"
            />

            <Button
                onClick={connectWallet}
                title={isWalletConnected ? formatWalletAddress(account) : "connect wallet"}
                className='lg:ml-auto w-[142px]'
            />
        </NavContainer>
    )
}

export default Navbar