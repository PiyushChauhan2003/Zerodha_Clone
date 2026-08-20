import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <div className='container p-5 mb-5'>
            <div className='row text-center'>
                <img src="/media/images/homeHero.png" className='mb-5' alt="Hero" />
                <h2 className='mt-5'>Invest in everything</h2>
                <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
                <Link
                  to="/signup"
                  className='btn btn-primary fs-5 mb-5'
                  style={{ width: "20%", minWidth: "180px", margin: "0 auto", backgroundColor: "#387ed1", borderColor: "#387ed1" }}
                >
                  Sign Up Now
                </Link>
            </div>
        </div>
    );
}

export default Hero;