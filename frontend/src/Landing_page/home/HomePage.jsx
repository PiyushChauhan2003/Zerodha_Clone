import React from 'react';
import Education from './Education';
import Hero from './Hero';
import Awards from './Awards';
import Pricing from './Pricing';
import Stats from './Stats';
import OpenAccount from '../OpenAccount';
import Footer from '../Footer';
import Navbar from '../Navbar';

function HomePage() {
    return (
        <>
            <Hero />
            <Awards/>
            <Stats/>
            <Pricing/>
            <Education />
            <OpenAccount/>
        </>
    );
}

export default HomePage;
