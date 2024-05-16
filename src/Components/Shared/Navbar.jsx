import React from 'react';
import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Navbar = () => {
    const navigate = useNavigate();
    const {user,logOut} = useContext(AuthContext);



    // log out 
    const handleLogOut =()=>{
        logOut()
        .then(() => {
            console.log('signed out')
        }).catch((error) => {
            console.log(error.message);
        });
    }



    const navlinks = <>
        <li className='mr-2'><NavLink to='/'>Home</NavLink></li>
        <li className='mr-2'><NavLink to='/addBlogs'>Add Blog</NavLink></li>
        <li className='mr-2'><NavLink to='/allBlogs'>All Blogs</NavLink></li>
        <li className='mr-2'><NavLink to='/featuredBlogs'>Featured Blogs</NavLink></li>
        <li className='mr-2'><NavLink to='/wishList'>Wishlist</NavLink></li>
    </>
    return (
        <div>
            <div className="navbar bg-base-100 my-6 lg:px-10">
                <div className="navbar-start">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navlinks}
                    </ul>
                    </div>
                    <div onClick={()=>navigate('/')}>
                        <div className='flex'>
                            <img className='h-6 mt-1 mr-1 items-center ' src="https://i.ibb.co/CWqrn8r/computer.png" alt="" />
                            <p className='lg:text-2xl text-[16px] lg:mt-0 font-bold'>Brain Blogs</p>
                        </div>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navlinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div>
                    { user &&
                        <div className="lg:flex hidden px-3 gap-1">
                            <div>
                                <p className="font-bold text-right">{user.displayName}</p>
                                <p className="text-[14px] text-right">{user.email}</p>
                            </div>
                            <div className="tooltip" data-tip={user.displayName}><img className="w-10 rounded-full" src={user.photoURL} alt="" /></div>

                        </div>}
                    </div>
                    { user ? <button onClick={handleLogOut} className="bg-black text-white px-3 py-2 rounded-lg">Logout</button> :
                     
                        <div className='flex'>
                            <Link to="/login"><button className="bg-black text-white px-3 py-2 rounded-lg mr-1">Login</button></Link>
                            <Link to="/signup"><button className="bg-black text-white px-3 py-2 rounded-lg">Register</button></Link>
                        </div>
                    
                    }                
                </div>
            </div>
        </div>
    );
};

export default Navbar;