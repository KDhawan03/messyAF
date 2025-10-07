import React, { useState } from 'react'
import {FaUser} from 'react-icons/fa'
import {FaEnvelope} from 'react-icons/fa'
import {FaLock} from 'react-icons/fa'
import '../styling/Signup.css'
import {useNavigate} from 'react-router-dom'
import api from '../utils/axiosConfig';

const Signup = () => {
    const [active, setActive] = useState('Signup');
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [message, setMessage] = useState('');
    
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (field, value) => {
        switch(field) {
            case 'name' : setName(value); break;
            case 'email' : setEmail(value); break;
            case 'password' : setPassword(value); break;
            case 'confirmPassword' : setConfirmPassword(value); break;
        }
        if(value.trim()) {
            setErrors(prev => ({...prev, [field]: ''}));
            setMessage('');
        }
    }

    const validatePassword = (password) => {
        if(password.length < 8) {
            return 'Password must be at least 8 characters'
        }
        let hasUpperCase = false;
        for(let i = 0; i < password.length; i++) {
            const char = password[i];
            if(char >= 'A' && char <= 'Z') {
                hasUpperCase = true;
                break;
            }
        }
        if(!hasUpperCase) {
            return 'Password must have one uppercase letter'
        }
        
        let hasLowerCase = false;
        for(let i = 0; i < password.length; i++) {
            const c = password[i];
            if(c >= 'a' && c <= 'z') {
                hasLowerCase = true;
                break;
            }
        }
        if(!hasLowerCase) {
            return 'Password must have one lowercase letter'
        }
    
        const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
        let hasSymbol = false;
        for(let i = 0; i < password.length; i++) {
            const c = password[i];
            if(symbols.includes(c)) {
                hasSymbol = true;
                break;
            }
        }
        if(!hasSymbol) {
            return 'Password must have one symbol'
        }
        return "";
    }

    const validateAllFields = () => {
        const newErrors = {name:'', email:'', password:'', confirmPassword:''}
        if(!name.trim()) {
            newErrors.name = 'Name cannot be empty';
        }
        if(!email.trim()) {
            newErrors.email = 'Email cannot be empty';
        }
        if(!password.trim()) {
            newErrors.password = 'Password cannot be empty';
        } else {
            const passwordError = validatePassword(password);
            if(passwordError) {
                newErrors.password = passwordError;
            }
        }

        if(!confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if(password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        setErrors(newErrors);

        //returning true when no errors
        return !newErrors.name && !newErrors.email && !newErrors.password && !newErrors.confirmPassword
    }

    const handleSignup = async () => {
        if(!validateAllFields()) return;
        try {
          const res = await api.post("/signup", {
            name,
            email,
            password,
          });
      
        setMessage(res.data.message || 'Account created Successfully')

          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        } catch (err) {
            setMessage('Signup failed! Please try again.')
        }
    };

    const navigate = useNavigate();

    const handleLogin = async () => {
        const newErrors = {name:'', email:'', password:'', confirmPassword:''}
    
        if(!email.trim()) {
            newErrors.email = 'Email cannot be empty';
        }
        if(!password) {
            newErrors.password = 'Password cannot be empty';
        }
        setErrors(newErrors);
        if(newErrors.email || newErrors.password) {
            return;
        }
        setMessage({ text: '', type: '' });
        try {
            const res = await api.post("/login", {
                email,
                password
            });

            if(res.data.success) {
                localStorage.setItem("token", res.data.accessToken);
                localStorage.setItem("refreshToken", res.data.refreshToken);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                localStorage.setItem("isAuthenticated", "true");
                navigate('/landing');
            } else {
                setMessage('Login failed');
            }   
        } catch(error) {
            setMessage('Invalid Credentials'); 
        }
    }


  return (
    <div className='signup-page'>

        <div className='container flex justify-center items-center flex-col'>
        <p className='text-[#e16162] lg'>{message}</p> 
            <div className='signup'>{active}</div>
            {active === 'Signup' ? 
            <div className="input-group">
                <div className="input">
                    <FaUser></FaUser>
                    <input 
                        type="text" 
                        placeholder="Enter name" 
                        value = {name}
                        onChange = {(e) =>handleInputChange('name', e.target.value)}
                    />
                </div>
                <p className = "error-message">{errors.name}</p>
            </div> : <div/>}
            
            <div className="input-group">
                <div className="input">
                    <FaEnvelope></FaEnvelope>
                    <input 
                        type="email" 
                        placeholder="Enter email"
                        value = {email}
                        onChange = {(e) =>handleInputChange('email', e.target.value)}
                    />
                </div>
                <p className = "error-message">{errors.email}</p>
            </div>

            <div className="input-group">
                <div className="input">
                    <FaLock></FaLock>
                    <input 
                        type="password" 
                        placeholder="Enter password"
                        value = {password}
                        onChange = {(e) =>handleInputChange('password', e.target.value)}
                        />
                </div>
                <p className = "error-message">{errors.password}</p>
            </div>
            {active === 'Signup' ? 
            <div className="input-group">
                <div className="input">
                    <FaLock></FaLock>
                    <input 
                        type="password" 
                        placeholder="Confirm password"
                        value = {confirmPassword}
                        onChange = {(e) => handleInputChange('confirmPassword', e.target.value)}
                    />
                </div>
                <p className = "error-message">{errors.confirmPassword}</p>
            </div> : <div/>}
            
            <div className="btns flex justify-center">
                <button className = {active === 'Signup' ? 'active-btn': 'inactive-btn'} onClick = {() => {
                    if(active === 'Signup') handleSignup();
                    setActive('Signup')}}>Signup</button>
                
                <button className = {active === 'Login' ? 'active-btn': 'inactive-btn'} onClick = {() => {
                    if(active === 'Login') handleLogin();
                    setActive('Login')}}>Login</button>
            </div>
        </div>
    </div>
  )
}

export default Signup