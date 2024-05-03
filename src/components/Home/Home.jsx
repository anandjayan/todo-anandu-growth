import './Home.css';
import {useAuthState} from 'react-firebase-hooks/auth';
import { addDoc, collection, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import {auth, db} from '../signup/config.js';
import { useState, useEffect } from 'react';



const Home = () => {
  const [Input, setInput] = useState("");
  const [Description, setDescription] = useState("");
  // console.log(Input);
  const [Todos, setTodos] = useState([]);
  const [user] = useAuthState(auth);


  //for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  
  // function addtodo adds the todoname,status etc to db
  //todos are added randomly so to add it in order we can use severtimestamp and use query() to desplay it in desc order. add later.  
  const addTodo =(event)=>{
    event.preventDefault();
    if (!Input.trim() || (!Input.trim() && !Description.trim())) {
      alert("Task name is required. ");
      return;
    }
    addDoc(collection(db, `user/${user.uid}/todos`), {
      todoName: Input,
      description: Description,
      status: false,
      removed: false,
      fav: false,

    }).catch((err)=> alert(err.message));
    setInput("");
    setDescription("");
  };

  //  onSnapshot, changes in collection is tracked and returns a snapshot
  useEffect(()=>{
    if (user && user.uid) {

      onSnapshot(collection(db, `user/${user.uid}/todos`),(snapshot)=>{
       setTodos(snapshot.docs.map((doc)=>({
          id : doc.id,
          todoName : doc.data().todoName,
          status: doc.data().status,
          description: doc.data().description,
          removed: doc.data().removed,
          fav: doc.data().fav,
       })));
    });
   }
  },[user]);

  //function to complete a task
  const completeTodo =(id, status)=>{
    const changeStatus = !status; //this toggles the current status
    updateDoc(doc(db, `user/${user.uid}/todos/${id}`),{
      status: changeStatus,
    });
  };


  //function to remove a task (not from database)

  const removeTodo =(id, remove)=>{
    const changeRemove = !remove; //this toggles the current status
    updateDoc(doc(db, `user/${user.uid}/todos/${id}`),{
      removed: changeRemove,
    });
  };




  
    //function to favourite a todo

    const favTodo =(id, favourite)=>{
      const changeFavourite = !favourite; //toggles fav
      updateDoc(doc(db, `user/${user.uid}/todos/${id}`),{
        fav: changeFavourite,
      });
    };





  //function to delete the item permanently from db
 
   const deleteTodo =(id)=>{
    let confirmDelete = confirm("This will permanently delete the task!");
    if(confirmDelete){
      deleteDoc(doc(db, `user/${user.uid}/todos/${id}`),{

    })
    }else{
      //nothing happens 
    }
    
   }


   //function to handle search
   const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
   };

   
   const filteredTodos = Todos.filter(Todo => {

    //performs search
    const matchesSearchTerm = Todo?.todoName.toLowerCase().includes(searchTerm.toLowerCase());
    

    //performs filteration
    const matchesFilter = (filter === "all" && !Todo?.removed) ||
    (filter === "fav" && Todo?.fav) ||
    (filter === "comp" && Todo?.status) ||
    (filter === "deleted" && Todo?.removed);

       
    
    return matchesSearchTerm && matchesFilter;
    
  });


   //function to target filter change
   const handleFilterChange = (event) => {
    setFilter(event.target.value);
   };
  
   
  
  
  
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
 
  return (<>
    <div className='hero'>
      <nav className='navbar'>
         <img src="/logoimg.png" alt="logo" className='logo' />
         
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
            <input value={Description} onChange={e=>setDescription(e.target.value)} placeholder='description' type="text" />
            <button onClick={addTodo}>Add</button>
        </div>

        <div className="rightsection">
          <div>
            <h1>Tasks To Do</h1>
          </div>
          <div className='search-filter'>
            <input placeholder='Search...' onChange={handleSearchChange} type="text"  />
            <form action="">
              <select id="filter" name="filter-options" onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="fav">Favourites</option>
                <option value="comp">Completed</option>
                <option value="deleted">Removed</option>
              </select>
              {/* <button onChange={handleFilterChange} type="submit" name="filter">Filter</button> */}
            </form>
          </div>

          <div className="todoList">
            {filteredTodos?.map(Todo =>(
               //if removed is true, then the card is not rendered, its not deleted fron db
               
             
              <div  className={`todocard ${Todo?.removed ? 'card-color' : ''}`} key={Todo?.id}>
                <div className="todoitem">
                  <h2 className={`${Todo?.status ? 'completed' : 'red'}`}>{Todo?.todoName}</h2>
                  <p className={`${Todo?.status ? 'completed' : ''}`}>{Todo?.description}</p>
                </div>
                <div className="todoactions">
                
                <i onClick={()=> completeTodo(Todo?.id, Todo?.status)}className={`fa-solid fa-square-check complete ${Todo?.status ? 'green' : 'red'}`}></i>


                <i onClick={()=> favTodo(Todo?.id, Todo?.fav)}className={`fa-solid fa-heart heart ${Todo?.fav ? 'pink' : 'black'}`} ></i>
                
                
                <i onClick={()=> removeTodo(Todo?.id, Todo?.removed)}className={`fa-solid fa-circle-minus delete-remove-icon ${Todo?.removed ? 'red' : 'black'}`}></i> 


                <i onClick={()=>deleteTodo(Todo?.id)} className="fa-solid fa-trash-can delete-remove-icon"></i>


                </div>
                
                
              </div>
              
            

            ))}

            
           
           
          </div>
        </div>
      </section>
         
     
     
      
    </div>
    <footer>
      <p>© {new Date().getFullYear()} Anandu D Jayan. All rights reserved.</p>
    </footer>
    </>

  )
}

export default Home