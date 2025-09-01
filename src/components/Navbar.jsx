import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user=useSelector((store)=>store.user);
  console.log(user);
  
  return (
    <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">👨‍💻 DevTinder</Link>
  </div>
  {user && (
  <div className="flex gap-2">
  <div className='form-control'>Welcome, {user.firstName}</div>
    <div className="dropdown dropdown-end mx-5 flex">   
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar  ">
        <div className="w-10 rounded-full">
          <img
            alt="user photo"
            src="https://images.unsplash.com/photo-1615233500570-c5d7576b4262?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW5zfGVufDB8fDB8fHww" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
  )}
</div>
  )
};

export default Navbar