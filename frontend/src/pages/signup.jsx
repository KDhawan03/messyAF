import React, { useState } from 'react'
import {FaUser} from 'react-icons/fa'
import {FaEnvelope} from 'react-icons/fa'
import {FaLock} from 'react-icons/fa'
import '../styling/Signup.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
    const [active, setActive] = useState('Signup');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSignup = async () => {
        try {
          const res = await axios.post("https://messyaf-backend.onrender.com/", {
            name,
            email,
            password,
          });
      
          alert(res.data.message); 

          setName('');
          setEmail('');
          setPassword('');
        } catch (err) {
          alert(err.response?.data?.error || "Signup failed");
        }
    };

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("https://messyaf-backend.onrender.com/", {
                email,
                password
            });

            if(res.data.success) {
                localStorage.setItem("isAuthenticated", "true");
                navigate('/landing');
            } else {
                alert(res.data.message || "Login failed");
            }   
        } catch(error) {
            alert(error.response?.data?.error || "Invalid credentials") 
        }
    }

  return (
    <div className='container flex justify-center items-center flex-col'>
        <div className='signup'>{active}</div>
        {active === 'Signup' ? <div className="input">
            <FaUser></FaUser>
            <input 
                type="text" 
                placeholder="Enter name" 
                value = {name}
                onChange = {(e) =>setName(e.target.value)}
            />
        </div> : <div/>}
        
        <div className="input">
            <FaEnvelope></FaEnvelope>
            <input 
                type="email" 
                placeholder="Enter email"
                value = {email}
                onChange = {(e) =>setEmail(e.target.value)}
            />
        </div>
        <div className="input">
            <FaLock></FaLock>
            <input 
                type="password" 
                placeholder="Enter password"
                value = {password}
                onChange = {(e) =>setPassword(e.target.value)}
            />
        </div>
        <div className="btns flex justify-center">
            <button className = {active === 'Signup' ? 'active-btn': 'inactive-btn'} onClick = {() => {
                if(active === 'Signup') handleSignup();
                setActive('Signup')}}>Signup</button>
            
            <button className = {active === 'Login' ? 'active-btn': 'inactive-btn'} onClick = {() => {
                if(active === 'Login') handleLogin();
                setActive('Login')}}>Login</button>
        </div>
    </div>
  )
}

export default Signup