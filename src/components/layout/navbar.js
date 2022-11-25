import { Button } from "components/input"
import Logo from "components/misc/logo"
import { getStarted } from "utils/data/links.data"

const NavBar = () => {
    return (
        <div className="layout-container h-20 flex items-center justify-between bg-white">
            <Logo />
            <Button
                href={getStarted}
                title="Get started"
                className="w-[120px]"
            />
        </div>
    )
}

export default NavBar