import React from 'react'
import logo from '../assets/images/logo.png'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className='fixed top-0 w-full bg-[#004643] flex items-center justify-between p-5'>
        <img src={logo} alt="logo" className="custom-logo" />
        <button className='w-28 h-10 bg-[#f9bc60] text-[#001e1d] rounded-md'>Logout</button>
    </nav>
  )
}

export default Navbar