import React from 'react'
import LeftSidebar from '../../LeftSidebar/LeftSidebar'
import TermsAndCondition from './TermsAndCondition'
import './Subscription.css'
const Subscription = () => {
    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className="home-container-2">

                <h1 className='subscription-heading'>Stackoverflow Subscription</h1>
                <div className="subscription-container">
                    <div className="subscription">
                        <div className="subscription-info">
                            <h1 className='subscription-type'>Silver Plan</h1>
                            <div className="subscription-price">&#8377; 100/month</div>
                            <p className='subsciption-para'>With the Silver subscription, you get access to our community of developers and can ask 5 questions per day.</p>
                            <button className="subscription-btn">Subscribe</button>
                        </div>
                    </div>
                    <div className="subscription">
                        <div className="subscription-info">
                            <h1 className='subscription-type'>Gold plan</h1>
                            <div className="subscription-price">&#8377; 1000/month</div>
                            <p className='subsciption-para'>With the Gold subscription, you get access to our community of developers and can ask infinite questions per day.</p>
                            <button className="subscription-btn">Subscribe</button>
                        </div>
                    </div>
                </div>
                <TermsAndCondition />
            </div>
        </div>
    )
}

export default Subscription
