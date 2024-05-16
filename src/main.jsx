import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root.jsx';
import Home from './Components/Home/Home.jsx';
import SignUp from './Components/AuthProvider/SignUp.jsx';
import AuthProvider from './Components/AuthProvider/AuthProvider.jsx';
import LogIn from './Components/AuthProvider/LogIn.jsx';
import AddBlogs from './Components/AddBlogs.jsx';
import AllBlogs from './Components/AllBlogs';
import BlogDetails from './Components/BlogDetails';
import UpdateBlog from './Components/UpdateBlog';
import FeaturedBlogs from './Components/FeaturedBlogs';
import Wishlist from './Components/Wishlist';
import Errorpage from './Components/Errorpage';
import PrivateRoute from './Components/PrivateRoute.jsx/PrivateRoute';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement:<Errorpage/>,
    children:[
      {
        path:'/',
        element:<Home/>,
        loader: ()=> fetch('http://localhost:5500/getBlogs'),
      },
      {
        path:'/signup',
        element:<SignUp/>
        
      },
      {
        path:'/login',
        element:<LogIn/>
      },
      {
        path:'/addBlogs',
        element:<PrivateRoute><AddBlogs/></PrivateRoute>
      },
      {
        path:'/allBlogs',
        element:<AllBlogs/>,
        loader: ()=> fetch('http://localhost:5500/getBlogs'),
      },
      {
        path:'/allBlogs/getBlogDetails/:id',
        element:<BlogDetails/>,
        loader: ({params})=> fetch(`http://localhost:5500/getBlogDetails/${params.id}`),
      },
      {
        path:'/getBlogDetails/:id',
        element:<BlogDetails/>,
        loader: ({params})=> fetch(`http://localhost:5500/getBlogDetails/${params.id}`),
      },
      {
        path:'/wishList/getBlogDetails/:id',
        element:<BlogDetails/>,
        loader: ({params})=> fetch(`http://localhost:5500/getBlogDetails/${params.id}`),
      },
      {
        path:'/update/:id',
        element:<PrivateRoute><UpdateBlog/></PrivateRoute>,
        loader: ({params})=> fetch(`http://localhost:5500/getBlogDetails/${params.id}`),
      },
      {
        path:'/featuredBlogs',
        element:<FeaturedBlogs/>,
        loader: ()=> fetch('http://localhost:5500/getBlogs'),
      },
      {
        path:'/wishList',
        element:<PrivateRoute><Wishlist/></PrivateRoute>,
        loader: ()=> fetch('http://localhost:5500/getBlogs'),
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
