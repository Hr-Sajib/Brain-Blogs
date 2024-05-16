import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from 'react';

const Newsletter = () => {

    const handleEmailSubmit=(e)=> {
        e.preventDefault();
        const emailInput = e.target.email.value;
        
        toast('Thank you for subscirbing..')
    }




    useEffect(()=>{
        Aos.init();
      },[])
    return (
        <>
        <ToastContainer/>
        <div id='newsletter' data-aos="fade-down" className=' bg-gray-200 rounded-xl p-5 lg:flex gap-5 mb-48' >
            
            <div data-aos="fade-right">
                <div>
                    <p className='lg:text-[90px] text-3xl lg:mb-0 mb-5 lg:mt-10'>Subscribe to our Newsletter</p>
                    <form onSubmit={handleEmailSubmit} className='lg:flex lg:mt-16'>
                        <input type="email" name='email' className='h-16 w-full rounded-xl px-10 text-2xl ' placeholder='Enter your email' />
                        <input type="submit" value="Submit"  className='bg-blue-600 text-white rounded-xl lg:w-36 lg:ml-2 text-xl w-full lg:mt-0 mt-2 h-16' />
                    </form>
                </div>
                <p className='mt-5 mr-5 text-xl border border-black p-3 rounded-xl w-full'>newsletter for exclusive access to the latest tech news, trends, and insights delivered directly to your inbox. Stay informed about cutting-edge innovations, product releases, and industry updates. Gain early access to special offers, discounts, and promotions. Join our community of tech enthusiasts today!</p>
            </div>
            <img data-aos="fade-left" className='lg:h-[435px] lg:mt-0 mt-2 rounded-xl' src="https://i.ibb.co/xJm9mgv/Screenshot-2024-05-11-at-5-55-50-PM.png" alt="" />

        </div>
        </>
        
    );
};

export default Newsletter;