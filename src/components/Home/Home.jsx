import './Home.css';
import {useAuthState} from 'react-firebase-hooks/auth';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import {auth, db} from '../signup/config.js';
import { useState, useEffect } from 'react';



const Home = () => {
  const [Input, setInput] = useState("");
  // console.log(Input);
  const [Todos, setTodos] = useState([]);
  const [user] = useAuthState(auth);
  
  // function addtodo adds the todoname,ststus etc to db 
  const addTodo =(event)=>{
    event.preventDefault();
    addDoc(collection(db, `user/${user.uid}/todos`), {
      todoName: Input,
      status: false,

    }).then(()=> alert("Task Added")).catch((err)=> alert(err.message));
    setInput("");
  };

  //  onSnapshot, changes in collection is tracked and returns a snapshot
  useEffect(()=>{
    onSnapshot(collection(db, `user/${user.uid}/todos`),(snapshot)=>{
       setTodos(snapshot.docs.map((doc)=>({
          id : doc.id,
          todoName : doc.data().todoName,
          status: doc.data().status,
       })))
    })
  },[user])

  
  
  
  // this function logs out the user
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
            <input value={Input} onChange={e=>setInput(e.target.value)} placeholder='Enter a task' type="text"  />
            <input placeholder='description' type="text" />
            <button onClick={addTodo}>Add</button>
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
            {Todos?.map(Todo =>(

              <div className="todocard" key={Todo?.id}>
                <div className="todoitem">
                  <h2>{Todo?.todoName}</h2>
                  <p>from lulu</p>
                </div>
                <div className="todoactions">
                
                <i className={`fa-solid fa-check-double complete ${Todo?.status ? 'green' : 'red'}`}></i>
                <i className="fa-solid fa-heart heart" ></i>
                <i className="fa-solid fa-ban delete"></i> 
                </div>
           </div>

            ))}

            
           
           
          </div>
        </div>
      </section>
         
     
     
      
    </div>


  )
}

export default Home