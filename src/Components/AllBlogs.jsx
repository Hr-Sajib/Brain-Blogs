import { Link, useLoaderData } from "react-router-dom";
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {fetchBlogs} from '../api'


const AllBlogs = () => {

    const originalAllBlogs = useLoaderData();

    // Use allBlogs state variable for filtered data
    const [allBlogs, setAllBlogs] = useState(originalAllBlogs);


    const handleFilter = (e) => {
        e.preventDefault();
        const selectedCategory = e.target.category.value;
        
        if(selectedCategory !==''){
            const newAllBlogs = originalAllBlogs.filter(blog => blog.category == selectedCategory);
            setAllBlogs(newAllBlogs);
        }
        else{
            setAllBlogs(originalAllBlogs);
        }
       
    }


    const handleSearch=(e)=>{
        e.preventDefault();
        const text = e.target.searchText.value;

        axios.get(`https://brain-blogs-serverside.vercel.app/getSearchedBlog/${text}`, {withCredentials:true})
        .then(res=>{
        if(res.data){
            console.log(res.data);
            setAllBlogs(res.data);
        }
        })
       
    }
    
    return (
        <div >
            <div className="lg:flex justify-between lg:mx-16 mx-1">
                <form onSubmit={handleFilter}>
                    <div className="flex gap-2">
                        <select name="category" className='h-12 mt-2 bg-blue-100 mb-3 rounded-xl  p-3'>
                                <option value="">Select Category</option>
                                <option value="JavaScript">JavaScript</option>
                                <option value="Machine Learning">Machine Learning</option>
                                <option value="Web Development">Web Development</option>
                                <option value="React">React</option>
                                <option value="Cybersecurity">Cybersecurity</option>
                                <option value="Python">Python</option>
                                <option value="Artificial Intelligence">Artificial Intelligence</option>
                                <option value="Mobile App Development">Mobile App Development</option>
                                <option value="Blockchain">Blockchain</option>
                                <option value="Data Science">Data Science</option>
                        </select>
                        <input className="h-12 mt-2 bg-blue-200 mb-3 rounded-xl w-32 p-3" type="submit" value="Filter" />
                    </div>
                </form>
                <form onSubmit={handleSearch}>
                    <input type="text" name="searchText" className="border border-black h-12 mr-1 lg:w-[400px] rounded-lg px-3" />
                    <input type="submit" className="h-12 mt-2 bg-blue-200 hover:bg-blue-300 mb-3 rounded-xl w-32 p-3" value="Search" />
                </form>
            </div>
            {
                allBlogs.map(blog => <Blog blog={blog} key={blog._id}></Blog>)
            }
        </div>
    );
};

export default AllBlogs;



const Blog =({blog}) =>{
    useEffect(()=>{
        Aos.init();
      },[])
    // console.log(blog);
    return(
        <div data-aos="fade-left" className="bg-blue-100 rounded-xl mb-5 lg:mx-16 mx-1 lg:flex gap-5 lg:p-5 p-1">
            <img className="h-48 lg:w-56 w-full rounded-xl" src={blog.imageurl} alt="" />
            <div className="flex flex-col justify-between">
                <p className="font-bold mb-2">{blog.title}</p>   
                <p className="bg-gray-100 mb-1 text-center rounded-lg w-56">{blog.category}</p> 
                <p className="">{blog.short_description}</p>

                <div className="mt-10 mb-2">
                    <Link to={`getBlogDetails/${blog._id}`}><button className="bg-blue-600 text-white w-36 rounded-lg h-10 mr-2">Details</button></Link>
                    <button className="bg-white text-blue-600 w-36 rounded-lg h-10">Add to Wishlist</button>
                </div>
            </div>
        </div>
    )
}


