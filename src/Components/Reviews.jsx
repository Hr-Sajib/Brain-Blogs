import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";


const Reviews = () => {


    const sliderSettings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        swipeToSlide: true,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000,
        arrows: false,

      };




    useEffect(()=>{
        Aos.init();
      },[])


    return (
        <> 
            <p className="lg:text-4xl text-xl text-center mb-6">Our User Reviews</p>
            <div id="reviews" data-aos="zoom-in-left" className="slider-container rounded-xl lg:h-[323px] p-3 bg-blue-100 flex lg:mb-48">
                
                <Slider {...sliderSettings}>
                    
                <div className="lg:ml-48 lg:p-5">
                    <div className="flex items-center lg:gap-10 gap-1">
                        <img className="lg:w-48 w-12" src="https://i.ibb.co/2FMzYb1/man.png" alt="" />
                        <div className="lg:w-[600px] w-[290px] bg-gray-100 lg:py-8 lg:px-10 p-2 rounded-xl">
                            <p className="font-bold">Alice Brodd</p>
                            <p>Great product! Very satisfied with the quality. The customer service was also exceptional, and the delivery was quick. Overall, a fantastic experience.</p>
                        </div>
                    </div>
                </div>
                <div className="lg:ml-48 lg:p-5">
                    <div className="flex items-center lg:gap-10 gap-1">
                        <img className="lg:w-48 w-12" src="https://i.ibb.co/g9kSQkD/woman-1.png" alt="" />
                        <div className="lg:w-[600px] w-[290px] bg-gray-100 lg:py-8 lg:px-10 p-2 rounded-xl">
                            <p className="font-bold">Amelia Nice</p>
                            <p>Decent product. Could be improved in some areas. The packaging was a bit damaged upon arrival, and it took longer than expected to receive the order. However, the product itself is functional and meets my needs.</p>
                        </div>
                    </div>
                </div>
                <div className="lg:ml-48 lg:p-5">
                    <div className="flex items-center lg:gap-10 gap-1">
                        <img className="lg:w-48 w-12" src="https://i.ibb.co/2FMzYb1/man.png" alt="" />
                        <div className="lg:w-[600px] w-[290px] bg-gray-100 lg:py-8 lg:px-10 p-2 rounded-xl">
                            <p className="font-bold">David</p>
                            <p>Excellent service! Will definitely recommend to others. The website was easy to navigate, and the checkout process was smooth. The product exceeded my expectations, and I'm very happy with my purchase.</p>
                        </div>
                    </div>
                </div>
                <div className="lg:ml-48 lg:p-5">
                    <div className="flex items-center lg:gap-10 gap-1">
                        <img className="lg:w-48 w-12" src="https://i.ibb.co/g9kSQkD/woman-1.png" alt="" />
                        <div className="lg:w-[600px] w-[290px] bg-gray-100 lg:py-8 lg:px-10 p-2 rounded-xl">
                            <p className="font-bold">Rita </p>
                            <p>Good value for money. Would buy again. The product was affordable and of decent quality. It met my requirements and was delivered within the expected timeframe. Overall, a satisfactory purchase.</p>
                        </div>
                    </div>
                </div>
                        
                </Slider>                         
            </div>
        </>
                        
    );
};

export default Reviews;
