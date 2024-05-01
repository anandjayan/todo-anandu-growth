import './Home.css';


const Home = () => {
  const logout =()=>{
    localStorage.clear();
    window.location.reload();
  }
  return (
    <div>Home
      <button onClick={logout}>logout </button>
    </div>
  )
}

export default Home