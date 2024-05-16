import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from './AuthProvider/AuthProvider';
import Aos from "aos";
import 'aos/dist/aos.css'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Wishlist = () => {
    const { user, wishListIdsArray } = useContext(AuthContext);
    const [myWishedBlogs, setMyWishedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const allBlogs = useLoaderData();

    useEffect(() => {
        if (user) {
            // Fetch wishlist data
            fetchWishlistData();
        }
    }, [user]);

    const fetchWishlistData = () => {
        fetch(`http://localhost:5500/getWishlist/${user.email}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch wishlist data');
                }
                return response.json();
            })
            .then(data => {
                const ids = data[0]?.ids || [];
                const wishedBlogs = allBlogs.filter(blog => ids.includes(blog._id));
                setMyWishedBlogs(wishedBlogs);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching wishlist data:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        Aos.init();
    }, []);

    if (loading) {
        return <div className='text-center'>Loading...</div>;
    }

    const handleRemove = (id) => {
        // Remove the item from the wishlist
        const newWishedIds = wishListIdsArray.filter(wishid => wishid !== id);
        const userEmail = user.email;
        
        const newWishList = { userEmail, newWishedIds };

        fetch('http://localhost:5500/addToWishlist', {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newWishList)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            toast('Successfully removed...');

            // Update the myWishedBlogs state after removing the item
            const updatedWishedBlogs = myWishedBlogs.filter(blog => blog._id !== id);
            setMyWishedBlogs(updatedWishedBlogs);
        })
        .catch(error => {
            toast('Error removing from wishlist!');
            console.error('Error removing from wishlist:', error);
        });
    };

    return (
        <div>
            <ToastContainer/>
            <div className='grid lg:grid-cols-2 lg:mx-16 mx-1 h-[400px]'>
                {
                    myWishedBlogs.map(blog => <Blog blog={blog} key={blog._id} handleRemove={handleRemove} />)
                }
            </div>
        </div>
    );
};

export default Wishlist;

const Blog = ({ blog, handleRemove }) => {
    return (
        <div data-aos="fade-up" className='lg:flex gap-5 bg-blue-100 rounded-xl lg:h-[220px] lg:w-[870px] mb-2 lg:p-3 p-1'>
            <img className='h-48 lg:w-64 w-full  rounded-xl' src={blog.imageurl} alt="" />
            <div data-aos="fade-right">
                <p className='text-xl'>{blog.title}</p>
                <p className='bg-gray-100 w-48 text-center my-2 rounded-lg'>{blog.category}</p>
                <p className='bg-white rounded-lg p-1'>{blog.short_description}</p>
                <Link to={`getBlogDetails/${blog._id}`}>
                    <button className='bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-500 mt-7 w-36'>Details</button>
                </Link>
                <button onClick={() => handleRemove(blog._id)} className='bg-red-900 text-white rounded-lg p-2 mt-7 w-28 hover:bg-red-700 ml-3'>Remove</button>
            </div>
        </div>
    );
};
