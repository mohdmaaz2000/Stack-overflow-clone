import React from 'react'
import './Auth.css'

const Verification = () => {
    return (
        <section className='auth-section'>
            <div className='auth-container'>

                <form >
                    <p className="p-email">Email Verification</p>
                    <label for="verification">
                        <h4>Enter otp received </h4>
                        <input type="text" id="verification" name="verification" placeholder='Enter 6 digit otp' />
                    </label>
                    <button type="submit" className="auth-btn">Verify Otp</button>
                </form>
            </div>
        </section>
    )
}

export default Verification
