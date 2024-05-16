import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider/AuthProvider';
import Swal from 'sweetalert2'
import Aos from "aos";
import 'aos/dist/aos.css'


const AddBlogs = () => {

    const {user} = useContext(AuthContext);

    const handleSubmit=(e)=>{
        e.preventDefault();
        const title = e.target.title.value;
        const category = e.target.category.value;
        const imageurl = e.target.imageurl.value;
        const short_description = e.target.short_description.value;
        const long_description = e.target.long_description.value;

        const userName = user.displayName;
        const userEmail = user.email;
        const userPhoto = user.photoURL;

        const time = new Date().toISOString();


        const newBlog ={title, category, short_description, long_description, imageurl,userName,userPhoto, userEmail, time};


        console.log(newBlog);




        // send data to server
        fetch('http://localhost:5500/addBlogs',{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(newBlog)

        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            Swal.fire("Information Added");


            //clear form
            e.target.title.value = '';
            e.target.category.value = '';
            e.target.imageurl.value = '';
            e.target.short_description.value = '';
            e.target.long_description.value = '';
        })

        
    }


    const navigate = useNavigate();

    const handleBack=()=>{
        navigate(-1);
    }


    useEffect(()=>{
        Aos.init();
      },[])

    return (
        <div data-aos="fade-up" className='bg-blue-100 lg:h-[800px] flex flex-col justify-center lg:px-24 mb-20  lg:p-0 p-2  lg:mt-0 animate__animated animate__fadeInUp'>
            <form onSubmit={handleSubmit}>
                <div className='flex justify-center'>
                    <div className='w-[900px] animate__animated animate__fadeInLeft'>
                        <input type="text" name="title" placeholder='Blog Title' className=' h-12  rounded-xl bg-white  w-full pl-3' /> 
                        <select name="category" className='h-12 mt-2 bg-white rounded-xl w-full pl-3'>
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

                        <textarea name="short_description" placeholder="Short Description" className=" h-20 mt-2  bg-white    rounded-xl  w-full resize-none p-2" /> 
                        <textarea name="long_description" placeholder="Long Description" className=" h-48   bg-white   rounded-xl  w-full resize-none p-2" /> 
                        <input type="text" name="imageurl" placeholder='Image URL '   className=' h-12  bg-white       rounded-xl  w-full pl-3' /> 
                    </div>
                </div>

                <input type="submit" value="Add Item" className='mt-5 ml-[390px] bg-gray-600 hover:bg-black text-white px-5 py-2 rounded-xl lg:absolute relative right-[330px] lg:mb-0 mb-1' />
               
            </form>
            <div className='flex justify-end'>
                <button onClick={handleBack} className='bg-black mr-[190px] hover:bg-gray-700 rounded-xl px-10 py-2 text-gray-200'>Back</button>
            </div>
        </div>
    );
};

export default AddBlogs;


