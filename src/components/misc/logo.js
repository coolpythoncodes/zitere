import logo from 'assets/logo.svg'

const Logo = ({ icon }) => {
  return (
    <img src={icon || logo} alt="" />
  )
}

export default Logo