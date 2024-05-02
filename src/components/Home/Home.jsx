import './Home.css';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../signup/config.js';



const Home = () => {
  const [user] = useAuthState(auth);
  const logout =()=>{

    let result = confirm("Are you sure you want to logout?");
    if(result){
      // auth.signOut();
       localStorage.clear();
       window.location.reload();
    }else{
      //nothing happens
    }
    
  }
 
  return (
    <div className='hero'>
      <nav className='navbar'>
         <img src="src\assets\logoimg.png" alt="logo" className='logo' />
         <div className='logout'>
            
            <p>Hello {user?.displayName} !</p>
           
            <img src={user?.photoURL} alt="profilepic" />
            <button onClick={logout}>logout</button>
         </div>
          
      </nav>
       
       {/* todo */}
      <section className='todo'>
        <div className="leftsection">
            <h1>Add To Do</h1>
            <p>The To-Do app integrates Firebase to store user data, ensuring seamless synchronization across devices. It offers Google authentication, enabling users to securely sign up and access their personalized to-do lists with ease.</p>
            <input placeholder='Enter a task' type="text"  />
            <input placeholder='description' type="text" />
            <button>Add</button>
        </div>

        <div className="rightsection">
          <div>
            <h1>Tasks To Do</h1>
          </div>
          <div className='search-filter'>
            <input placeholder='Search...' type="text"  />
            <form action="">
              <select id="filter" name="filter-options">
                <option value="all">All</option>
                <option value="fav">Favourites</option>
                <option value="comp">Completed</option>
                <option value="deleted">Deleted</option>
              </select>
              <button type="submit" name="filter">Filter</button>
            </form>
          </div>

          <div className="todoList">
           <div className="todocard">
            <div className="todoitem">
              <h2>Buy Apple</h2>
              <p>from lulu</p>
            </div>
            <div className="todoactions">
             <i className="fa-solid fa-check-double complete"></i>
             <i className="fa-solid fa-heart heart"></i>
             <i className="fa-solid fa-ban delete"></i> 
            </div>
           </div>
           
          </div>
        </div>
      </section>
         
     
     
      
    </div>


  )
}

export default Home