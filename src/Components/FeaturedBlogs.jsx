import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";


const FeaturedBlogs = () => {
    const allBlogsF = useLoaderData();
    

    allBlogsF.sort((a, b) => {
        const lengthA = b.long_description.length;
        const lengthB = a.long_description.length;

        if (lengthA < lengthB) {
            return -1; 
        }
        if (lengthA > lengthB) {
            return 1; 
        }
        return 0; 
    });

    const allBlogs = allBlogsF.slice(0,10);

    return (
        <div>
            <div className="overflow-x-auto lg:mr-20 lg:ml-28 mt-5 animate__animated animate__fadeInUp">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                    
                        <th></th>
                        <th>Title</th>
                        <th>Owner Name</th>
                        <th>Owner Photo</th>

                    </tr>
                    </thead>
                    <tbody>
                        {
                            allBlogs.map((blog, index)=><BlogRow index={index} key={blog._id} blog={blog}></BlogRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeaturedBlogs;


const BlogRow = ({blog, index})=>{


    return(
        <tr>
            <th>{index+1}</th>
            <td>{blog.title}</td>
            <td>{blog.userEmail}</td>
            <td><img className="h-12 w-12 rounded-full" src={blog.userPhoto} alt="" /></td>
        </tr>
    )
}