import React, { useState } from 'react'
import {FaUser} from 'react-icons/fa'
import {FaEnvelope} from 'react-icons/fa'
import {FaLock} from 'react-icons/fa'
import './Signup.css'


const Signup = () => {
    const [active, setActive] = useState('Signup');
    
  return (
    <div className='container flex justify-center items-center flex-col'>
        <div className='signup'>{active}</div>
        {active === 'Signup' ? <div className="input">
            <FaUser></FaUser>
            <input type="text" placeholder="Enter your name"/>
        </div> : <div/>}
        
        <div className="input">
            <FaEnvelope></FaEnvelope>
            <input type="email" placeholder="Enter your email"/>
        </div>
        <div className="input">
            <FaLock></FaLock>
            <input type="password" placeholder="Enter your password"/>
        </div>
        <div className="btns flex justify-center">
            <button className = {active === 'Signup' ? 'active-btn': 'inactive-btn'} onClick = {() => {setActive('Signup')}}>Signup</button>
            
            <button className = {active === 'Login' ? 'active-btn': 'inactive-btn'} onClick = {() => {setActive('Login')}}>Login</button>
        </div>
    </div>
  )
}

export default Signup