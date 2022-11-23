import { Button } from "components/input"
import Logo from "components/misc/logo"

const NavBar = () => {
    return (
        <div className="layout-container h-20 flex items-center justify-between">
            <Logo />
            <Button 
                title="Get started" 
                className="w-[120px]"
            />
        </div>
    )
}

export default NavBar