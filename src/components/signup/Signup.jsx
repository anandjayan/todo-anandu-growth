import './Signup.css';


const Signup = () => {
  return (
    <div className="main">
      
      
        <div className="left">
          <nav className='lefttop'>
            <img src="src\assets\logoimg.png" alt="logo" />
            
          </nav>
          <div className='leftbottom'>
            <h1>LOGIN</h1>
            <p>The To-Do app integrates Firebase to store user data, ensuring seamless synchronization across devices. It offers Google authentication, enabling users to securely sign up and access their personalized to-do lists with ease.</p>
            <a href=""><img src="src\assets\google.png" alt="google" className='logo' /></a>
          </div>
          
        </div>
        <div className="right">
          <img src="src\assets\heroimg.png" alt="heroimg" className='heroimg' />
        </div> 
      
     
    </div>
  )
}

export default Signup