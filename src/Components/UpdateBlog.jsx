import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider/AuthProvider";
import Swal from 'sweetalert2'


const UpdateBlog = () => {

    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const blog = useLoaderData();
    // console.log(blog);


    const handleSubmit=(e)=>{
        e.preventDefault();

        const title = e.target.title.value;
        const category = e.target.category.value;
        const imageurl = e.target.imageurl.value;
        const short_description = e.target.short_description.value;
        const long_description = e.target.long_description.value;

        const userName = user ?.displayName;
        const userEmail = user ?.email;

        const time = new Date().toISOString();


        const newBlog ={title, category, short_description, long_description, imageurl, userEmail, time};

        console.log(newBlog);


        // send updates to server
        fetch(`http://localhost:5500/update/${blog._id}`,{
            method:"PUT",
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(newBlog)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            Swal.fire("Information Updated");

        })



    }


    const handleBack=()=>{
        navigate(-1);
    }

    return (
        <div className='bg-blue-100 lg:h-[800px] flex flex-col justify-center lg:px-24 mb-20  lg:p-0 p-2  lg:mt-0 animate__animated animate__fadeInUp'>
            <form onSubmit={handleSubmit}>
                <div className='flex justify-center'>
                    <div className='w-[900px] animate__animated animate__fadeInLeft'>
                        <input    defaultValue={blog.title}    type="text" name="title" placeholder='Blog Title' className=' h-12  rounded-xl bg-white  w-full pl-3' /> 
                        <input    defaultValue={blog.category}    type="text" name="category" placeholder='Category '   className=' h-12 mt-2   bg-white rounded-xl w-full pl-3' /> 
                        <textarea defaultValue={blog.short_description}   name="short_description" placeholder="Short Description" className=" h-20 mt-2  bg-white    rounded-xl  w-full resize-none p-2" /> 
                        <textarea defaultValue={blog.long_description}   name="long_description" placeholder="Long Description" className=" h-48   bg-white   rounded-xl  w-full resize-none p-2" /> 
                        <input    defaultValue={blog.imageurl}   type="text" name="imageurl" placeholder='Image URL '   className=' h-12  bg-white       rounded-xl  w-full pl-3' /> 
                    </div>
                </div>

                <input type="submit" value="Update" className='mt-5 ml-[390px] bg-gray-600 hover:bg-black text-white px-5 py-2 rounded-xl' />
            </form>
            <div className='flex justify-end'>
                <button onClick={handleBack} className='bg-black mr-[190px] hover:bg-gray-700 rounded-xl px-10 py-2 text-gray-200'>Back</button>
            </div>
        </div>
    );
};

export default UpdateBlog;