import React from 'react'
import logo from '../assets/images/logo.png'
import './Navbar.css'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
  
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", "false");
    navigate('/');
  }
  
  return (
    <nav className='fixed top-0 left-0 w-full bg-[#004643] flex items-center justify-between px-6 py-4 z-50'>
        <img src={logo} alt="logo" className="h-10 custom-logo" />
        <button className='w-28 h-10 bg-[#f9bc60] text-[#001e1d] rounded-md hover:bg-[#e8a850] transition-all' onClick={() => handleLogout()} >Logout</button>
    </nav>
  )
}

export default Navbar