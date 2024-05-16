import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link, Navigate, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "./AuthProvider/AuthProvider";
import Aos from "aos";
import 'aos/dist/aos.css'
import PrivateRoute from "./PrivateRoute.jsx/PrivateRoute";



const BlogDetails = () => {
    const blog = useLoaderData();
    const {user} = useContext(AuthContext);
    const logedInUserEmail = user?.email;
    const logedInUserName = user?.displayName;
    const logedInUserPhoto = user?.photoURL;
    const blogId = blog?._id;
    const navigate = useNavigate();






    // load comments of this blog from db

    const [allComments, setAllComments] = useState(null);

    useEffect(()=>{
        fetch(`http://localhost:5500/getComments/${blogId}`)
        .then(res=>res.json())
        .then(data=>{
            setAllComments(data);
            // console.log(data);
        })
    },[])

    const fetchComments = () => {
        fetch(`http://localhost:5500/getComments/${blogId}`)
            .then(res => res.json())
            .then(data => {
                setAllComments(data);
            });
    };
    useEffect(() => {
        fetchComments();
    }, []);
 
    // handle submit comment
    const handleCommentSubmit = (e) =>{
        e.preventDefault();
        const comment = e.target.comment.value;
        console.log(blogId);
        const newComment = {blogId, logedInUserEmail, logedInUserPhoto, logedInUserName, comment};
        


        //send comment to server

        (user) ?

        fetch('http://localhost:5500/addComment', {
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(newComment)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            e.target.comment.value = '';
            fetchComments();

        })

        :

        navigate('/login');

    }








    useEffect(()=>{
        Aos.init();
      },[])


    return (
        <div className="flex gap-10 px-16 py-5 bg-blue-100">
            <img data-aos="fade-right" className="h-[600px] w-[700px] rounded-xl" src={blog.imageurl} alt="" />
            <div data-aos="fade-up">
                <p className="text-3xl">{blog.title}</p>
                <p className="bg-gray-100 w-40 p-1 rounded-lg text-center mt-1">#{blog.category}</p>
                <p className="mt-5 font-bold">{blog.short_description}</p>
                <p className="mt-3 bg-white p-2 rounded-xl">{blog.long_description}</p>
                
                <p className="mt-5">Comments Below</p>
                <div className="flex mt-2">
                    <div className="border border-black rounded-xl w-[500px] p-2">
                        {
                            allComments?.map(comment => <Comment comment={comment} key={comment._id}></Comment>)
                        }
                    </div>
                    <div className="flex flex-col">
                        <form onSubmit={handleCommentSubmit}>
                            { (blog.userEmail !== logedInUserEmail) ?
                                <textarea className="ml-5 w-[400px] rounded-xl p-2 h-36" name="comment"></textarea>
                                :
                                <div></div>
                            }    
                            <div className="flex justify-end mt-1">
                                {
                                    (blog.userEmail !== logedInUserEmail) ?
                                    <input className="bg-blue-600 text-white w-[100px] p-1 mr-1 rounded-lg" type="submit" value="Comment" />
                                    :
                                    <p className="text-center ml-10">Can't comment on own blog..</p>
                                }
                            </div>
                        </form>
                        
                    </div>
                </div>
                { (blog.userEmail == logedInUserEmail) ?
                    <div className="flex justify-end  mt-5 mr-16">
                        <Link to={`/update/${blog._id}`}><button className="bg-gray-700 rounded-lg w-48 p-2 text-white mt-20">Update</button></Link>
                    </div>
                    :
                    <p></p>
                }
                
            </div>
            
        </div>
    );
};

export default BlogDetails;



const Comment =({comment})=>{

    return(
        <div data-aos="flip-right" className="flex bg-gray-100 p-1 gap-3 rounded-xl mb-2">
            <img className="rounded-full w-12 h-12 " src={comment.logedInUserPhoto} alt="" />
            <div>
                <p  className="font-bold">{comment.logedInUserName}</p>
                <p>{comment.comment}</p>
            </div>
        </div>
    )
}