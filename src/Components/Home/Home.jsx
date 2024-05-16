import React from 'react';
import Newsletter from '../Newsletter';
import Reviews from '../Reviews';
import About from './About';
import Banner from './Banner';
import RecentBlogs from './RecentBlogs';

const Home = () => {

    return (
        <div className='lg:mx-16 mx-1'>
            <Banner/>
            <RecentBlogs/>
            <About/>
            <Newsletter/>
            <Reviews/>
        </div>
    );
};

export default Home;