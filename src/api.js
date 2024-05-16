export const fetchBlogs = async()=>{
    const res = await fetch('https://brain-blogs-serverside.vercel.app/getBlogs');

    const blogData = await res.json();
    return blogData;
}

