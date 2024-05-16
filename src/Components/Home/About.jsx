import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";




const About = () => {

    useEffect(()=>{
        Aos.init();
      },[])
    return (
        
        <div data-aos="fade-down" className=' lg:h-[700px] lg:mx-[0px] lg:my-48 my-10 lg:flex'>
                    <div data-aos="fade-right" className=' my-2 flex lg:flex-col justify-between'>
                        <img className='lg:h-[160px] h-[70px] lg:w-[180px] w-[80px] rounded-xl' src="https://i.ibb.co/7W99P9H/Screenshot-2024-04-28-at-10-50-56-PM.png" alt="" />
                        <img className='lg:h-[160px] h-[70px] lg:w-[180px] w-[80px] rounded-xl' src="https://i.ibb.co/9TYkL9q/Screenshot-2024-04-28-at-10-52-01-PM.png" alt="" />
                        <img className='lg:h-[160px] h-[70px] lg:w-[180px] w-[80px] rounded-xl' src="https://i.ibb.co/tD2SQvW/14945463-des06.jpg" alt="" />
                        <img className='lg:h-[160px] h-[70px] lg:w-[180px] w-[80px] rounded-xl' src="https://i.ibb.co/FDHdGyz/23673346-6817267.jpg" alt="" />

                    </div>
                    <div data-aos="fade-right" className="w-48 mx-3 my-2 rounded-lg bg-gray-200"></div>
                    <div data-aos="fade-left" className='h-full w-full lg:p-0 p-3'>
                        <p className='poppins-semibold bg-blue lg:text-7xl text-right border-2 rounded-xl mt-2 lg:ml-1 lg:h-[160px]'>ABOUT US</p>
                        <p className='lg:ml-52 mt-1   text-right'>Our team of writers, developers, and tech enthusiasts are dedicated to delivering high-quality content that informs, educates, and inspires. With a keen eye for detail and a commitment to accuracy, we aim to demystify complex topics and make them accessible to everyone.</p>
                        <div data-aos="fade-up" className='flex justify-end'>
                            <div className='border-2 border-black mb-[1px] px-1 py-1  w-full mt-[20px] mx-2 flex justify-center'>
                                <img  className='h-[390px] w-full lg:flex hidden' src="https://i.ibb.co/nfTSy31/Screenshot-2024-05-11-at-5-10-00-PM.png" alt="" />
                            </div>
                            <img className='lg:h-[400px] h-[200px] mt-4 ' src="https://i.ibb.co/bvLxgzr/Screenshot-2024-04-28-at-9-08-20-PM.png" alt="" />
                        </div>
                    </div>
                    
        </div>
    );
};

export default About;