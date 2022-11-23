import React from 'react'
import Footer from './footer'
import NavBar from './navbar'

const Layout = ({ children }) => {
  return (
    <div className=''>
      <NavBar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout