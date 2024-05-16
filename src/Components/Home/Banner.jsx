import React, { useEffect } from 'react';
import Aos from "aos";
import 'aos/dist/aos.css'




const Banner = () => {

    // Scroll to a section when its corresponding button is clicked
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        section.scrollIntoView({ behavior: 'smooth' });
    }




    useEffect(()=>{
        Aos.init();
      },[])


    return (
        <div data-aos="fade-up">
            <img className='lg:h-[750px] mx-auto h-[250px] ' src="https://i.ibb.co/wwD1CfY/Banner-Img.png" alt="" />
            <div className='flex flex-col lg:flex-row  gap-1 justify-center relative lg:right-56 right-32 lg:top-0 top-5'>
                <button onClick={()=>scrollToSection('blogs')} className='bottom-36 left-48 relative mb-1 w-52  py-1 px-8 rounded-xl text-black bg-blue-300 hover:bg-gray-100'>_ S h o w &nbsp;&nbsp; B l o g s</button>
                <button onClick={()=>scrollToSection('newsletter')} className='bottom-36 mb-1 left-48 relative w-52 py-1 px-8 rounded-xl text-black bg-blue-300 hover:bg-gray-100'>_ N e w s l e t t e r</button>
                <button onClick={()=>scrollToSection('reviews')} className='bottom-36 left-48 relative w-52  py-1 px-8 rounded-xl text-black bg-blue-300 hover:bg-gray-100'>_ R e v i e w s</button>
            </div>
            
        </div>
    );
};

export default Banner;