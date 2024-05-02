import './Signup.css';
import {auth, provider} from './config.js';
import { signInWithPopup } from 'firebase/auth';
import Home from '../Home/Home.jsx';
import { useState, useEffect } from 'react';
 


const Signup = () => {

  const [value, setValue] = useState('');

  const handleClick = (event)=>{
    event.preventDefault();
    signInWithPopup(auth, provider).then((data)=>{
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email)
       
    })
  }

  useEffect(() => {
    // window.location.reload();
    setValue(localStorage.getItem('email'));
  }, []);
    
  
  return (
    <>
    {value ? <Home/> : 
    <div className="main">
      
      
        <div className="left">
          <nav className='lefttop'>
            <img src="/logoimg.png" alt="logo" />
           
            <p>anandu d j</p>
          </nav>
          <div className='leftbottom'>
            <h1>LOGIN</h1>
            <p>The To-Do app integrates Firebase to store user data, ensuring seamless synchronization across devices. It offers Google authentication, enabling users to securely sign up and access their personalized to-do lists with ease.</p>
            <a href="" onClick={handleClick}><img src="/google.png" alt="google" className='logo' /></a>
            
          </div>
          
        </div>
        <div className="right">
          <img src="/heroimg.png" alt="heroimg" className='heroimg' />
        </div> 
      
     
    </div>
    }
    </>
    
  )
}

export default Signup