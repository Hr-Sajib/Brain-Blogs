import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Aos from "aos";
import "aos/dist/aos.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useQuery } from 'react-query';


const RecentBlogs = () => {

  const [allBlogs, setAllBlogs] = useState([ ]);

  const navigate = useNavigate();



  //get all blogs data
  useEffect(()=>{
    axios.get('https://brain-blogs-serverside.vercel.app/getBlogs', {withCredentials:true})
    .then(res=>{
      if(res.data){
        setAllBlogs(res.data);
        console.log(res.data);
      }
    })
  },[])




  // Sort by time
  const sortedBlogs = allBlogs.sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  );
  // Slice to show 6 only
  const recentBlogs = sortedBlogs.slice(0, 6);

  // Maintain wishlist
  const { user, WishlistIDs, setWishlistIDs } = useContext(AuthContext);
  const userEmail = user?.email;

  // Send to auth
  const { setWishListIdsArray } = useContext(AuthContext);
  useEffect(() => {
    setWishListIdsArray(WishlistIDs);
  }, [WishlistIDs]);

  const handleWishlistClicked = (id) => {
    // Ensure wishlistIDs is initialized
    const ids = WishlistIDs;


  // send to login if tries to add to wishlist
   if(user){

      // Checking if the id already exists in the wishlist
        if (!ids.includes(id)) {
          const newIds = [...ids, id];
          setWishlistIDs(newIds);
          console.log("new Ids", newIds);

          const wishedBlog = { userEmail, ids: newIds };

          fetch("https://brain-blogs-serverside.vercel.app/addToWishlist", {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(wishedBlog),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              toast("Successfully added to your personal wishlist...");
            })
            .catch((error) => {
              console.error("Error adding to wishlist:", error);
            });
        } else {
          toast("Can't add to wishlist because already exists !");
        }
    }
    else{
      navigate('/login');
    }

  };

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div data-aos="fade-up" id="blogs">
      <p className="mt-36 text-4xl text-center">Recent Blogs</p>
      <p className="text-center">
        Read the most current discussions in the tech world and actively
        participate
      </p>
      <div className="grid lg:grid-cols-2 gap-2 mt-10">
        {recentBlogs.map((blog) => (
          <Blog
            blog={blog}
            key={blog._id}
            handleWishlistClicked={handleWishlistClicked}
          />
        ))}
      </div>
      <ToastContainer /> 
    </div>
  );
};

export default RecentBlogs;

const Blog = ({ blog, handleWishlistClicked }) => {
  return (
    <div data-aos="fade-down" className="bg-blue-100 rounded-xl lg:flex gap-5 lg:p-5 p-1 lg:w-[875px]">
      <img className="h-48 lg:w-56 w-full rounded-xl" src={blog.imageurl} alt="" />
      <div className="flex flex-col justify-between">
        <p className="font-bold mb-2">{blog.title}</p>
        <p className="bg-gray-100 mb-1 text-center rounded-lg w-56">
          #{blog.category}
        </p>
        <p className="">{blog.short_description}</p>

        <div className="mt-10 mb-2">
          <Link to={`getBlogDetails/${blog._id}`}>
            {" "}
            <button className="bg-blue-600 text-white w-36 rounded-lg h-10 mr-2 lg:mb-0 mb-2">
              Details
            </button>
          </Link>
          <button
            onClick={() => handleWishlistClicked(blog._id)}
            className="bg-white text-blue-600 w-36 rounded-lg h-10"
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};
