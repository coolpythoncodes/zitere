import React from 'react'
import NavBar from './navbar'

const Layout = ({children}) => {
  return (
    <div className=''>
        <NavBar />
        {children}
    </div>
  )
}

export default Layout