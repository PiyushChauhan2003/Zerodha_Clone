import React from 'react';

function Education() {
    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col mt-5'>
                    <img src="/media/images/education.svg" alt="education" style={{width:"70%"}}/>
                </div>
                <div className='col mt-5'>
                    <h1 className='fs-3 mb-5'>Free and open market education</h1>
                    <p>Varsity,the largest online and stock market education book in the world <br />
                        covering everything from the basics to advance trading.
                    </p>
                    <a href="" style={{textDecoration:"none"}}>Versity<i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    <p className='mt-5'>TradingQ&A,the most active trading and investment community in <br /> india for all your market related queries
                    </p>
                    <a href="" style={{textDecoration:"none"}}>TradingQ&A<i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                </div>
            </div>
        </div>
    );
}

export default Education;
